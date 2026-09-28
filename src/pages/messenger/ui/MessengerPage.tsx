import { selectActiveChat } from '@/entities/chat'
import type { Credentials } from '@/entities/session'
import { useAppSelector } from '@/shared/model'
import { ChatWindow } from '@/widgets/chat-window'
import { Sidebar } from '@/widgets/sidebar'
import { STATE_POLLING_INTERVAL } from '../config/polling'
import { useConnectionProblem } from '../model/useConnectionProblem'
import { EmptyState } from './EmptyState'

interface MessengerPageProps {
  credentials: Credentials
}

export const MessengerPage = ({ credentials }: MessengerPageProps) => {
  const activeChat = useAppSelector(selectActiveChat)
  const problem = useConnectionProblem(credentials)

  return (
    <div className={`messenger${activeChat ? ' messenger--chat-open' : ''}`}>
      <Sidebar idInstance={credentials.idInstance} problem={problem} settingsPollingInterval={STATE_POLLING_INTERVAL} />
      <main className="content">{activeChat ? <ChatWindow chat={activeChat} /> : <EmptyState />}</main>
    </div>
  )
}
