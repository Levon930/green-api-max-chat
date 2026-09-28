import { NewChatForm } from '@/features/create-chat'
import { ChatList } from './ChatList'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNotice } from './SidebarNotice'

interface SidebarProps {
  idInstance: string
  problem: string | null
  settingsPollingInterval: number
}

export const Sidebar = ({ idInstance, problem, settingsPollingInterval }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <SidebarHeader idInstance={idInstance} hasProblem={Boolean(problem)} />
      <SidebarNotice problem={problem} settingsPollingInterval={settingsPollingInterval} />
      <NewChatForm />
      <ChatList />
    </aside>
  )
}
