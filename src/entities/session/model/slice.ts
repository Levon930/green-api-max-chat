import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Credentials, SessionState } from './types'

const initialState: SessionState = { credentials: null }

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    sessionOpened(state, { payload }: PayloadAction<Credentials>) {
      state.credentials = payload
    },

    sessionClosed(state) {
      state.credentials = null
    },
  },
})

export const { sessionOpened, sessionClosed } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
