import React from 'react';
import Breadcrumb from '../../../Breadcrumb';
import { Product } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  combo: Product;
  navigate: ReturnType<typeof useNavigate>;
}

const ComboHeader: React.FC<Props> = ({ combo, navigate }) => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Combos', path: '/?filter=combos' },
    { label: combo.name },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--brand-brown)',
          marginBottom: '20px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        ← Back
      </button>
    </>
  );
};

export default ComboHeader;
