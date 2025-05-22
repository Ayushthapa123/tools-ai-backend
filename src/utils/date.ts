import { differenceInDays, isWeekend } from 'date-fns';

// date difference in days
export function getDateDifference(startDate: Date, endDate: Date) {
  const dateDifference = differenceInDays(endDate, startDate);
  // always return positive number and include both start and end dates
  return dateDifference;
}

export function isDateWeekend(date: Date) {
  return isWeekend(date);
}
