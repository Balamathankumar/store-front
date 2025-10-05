import React from 'react';
import { Customer, CartItem, WeightOption } from '../../types';
import ApiService from '../../services/api';

interface CheckoutFormProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  items: CartItem[];
  clearCart: () => void;
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
  setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  customer,
  setCustomer,
  isProcessing,
  setIsProcessing,
  items,
  clearCart,
  setOrderId,
  setOrderSuccess,
}) => {
  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setCustomer((prev) => ({
        ...prev,
        address: { ...prev.address!, [addressField]: value },
      }));
    } else {
      setCustomer((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    try {
      const orderData = {
        customerId: customer.id || 1,
        items: items.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
          price: item.product?.retailPrice || 0,
        })),
        shippingAddress: {
          name: customer.name,
          address: customer.address?.street || '',
          city: customer.address?.city || '',
          postalCode: customer.address?.zipCode || '',
        },
      };
      const response = await ApiService.createOrder(orderData);
      setOrderId(response.orderId);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      alert('Order failed. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='checkout-form'>
      <h1 className='checkout-form__title'>Checkout</h1>
      <form onSubmit={handleSubmit} className='checkout-form__form'>
        <div className='checkout-form__section'>
          <label className='checkout-form__label'>Name</label>
          <input
            className='checkout-form__input'
            type='text'
            value={customer.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>Email</label>
          <input
            className='checkout-form__input'
            type='email'
            value={customer.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>Phone</label>
          <input
            className='checkout-form__input'
            type='tel'
            value={customer.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>Street</label>
          <input
            className='checkout-form__input'
            type='text'
            value={customer.address?.street}
            onChange={(e) =>
              handleInputChange('address.street', e.target.value)
            }
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>City</label>
          <input
            className='checkout-form__input'
            type='text'
            value={customer.address?.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>State</label>
          <input
            className='checkout-form__input'
            type='text'
            value={customer.address?.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            required
          />
        </div>

        <div className='checkout-form__section'>
          <label className='checkout-form__label'>Zip Code</label>
          <input
            className='checkout-form__input'
            type='text'
            value={customer.address?.zipCode}
            onChange={(e) =>
              handleInputChange('address.zipCode', e.target.value)
            }
            required
          />
        </div>

        <div className='checkout-form__section checkout-form__payment'>
          <h3 className='checkout-form__payment-title'>Payment Method</h3>
          <div className='checkout-form__payment-option'>
            <span className='checkout-form__payment-icon'>💰</span>
            <div>
              <h4 className='checkout-form__payment-name'>Cash on Delivery</h4>
              <p className='checkout-form__payment-desc'>
                Pay when your order arrives at your doorstep
              </p>
            </div>
          </div>
        </div>

        <button
          type='submit'
          disabled={isProcessing || items.length === 0}
          className='checkout-form__cta-btn'
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
