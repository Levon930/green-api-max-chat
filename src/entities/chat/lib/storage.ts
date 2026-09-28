import { readJson, writeJson } from '@/shared/lib'
import type { Chat } from '../model/types'

const chatsKey = (idInstance: string) => `green-api-chat:chats:${idInstance}`

export const loadChats = (idInstance: string): Chat[] => {
  const chats = readJson<Chat[]>(localStorage, chatsKey(idInstance))
  if (!Array.isArray(chats)) return []
  return chats.map((chat) => ({
    ...chat,
    messages: chat.messages.map((message) =>
      message.status === 'pending' ? { ...message, status: 'failed' } : message,
    ),
  }))
}

export const saveChats = (idInstance: string, chats: Chat[]): void => {
  writeJson(localStorage, chatsKey(idInstance), chats)
}
