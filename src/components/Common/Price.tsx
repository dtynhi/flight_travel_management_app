import Label, { ILabelProps } from '../Label/Label';

interface IPriceProps extends ILabelProps {
  price?: string | number;
  currency?: string;
  showCurrency?: boolean;
  hiddenOnEmpty?: boolean;
}

function Price({ price, currency, showCurrency = true, hiddenOnEmpty = true, ...labelProps }: IPriceProps) {
  if (hiddenOnEmpty && !price && price !== 0) {
    return null;
  }

  return <Label label='Price: ' content={`${price || 0} ${showCurrency && (currency || '')}`} {...labelProps} />;
}

export default Price;
