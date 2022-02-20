export function range(length: number): number[]
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function range(start: number, length: number): number[]
export function range(
  startOrLength: number,
  optionalLength?: number
): number[] {
  const start = optionalLength === undefined ? 0 : startOrLength
  const length = optionalLength ?? startOrLength

  return Array.from({ length }, (_, i) => start + i)
}
