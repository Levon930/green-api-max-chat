import { chatActions } from '@/entities/chat'
import { selectCredentials } from '@/entities/session'
import { baseApi, isGreenApiMeta } from '@/shared/api'
import { startAppListening } from '@/shared/model'
import { notificationApi } from '../api/notificationApi'
import { parseNotification } from '../lib/parseNotification'

export const setupNotificationListener = () => {
  return startAppListening({
    matcher: notificationApi.endpoints.receiveNotification.matchFulfilled,
    effect: async ({ payload, meta }, { dispatch, getState }) => {
      const credentials = selectCredentials(getState())
      if (!payload || !isGreenApiMeta(meta.baseQueryMeta) || meta.baseQueryMeta.idInstance !== credentials?.idInstance) {
        return
      }

      const event = parseNotification(payload.body)
      if (event?.type === 'instanceState') dispatch(baseApi.util.invalidateTags(['Instance']))
      else if (event) dispatch(chatActions.eventReceived({ event, now: Date.now() }))

      await dispatch(notificationApi.endpoints.deleteNotification.initiate(payload.receiptId, { track: false }))
    },
  })
}
