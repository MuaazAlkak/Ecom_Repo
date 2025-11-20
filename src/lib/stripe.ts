import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey)
  : null;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ShippingInfo {
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutItem {
  product: {
    id: string;
    title: { en: string; ar?: string; sv?: string };
    price: number;
    currency: string;
    images: string[];
    discount_percentage?: number;
  };
  quantity: number;
  activeEvent?: {
    id?: string;
    discount_percentage?: number;
  };
}

export const createCheckoutSession = async (data: {
  items: CheckoutItem[];
  shippingInfo: ShippingInfo;
  currency: string;
  discountCode?: string;
  discountAmount?: number;
  subtotal: number;
  shipping: number;
  total: number;
}) => {
  const response = await fetch(`${API_URL}/api/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return response.json();
};

export const retrieveCheckoutSession = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/api/checkout/retrieve-session?session_id=${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to retrieve checkout session');
  }

  return response.json();
};

export const createOrderFromSession = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/api/checkout/create-order-from-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create order');
  }

  return response.json();
};

export const sendConfirmationEmail = async (sessionId?: string, orderId?: string) => {
  const response = await fetch(`${API_URL}/api/checkout/send-confirmation-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, orderId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send confirmation email');
  }

  return response.json();
};
