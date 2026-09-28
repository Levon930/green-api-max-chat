import { useEffect, useRef } from 'react'
import { MessageBubble } from '@/entities/chat'
import type { Chat } from '@/entities/chat'
import { RetryButton } from '@/features/send-message'

const STICK_THRESHOLD = 80

interface MessageListProps {
  chat: Chat
}

export const MessageList = ({ chat }: MessageListProps) => {
  const listRef = useRef<HTMLOListElement>(null)
  const stickToBottom = useRef(true)
  const lastMessage = chat.messages.at(-1)

  const handleScroll = () => {
    const list = listRef.current
    if (list) stickToBottom.current = list.scrollHeight - list.scrollTop - list.clientHeight < STICK_THRESHOLD
  }

  useEffect(() => {
    const list = listRef.current
    if (list && (stickToBottom.current || lastMessage?.direction === 'outgoing')) list.scrollTop = list.scrollHeight
  }, [lastMessage?.id, lastMessage?.direction])

  return (
    <ol className="chat__messages" ref={listRef} onScroll={handleScroll} aria-label="Сообщения" aria-live="polite">
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
