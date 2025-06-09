import { DatePickerProps } from 'antd';
import { Dayjs } from '~/config/dayjs';
interface IDisableInRangeOptions {
  range: number;
  unit: 'days' | 'months' | 'years';
}

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

const limitDateRange = (options: IDisableInRangeOptions) => {
  const disableInRange: DatePickerProps['disabledDate'] = (current, { from, type }) => {
    if (!from) return false;

    const minDate = from.add(-options.range, options.unit);
    const maxDate = from.add(options.range, options.unit);

    const isOutsideYearRange = () => current.year() < minDate.year() || current.year() > maxDate.year();
    const isOutsideMonthRange = () => getYearMonth(current) < getYearMonth(minDate) || getYearMonth(current) > getYearMonth(maxDate);
    const isOutsideDayRange = () => Math.abs(current.diff(from, 'days')) >= options.range;
    switch (type) {
      case 'year':
        return isOutsideYearRange();
      case 'month':
        return isOutsideMonthRange();
      default:
        return isOutsideDayRange();
    }
  };

  return disableInRange;
};

export default limitDateRange;
