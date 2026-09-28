import { ChatCard, chatActions, selectActiveChat, selectSortedChats } from '@/entities/chat'
import { useAppDispatch, useAppSelector } from '@/shared/model'

export const ChatList = () => {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectSortedChats)
  const activeChat = useAppSelector(selectActiveChat)

  if (chats.length === 0) {
    return <p className="chat-list__empty">Чатов пока нет. Введите номер телефона, чтобы начать переписку</p>
  }

  return (
    <ul className="chat-list" aria-label="Чаты">
      {chats.map((chat) => (
        <li key={chat.id}>
          <ChatCard
            chat={chat}
            active={chat.id === activeChat?.id}
            onSelect={(chatId) => dispatch(chatActions.selectChat({ chatId }))}
          />
        </li>
      ))}
    </ul>
  )
}
