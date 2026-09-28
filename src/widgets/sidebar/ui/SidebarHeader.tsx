import { LogoutButton } from '@/features/auth'
import { Logo } from '@/shared/ui'

interface SidebarHeaderProps {
  idInstance: string
  hasProblem: boolean
}

export const SidebarHeader = ({ idInstance, hasProblem }: SidebarHeaderProps) => {
  return (
    <header className="sidebar__header">
      <Logo size={36} />
      <div className="sidebar__heading">
        <h1 className="sidebar__title">MAX Chat</h1>
        <p className="sidebar__instance">
          <span className={`status-dot${hasProblem ? ' status-dot--error' : ''}`} aria-hidden="true" />
          Инстанс {idInstance}
        </p>
      </div>
      <LogoutButton />
    </header>
  )
}
