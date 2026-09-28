import type { GreenApiMeta } from './types'

export const isGreenApiMeta = (meta: unknown): meta is GreenApiMeta => {
  return typeof meta === 'object' && meta !== null && 'idInstance' in meta
}
