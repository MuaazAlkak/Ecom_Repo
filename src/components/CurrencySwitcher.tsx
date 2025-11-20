import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DollarSign } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Currency } from '@/types/product';
import { getCurrencySymbol, getCurrencyName } from '@/lib/currency';
import { useTranslation } from 'react-i18next';

interface CurrencyOption {
  code: Currency;
  symbol: string;
  name: Record<'en' | 'ar' | 'sv', string>;
  flag: string;
}

const currencies: CurrencyOption[] = [
  { 
    code: 'SEK', 
    symbol: 'kr',
    name: { en: 'Swedish Krona', ar: 'كرونة سويدية', sv: 'Svensk krona' },
    flag: '🇸🇪' 
  },
  { 
    code: 'USD', 
    symbol: '$',
    name: { en: 'US Dollar', ar: 'دولار أمريكي', sv: 'Amerikansk dollar' },
    flag: '🇺🇸' 
  },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCartStore();
  const { i18n } = useTranslation();
  const currentLanguage = (i18n.language as 'en' | 'ar' | 'sv') || 'en';

  const handleCurrencyChange = (currencyCode: Currency) => {
    setCurrency(currencyCode);
    // Store preference
    localStorage.setItem('preferred-currency', currencyCode);
  };

  const currentCurrency = currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentCurrency.symbol} {currentCurrency.code}
          </span>
          <span className="sm:hidden">{currentCurrency.symbol}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="mt-2">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => handleCurrencyChange(curr.code)}
            className={currency === curr.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{curr.flag}</span>
            <span className="mr-2 font-semibold">{curr.symbol}</span>
            <span>{curr.name[currentLanguage]}</span>
            {currency === curr.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CurrencySwitcher;

