import { saveChats, selectChats } from '@/entities/chat'
import { selectCredentials } from '@/entities/session'
import { startAppListening } from '@/shared/model'

export const setupChatPersistence = () => {
  return startAppListening({
    predicate: (_, current, previous) => selectChats(current) !== selectChats(previous),
    effect: (_, { getState }) => {
      const state = getState()
      const credentials = selectCredentials(state)
      if (credentials) saveChats(credentials.idInstance, selectChats(state))
    },
  })
}
