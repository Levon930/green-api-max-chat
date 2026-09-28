import { describeInstanceState, useGetStateInstanceQuery } from '@/entities/instance'
import { useNotificationPolling } from '@/features/receive-messages'
import { errorMessage } from '@/shared/api'
import {
  NOTIFICATION_ERROR_POLLING_INTERVAL,
  NOTIFICATION_POLLING_INTERVAL,
  RECEIVE_TIMEOUT,
  STATE_POLLING_INTERVAL,
} from '../config/polling'

export const useConnectionProblem = (): string | null => {
  const pollingError = useNotificationPolling(
    RECEIVE_TIMEOUT,
    NOTIFICATION_POLLING_INTERVAL,
    NOTIFICATION_ERROR_POLLING_INTERVAL,
  )
  const instance = useGetStateInstanceQuery(undefined, { pollingInterval: STATE_POLLING_INTERVAL })

  if (pollingError) return `Нет связи с GREEN-API: ${errorMessage(pollingError)}. Повторяем попытку…`
  return instance.isSuccess ? describeInstanceState(instance.data) : null
}
