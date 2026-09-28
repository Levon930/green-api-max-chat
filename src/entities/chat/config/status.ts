import type { MessageStatus } from '../model/types'

export const STATUS_RANK: Record<MessageStatus, number> = { failed: 0, pending: 1, sent: 2, delivered: 3, read: 4 }

export const STATUS_LABEL: Record<MessageStatus, string> = {
  pending: 'Отправляется',
  sent: 'Отправлено',
  delivered: 'Доставлено',
  read: 'Прочитано',
  failed: 'Не отправлено',
}

export const STATUS_ICON: Record<MessageStatus, string> = {
  pending: '🕓',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  failed: '!',
}
