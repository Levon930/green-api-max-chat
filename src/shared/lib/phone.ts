const MIN_DIGITS = 10
const MAX_DIGITS = 15

export const normalizePhone = (input: string): string | null => {
  if (/[^\d\s()+-]/.test(input)) return null
  const digits = input.replace(/\D/g, '')
  if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) return null
  if (digits.length === 11 && digits.startsWith('8')) return `7${digits.slice(1)}`
  if (digits.length === 10 && digits.startsWith('9')) return `7${digits}`
  return digits
}

export const phoneToChatId = (phone: string): string => {
  return `${phone}@c.us`
}

export const chatIdToPhone = (chatId: string): string | null => {
  const match = /^(\d{10,15})@c\.us$/.exec(chatId)
  return match ? match[1] : null
}

export const formatPhone = (phone: string): string => {
  const ru = /^7(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(phone)
  if (ru) return `+7 ${ru[1]} ${ru[2]}-${ru[3]}-${ru[4]}`
  return `+${phone}`
}
