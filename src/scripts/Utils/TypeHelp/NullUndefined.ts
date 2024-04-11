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
