/**
 * Calculate usable storage after RAID overhead
 * @param count Number of drives
 * @param sizeTb Size of each drive in TB
 * @param raidFactor RAID overhead percentage (e.g., 20 for RAID 5)
 * @returns Usable storage in TB
 */
export function calculateUsableStorage(
  count: number,
  sizeTb: number,
  raidFactor: number,
): number {
  const rawSize = (sizeTb || 0) * (count || 0)
  const raidOverhead = rawSize * ((raidFactor || 0) / 100)
  return rawSize - raidOverhead
}
