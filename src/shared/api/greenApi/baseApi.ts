import { createApi } from '@reduxjs/toolkit/query/react'
import { greenApiBaseQuery } from './baseQuery'

export const baseApi = createApi({
  reducerPath: 'greenApi',
  baseQuery: greenApiBaseQuery,
  tagTypes: ['Instance', 'Settings', 'Notification'],
  endpoints: () => ({}),
})
