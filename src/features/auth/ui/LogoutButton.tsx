import { useAppDispatch } from '@/shared/model'
import { logout } from '../model/thunks'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()

  return (
    <button type="button" className="button button--ghost" onClick={() => dispatch(logout())}>
      Выйти
    </button>
  )
}
