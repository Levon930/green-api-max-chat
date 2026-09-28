import { nanoid } from '@reduxjs/toolkit'
import { chatActions } from '@/entities/chat'
import type { Chat, Message } from '@/entities/chat'
import type { AppThunk } from '@/shared/model'
import { messageApi } from '../api/messageApi'

const deliver =
  (chat: Chat, localId: string, text: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const result = await dispatch(
      messageApi.endpoints.sendMessage.initiate({ chatId: chat.sendTo, message: text }, { track: false }),
    )
    if (result.data) dispatch(chatActions.messageSent({ chatId: chat.id, localId, idMessage: result.data.idMessage }))
    else dispatch(chatActions.messageFailed({ chatId: chat.id, localId }))
  }

export const sendMessage =
  (chat: Chat, text: string): AppThunk<Promise<void>> =>
  (dispatch) => {
    const message: Message = {
      id: `local-${nanoid()}`,
      text,
      direction: 'outgoing',
      timestamp: Date.now(),
      status: 'pending',
    }
    dispatch(chatActions.messageQueued({ chatId: chat.id, message }))
    return dispatch(deliver(chat, message.id, text))
  }

export const retryMessage =
  (chat: Chat, messageId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const message = chat.messages.find((item) => item.id === messageId)
    if (!message) return
    dispatch(chatActions.messageRetry({ chatId: chat.id, localId: messageId }))
    await dispatch(deliver(chat, messageId, message.text))
  }
