import { format, toZonedTime } from 'date-fns-tz';
import { formatISO, Locale, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

// Global configuration for default formats and fallback locale, allowing dynamic overrides
const DEFAULT_FORMATS = {
  shortDate: 'MM/dd/yy',
};

let DEFAULT_LOCALE: Locale = enUS;

export const setDefaultFormats = (
  newFormats: Partial<typeof DEFAULT_FORMATS>,
): void => {
  const validKeys = Object.keys(DEFAULT_FORMATS);
  const filteredFormats = Object.fromEntries(
    Object.entries(newFormats).filter(([key]) => validKeys.includes(key)),
  );
  Object.assign(DEFAULT_FORMATS, filteredFormats);
};

export const setDefaultLocale = (locale: Locale): void => {
  DEFAULT_LOCALE = locale;
};

// Format date as 'YYYY-MM-DD'
export const formatDateISO = (
  date: Date,
  locale: Locale = DEFAULT_LOCALE,
): string => {
  return format(date, 'yyyy-MM-dd', { locale });
};

// Validate if a given string is a valid IANA time zone
const isValidTimeZone = (timeZone: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch {
    return false;
  }
};

// Format date with time as 'YYYY-MM-DD HH:mm:ss', using time zone
export const formatDateTimeISO = (
  date: Date,
  timeZone: string = 'UTC',
): string => {
  if (!isValidTimeZone(timeZone)) {
    console.warn(`Invalid time zone: ${timeZone}. Falling back to UTC.`);
    timeZone = 'UTC';
  }
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
};

// Format date in a human-readable format, e.g., 'January 1, 2024'
export const formatDateReadable = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

// Format date with time in a human-readable format, e.g., 'January 1, 2024, 12:00 PM'
export const formatDateTimeReadable = (date: Date): string => {
  return format(date, 'MMMM d, yyyy, h:mm a');
};

// Parse ISO string to Date object
export const parseDateFromISO = (isoString: string): Date => {
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(
      isoString,
    )
  ) {
    const errorMessage = `Invalid ISO date string: ${isoString}. Returning current date as fallback.`;
    console.warn(errorMessage);
    throw new Error(errorMessage);
  }
  return parseISO(isoString);
};

// Format date to ISO 8601 string
export const toISOFormat = (date: Date): string => {
  return formatISO(date);
};

// Format date to a configurable short format, defaults to global shortDate
export const formatShortDate = (
  date: Date,
  formatString: string = DEFAULT_FORMATS.shortDate,
): string => {
  return format(date, formatString);
};

// Validate the locale parameter and provide a fallback if unsupported
const isValidLocale = (locale: Locale): boolean => {
  try {
    if (!locale || !locale.code || typeof locale.code !== 'string') {
      throw new Error(
        'Invalid locale object. Missing or incorrect `code` property.',
      );
    }
    Intl.DateTimeFormat(locale.code);
    return true;
  } catch {
    return false;
  }
};

export const formatTimeOnly = (
  date: Date,
  locale: Locale = DEFAULT_LOCALE,
): string => {
  if (!isValidLocale(locale)) {
    console.warn(
      `Invalid locale provided: ${JSON.stringify(locale)}. Falling back to default locale.`,
    );
    locale = DEFAULT_LOCALE;
  }
  return format(date, 'h:mm a', { locale });
};
