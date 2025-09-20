/**
 * Utility functions for handling product images
 */

const API_BASE_URL = 'https://api.srisainutsandspices.com';

/**
 * Get the image URL for a product using the uploads path
 * @param productId - The product ID
 * @param imageIndex - The index of the image (default: 0 for main image)
 * @param imageFilename - The specific image filename (optional)
 * @returns The full image URL
 */
export const getProductImageUrl = (productId: number, imageIndex: number = 0, imageFilename?: string): string => {
  if (imageFilename) {
    return `${API_BASE_URL}/uploads/items/${imageFilename}`;
  }
  // Fallback to API endpoint if filename not provided
  return `${API_BASE_URL}/api/storefront/items/${productId}/images${imageIndex > 0 ? `?index=${imageIndex}` : ''}`;
};

/**
 * Get the direct upload image URL for a product with filename
 * @param imageFilename - The specific image filename (e.g., "88_1758334557504.jpg")
 * @returns The full image URL
 */
export const getUploadImageUrl = (imageFilename: string): string => {
  return `${API_BASE_URL}/uploads/items/${imageFilename}`;
};

/**
 * Get all image URLs for a product
 * @param productId - The product ID
 * @param count - Number of images to get (default: 3)
 * @param imageFilenames - Optional array of specific image filenames
 * @returns Array of image URLs
 */
export const getProductImageUrls = (productId: number, count: number = 3, imageFilenames?: string[]): string[] => {
  if (imageFilenames && imageFilenames.length > 0) {
    return imageFilenames.map(filename => getUploadImageUrl(filename));
  }
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
