import { readJson, writeJson } from '@/shared/lib'
import type { Credentials } from '../model/types'

const CREDENTIALS_KEY = 'green-api-chat:credentials'

export const loadCredentials = (): Credentials | null => {
  const value = readJson<Credentials>(sessionStorage, CREDENTIALS_KEY)
  return value?.idInstance && value.apiTokenInstance && value.apiUrl ? value : null
}

export const saveCredentials = (credentials: Credentials): void => {
  writeJson(sessionStorage, CREDENTIALS_KEY, credentials)
}

export const clearCredentials = (): void => {
  sessionStorage.removeItem(CREDENTIALS_KEY)
}
