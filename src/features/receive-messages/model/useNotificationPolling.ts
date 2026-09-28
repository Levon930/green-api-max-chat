import { useState } from 'react'
import { useReceiveNotificationQuery } from '../api/notificationApi'

export const useNotificationPolling = (receiveTimeout: number, pollingInterval: number, errorPollingInterval: number) => {
  const [failing, setFailing] = useState(false)
  const { error } = useReceiveNotificationQuery(receiveTimeout, {
    pollingInterval: failing ? errorPollingInterval : pollingInterval,
  })

  if (Boolean(error) !== failing) setFailing(Boolean(error))
  return error
}
