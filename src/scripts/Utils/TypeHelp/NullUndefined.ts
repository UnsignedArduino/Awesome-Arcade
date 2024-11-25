export function makeUndefinedNull<T>(value: T | null | undefined): T | null {
  if (value === undefined) {
    return null;
  }
  return value;
}

export function makeNullUndefined<T>(
  value: T | null | undefined,
): T | undefined {
  if (value === null) {
    return undefined;
  }
  return value;
}

export function makeNaNUndefined(
  value: number | undefined,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (isNaN(value)) {
    return undefined;
  }
  return value;
}
