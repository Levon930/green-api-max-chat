import { selectCredentials } from '@/entities/session'
import { LoginPage } from '@/pages/login'
import { MessengerPage } from '@/pages/messenger'
import { useAppSelector } from '@/shared/model'

export const App = () => {
  const credentials = useAppSelector(selectCredentials)
  return credentials ? <MessengerPage credentials={credentials} /> : <LoginPage />
}
