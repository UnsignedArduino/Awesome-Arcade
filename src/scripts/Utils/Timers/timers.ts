const debounceTimeouts: { [key: string]: number } = {};

export function debounce(key: string, func: () => void, period: number) {
  if (debounceTimeouts[key]) {
    window.clearTimeout(debounceTimeouts[key]);
  }
  debounceTimeouts[key] = window.setTimeout(func, period);
}
