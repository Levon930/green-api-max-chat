import type { ChatEvent, MessageDirection, MessageStatus } from '@/entities/chat'
import { chatIdToPhone } from '@/shared/lib'
import type { NotificationEvent } from '../model/types'

interface WebhookBody {
  typeWebhook?: string
  timestamp?: number
  idMessage?: string
  chatId?: string
  status?: string
  stateInstance?: string
  senderData?: {
    chatId?: string
    chatName?: string
    senderName?: string
    senderPhoneNumber?: number | string
  }
  messageData?: {
    typeMessage?: string
    textMessageData?: { textMessage?: string }
    extendedTextMessageData?: { text?: string }
    fileMessageData?: { caption?: string }
  }
}

const DIRECTIONS: Partial<Record<string, MessageDirection>> = {
  incomingMessageReceived: 'incoming',
  outgoingMessageReceived: 'outgoing',
  outgoingAPIMessageReceived: 'outgoing',
}

const STATUSES: Partial<Record<string, MessageStatus>> = {
  sent: 'sent',
  delivered: 'delivered',
  read: 'read',
  failed: 'failed',
  noAccount: 'failed',
}

const ATTACHMENT_LABELS: Partial<Record<string, string>> = {
  imageMessage: 'Фото',
  videoMessage: 'Видео',
  audioMessage: 'Аудио',
  documentMessage: 'Файл',
  stickerMessage: 'Стикер',
  locationMessage: 'Геолокация',
  contactMessage: 'Контакт',
}

const describeAttachment = (data: NonNullable<WebhookBody['messageData']>, typeMessage: string): string => {
  const label = `[${ATTACHMENT_LABELS[typeMessage] ?? 'Неподдерживаемое сообщение'}]`
  const caption = data.fileMessageData?.caption
  return caption ? `${label} ${caption}` : label
}

const extractText = (data: WebhookBody['messageData']): string | null => {
  if (!data?.typeMessage) return null
  switch (data.typeMessage) {
    case 'textMessage':
      return data.textMessageData?.textMessage ?? null
    case 'extendedTextMessage':
    case 'quotedMessage':
      return data.extendedTextMessageData?.text ?? null
    default:
      return describeAttachment(data, data.typeMessage)
  }
}

const parseStatus = (body: WebhookBody): ChatEvent | null => {
  const status = STATUSES[body.status ?? '']
  if (!status || !body.idMessage || !body.chatId) return null
  return { type: 'status', chatId: body.chatId, idMessage: body.idMessage, status }
}

const parseMessage = (body: WebhookBody): ChatEvent | null => {
  const direction = DIRECTIONS[body.typeWebhook ?? '']
  const chatId = body.senderData?.chatId
  if (!direction || !chatId || !body.idMessage) return null

  const text = extractText(body.messageData)
  if (text === null) {
    return direction === 'outgoing' ? { type: 'status', chatId, idMessage: body.idMessage, status: 'sent' } : null
  }

  const incoming = direction === 'incoming'
  const senderPhone = incoming && body.senderData?.senderPhoneNumber ? String(body.senderData.senderPhoneNumber) : undefined
  return {
    type: 'message',
    chatId,
    phone: senderPhone ?? chatIdToPhone(chatId) ?? undefined,
    name: incoming ? body.senderData?.chatName || body.senderData?.senderName || undefined : undefined,
    message: {
      id: body.idMessage,
      text,
      direction,
      timestamp: body.timestamp ? body.timestamp * 1000 : Date.now(),
      ...(incoming ? {} : { status: 'sent' as const }),
    },
  }
}

export const parseNotification = (raw: unknown): NotificationEvent | null => {
  if (!raw || typeof raw !== 'object') return null
  const body = raw as WebhookBody
  switch (body.typeWebhook) {
    case 'stateInstanceChanged':
      return body.stateInstance ? { type: 'instanceState', state: body.stateInstance } : null
    case 'outgoingMessageStatus':
      return parseStatus(body)
    default:
      return parseMessage(body)
  }
}
