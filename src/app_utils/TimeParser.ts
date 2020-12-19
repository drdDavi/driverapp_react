import * as dateFns from 'date-fns';

export function DateParser(date: Date | number, isTimeIncluded: boolean): string {
  if (isTimeIncluded) return dateFns.format(date, "MMM d, yyy 'at' HH:mm");
  return dateFns.format(date, 'MMM d, yyy');
}
