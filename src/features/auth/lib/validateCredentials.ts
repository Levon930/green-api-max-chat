import type { Credentials } from '@/entities/session'

export const validateCredentials = ({ idInstance, apiTokenInstance, apiUrl }: Credentials): string | null => {
  if (!/^\d+$/.test(idInstance)) return 'idInstance должен состоять из цифр'
  if (!apiTokenInstance) return 'Укажите apiTokenInstance'
  if (!/^https?:\/\/\S+$/.test(apiUrl)) return 'apiUrl должен начинаться с https://'
  return null
}
