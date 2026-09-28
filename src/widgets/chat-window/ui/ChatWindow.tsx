import { chatTitle } from '@/entities/chat'
import type { Chat } from '@/entities/chat'
import { MessageInput } from '@/features/send-message'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'

interface ChatWindowProps {
  chat: Chat
}

export const ChatWindow = ({ chat }: ChatWindowProps) => {
  return (
    <section className="chat" aria-label={`Чат с ${chatTitle(chat)}`}>
      <ChatHeader chat={chat} />
      <MessageList key={chat.id} chat={chat} />
      <MessageInput key={chat.id} chat={chat} />
    </section>
  )
}
