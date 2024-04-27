export function stringToBool(str: string): boolean {
  return (
    str != undefined &&
    ["true", "t", "1"].indexOf(str.toLowerCase().trim()) !== -1
  );
}
