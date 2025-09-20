import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav 
      style={{ 
        padding: '12px 0', 
        fontSize: '14px',
        color: '#666'
      }}
      aria-label="Breadcrumb"
    >
      <ol style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        listStyle: 'none',
        margin: 0,
        padding: 0
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {index > 0 && (
              <span style={{ color: '#ccc' }}>›</span>
            )}
            {item.path ? (
              <Link 
                to={item.path}
                style={{ 
                  color: 'var(--brand-brown)', 
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: '#333', fontWeight: '500' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
