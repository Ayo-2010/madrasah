import { describe, expect, it } from 'vitest'
import {
  DEFAULT_WHATSAPP_MESSAGE,
  buildStructuredMessage,
  buildWhatsAppUrl,
  formatWhatsAppNumber,
  isValidWhatsAppNumber,
  normaliseWhatsAppNumber,
} from '../app/utils/whatsapp'
import { formatEventDate, isUpcomingEvent, toAbsoluteUrl } from '../app/utils/seo'

describe('normaliseWhatsAppNumber', () => {
  it('removes spaces, punctuation and a leading plus', () => {
    expect(normaliseWhatsAppNumber('+234 803 123 4567')).toBe('2348031234567')
    expect(normaliseWhatsAppNumber('(234) 803-123-4567')).toBe('2348031234567')
  })

  it('handles empty values', () => {
    expect(normaliseWhatsAppNumber('')).toBe('')
    expect(normaliseWhatsAppNumber(null)).toBe('')
    expect(normaliseWhatsAppNumber(undefined)).toBe('')
  })
})

describe('isValidWhatsAppNumber', () => {
  it('accepts international numbers of a sensible length', () => {
    expect(isValidWhatsAppNumber('2348031234567')).toBe(true)
    expect(isValidWhatsAppNumber('+44 7700 900123')).toBe(true)
  })

  it('rejects numbers without a country code', () => {
    expect(isValidWhatsAppNumber('08031234567')).toBe(false)
  })

  it('rejects empty, short and overlong values', () => {
    expect(isValidWhatsAppNumber('')).toBe(false)
    expect(isValidWhatsAppNumber('1234567')).toBe(false)
    expect(isValidWhatsAppNumber('1234567890123456')).toBe(false)
    expect(isValidWhatsAppNumber('not a number')).toBe(false)
  })
})

describe('buildWhatsAppUrl', () => {
  it('returns null for invalid or missing configuration', () => {
    expect(buildWhatsAppUrl('')).toBeNull()
    expect(buildWhatsAppUrl('08031234567')).toBeNull()
    expect(buildWhatsAppUrl(null)).toBeNull()
  })

  it('builds a safe wa.me URL with an encoded message', () => {
    const message = 'Assalamu Alaikum. I\'d like to ask about tajweed & madd — line two.\nJazakumullahu Khairan.'
    const url = buildWhatsAppUrl('+234 803 123 4567', message)

    expect(url).not.toBeNull()
    const parsed = new URL(url!)
    expect(parsed.protocol).toBe('https:')
    expect(parsed.host).toBe('wa.me')
    expect(parsed.pathname).toBe('/2348031234567')
    expect(parsed.searchParams.get('text')).toBe(message)
    expect(url).not.toContain(' ')
    expect(url).not.toContain('\n')
  })

  it('preserves Arabic text and punctuation through encoding', () => {
    const message = 'اقرأ! هل يمكنكم مساعدتي؟ (شكراً)'
    const url = buildWhatsAppUrl('2348031234567', message)
    const text = new URL(url!).searchParams.get('text')
    expect(text).toBe(message)
  })

  it('uses the default message when the supplied message is blank', () => {
    const url = buildWhatsAppUrl('2348031234567', '   ')
    expect(new URL(url!).searchParams.get('text')).toBe(DEFAULT_WHATSAPP_MESSAGE)
  })

  it('does not create a URL from a malformed number', () => {
    expect(buildWhatsAppUrl('234-ABC-123')).toBeNull()
  })
})

describe('buildStructuredMessage', () => {
  it('omits empty fields and keeps a readable order', () => {
    const message = buildStructuredMessage(
      'Assalamu Alaikum. I would like to enquire.',
      [
        { label: 'Name', value: 'Amina' },
        { label: 'Age group', value: '' },
        { label: 'Programme', value: 'Tajweed' },
      ],
      'Jazakumullahu Khairan.',
    )

    expect(message).toBe(
      'Assalamu Alaikum. I would like to enquire.\n\nName: Amina\nProgramme: Tajweed\n\nJazakumullahu Khairan.',
    )
    expect(message).not.toContain('Age group')
  })
})

describe('formatWhatsAppNumber', () => {
  it('formats Nigerian numbers for display', () => {
    expect(formatWhatsAppNumber('2348031234567')).toBe('+234 803 123 4567')
  })

  it('falls back to a simple international format', () => {
    expect(formatWhatsAppNumber('447700900123')).toBe('+447700900123')
  })

  it('returns null for invalid values', () => {
    expect(formatWhatsAppNumber('123')).toBeNull()
  })
})

describe('SEO helpers', () => {
  it('joins absolute site URLs and rejects invalid origins', () => {
    expect(toAbsoluteUrl('https://example.org', '/about')).toBe('https://example.org/about')
    expect(toAbsoluteUrl('https://example.org/', 'about')).toBe('https://example.org/about')
    expect(toAbsoluteUrl('not-a-url', '/about')).toBeNull()
    expect(toAbsoluteUrl('', '/about')).toBeNull()
  })

  it('formats ISO event dates without timezone drift', () => {
    expect(formatEventDate('2026-10-22')).toBe('22 October 2026')
  })

  it('checks whether an event is still upcoming', () => {
    expect(isUpcomingEvent('2000-01-01')).toBe(false)
    expect(isUpcomingEvent('2099-01-01')).toBe(true)
    expect(isUpcomingEvent('2000-01-01', '2099-01-01')).toBe(true)
  })
})
