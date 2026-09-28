import { Logo } from '@/shared/ui'

export const EmptyState = () => {
  return (
    <div className="placeholder">
      <Logo size={72} />
      <p>Выберите чат или создайте новый по номеру телефона</p>
    </div>
  )
}
