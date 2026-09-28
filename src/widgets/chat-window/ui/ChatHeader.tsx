import { chatActions, chatTitle } from '@/entities/chat'
import type { Chat } from '@/entities/chat'
import { formatPhone } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { Avatar } from '@/shared/ui'

interface ChatHeaderProps {
  chat: Chat
}

export const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const dispatch = useAppDispatch()
  const title = chatTitle(chat)

  return (
    <header className="chat__header">
      <button
        type="button"
        className="icon-button chat__back"
        onClick={() => dispatch(chatActions.selectChat({ chatId: null }))}
        aria-label="Назад к чатам"
      >
        ←
      </button>
      <Avatar id={chat.id} title={title} />
      <div className="chat__heading">
        <h2 className="chat__title">{title}</h2>
        {chat.phone && chat.name && <p className="chat__subtitle">{formatPhone(chat.phone)}</p>}
      </div>
    </header>
  )
}
