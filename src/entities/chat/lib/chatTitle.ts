import { formatPhone } from '@/shared/lib'
import type { Chat } from '../model/types'

export const chatTitle = (chat: Chat): string => {
  if (chat.name) return chat.name
  return chat.phone ? formatPhone(chat.phone) : chat.id
}
