import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from '@/types/product';
import { formatCurrencyWithLocale, convertCurrency } from './currency';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'SEK'): string {
  // This is a legacy function - use formatCurrencyWithLocale from currency.ts for new code
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price with currency conversion based on user's selected currency
 * @param price - Original price
 * @param productCurrency - Currency of the product
 * @param displayCurrency - Currency to display (from cart store)
 * @returns Formatted price string
 */
export function formatPrice(
  price: number,
  productCurrency: Currency,
  displayCurrency: Currency
): string {
  const convertedPrice = convertCurrency(price, productCurrency, displayCurrency);
  return formatCurrencyWithLocale(convertedPrice, displayCurrency);
}