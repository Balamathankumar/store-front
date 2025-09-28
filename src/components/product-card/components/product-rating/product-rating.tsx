import React from 'react';

interface ProductRatingProps {
  rating?: number;
  reviews?: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  rating = 4.5,
  reviews = 0,
}) => {
  const renderStars = (ratingValue: number) =>
    '⭐'.repeat(Math.round(ratingValue));

  return (
    <div className='product-rating'>
      <div className='stars'>{renderStars(rating)}</div>
      <div className='rating-text'>
        {rating} ({reviews})
      </div>
    </div>
  );
};

export default ProductRating;
