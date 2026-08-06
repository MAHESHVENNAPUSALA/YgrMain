/**
 * Formatters for Website Admin CMS
 */

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (err) {
    return dateString;
  }
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
};

export const truncateText = (str, limit = 50) => {
  if (!str) return '';
  if (str.length <= limit) return str;
  return str.substring(0, limit) + '...';
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (typeof imagePath !== 'string') return null;
  if (imagePath.trim() === '') return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};
