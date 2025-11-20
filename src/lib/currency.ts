import { Currency } from '@/types/product';

// Exchange rates (base currency: SEK)
// These rates should be updated regularly or fetched from an API
export const EXCHANGE_RATES: Record<Currency, number> = {
  SEK: 1,        // Base currency
  USD: 0.095,   // 1 SEK = 0.095 USD (approximately)
};

/**
 * Convert an amount from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - Source currency
 * @param toCurrency - Target currency
 * @returns Converted amount
 */
export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Convert to SEK first (base currency)
  const amountInSEK = amount / EXCHANGE_RATES[fromCurrency];
  
  // Convert from SEK to target currency
  const convertedAmount = amountInSEK * EXCHANGE_RATES[toCurrency];
  
  // Round to 2 decimal places
  return Math.round(convertedAmount * 100) / 100;
}

/**
 * Format currency with proper locale and symbol
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export function formatCurrencyWithLocale(
  amount: number,
  currency: Currency
): string {
  const localeMap: Record<Currency, string> = {
    SEK: 'sv-SE',
    USD: 'en-US',
  };

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  try {
    return new Intl.NumberFormat(localeMap[currency], options).format(amount);
  } catch (error) {
    // Fallback formatting
    const symbols: Record<Currency, string> = {
      SEK: 'kr',
      USD: '$',
    };
    return `${amount.toLocaleString()} ${symbols[currency]}`;
  }
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    SEK: 'kr',
    USD: '$',
  };
  return symbols[currency];
}

/**
 * Get currency name
 */
export function getCurrencyName(currency: Currency, locale: 'en' | 'ar' | 'sv' = 'en'): string {
  const names: Record<Currency, Record<'en' | 'ar' | 'sv', string>> = {
    SEK: {
      en: 'Swedish Krona',
      ar: 'كرونة سويدية',
      sv: 'Svensk krona',
    },
    USD: {
      en: 'US Dollar',
      ar: 'دولار أمريكي',
      sv: 'Amerikansk dollar',
    },
  };
  return names[currency][locale];
}

