import { getUserTimezoneOffsetInMs } from "@/scripts/Utils/DateAndTime/Helpers";

export function formatDateLong(date: Date) {
  const locale = new Intl.NumberFormat().resolvedOptions().locale;
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: Date) {
  const locale = new Intl.NumberFormat().resolvedOptions().locale;
  return date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatDateAndTime(date: Date) {
  const locale = new Intl.NumberFormat().resolvedOptions().locale;
  return date.toLocaleTimeString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatDateAndTimeAndSecond(date: Date) {
  const locale = new Intl.NumberFormat().resolvedOptions().locale;
  return date.toLocaleTimeString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export function formatDuration(ms: number, showMilliseconds = false) {
  // https://www.30secondsofcode.org/js/s/number-formatting/
  if (ms < 0) ms = -ms;
  let time: { [unit: string]: number } = {
    day: Math.floor(ms / 86_400_000),
    hour: Math.floor(ms / 3_600_000) % 24,
    minute: Math.floor(ms / 60_000) % 60,
    second: Math.floor(ms / 1_000) % 60,
  };
  if (showMilliseconds) {
    time.millisecond = Math.floor(ms) % 1_000;
  }
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
}

export function formatDateForInput(date: Date) {
  const dateWithOffset = new Date(date.getTime() - getUserTimezoneOffsetInMs());
  const firstHalf = dateWithOffset.toISOString().split(".")[0];
  const pieces = firstHalf.split(":");
  pieces.pop();
  return pieces.join(":");
}
