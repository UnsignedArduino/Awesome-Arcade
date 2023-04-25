export default function formatNumber(num: number): string {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(num);
}
