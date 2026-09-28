import type { SerializedError } from '@reduxjs/toolkit'
import type { GreenApiQueryError } from './types'

const STATUS_MESSAGES: Record<number, string> = {
  401: 'Неверный idInstance или apiTokenInstance',
  403: 'Неверный idInstance или apiTokenInstance',
  404: 'Инстанс не найден. Проверьте idInstance и apiUrl',
  429: 'Слишком много запросов. Попробуйте позже',
  466: 'Исчерпан лимит запросов тарифа',
}

export const describeStatus = (status: number): string => {
  if (status >= 500) return 'Сервис GREEN-API временно недоступен'
  return STATUS_MESSAGES[status] ?? `Ошибка запроса (HTTP ${status})`
}

export const errorMessage = (error: GreenApiQueryError | SerializedError | undefined): string => {
  return error?.message ?? 'Неизвестная ошибка'
}
