import { type ClassValue, clsx } from 'clsx'
import Papa from 'papaparse'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function jsonToCSV(jsonData: any[]): string {
  return Papa.unparse(jsonData)
}
