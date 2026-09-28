import { chatActions, loadChats } from '@/entities/chat'
import { describeInstanceState, instanceApi } from '@/entities/instance'
import {
  clearCredentials,
  loadCredentials,
  saveCredentials,
  sessionClosed,
  sessionOpened,
} from '@/entities/session'
import type { Credentials } from '@/entities/session'
import { baseApi, errorMessage } from '@/shared/api'
import type { AppThunk } from '@/shared/model'

const openSession =
  (credentials: Credentials): AppThunk =>
  (dispatch) => {
    dispatch(sessionOpened(credentials))
    dispatch(chatActions.chatsLoaded(loadChats(credentials.idInstance)))
  }

export const restoreSession = (): AppThunk => (dispatch) => {
  const credentials = loadCredentials()
  if (credentials) dispatch(openSession(credentials))
}

export const login =
  (credentials: Credentials): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const result = await dispatch(instanceApi.endpoints.checkCredentials.initiate(credentials, { track: false }))

    const problem = 'error' in result ? errorMessage(result.error) : describeInstanceState(result.data)
    if (problem) throw new Error(problem)

    saveCredentials(credentials)
    dispatch(openSession(credentials))
  }

export const logout = (): AppThunk => (dispatch) => {
  clearCredentials()
  dispatch(sessionClosed())
  dispatch(chatActions.chatsReset())
  dispatch(baseApi.util.resetApiState())
}
