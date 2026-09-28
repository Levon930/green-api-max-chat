import type { Message } from '../model/types'

export const messagePreview = (message: Message | undefined): string => {
  if (!message) return 'Нет сообщений'
  return `${message.direction === 'outgoing' ? 'Вы: ' : ''}${message.text}`
}
