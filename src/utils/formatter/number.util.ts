/* eslint-disable @typescript-eslint/no-explicit-any */
interface INumberUtilParams {
  locales?: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
  placement?: 'before' | 'after';
  symbol?: string;
  value: number | bigint | string;
}

class NumberUtil {
  public isStrNumber(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }
    return /^-?\d+(\.\d+)?$/.test(value.trim());
  }

  public isIntegerStrNumber(value: string | null | undefined): boolean {
    if (!value?.trim()) {
      return false;
    }
    return /^-?\d+$/.test(value.trim());
  }

  public isPositiveIntegerStrNumber(value: string | null | undefined): boolean {
    return this.isStrNumber(value) && parseInt(value as string) > 0;
  }

  public isPositiveStrNumber(value: string | null | undefined): boolean {
    return this.isStrNumber(value) && parseFloat(value as string) > 0;
  }

  public parseStrNumber(value: string | number | undefined | null): number {
    if (!value) {
      return 0;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (!value?.trim()) {
      return 0;
    }
    return parseFloat(value.trim()) || 0;
  }

  public parseStrIntegerNumber(value: string): number {
    if (!value?.trim()) {
      return 0;
    }
    return parseInt(value.trim()) || 0;
  }

  public format({ locales = 'en-US', options = {}, symbol = '', placement = 'before', value }: INumberUtilParams): string {
    if (!value) {
      return '';
    }
    if (typeof value === 'string' && (!value?.trim() || !this.isStrNumber(value))) {
      return '';
    }
    const formattedValue = new Intl.NumberFormat(locales, {
      style: 'decimal',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      ...options
    }).format(Number(value));

    return placement === 'before' ? `${symbol} ${formattedValue}` : `${formattedValue} ${symbol}`;
  }

  public formatCurrency(value: INumberUtilParams['value'], symbol = ''): string {
    return this.format({ value, symbol });
  }

  public randomNumber({ min = 0, max = 100 }): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public sumFloatStr(...values: string[]): number {
    return values.reduce((acc, curr) => acc + this.parseStrNumber(curr), 0);
  }
}

export default new NumberUtil();
