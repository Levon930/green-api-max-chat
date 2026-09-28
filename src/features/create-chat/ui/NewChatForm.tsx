import { useState } from 'react'
import type { FormEvent } from 'react'
import { chatActions } from '@/entities/chat'
import { normalizePhone } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'
import { FormError } from '@/shared/ui'

export const NewChatForm = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const phone = normalizePhone(value)
    if (!phone) {
      setError('Введите номер в международном формате, например +7 999 123-45-67')
      return
    }
    setError(null)
    setValue('')
    dispatch(chatActions.openChat({ phone, now: Date.now() }))
  }

  return (
    <form className="new-chat" onSubmit={handleSubmit} noValidate>
      <div className="new-chat__row">
        <input
          className="field__input"
          aria-label="Номер телефона получателя"
          type="tel"
          inputMode="tel"
          placeholder="+7 999 123-45-67"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(null)
          }}
          aria-invalid={Boolean(error)}
        />
        <button className="button button--primary new-chat__button" type="submit" disabled={!value.trim()}>
          Создать чат
        </button>
      </div>
      {error && <FormError>{error}</FormError>}
    </form>
  )
}
