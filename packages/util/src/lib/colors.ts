/**
 * testColorIsHex
 */

export function testColorIsHex(value: unknown) {
  if (typeof value !== "string") return false;
  return !!value.startsWith("#");
}

/**
 * convertColorHexToRgb
 */

export function convertColorHexToRgb(value: string) {
  return `rgb:${value.replace("#", "")}`;
}
