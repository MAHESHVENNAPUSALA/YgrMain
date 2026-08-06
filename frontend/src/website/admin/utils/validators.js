/**
 * Form Validation Utilities for Website Admin CMS
 */

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email address';
  return null;
};

export const validateRequired = (value, fieldName = 'This field') => {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateUrl = (url) => {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch (err) {
    return 'Invalid URL format (must include http:// or https://)';
  }
};
