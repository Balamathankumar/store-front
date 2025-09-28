import React from 'react';
import { Product } from '../../../../types';
import SecondaryActions from './secondary-actions';
import TrustIndicators from './trust-indicators';
import ProductInfoTabs from './product-info-tabs';
import DeliveryInfo from './delivery-info';

interface Props {
  product: Product;
}

const ProductDetailPage: React.FC<Props> = ({ product }) => (
  <div className='product-detail-page'>
    <SecondaryActions />
    <TrustIndicators />
    <ProductInfoTabs product={product} />
    <DeliveryInfo />
  </div>
);

export default ProductDetailPage;
