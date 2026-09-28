import type { GreenApiCredentials } from './types'

export const methodUrl = (
  { apiUrl, idInstance, apiTokenInstance }: GreenApiCredentials,
  method: string,
  suffix = '',
): string => {
  return `${apiUrl.replace(/\/+$/, '')}/waInstance${idInstance}/${method}/${apiTokenInstance}${suffix}`
}
