import axios from 'axios';

// Create a configured Axios instance
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Dynamically match host and protocol to avoid SameSite cookie blocks and mixed content errors
  const hostname = window.location.hostname || '127.0.0.1';
  const protocol = window.location.protocol || 'http:';

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:8000`;
  }

  // Production domain hosted on standard HTTP/HTTPS ports (proxied by Nginx/Passenger)
  if (hostname.includes('rrgobalitservices.com')) {
    return `${protocol}//${hostname}`;
  }

  return `${protocol}//${hostname}:8000`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// Helper function to read a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Request interceptor to attach CSRF token manually (Axios bypasses auto-CSRF on different ports)
api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to catch authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we receive a 401 Unauthorized, it means the user's session expired or is invalid
    if (error.response && error.response.status === 401) {
      // Clear any stored authentication info and trigger redirect if not already on login page
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
