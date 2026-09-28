import type { InstanceState } from '../model/types'

const STATE_PROBLEMS: Record<Exclude<InstanceState, 'authorized'>, string> = {
  notAuthorized: 'Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API',
  blocked: 'Аккаунт заблокирован',
  starting: 'Инстанс запускается, попробуйте через пару минут',
  suspended: 'На аккаунте временные ограничения',
  pendingPassword: 'Инстанс ожидает ввода пароля двухфакторной аутентификации',
}

export const describeInstanceState = (state: InstanceState | null | undefined): string | null => {
  if (state === 'authorized') return null
  if (state && state in STATE_PROBLEMS) return STATE_PROBLEMS[state]
  return `Неизвестное состояние инстанса: ${state ?? 'нет ответа'}`
}
