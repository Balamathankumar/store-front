import React from 'react';

interface HeroSectionProps {
  isHidden: boolean;
  onShopNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isHidden, onShopNow }) => {
  if (isHidden) return null;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Premium Nuts & Spices</h1>
        <p>Fresh, authentic flavors delivered to your doorstep</p>
        <button className="cta-btn" onClick={onShopNow}>Shop Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
