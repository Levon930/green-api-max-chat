import { useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import type { Chat } from '@/entities/chat'
import { useAppDispatch } from '@/shared/model'
import { MAX_MESSAGE_LENGTH } from '../config/limits'
import { sendMessage } from '../model/thunks'

interface MessageInputProps {
  chat: Chat
}

export const MessageInput = ({ chat }: MessageInputProps) => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')
  const canSend = text.trim().length > 0

  const submit = () => {
    if (!canSend) return
    dispatch(sendMessage(chat, text.trim()))
    setText('')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submit()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea
        className="composer__input"
        aria-label="Сообщение"
        placeholder="Сообщение"
        rows={1}
        maxLength={MAX_MESSAGE_LENGTH}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="composer__send" type="submit" disabled={!canSend} aria-label="Отправить">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="currentColor" d="M3.4 20.4 21.9 12 3.4 3.6 3.4 10.2 16.6 12 3.4 13.8z" />
        </svg>
      </button>
    </form>
  )
}
