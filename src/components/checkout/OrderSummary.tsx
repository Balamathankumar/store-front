import React from 'react';
import { CartItem, WeightOption } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  getItemPrice: (product: any, weight: WeightOption) => number;
  updateQuantity: (id: number, weight: WeightOption, quantity: number) => void;
  removeFromCart: (id: number, weight: WeightOption) => void;
  changeWeight: (
    id: number,
    oldWeight: WeightOption,
    newWeight: WeightOption
  ) => void;
  totalAmount: number;
  shippingCost: number;
  finalTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  getItemPrice,
  updateQuantity,
  removeFromCart,
  changeWeight,
  totalAmount,
  shippingCost,
  finalTotal,
}) => {
  const handleQuantityChange = (
    id: number,
    weight: WeightOption,
    newQty: number
  ) => {
    if (newQty <= 0) removeFromCart(id, weight);
    else updateQuantity(id, weight, newQty);
  };

  const handleWeightChange = (
    id: number,
    oldWeight: WeightOption,
    newWeight: WeightOption
  ) => {
    changeWeight(id, oldWeight, newWeight);
  };

  return (
    <div className='order-summary'>
      <h3 className='order-summary__title'>
        Order Summary ({items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
        items)
      </h3>
      {items.map((item) => (
        <div className='order-summary__item' key={`${item.id}-${item.weight}`}>
          <div className='order-summary__item-top'>
            <span className='order-summary__item-name'>
              {item.product?.name}
            </span>
            <span className='order-summary__item-price'>
              ₹
              {getItemPrice(item.product, item.weight as WeightOption) *
                item.quantity}
            </span>
          </div>
          <div className='order-summary__item-bottom'>
            <select
              className='order-summary__item-weight'
              value={item.weight}
              onChange={(e) =>
                handleWeightChange(
                  item.id,
                  item.weight as WeightOption,
                  parseInt(e.target.value) as WeightOption
                )
              }
            >
              {[50, 100, 200, 250, 500].map((w) => (
                <option key={w} value={w}>
                  {w}g - ₹{getItemPrice(item.product!, w as WeightOption)}
                </option>
              ))}
            </select>
            <button
              className='order-summary__btn'
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.weight as WeightOption,
                  item.quantity - 1
                )
              }
            >
              -
            </button>
            <span className='order-summary__qty'>{item.quantity}</span>
            <button
              className='order-summary__btn'
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.weight as WeightOption,
                  item.quantity + 1
                )
              }
            >
              +
            </button>
            <button
              className='order-summary__remove'
              onClick={() =>
                removeFromCart(item.id, item.weight as WeightOption)
              }
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <div className='order-summary__totals'>
        <div className='order-summary__subtotal'>Subtotal: ₹{totalAmount}</div>
        <div className='order-summary__shipping'>
          Shipping: {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
        </div>
        <div className='order-summary__total'>Total: ₹{finalTotal}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
