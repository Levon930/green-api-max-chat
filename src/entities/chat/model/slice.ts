import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { phoneToChatId } from '@/shared/lib'
import { STATUS_RANK } from '../config/status'
import type { Chat, ChatEvent, ChatMessageEvent, ChatState, ChatStatusEvent, Message, MessageStatus } from './types'

const initialState: ChatState = { chats: [], activeChatId: null }

interface ChatLookup {
  chatId: string
  phone?: string
  messageId?: string
}

const findChat = (chats: Chat[], { chatId, phone, messageId }: ChatLookup): Chat | undefined => {
  return (
    chats.find((chat) => chat.chatIds.includes(chatId) || (phone !== undefined && chat.phone === phone)) ??
    chats.find((chat) => messageId !== undefined && chat.messages.some((message) => message.id === messageId))
  )
}

const findOrCreateChat = (state: ChatState, lookup: ChatLookup & { name?: string; now: number }): Chat => {
  const existing = findChat(state.chats, lookup)
  if (existing) return existing

  const { chatId, phone, name, now } = lookup
  const sendTo = phone ? phoneToChatId(phone) : chatId
  const chat: Chat = {
    id: phone ?? chatId,
    sendTo,
    chatIds: [...new Set([sendTo, chatId])],
    phone,
    name,
    messages: [],
    unread: 0,
    createdAt: now,
  }
  state.chats.push(chat)
  return chat
}

const findMessage = (state: ChatState, chatId: string, messageId: string): Message | undefined => {
  return state.chats.find((chat) => chat.id === chatId)?.messages.find((message) => message.id === messageId)
}

const rememberChatId = (chat: Chat, chatId: string): void => {
  if (!chat.chatIds.includes(chatId)) chat.chatIds.push(chatId)
}

const raiseStatus = (message: Message, status: MessageStatus): void => {
  if (status === 'failed' || !message.status || STATUS_RANK[status] > STATUS_RANK[message.status]) {
    message.status = status
  }
}

const applyMessage = (state: ChatState, event: ChatMessageEvent, now: number): void => {
  const chat = findOrCreateChat(state, {
    chatId: event.chatId,
    phone: event.phone,
    messageId: event.message.id,
    name: event.name,
    now,
  })
  rememberChatId(chat, event.chatId)
  chat.name ??= event.name
  if (chat.messages.some((message) => message.id === event.message.id)) return

  chat.messages.push(event.message)
  if (event.message.direction === 'incoming' && chat.id !== state.activeChatId) chat.unread += 1
}

const applyStatus = (state: ChatState, event: ChatStatusEvent): void => {
  const chat = findChat(state.chats, { chatId: event.chatId, messageId: event.idMessage })
  const message = chat?.messages.find((item) => item.id === event.idMessage)
  if (!chat || !message) return

  rememberChatId(chat, event.chatId)
  raiseStatus(message, event.status)
}

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatsLoaded(_, { payload }: PayloadAction<Chat[]>) {
      return { chats: payload, activeChatId: null }
    },

    chatsReset() {
      return initialState
    },

    openChat(state, { payload: { phone, now } }: PayloadAction<{ phone: string; now: number }>) {
      const chat = findOrCreateChat(state, { chatId: phoneToChatId(phone), phone, now })
      chat.unread = 0
      state.activeChatId = chat.id
    },

    selectChat(state, { payload: { chatId } }: PayloadAction<{ chatId: string | null }>) {
      state.activeChatId = chatId
      const chat = state.chats.find((item) => item.id === chatId)
      if (chat) chat.unread = 0
    },

    messageQueued(state, { payload: { chatId, message } }: PayloadAction<{ chatId: string; message: Message }>) {
      state.chats.find((chat) => chat.id === chatId)?.messages.push(message)
    },

    messageSent(
      state,
      { payload: { chatId, localId, idMessage } }: PayloadAction<{ chatId: string; localId: string; idMessage: string }>,
    ) {
      const chat = state.chats.find((item) => item.id === chatId)
      if (!chat) return
      if (chat.messages.some((message) => message.id === idMessage)) {
        chat.messages = chat.messages.filter((message) => message.id !== localId)
        return
      }
      const message = chat.messages.find((item) => item.id === localId)
      if (!message) return
      message.id = idMessage
      raiseStatus(message, 'sent')
    },

    messageFailed(state, { payload: { chatId, localId } }: PayloadAction<{ chatId: string; localId: string }>) {
      const message = findMessage(state, chatId, localId)
      if (message) message.status = 'failed'
    },

    messageRetry(state, { payload: { chatId, localId } }: PayloadAction<{ chatId: string; localId: string }>) {
      const message = findMessage(state, chatId, localId)
      if (message) message.status = 'pending'
    },

    eventReceived(state, { payload: { event, now } }: PayloadAction<{ event: ChatEvent; now: number }>) {
      if (event.type === 'message') applyMessage(state, event, now)
      else applyStatus(state, event)
    },
  },
})

export const chatActions = chatsSlice.actions
export const chatReducer = chatsSlice.reducer
