import { Whatsapp } from 'iconsax-reactjs';
import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget: React.FC = () => {
  const handleClick = () => {
    window.open('https://wa.me/7904774212', '_blank'); // your link
  };

  return (
    <button onClick={handleClick} className='whatsapp-widget'>
      <Whatsapp size={28} />
    </button>
  );
};

export default WhatsAppWidget;
