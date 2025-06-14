export function formatAddress(
  address: string = '',
  startChars: number = 4,
  endChars: number = -4,
  separator: string = '...'
) {
  return `${address.slice(0, startChars)}${separator}${endChars ? address.slice(endChars) : ''}`
}
