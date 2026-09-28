import { baseApi } from '@/shared/api'
import type { GreenApiCredentials } from '@/shared/api'
import type { InstanceSettings, InstanceState } from '../model/types'

export const instanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStateInstance: build.query<InstanceState | null, GreenApiCredentials>({
      query: (credentials) => ({ method: 'getStateInstance', credentials }),
      transformResponse: (response: { stateInstance?: InstanceState } | null) => response?.stateInstance ?? null,
      providesTags: ['Instance'],
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
