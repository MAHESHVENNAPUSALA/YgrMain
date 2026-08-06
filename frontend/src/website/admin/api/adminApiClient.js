/**
 * Centralized Admin API Client for Website Admin CMS
 */

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return ''; // Uses Vite proxy or relative relative path
    }
  }
  return '';
};

export const adminFetch = async (endpoint, options = {}) => {
  const url = `${getBaseUrl()}${endpoint}`;
  const defaultHeaders = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type') || '';

    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      // If backend returns HTML (redirect to login page), treat as auth failure
      if (text.includes('<!DOCTYPE html>') || text.includes('<html')) {
        return { success: false, error: 'Session expired. Please re-login to the CMS.', status: response.status };
      }
      data = text;
    }

    if (!response.ok) {
      const errorMsg = (typeof data === 'object' && data.error) ? data.error : `HTTP Error ${response.status}`;
      return { success: false, error: errorMsg, status: response.status, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`adminFetch error on [${endpoint}]:`, error);
    return { success: false, error: error.message || 'Network connection failed' };
  }
};

export default adminFetch;
