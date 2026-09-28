import type { ChatEvent } from '@/entities/chat'

export interface InstanceStateEvent {
  type: 'instanceState'
  state: string
}

export type NotificationEvent = ChatEvent | InstanceStateEvent
