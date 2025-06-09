import dayjs, { Dayjs } from '~/config/dayjs';

interface IDateTimeUtilOptions {
  format?: string;
  skipOnBefore?: boolean;
  skipOnAfter?: boolean;
  defaultText?: string;
  timezone?: AppTimeZone;
}

interface IUtilOptions {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  start?: Dayjs;
  end?: Dayjs;
  unit?: dayjs.ManipulateType;
}
export enum AppTimeZone {
  VIETNAM = 'Asia/Ho_Chi_Minh',
  USA = 'America/Los_Angeles'
}

export const timezoneOptions = Object.values(AppTimeZone).map((value) => ({ label: value, value }));

class TimeUtils {
  public DATE_TIME_PATTERN = 'YYYY-MM-DD HH:mm:ss';
  public DATE_PATTERN = 'YYYY-MM-DD';
  public DATE_TIME_QUERY_REGEX = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
  public DATE_QUERY_REGEX = /^\d{2}-\d{2}-\d{4}$/;
  public TIME_ZONE = AppTimeZone.VIETNAM;

  public now(): Dayjs {
    return dayjs();
  }

  public beforeNow({ days = 0, hours = 0, minutes = 0, seconds = 0 }: IUtilOptions): Dayjs {
    return dayjs().subtract(days, 'days').subtract(hours, 'hours').subtract(minutes, 'minutes').subtract(seconds, 'seconds');
  }

  public afterNow({ days = 0, hours = 0, minutes = 0, seconds = 0 }: IUtilOptions): Dayjs {
    return dayjs().add(days, 'days').add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds');
  }

  public difference({ start, end, unit }: IUtilOptions): number {
    if (!start || !end) {
      return 0;
    }
    return end.diff(start, unit || 'seconds');
  }
  public isBeforeNow(date: Dayjs): boolean {
    return date.isBefore(dayjs());
  }

  public isAfterNow(date: Dayjs): boolean {
    return date.isAfter(dayjs());
  }

  public parseDateStr(dateStr: string | undefined | null): Dayjs | null {
    if (!dateStr?.trim()) {
      return null;
    }
    const obj = dayjs(dateStr, this.DATE_PATTERN);
    return obj.isValid() ? obj : null;
  }

  public parseDateTimeStr(dateStr: string | undefined | null): Dayjs | null {
    const obj = dayjs(dateStr, this.DATE_TIME_PATTERN);
    return obj.isValid() ? obj : null;
  }

  public formatUtc(date?: string, format?: string): string {
    if (!date) {
      return '';
    }
    return dayjs
      .utc(date)
      .tz(this.TIME_ZONE)
      .format(format || this.DATE_TIME_PATTERN);
  }

  public format(date: Dayjs, format?: string): string {
    return date.format(format || this.DATE_PATTERN);
  }

  public toDateStr(date: Dayjs): string {
    return date.format(this.DATE_PATTERN);
  }

  public toDateTimeStr(date: Dayjs): string {
    return date.format(this.DATE_TIME_PATTERN);
  }

  public getRelativeTime(dateStr: string, options?: IDateTimeUtilOptions): string {
    const updatedDate = dayjs(dateStr, options?.format || this.DATE_TIME_PATTERN);
    if (!updatedDate.isValid()) {
      return options?.defaultText || '';
    }

    const now = dayjs();
    const isAfter = updatedDate.isAfter(now);

    if (options?.skipOnBefore && !isAfter) {
      return options?.defaultText || '';
    }
    if (options?.skipOnAfter && isAfter) {
      return options?.defaultText || '';
    }

    const differenceInMs = updatedDate.diff(now);
    const seconds = Math.abs(Math.round(differenceInMs / 1000));
    const minutes = Math.abs(Math.round(seconds / 60));
    const hours = Math.abs(Math.round(minutes / 60));
    const days = Math.abs(Math.round(hours / 24));
    const months = Math.abs(Math.round(days / 30));

    if (months >= 1) {
      return `${isAfter ? 'in' : ''} ${months} months ${!isAfter ? 'ago' : ''}`;
    } else if (days >= 1) {
      return `${isAfter ? 'in' : ''} ${days} days ${!isAfter ? 'ago' : ''}`;
    } else if (hours >= 1) {
      return `${isAfter ? 'in' : ''} ${hours} hours ${!isAfter ? 'ago' : ''}`;
    } else if (minutes >= 1) {
      return `${isAfter ? 'in' : ''} ${minutes} minutes ${!isAfter ? 'ago' : ''}`;
    } else {
      return `${isAfter ? 'in' : ''} ${seconds} seconds ${!isAfter ? 'ago' : ''}`;
    }
  }
  public getRelativeTimeWithTimezone(dateStr: string, options?: IDateTimeUtilOptions): string {
    dateStr = this.formatWithTimezone(dateStr);
    return this.getRelativeTime(dateStr, options);
  }

  public isValidDateQuery(dateStr: string): boolean {
    if (!dateStr?.trim()) {
      return false;
    }
    return dayjs(dateStr, this.DATE_PATTERN).isValid();
  }

  public formatWithTimezone(dateStr: string): string {
    if (this.TIME_ZONE === AppTimeZone.VIETNAM) {
      return dateStr;
    }

    return dayjs(dateStr).tz(this.TIME_ZONE).format(this.DATE_TIME_PATTERN);
  }
  public async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new TimeUtils();
