import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { describeStatus } from './errors'
import { methodUrl } from './methodUrl'
import type { GreenApiCredentials, GreenApiMeta, GreenApiQueryError, GreenApiRequest } from './types'

type GreenApiBaseQuery = BaseQueryFn<GreenApiRequest, unknown, GreenApiQueryError, object, GreenApiMeta>

interface StateWithSession {
  session: { credentials: GreenApiCredentials | null }
}

export const greenApiBaseQuery: GreenApiBaseQuery = async (
  { method, suffix, httpMethod = 'GET', body, credentials: explicit },
  { getState, signal },
) => {
  const credentials = explicit ?? (getState() as StateWithSession).session.credentials
  if (!credentials) return { error: { message: 'Нет данных для входа в GREEN-API' } }

  const meta = { idInstance: credentials.idInstance }
  const init: RequestInit = { method: httpMethod, signal }
  if (body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(body)
  }

  let response: Response
  try {
    response = await fetch(methodUrl(credentials, method, suffix), init)
  } catch {
    const message = signal.aborted
      ? 'Запрос отменён'
      : 'Не удалось подключиться к GREEN-API. Проверьте соединение и apiUrl'
    return { error: { message }, meta }
  }
  if (!response.ok) return { error: { message: describeStatus(response.status), status: response.status }, meta }

  const text = await response.text()
  if (!text.trim()) return { data: null, meta }
  try {
    return { data: JSON.parse(text), meta }
  } catch {
    return { error: { message: 'Некорректный ответ GREEN-API', status: response.status }, meta }
  }
}
