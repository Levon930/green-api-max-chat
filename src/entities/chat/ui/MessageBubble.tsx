import type { ReactNode } from 'react'
import { formatTime } from '@/shared/lib'
import type { Message } from '../model/types'
import { MessageStatusIcon } from './MessageStatusIcon'

interface MessageBubbleProps {
  message: Message
  action?: ReactNode
}

export const MessageBubble = ({ message, action }: MessageBubbleProps) => {
  const outgoing = message.direction === 'outgoing'

  return (
    <li className={`message message--${message.direction}`}>
      <div className={`bubble${message.status === 'failed' ? ' bubble--failed' : ''}`}>
        <p className="bubble__text">{message.text}</p>
        <span className="bubble__meta">
          <time>{formatTime(message.timestamp)}</time>
          {outgoing && message.status && <MessageStatusIcon status={message.status} />}
        </span>
      </div>
      {action}
    </li>
  )
}
