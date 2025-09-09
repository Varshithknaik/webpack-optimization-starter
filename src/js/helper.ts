export function trim(value: string): string {
  return value
    .replace(/^\s+/g, "")
    .replace(/\s+$/g, "")
    .replace(/\s{2,}/g, " ");
}
