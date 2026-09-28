import type { InstanceSettings } from '../model/types'

export const describeSettingsProblem = (settings: InstanceSettings | null | undefined): string | null => {
  if (!settings) return null
  if (settings.webhookUrl) {
    return `В настройках инстанса указан webhookUrl (${settings.webhookUrl}), поэтому уведомления уходят туда, а не в очередь`
  }
  if (settings.incomingWebhook !== 'yes') return 'В настройках инстанса выключены уведомления о входящих сообщениях'
  return null
}
