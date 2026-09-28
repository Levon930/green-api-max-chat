import { baseApi } from '@/shared/api'

export const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation<{ idMessage: string }, { chatId: string; message: string }>({
      query: (body) => ({ method: 'sendMessage', httpMethod: 'POST', body }),
      invalidatesTags: ['Notification'],
    }),
  }),
})
