import React, { ChangeEvent } from 'react';
import { Customer } from '../../../types';

interface ProfilePopupProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  formData,
  loading,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div
      className='popup-overlay'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={() => !loading && onClose()}
    >
      <div
        className='popup-content'
        style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '20px 30px',
          // minWidth: '600px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>
          Edit Profile
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label
                htmlFor={key}
                style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                name={key}
                value={value}
                onChange={onChange}
                placeholder={`Enter ${key}`}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button
            onClick={onSubmit}
            disabled={loading}
            style={{
              padding: '8px 20px',
              background: '#2196f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            {loading ? 'Saving...' : 'Submit'}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '8px 20px',
              background: '#777',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
