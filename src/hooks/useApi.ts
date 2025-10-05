import { useState, useEffect } from 'react';
import { Customer, Product, SearchResponse } from '../types';
import ApiService, {
  SendVerificationResponse,
  VerifyCodeResponse,
} from '../services/api';

export const useProducts = (
  category?: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS',
  limit?: number
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProducts({ category, limit });
        setProducts(data.items);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit]);

  return { products, loading, error };
};

export const useProductSearch = () => {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (
    query: string,
    category?: 'NUT' | 'DRY FRUIT' | 'SPICE' | 'SEEDS',
    limit?: number,
    offset?: number
  ) => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      const data = await ApiService.searchProducts({
        q: query,
        category,
        limit,
        offset,
      });
      setResults(data);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return { results, loading, error, search, clearResults };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getCategories();
        setCategories(data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
        setCategories(['NUT', 'SPICE', 'DRY FRUIT', 'SEEDS']); // Fallback categories
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useFeaturedProducts = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getFeaturedProducts();
        setFeatured(data.featured);
        setBestsellers(data.bestsellers);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featured, bestsellers, loading, error };
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProduct(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

export const useSendVerification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SendVerificationResponse | null>(null);

  const sendVerification = async (email: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.sendVerification(email, name);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to send verification');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendVerification, data, loading, error };
};

export const useVerifyCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VerifyCodeResponse | null>(null);

  const verifyCode = async (email: string, code: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.verifyCode(email, code);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, data, loading, error };
};

export const useUpdateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Customer | null>(null);

  const updateCustomer = async (customer: Customer) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.updateCustomer(customer);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to update customer');
      throw err;
      console.error('Error updating customer:', err);
    } finally {
      setLoading(false);
    }
  };

  return { updateCustomer, data, loading, error };
};

export const useGetCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCustomers = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getCustomers(email);
      setCustomers(response);
      return response;
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      const message = err.message || 'Failed to fetch customers';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { getCustomers, customers, loading, error };
};
