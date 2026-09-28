import { baseApi } from '@/shared/api'

const RESPONSE_GRACE_SECONDS = 10

export interface QueuedNotification {
  receiptId: number
  body: unknown
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    receiveNotification: build.query<QueuedNotification | null, number>({
      query: (receiveTimeout) => ({
        method: 'receiveNotification',
        suffix: `?receiveTimeout=${receiveTimeout}`,
        timeout: (receiveTimeout + RESPONSE_GRACE_SECONDS) * 1000,
      }),
      providesTags: ['Notification'],
    }),

    deleteNotification: build.mutation<{ result: boolean } | null, number>({
      query: (receiptId) => ({ method: 'deleteNotification', suffix: `/${receiptId}`, httpMethod: 'DELETE' }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const { useReceiveNotificationQuery } = notificationApi
