import { SettingsNotice } from '@/features/enable-receiving'

interface SidebarNoticeProps {
  problem: string | null
  settingsPollingInterval: number
}

export const SidebarNotice = ({ problem, settingsPollingInterval }: SidebarNoticeProps) => {
  if (!problem) return <SettingsNotice pollingInterval={settingsPollingInterval} />

  return (
    <p className="banner" role="status">
      {problem}
    </p>
  )
}
