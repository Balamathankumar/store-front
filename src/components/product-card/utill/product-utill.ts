export const getCategoryEmoji = (category: string): string => {
  switch (category) {
    case 'NUT':
      return '🥜';
    case 'SPICE':
      return '🌶️';
    case 'DRY FRUIT':
      return '🍇';
    case 'SEEDS':
      return '🌱';
    default:
      return '🏷️';
  }
};

const API_BASE_URL = 'https://api.srisainutsandspices.com';

export const getProductImageUrl = (
  productId: number,
  imageIndex: number = 0,
  imageFilename?: string
): string => {
  if (imageFilename) {
    return `${API_BASE_URL}/uploads/items/${imageFilename}`;
  }
  // Fallback to API endpoint if filename not provided
  return `${API_BASE_URL}/api/storefront/items/${productId}/images${
    imageIndex > 0 ? `?index=${imageIndex}` : ''
  }`;
};
