import { useReceiveNotificationQuery } from '../api/notificationApi'

export const useNotificationPolling = (receiveTimeout: number, pollingInterval: number) => {
  const { error } = useReceiveNotificationQuery(receiveTimeout, { pollingInterval })
  return error
}
