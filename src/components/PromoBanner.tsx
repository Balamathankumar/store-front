import React from 'react';

interface PromoBannerProps {
  type?: 'top' | 'inline';
  message: string;
  ctaText?: string;
  onCtaClick?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ 
  type = 'inline', 
  message, 
  ctaText, 
  onCtaClick, 
  dismissible = false, 
  onDismiss 
}) => {
  return (
    <div className={`promo-banner promo-banner-${type}`}>
      <div className="promo-banner-container">
        <div className="promo-banner-content">
          <span className="promo-banner-message">{message}</span>
          {ctaText && onCtaClick && (
            <button className="promo-banner-cta" onClick={onCtaClick}>
              {ctaText}
            </button>
          )}
        </div>
        {dismissible && onDismiss && (
          <button className="promo-banner-dismiss" onClick={onDismiss}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
