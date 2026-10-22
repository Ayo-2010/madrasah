import { madrasah } from '~/config/madrasah'
import {
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
  formatWhatsAppNumber,
  isValidWhatsAppNumber,
} from '~/utils/whatsapp'

/**
 * Central WhatsApp helper. Every contact action in the site goes through this
 * composable so the number, URL encoding and fallback behaviour stay consistent.
 */
export function useWhatsApp() {
  const isConfigured = computed(() => isValidWhatsAppNumber(madrasah.contact.whatsappNumber))

  const displayNumber = computed(() =>
    madrasah.contact.showWhatsAppNumber
      ? formatWhatsAppNumber(madrasah.contact.whatsappNumber)
      : null,
  )

  /**
   * Returns the WhatsApp conversation URL for a message, or the contact page
   * when no valid number is configured. Never returns a malformed wa.me link.
   */
  function link(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
    return buildWhatsAppUrl(madrasah.contact.whatsappNumber, message) ?? '/contact'
  }

  function isExternal(message?: string): boolean {
    return buildWhatsAppUrl(madrasah.contact.whatsappNumber, message) !== null
  }

  return {
    defaultMessage: DEFAULT_WHATSAPP_MESSAGE,
    isConfigured,
    displayNumber,
    link,
    isExternal,
  }
}
