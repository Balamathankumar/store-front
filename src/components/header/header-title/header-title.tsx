import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCart } from '../../../context/CartContext';
import logoImg from '../../../assets/image/logo-srisai.png';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/auth.service';
import { Customer } from '../../../types';
import { useGetCustomers, useUpdateCustomer } from '../../../hooks/useApi';
import ProfilePopup from './profile-popup';

const HeaderTitle: React.FC = () => {
  const { totalItems, toggleCart } = useCart();
  const navigate = useNavigate();

  const customer = AuthService.getCustomer();
  const getCustomers = useGetCustomers();
  const updateCustomer = useUpdateCustomer();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [getcustomerdata, setGetCustomerData] = useState<Customer | null>(null);

  useEffect(() => {
    if (getcustomerdata) {
      type Address = {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
      let parsedAddress: Address = {};
      try {
        parsedAddress = getcustomerdata.address
          ? JSON.parse(getcustomerdata.address as unknown as string)
          : {};
      } catch (err) {
        console.error('Invalid address JSON:', err);
      }

      setFormData({
        name: getcustomerdata.name || '',
        email: getcustomerdata.email || '',
        phone: getcustomerdata.phone || '',
        street: parsedAddress.street || '',
        city: parsedAddress.city || '',
        state: parsedAddress.state || '',
        postalCode: parsedAddress.zipCode || '',
        country: parsedAddress.country || '',
      });
    }
  }, [getcustomerdata]);

  const handleLogout = () => {
    AuthService.clearSession();
    setMenuOpen(false);
    navigate('/');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenProfile = async () => {
    try {
      if (!customer?.email) {
        alert('No email found for this user');
        return;
      }

      setLoading(true);
      const data = await getCustomers.getCustomers(customer.email);
      setGetCustomerData((data as unknown as Customer) || null);
      setShowProfilePopup(true);
    } catch (err) {
      console.error('Error fetching customer details:', err);
      alert('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!getcustomerdata) return;

      const updatedCustomer: Customer = {
        ...getcustomerdata,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.postalCode,
          country: formData.country,
        },
      };

      await updateCustomer.updateCustomer(updatedCustomer);
      setShowProfilePopup(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update error:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <header className='header'>
      <div className='header-top'>
        <div className='logo'>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
            aria-label='Go to home'
          >
            <img
              src={logoImg}
              alt='Store Logo'
              width={290}
              height={90}
              style={{ borderRadius: '8px' }}
            />
          </button>
        </div>

        <div className='header-icons'>
          <button className='icon' onClick={toggleCart}>
            🛒
            {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
          </button>

          {!AuthService.isLoggedIn() ? (
            <button className='icon' onClick={() => navigate('/login')}>
              👤
            </button>
          ) : (
            <div className='profile-wrapper' style={{ position: 'relative' }}>
              <button
                className='icon'
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                👤
              </button>

              {menuOpen && (
                <div
                  className='profile-dropdown'
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    padding: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    minWidth: '180px',
                    zIndex: 1000,
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {customer?.name}
                  </p>
                  <p style={{ margin: '4px 0 8px', fontSize: '14px' }}>
                    {customer?.email}
                  </p>

                  <button
                    onClick={handleOpenProfile}
                    style={{
                      width: '100%',
                      padding: '6px',
                      background: '#2196f3',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginBottom: '6px',
                    }}
                  >
                    {loading ? 'Loading...' : 'Profile Details'}
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '6px',
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showProfilePopup && (
        <ProfilePopup
          formData={formData}
          loading={loading}
          onChange={handleChange}
          onClose={() => setShowProfilePopup(false)}
          onSubmit={handleSubmit}
        />
      )}
    </header>
  );
};

export default HeaderTitle;
