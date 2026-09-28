import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { REQUEST_TIMEOUT } from './config'
import { describeStatus } from './errors'
import { methodUrl } from './methodUrl'
import type { GreenApiCredentials, GreenApiMeta, GreenApiQueryError, GreenApiRequest } from './types'

type GreenApiBaseQuery = BaseQueryFn<GreenApiRequest, unknown, GreenApiQueryError, object, GreenApiMeta>

interface StateWithSession {
  session: { credentials: GreenApiCredentials | null }
}

const networkErrorMessage = (signal: AbortSignal, timeoutSignal: AbortSignal): string => {
  if (signal.aborted) return 'Запрос отменён'
  if (timeoutSignal.aborted) return 'GREEN-API не ответил вовремя'
  return 'Не удалось подключиться к GREEN-API. Проверьте соединение и apiUrl'
}

export const greenApiBaseQuery: GreenApiBaseQuery = async (
  { method, suffix, httpMethod = 'GET', body, credentials: explicit, timeout = REQUEST_TIMEOUT },
  { getState, signal },
) => {
  const credentials = explicit ?? (getState() as StateWithSession).session.credentials
  if (!credentials) return { error: { message: 'Нет данных для входа в GREEN-API' } }

  const meta = { idInstance: credentials.idInstance }
  const timeoutSignal = AbortSignal.timeout(timeout)
  const init: RequestInit = { method: httpMethod, signal: AbortSignal.any([signal, timeoutSignal]) }
  if (body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' }
    init.body = JSON.stringify(body)
  }

  let response: Response
  let text: string
  try {
    response = await fetch(methodUrl(credentials, method, suffix), init)
    if (!response.ok) return { error: { message: describeStatus(response.status), status: response.status }, meta }
    text = await response.text()
  } catch {
    return { error: { message: networkErrorMessage(signal, timeoutSignal) }, meta }
  }

  if (!text.trim()) return { data: null, meta }
  try {
    return { data: JSON.parse(text), meta }
  } catch {
    return { error: { message: 'Некорректный ответ GREEN-API', status: response.status }, meta }
  }
}
