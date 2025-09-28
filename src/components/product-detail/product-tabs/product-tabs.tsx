import React from 'react';
import { Product } from '../../../types';
import ProductDetails from './info/product-detailPage';

interface Props {
  product: Product;
}

const ProductTabs: React.FC<Props> = ({ product }) => (
  <>
    <ProductDetails product={product} />
  </>
);

export default ProductTabs;
