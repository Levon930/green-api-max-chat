export type MessageDirection = 'incoming' | 'outgoing'

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface Message {
  id: string
  text: string
  timestamp: number
  direction: MessageDirection
  status?: MessageStatus
}

export interface Chat {
  id: string
  sendTo: string
  chatIds: string[]
  phone?: string
  name?: string
  messages: Message[]
  unread: number
  createdAt: number
}

export interface ChatMessageEvent {
  type: 'message'
  chatId: string
  phone?: string
  name?: string
  message: Message
}

export interface ChatStatusEvent {
  type: 'status'
  chatId: string
  idMessage: string
  status: MessageStatus
}

export type ChatEvent = ChatMessageEvent | ChatStatusEvent

export interface ChatState {
  chats: Chat[]
  activeChatId: string | null
}
