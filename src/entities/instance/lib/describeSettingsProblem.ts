import type { InstanceSettings } from '../model/types'

export const describeSettingsProblem = (settings: InstanceSettings | null | undefined): string | null => {
  if (!settings) return null
  if (settings.webhookUrl) {
    return `В настройках инстанса указан webhookUrl (${settings.webhookUrl}), поэтому уведомления уходят туда, а не в очередь. Входящие сообщения не будут приходить в чат`
  }
  if (settings.incomingWebhook !== 'yes') {
    return 'В настройках инстанса выключены уведомления о входящих сообщениях. Входящие сообщения не будут приходить в чат'
  }
  if (settings.outgoingWebhook === 'no') {
    return 'В настройках инстанса выключены уведомления о статусах сообщений. Отметки «доставлено» и «прочитано» не будут обновляться'
  }
  return null
}
