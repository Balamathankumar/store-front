/**
 * Utility functions for handling product images
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

/**
 * Get the image URL for a product
 * @param productId - The product ID
 * @param imageIndex - The index of the image (default: 0 for main image)
 * @returns The full image URL
 */
export const getProductImageUrl = (productId: number, imageIndex: number = 0): string => {
  return `${API_BASE_URL}/api/storefront/items/${productId}/images?index=${imageIndex}`;
};

/**
 * Get all image URLs for a product
 * @param productId - The product ID
 * @param count - Number of images to get (default: 3)
 * @returns Array of image URLs
 */
export const getProductImageUrls = (productId: number, count: number = 3): string[] => {
  return Array.from({ length: count }, (_, index) => 
    getProductImageUrl(productId, index)
  );
};

/**
 * Fallback emoji for product category if image fails to load
 * @param category - Product category
 * @returns Emoji string
 */
export const getCategoryEmoji = (category: string): string => {
  switch (category) {
    case 'NUT': return '🥜';
    case 'SPICE': return '🌶️';
    case 'DRY FRUIT': return '🍇';
    case 'SEEDS': return '🌱';
    default: return '🏷️';
  }
};

/**
 * Get fallback image data URL with emoji
 * @param emoji - Emoji to display
 * @returns Data URL for image
 */
export const getEmojiImageDataUrl = (emoji: string): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  canvas.width = 200;
  canvas.height = 200;
  
  // Set background
  ctx.fillStyle = '#F3E8DE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw emoji
  ctx.font = '80px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  
  return canvas.toDataURL();
};
