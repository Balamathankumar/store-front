import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Customer, WeightOption } from '../types';
import ApiService from '../services/api';
import HeaderTitle from './header/header-title/header-title';
import Breadcrumb from './Breadcrumb';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    totalAmount,
    clearCart,
    getItemPrice,
    updateQuantity,
    removeFromCart,
    changeWeight,
  } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [items.length, navigate, orderSuccess]);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setCustomer((prev) => ({
        ...prev,
        address: {
          ...prev.address!,
          [addressField]: value,
        },
      }));
    } else {
      setCustomer((prev) => ({
        ...prev,
        [field]: value,
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
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearch = (query: string) => {
    // For checkout page, we can redirect to home with search
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuantityChange = (
    productId: number,
    weight: WeightOption,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, weight);
    } else {
      updateQuantity(productId, weight, newQuantity);
    }
  };

  const handleWeightChange = (
    productId: number,
    oldWeight: WeightOption,
    newWeight: WeightOption
  ) => {
    changeWeight(productId, oldWeight, newWeight);
  };

  const handleRemoveItem = (productId: number, weight: WeightOption) => {
    removeFromCart(productId, weight);
  };

  const getAvailableWeights = (): WeightOption[] => {
    return [50, 100, 200, 250, 500];
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = totalAmount > 1000 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;

  const breadcrumbItems = [{ label: 'Home', path: '/' }, { label: 'Checkout' }];

  // Show empty cart message if no items
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className='checkout-page'>
        <HeaderTitle />

        <div className='checkout-container'>
          <Breadcrumb items={breadcrumbItems} />

          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'var(--warm-beige-100)',
              borderRadius: '12px',
              margin: '20px 0',
            }}
          >
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>🛒</div>
            <h1 style={{ marginBottom: '16px', fontSize: '28px' }}>
              Your cart is empty
            </h1>
            <p
              style={{ marginBottom: '32px', color: '#666', fontSize: '16px' }}
            >
              Add some delicious spices to get started with your order!
            </p>
            <button
              className='cta-btn'
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
              }}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className='checkout-page'>
        <HeaderTitle />

        <div className='checkout-container'>
          <Breadcrumb items={breadcrumbItems} />

          <div
            className='order-success'
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'var(--warm-beige-100)',
              borderRadius: '12px',
              margin: '20px 0',
            }}
          >
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>✅</div>
            <h1
              style={{
                color: 'var(--accent-green)',
                marginBottom: '16px',
                fontSize: '28px',
              }}
            >
              Order Placed Successfully!
            </h1>
            <p style={{ marginBottom: '16px', fontSize: '18px' }}>
              Your order ID is: <strong>{orderId}</strong>
            </p>
            <p
              style={{ marginBottom: '32px', color: '#666', fontSize: '16px' }}
            >
              You will receive a confirmation email shortly. We'll start
              preparing your order right away!
            </p>

            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '24px',
                textAlign: 'left',
              }}
            >
              <h3 style={{ marginBottom: '16px' }}>What's Next?</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '20px' }}>📧</span>
                  <span>Confirmation email sent to {customer.email}</span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '20px' }}>📦</span>
                  <span>Order processing begins within 2 hours</span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '20px' }}>🚚</span>
                  <span>Delivery in 2-3 business days</span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span style={{ fontSize: '20px' }}>💰</span>
                  <span>Pay ₹{finalTotal} on delivery</span>
                </div>
              </div>
            </div>

            <button
              className='cta-btn'
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='checkout-page'>
      <HeaderTitle />

      <div className='checkout-container'>
        <Breadcrumb items={breadcrumbItems} />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--brand-brown)',
            marginBottom: '24px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ← Back to Cart
        </button>

        <div className='checkout-content'>
          {/* Checkout Form */}
          <div className='checkout-form'>
            <h1
              style={{
                fontSize: '32px',
                marginBottom: '24px',
                color: 'var(--text-dark)',
              }}
            >
              Checkout
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <div
                className='form-section'
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid #eee',
                }}
              >
                <h3
                  style={{
                    marginBottom: '20px',
                    fontSize: '20px',
                    color: 'var(--text-dark)',
                  }}
                >
                  Customer Information
                </h3>

                <div
                  className='form-grid'
                  style={{ display: 'grid', gap: '16px' }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontWeight: '600',
                        color: 'var(--text-dark)',
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type='text'
                      required
                      value={customer.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                      placeholder='Enter your full name'
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type='email'
                        required
                        value={customer.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                        }}
                        placeholder='your@email.com'
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        Phone *
                      </label>
                      <input
                        type='tel'
                        required
                        value={customer.phone}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                        }}
                        placeholder='+91 98765 43210'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div
                className='form-section'
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  border: '1px solid #eee',
                }}
              >
                <h3
                  style={{
                    marginBottom: '20px',
                    fontSize: '20px',
                    color: 'var(--text-dark)',
                  }}
                >
                  Shipping Address
                </h3>

                <div
                  className='form-grid'
                  style={{ display: 'grid', gap: '16px' }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontWeight: '600',
                        color: 'var(--text-dark)',
                      }}
                    >
                      Street Address *
                    </label>
                    <input
                      type='text'
                      required
                      value={customer.address?.street || ''}
                      onChange={(e) =>
                        handleInputChange('address.street', e.target.value)
                      }
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                      placeholder='House/Flat No., Street Name'
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        City *
                      </label>
                      <input
                        type='text'
                        required
                        value={customer.address?.city || ''}
                        onChange={(e) =>
                          handleInputChange('address.city', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                        }}
                        placeholder='City'
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        State *
                      </label>
                      <input
                        type='text'
                        required
                        value={customer.address?.state || ''}
                        onChange={(e) =>
                          handleInputChange('address.state', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                        }}
                        placeholder='State'
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        ZIP Code *
                      </label>
                      <input
                        type='text'
                        required
                        value={customer.address?.zipCode || ''}
                        onChange={(e) =>
                          handleInputChange('address.zipCode', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                        }}
                        placeholder='400001'
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontWeight: '600',
                          color: 'var(--text-dark)',
                        }}
                      >
                        Country
                      </label>
                      <input
                        type='text'
                        value={customer.address?.country || 'India'}
                        onChange={(e) =>
                          handleInputChange('address.country', e.target.value)
                        }
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px',
                          background: '#f9f9f9',
                        }}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div
                className='form-section'
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  marginBottom: '32px',
                  border: '1px solid #eee',
                }}
              >
                <h3
                  style={{
                    marginBottom: '20px',
                    fontSize: '20px',
                    color: 'var(--text-dark)',
                  }}
                >
                  Payment Method
                </h3>

                <div
                  style={{
                    background: 'var(--warm-beige-100)',
                    padding: '16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>💰</span>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Cash on Delivery</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                </div>
              </div>

              <button
                type='submit'
                disabled={isProcessing || items.length === 0}
                style={{
                  width: '100%',
                  background: isProcessing ? '#ccc' : 'var(--brand-brown)',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                {isProcessing
                  ? 'Processing...'
                  : `Place Order - ₹${finalTotal}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className='order-summary'>
            <div
              style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #eee',
                position: 'sticky',
                top: '20px',
              }}
            >
              <h3
                style={{
                  marginBottom: '20px',
                  fontSize: '20px',
                  color: 'var(--text-dark)',
                }}
              >
                Order Summary ({totalItems} items)
              </h3>

              {/* Cart Items */}
              <div style={{ marginBottom: '20px' }}>
                {items.map((item) => {
                  if (!item.product) return null;

                  const itemPrice = getItemPrice(
                    item.product,
                    item.weight as WeightOption
                  );
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={`${item.id}-${item.weight}`}
                      className='cart-item-edit'
                      style={{
                        background: 'var(--warm-beige-100)',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '32px',
                            minWidth: '48px',
                          }}
                        >
                          {item.product.emoji || '🏷️'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontSize: '16px',
                              marginBottom: '4px',
                              fontWeight: 'bold',
                            }}
                          >
                            {item.product.name}
                          </h4>
                          <p
                            style={{
                              fontSize: '14px',
                              color: '#666',
                              marginBottom: '8px',
                            }}
                          >
                            ₹{itemPrice} per {item.weight}g
                          </p>
                          <p
                            style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              color: 'var(--brand-brown)',
                            }}
                          >
                            Total: ₹{itemTotal}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveItem(
                              item.id,
                              item.weight as WeightOption
                            )
                          }
                          className='remove-item-btn'
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#999',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '4px',
                            borderRadius: '4px',
                            minWidth: '32px',
                            height: '32px',
                          }}
                          title='Remove item'
                        >
                          ×
                        </button>
                      </div>

                      {/* Weight and Quantity Controls */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                          alignItems: 'end',
                        }}
                      >
                        {/* Only show weight selector for non-combo products */}
                        {!item.product.isCombo && (
                          <div>
                            <label
                              style={{
                                display: 'block',
                                fontSize: '12px',
                                color: '#666',
                                marginBottom: '4px',
                                fontWeight: '600',
                              }}
                            >
                              Weight
                            </label>
                            <select
                              value={item.weight}
                              onChange={(e) =>
                                handleWeightChange(
                                  item.id,
                                  item.weight as WeightOption,
                                  parseInt(e.target.value) as WeightOption
                                )
                              }
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '14px',
                                background: 'white',
                              }}
                            >
                              {getAvailableWeights().map((weight) => (
                                <option key={weight} value={weight}>
                                  {weight}g - ₹
                                  {getItemPrice(item.product!, weight)}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Show combo info for combo products */}
                        {item.product.isCombo && (
                          <div
                            style={{
                              padding: '8px',
                              background: 'rgba(139, 69, 19, 0.1)',
                              borderRadius: '6px',
                              border: '1px solid rgba(139, 69, 19, 0.2)',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  color: 'var(--brand-brown)',
                                  background: 'rgba(139, 69, 19, 0.15)',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                }}
                              >
                                COMBO
                              </span>
                              <span
                                style={{
                                  fontSize: '12px',
                                  color: '#666',
                                  fontWeight: '600',
                                }}
                              >
                                Total:{' '}
                                {item.product.items?.reduce(
                                  (sum, comboItem) =>
                                    sum + comboItem.quantityInGrams,
                                  0
                                ) || 0}
                                g
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: '11px',
                                color: '#666',
                              }}
                            >
                              Fixed combo with {item.product.items?.length || 0}{' '}
                              items
                            </div>
                          </div>
                        )}

                        <div>
                          <label
                            style={{
                              display: 'block',
                              fontSize: '12px',
                              color: '#666',
                              marginBottom: '4px',
                              fontWeight: '600',
                            }}
                          >
                            Quantity
                          </label>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid #ddd',
                              borderRadius: '6px',
                              background: 'white',
                            }}
                          >
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.weight as WeightOption,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className='quantity-btn'
                              style={{
                                width: '32px',
                                height: '32px',
                                border: 'none',
                                background: 'none',
                                cursor:
                                  item.quantity <= 1
                                    ? 'not-allowed'
                                    : 'pointer',
                                fontSize: '16px',
                                color: item.quantity <= 1 ? '#ccc' : '#666',
                              }}
                            >
                              −
                            </button>

                            <span
                              style={{
                                minWidth: '40px',
                                textAlign: 'center',
                                fontSize: '14px',
                                fontWeight: 'bold',
                              }}
                            >
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.weight as WeightOption,
                                  item.quantity + 1
                                )
                              }
                              className='quantity-btn'
                              style={{
                                width: '32px',
                                height: '32px',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: '#666',
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Continue Shopping Link */}
                <button
                  onClick={() => navigate('/')}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: '1px solid var(--brand-brown)',
                    color: 'var(--brand-brown)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginBottom: '16px',
                  }}
                >
                  + Add More Items
                </button>
              </div>

              {/* Totals */}
              <div
                style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span>Shipping</span>
                  <span
                    style={{
                      color:
                        shippingCost === 0 ? 'var(--accent-green)' : 'inherit',
                    }}
                  >
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                {totalAmount <= 1000 && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--accent-orange)',
                      marginBottom: '12px',
                      textAlign: 'center',
                    }}
                  >
                    Add ₹{1000 - totalAmount} more for free shipping!
                  </div>
                )}
                <hr style={{ margin: '12px 0' }} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: 'var(--text-dark)',
                  }}
                >
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '16px',
                  background: 'var(--warm-beige-100)',
                  borderRadius: '8px',
                }}
              >
                <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>
                  Delivery Information
                </h4>
                <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>⏰</span>
                    <span>2-3 business days</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>💰</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>↩️</span>
                    <span>7-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
