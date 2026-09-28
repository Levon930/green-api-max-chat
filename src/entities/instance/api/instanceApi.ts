import { baseApi } from '@/shared/api'
import type { GreenApiCredentials } from '@/shared/api'
import type { InstanceSettings, InstanceState } from '../model/types'

type StateInstanceResponse = { stateInstance?: InstanceState } | null

const toInstanceState = (response: StateInstanceResponse) => response?.stateInstance ?? null

export const instanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStateInstance: build.query<InstanceState | null, void>({
      query: () => ({ method: 'getStateInstance' }),
      transformResponse: toInstanceState,
      providesTags: ['Instance'],
    }),

    checkCredentials: build.mutation<InstanceState | null, GreenApiCredentials>({
      query: (credentials) => ({ method: 'getStateInstance', credentials }),
      transformResponse: toInstanceState,
    }),

    getSettings: build.query<InstanceSettings | null, void>({
      query: () => ({ method: 'getSettings' }),
      providesTags: ['Settings'],
    }),

    setSettings: build.mutation<{ saveSettings: boolean } | null, InstanceSettings>({
      query: (body) => ({ method: 'setSettings', httpMethod: 'POST', body }),
      invalidatesTags: ['Settings', 'Instance'],
    }),
  }),
})

export const { useGetStateInstanceQuery, useGetSettingsQuery, useSetSettingsMutation } = instanceApi
