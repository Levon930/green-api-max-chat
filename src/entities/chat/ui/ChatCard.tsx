import { formatTime } from '@/shared/lib'
import { Avatar } from '@/shared/ui'
import { chatTitle } from '../lib/chatTitle'
import { messagePreview } from '../lib/messagePreview'
import type { Chat } from '../model/types'
import { UnreadBadge } from './UnreadBadge'

interface ChatCardProps {
  chat: Chat
  active: boolean
  onSelect: (chatId: string) => void
}

export const ChatCard = ({ chat, active, onSelect }: ChatCardProps) => {
  const title = chatTitle(chat)
  const last = chat.messages.at(-1)

  return (
    <button
      type="button"
      className={`chat-item${active ? ' chat-item--active' : ''}`}
      aria-current={active ? 'true' : undefined}
      onClick={() => onSelect(chat.id)}
    >
      <Avatar id={chat.id} title={title} />
      <span className="chat-item__body">
        <span className="chat-item__top">
          <span className="chat-item__title">{title}</span>
          {last && <time className="chat-item__time">{formatTime(last.timestamp)}</time>}
        </span>
        <span className="chat-item__bottom">
          <span className="chat-item__preview">{messagePreview(last)}</span>
          <UnreadBadge count={chat.unread} />
        </span>
      </span>
    </button>
  )
}
