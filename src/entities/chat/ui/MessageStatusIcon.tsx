import { STATUS_ICON, STATUS_LABEL } from '../config/status'
import type { MessageStatus } from '../model/types'

interface MessageStatusIconProps {
  status: MessageStatus
}

export const MessageStatusIcon = ({ status }: MessageStatusIconProps) => {
  return (
    <span
      className={`bubble__status bubble__status--${status}`}
      title={STATUS_LABEL[status]}
      aria-label={STATUS_LABEL[status]}
    >
      {STATUS_ICON[status]}
    </span>
  )
}
