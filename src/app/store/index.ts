import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { chatReducer } from '@/entities/chat'
import { sessionReducer } from '@/entities/session'
import { restoreSession } from '@/features/auth'
import { setupNotificationListener } from '@/features/receive-messages'
import { baseApi } from '@/shared/api'
import { listenerMiddleware } from '@/shared/model'
import { setupChatPersistence } from './persistChats'

const rootReducer = combineReducers({
  session: sessionReducer,
  chats: chatReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

setupNotificationListener()
setupChatPersistence()

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(baseApi.middleware),
  })
  store.dispatch(restoreSession())
  return store
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
