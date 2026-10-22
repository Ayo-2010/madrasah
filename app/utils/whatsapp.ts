export const DEFAULT_WHATSAPP_MESSAGE
  = 'Assalamu Alaikum. I would like to enquire about your Madrasah, its programmes, and the admission process. Kindly provide more information. Jazakumullahu Khairan.'

const MAX_MESSAGE_LENGTH = 2000

/**
 * Removes spaces, punctuation and a leading plus sign from a WhatsApp number.
 * The number must include its country code.
 */
export function normaliseWhatsAppNumber(value: string | null | undefined): string {
  return (value ?? '').replace(/\D/g, '')
}

/**
 * Validates an international WhatsApp number.
 * WhatsApp requires the full international number without a leading zero.
 */
export function isValidWhatsAppNumber(value: string | null | undefined): boolean {
  const number = normaliseWhatsAppNumber(value)
  return /^[1-9]\d{7,14}$/.test(number)
}

/**
 * Builds a wa.me link with a safely URL-encoded message.
 * Returns null when the configured number is missing or invalid so callers can
 * provide a truthful fallback rather than emitting a broken contact link.
 */
export function buildWhatsAppUrl(
  number: string | null | undefined,
  message: string = DEFAULT_WHATSAPP_MESSAGE,
): string | null {
  if (!isValidWhatsAppNumber(number)) return null

  const normalised = normaliseWhatsAppNumber(number)
  const trimmedMessage = (message ?? '').trim()
  const text = (trimmedMessage || DEFAULT_WHATSAPP_MESSAGE).slice(0, MAX_MESSAGE_LENGTH)

  return `https://wa.me/${normalised}?text=${encodeURIComponent(text)}`
}

/** Human-readable international number, used only when the owner opts in. */
export function formatWhatsAppNumber(value: string | null | undefined): string | null {
  const number = normaliseWhatsAppNumber(value)
  if (!isValidWhatsAppNumber(number)) return null

  // Nigerian numbers read best as +234 803 123 4567. Other numbers keep a
  // simple international format.
  if (number.startsWith('234') && number.length === 13) {
    return `+234 ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`
  }

  return `+${number}`
}

interface MessageField {
  label: string
  value: string | null | undefined
}

/**
 * Creates a concise, readable enquiry message from labelled form values.
 * Empty fields are omitted so the WhatsApp draft stays clean.
 */
export function buildStructuredMessage(
  intro: string,
  fields: MessageField[],
  closing = 'Kindly provide further information. Jazakumullahu Khairan.',
): string {
  const body = fields
    .filter(field => field.value && field.value.trim().length > 0)
    .map(field => `${field.label}: ${field.value!.trim()}`)
    .join('\n')

  return [intro.trim(), body, closing.trim()].filter(Boolean).join('\n\n')
}
