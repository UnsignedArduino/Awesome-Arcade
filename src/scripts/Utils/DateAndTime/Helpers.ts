/**
 * Parse an ISO date string to a Date object or return the Date object if it is already a Date object.
 *
 * @param date The date to parse.
 */
export function dp(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date;
}

export function isBeforeNow(date: Date) {
  return date.getTime() < Date.now();
}

export function isAfterNow(date: Date) {
  return date.getTime() > Date.now();
}

export function nowBetween(start: Date, end: Date) {
  const now = new Date();
  return now >= start && now <= end;
}

export function getUserTimezoneOffsetInHrs() {
  return new Date().getTimezoneOffset() / 60;
}

export function getUserTimezoneOffsetInMs() {
  return new Date().getTimezoneOffset() * 60 * 1000;
}
