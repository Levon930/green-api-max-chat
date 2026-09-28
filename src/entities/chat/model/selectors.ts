import { createSelector } from '@reduxjs/toolkit'
import type { Chat } from './types'

const lastActivity = (chat: Chat): number => chat.messages.at(-1)?.timestamp ?? chat.createdAt

export const selectChats = (state: RootState) => state.chats.chats

export const selectSortedChats = createSelector([selectChats], (chats) =>
  chats.toSorted((a, b) => lastActivity(b) - lastActivity(a)),
)

export const selectActiveChat = (state: RootState): Chat | null =>
  state.chats.chats.find((chat) => chat.id === state.chats.activeChatId) ?? null
