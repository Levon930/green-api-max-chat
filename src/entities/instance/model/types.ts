export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'starting'
  | 'suspended'
  | 'pendingPassword'

type Toggle = 'yes' | 'no'

export interface InstanceSettings {
  webhookUrl?: string
  incomingWebhook?: Toggle
  outgoingWebhook?: Toggle
  outgoingAPIMessageWebhook?: Toggle
  stateWebhook?: Toggle
}
