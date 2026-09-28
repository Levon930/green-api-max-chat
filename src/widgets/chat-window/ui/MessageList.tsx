import { useEffect, useRef } from 'react'
import { MessageBubble } from '@/entities/chat'
import type { Chat } from '@/entities/chat'
import { RetryButton } from '@/features/send-message'

interface MessageListProps {
  chat: Chat
}

export const MessageList = ({ chat }: MessageListProps) => {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [chat.messages.length, chat.id])

  return (
    <ol className="chat__messages" ref={listRef} aria-label="Сообщения" aria-live="polite">
      {chat.messages.length === 0 && <li className="chat__empty">Напишите первое сообщение</li>}
      {chat.messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          action={message.status === 'failed' && <RetryButton chat={chat} messageId={message.id} />}
        />
      ))}
    </ol>
  )
}
