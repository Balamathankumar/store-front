import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Customer } from '../types';
import ApiService from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  console.log('CheckoutModal render - isOpen:', isOpen);
  
  const { items, totalAmount, clearCart } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setCustomer(prev => ({
        ...prev,
        address: {
          ...prev.address!,
          [addressField]: value
        }
      }));
    } else {
      setCustomer(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    try {
      const orderData = {
        customerId: customer.id || 1, // Use customer ID or default
        items: items.map(item => ({
          itemId: item.id,
          quantity: item.quantity,
          price: item.product?.retailPrice || 0
        })),
        shippingAddress: {
          name: customer.name,
          address: customer.address?.street || '',
          city: customer.address?.city || '',
          postalCode: customer.address?.zipCode || ''
        }
      };

      const response = await ApiService.createOrder(orderData);
      
      setOrderId(response.orderId);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      alert('Order failed. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  if (orderSuccess) {
    return (
      <div className="cart-modal-overlay" onClick={() => {
        setOrderSuccess(false);
        onClose();
      }}>
        <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2 style={{ color: 'var(--accent-green)', marginBottom: '16px' }}>
              Order Placed Successfully!
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Your order ID is: <strong>{orderId}</strong>
            </p>
            <p style={{ marginBottom: '24px', color: '#666' }}>
              You will receive a confirmation email shortly.
            </p>
            <button 
              className="checkout-btn-enhanced" 
              onClick={() => {
                setOrderSuccess(false);
                onClose();
              }}
              style={{ width: '100%' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="cart-header">
          <div className="cart-header-info">
            <h3 className="cart-title">Checkout</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '16px' }}>Customer Information</h4>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Email *
              </label>
              <input
                type="email"
                required
                value={customer.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Phone *
              </label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '16px' }}>Shipping Address</h4>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                Street Address *
              </label>
              <input
                type="text"
                required
                value={customer.address?.street || ''}
                onChange={(e) => handleInputChange('address.street', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address?.city || ''}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={customer.address?.state || ''}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                ZIP Code *
              </label>
              <input
                type="text"
                required
                value={customer.address?.zipCode || ''}
                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          <div className="cart-total">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Shipping:</span>
              <span style={{ color: totalAmount > 1000 ? 'green' : 'inherit' }}>
                {totalAmount > 1000 ? 'Free' : '₹50'}
              </span>
            </div>
            <hr style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total:</span>
              <span>₹{totalAmount > 1000 ? totalAmount : totalAmount + 50}</span>
            </div>
          </div>

          <button
            type="submit"
            className="checkout-btn-enhanced"
            disabled={isProcessing || items.length === 0}
            style={{
              width: '100%',
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? 'Processing...' : 'Place Order (Cash on Delivery)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
