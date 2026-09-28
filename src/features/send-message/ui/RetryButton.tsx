import type { Chat } from '@/entities/chat'
import { useAppDispatch } from '@/shared/model'
import { retryMessage } from '../model/thunks'

interface RetryButtonProps {
  chat: Chat
  messageId: string
}

export const RetryButton = ({ chat, messageId }: RetryButtonProps) => {
  const dispatch = useAppDispatch()

  return (
    <button type="button" className="message__retry" onClick={() => dispatch(retryMessage(chat, messageId))}>
      Повторить отправку
    </button>
  )
}
