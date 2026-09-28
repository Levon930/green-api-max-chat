import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Credentials } from '@/entities/session'
import { DEFAULT_API_URL } from '@/shared/api'
import { useAppDispatch } from '@/shared/model'
import { Field, FormError, Logo } from '@/shared/ui'
import { validateCredentials } from '../lib/validateCredentials'
import { login } from '../model/thunks'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const credentials: Credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim() || DEFAULT_API_URL,
    }
    const invalid = validateCredentials(credentials)
    if (invalid) {
      setError(invalid)
      return
    }

    setError(null)
    setLoading(true)
    try {
      await dispatch(login(credentials))
    } catch (cause) {
      setError(cause instanceof Error && cause.message ? cause.message : 'Не удалось войти')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login__card" onSubmit={handleSubmit} noValidate aria-labelledby="login-title">
      <Logo size={56} />
      <h1 id="login-title" className="login__title">Вход в MAX Chat</h1>
      <p className="login__hint">
        Введите данные инстанса из{' '}
        <a href="https://console.green-api.com" target="_blank" rel="noreferrer">личного кабинета GREEN-API</a>
      </p>

      <Field
        label="idInstance"
        name="idInstance"
        inputMode="numeric"
        autoComplete="username"
        placeholder="1101000001"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />

      <Field
        label="apiTokenInstance"
        name="apiTokenInstance"
        type="password"
        autoComplete="current-password"
        placeholder="d75b3a66374942c5b3c019c698abc2067e151558acbd412345"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />

      <details className="login__advanced">
        <summary>Дополнительно</summary>
        <Field label="apiUrl" name="apiUrl" type="url" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
      </details>

      {error && <FormError>{error}</FormError>}

      <button className="button button--primary" type="submit" disabled={loading}>
        {loading ? 'Проверяем…' : 'Войти'}
      </button>
    </form>
  )
}
