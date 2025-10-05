import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Customer, CartItem, WeightOption } from '../../types';
import HeaderTitle from '../header/header-title/header-title';
import Breadcrumb from '../Breadcrumb';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import ApiService from '../../services/api';
import { AuthService } from '../../services/auth.service';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { customerData?: Customer } | undefined;

  const {
    items,
    totalAmount,
    clearCart,
    getItemPrice,
    updateQuantity,
    removeFromCart,
    changeWeight,
  } = useCart();

  const customers = AuthService.getCustomer();

  const [customer, setCustomer] = useState<Customer>({
    name: state?.customerData?.name || customers?.name || '',
    email: state?.customerData?.email || customers?.email || '',
    phone: state?.customerData?.phone || customers?.phone || '',
    address: {
      street:
        state?.customerData?.address?.street ||
        customers?.address?.street ||
        '',
      city:
        state?.customerData?.address?.city || customers?.address?.city || '',
      state:
        state?.customerData?.address?.state || customers?.address?.state || '',
      zipCode:
        state?.customerData?.address?.zipCode ||
        customers?.address?.zipCode ||
        '',
      country:
        state?.customerData?.address?.country ||
        customers?.address?.country ||
        'India',
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      const timer = setTimeout(() => navigate('/'), 100);
      return () => clearTimeout(timer);
    }
  }, [items.length, navigate, orderSuccess]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = totalAmount > 1000 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;
  const breadcrumbItems = [{ label: 'Home', path: '/' }, { label: 'Checkout' }];

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className='checkout-page'>
        <HeaderTitle />
        <div className='checkout-page__container'>
          <Breadcrumb items={breadcrumbItems} />
          <div className='checkout-page__empty'>
            <div className='checkout-page__empty-icon'>🛒</div>
            <h1 className='checkout-page__empty-title'>Your cart is empty</h1>
            <p className='checkout-page__empty-text'>
              Add some delicious spices to get started with your order!
            </p>
            <button
              className='checkout-page__cta-btn'
              onClick={() => navigate('/')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='checkout-page'>
      <HeaderTitle />
      <div className='checkout-page__container'>
        <Breadcrumb items={breadcrumbItems} />
        {orderSuccess ? (
          <div className='checkout-page__success'>
            <div className='checkout-page__success-message'>
              <div className='checkout-page__success-icon'>✅</div>
              <h1 className='checkout-page__success-title'>
                Order Placed Successfully!
              </h1>
              <p className='checkout-page__success-text'>
                Your order ID is: <strong>{orderId}</strong>
              </p>
              <p className='checkout-page__success-text'>
                You will receive a confirmation email shortly. We'll start
                preparing your order right away!
              </p>
              <button
                className='checkout-page__cta-btn'
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className='checkout-page__content'>
            <CheckoutForm
              customer={customer}
              setCustomer={setCustomer}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              items={items}
              clearCart={clearCart}
              setOrderId={setOrderId}
              setOrderSuccess={setOrderSuccess}
            />
            <OrderSummary
              items={items}
              getItemPrice={getItemPrice}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              changeWeight={changeWeight}
              totalAmount={totalAmount}
              shippingCost={shippingCost}
              finalTotal={finalTotal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
