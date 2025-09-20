import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { WeightOption } from '../types';

const CartModal: React.FC = () => {
  const navigate = useNavigate();
  const { 
    items, 
    isOpen, 
    totalAmount, 
    toggleCart, 
    updateQuantity, 
    removeFromCart,
    changeWeight,
    getItemPrice
  } = useCart();

  const handleQuantityChange = (productId: number, weight: WeightOption, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, weight);
    } else {
      updateQuantity(productId, weight, newQuantity);
    }
  };

  const handleWeightChange = (productId: number, oldWeight: WeightOption, newWeight: WeightOption, quantity: number) => {
    // Use the new changeWeight function to preserve order
    changeWeight(productId, oldWeight, newWeight);
  };

  const getAvailableWeights = (): WeightOption[] => {
    return [50, 100, 200, 250, 500];
  };

  const proceedToCheckout = () => {
    console.log('Proceed to checkout clicked');
    console.log('Items in cart:', items);
    
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Close cart modal and navigate to checkout page
    toggleCart();
    navigate('/checkout');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const finalTotal = totalAmount > 1000 ? totalAmount : totalAmount + 50;

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-modal-overlay" onClick={toggleCart}>
        <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
          {/* Cart Header */}
          <div className="cart-header">
            <div className="cart-header-info">
              <h3 className="cart-title">Shopping Cart</h3>
              <span className="cart-item-count">{totalItems} items</span>
            </div>
            <button className="cart-close-btn" onClick={toggleCart}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="cart-items-container">
            {items.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <h4>Your cart is empty</h4>
                <p>Add some delicious spices to get started!</p>
                <button className="continue-shopping-btn" onClick={toggleCart}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="cart-items-list">
                {items.map((item) => {
                  if (!item.product) return null;
                  
                  const itemPrice = getItemPrice(item.product, item.weight as WeightOption);
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <div key={`${item.id}-${item.weight}`} className="cart-item-enhanced">
                      <div className="cart-item-image-enhanced">
                        {item.product.emoji || '🏷️'}
                      </div>
                      
                      <div className="cart-item-details">
                        <div className="cart-item-info-enhanced">
                          <h4 className="cart-item-name-enhanced">{item.product.name}</h4>
                          
                          {/* Only show weight selector for non-combo products */}
                          {!item.product.isCombo && (
                            <div className="weight-selector-container">
                              <label className="weight-label">Weight:</label>
                              <select 
                                value={item.weight} 
                                onChange={(e) => handleWeightChange(
                                  item.id, 
                                  item.weight as WeightOption, 
                                  parseInt(e.target.value) as WeightOption, 
                                  item.quantity
                                )}
                                className="weight-selector"
                              >
                                {getAvailableWeights().map(weight => (
                                  <option key={weight} value={weight}>
                                    {weight}g
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                          
                          {/* Show combo info for combo products */}
                          {item.product.isCombo && (
                            <div className="combo-info-cart">
                              <span className="combo-badge-cart">COMBO</span>
                              <span className="combo-total-weight">
                                Total: {item.product.items?.reduce((sum, comboItem) => sum + comboItem.quantityInGrams, 0) || 0}g
                              </span>
                            </div>
                          )}
                          
                          <div className="cart-item-price-enhanced">
                            <span className="price-per-unit">₹{itemPrice} each</span>
                            <span className="price-total">₹{itemTotal}</span>
                          </div>
                        </div>
                        
                        <div className="cart-item-actions">
                          <div className="quantity-controls-enhanced">
                            <button 
                              className="qty-btn-enhanced minus" 
                              onClick={() => handleQuantityChange(item.id, item.weight as WeightOption, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                            
                            <span className="qty-display">{item.quantity}</span>
                            
                            <button 
                              className="qty-btn-enhanced plus" 
                              onClick={() => handleQuantityChange(item.id, item.weight as WeightOption, item.quantity + 1)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                          </div>
                          
                          <button 
                            className="remove-btn-enhanced" 
                            onClick={() => removeFromCart(item.id, item.weight as WeightOption)}
                            title="Remove item"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3,6 5,6 21,6"></polyline>
                              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={totalAmount > 1000 ? 'free-shipping' : ''}>
                    {totalAmount > 1000 ? 'Free' : '₹50'}
                  </span>
                </div>
                {totalAmount <= 1000 && (
                  <div className="shipping-notice">
                    Add ₹{1000 - totalAmount} more for free shipping!
                  </div>
                )}
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
              
              <button className="checkout-btn-enhanced" onClick={proceedToCheckout}>
                <span>Proceed to Checkout</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
