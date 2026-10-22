export interface PostalAddress {
  line1: string
  line2?: string
  city: string
  region?: string
  postcode?: string
  country: string
}

export interface OpeningHours {
  days: string
  hours: string
}

export interface SocialLink {
  label: string
  href: string
  /** Iconify name, for example i-lucide-facebook */
  icon: string
}

export interface Announcement {
  enabled: boolean
  text: string
  linkLabel: string
  to: string
}

export interface MadrasahConfig {
  name: string
  arabicName: string
  shortName: string
  tagline: string
  description: string
  siteUrl: string
  /** Set to false once the production domain is live. */
  siteUrlIsPlaceholder: boolean
  logo: string | null
  contact: {
    /**
     * International format, digits only, no plus sign and no spaces.
     * Nigerian example: 234 + number without the leading 0.
     * REPLACE BEFORE LAUNCH — this value is a development placeholder.
     */
    whatsappNumber: string
    /** Set true only when the WhatsApp number above is the institution's real number. */
    showWhatsAppNumber: boolean
    phone: string | null
    email: string | null
    address: PostalAddress | null
    openingHours: OpeningHours[]
    socials: SocialLink[]
    mapEmbedUrl: string | null
    mapLink: string | null
  }
  announcement: Announcement
  admissionsOpen: boolean
  /** Set false once approved photographs and biographies are in place. */
  isTemplateContent: boolean
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything institution-specific lives here. Replace the placeholder values
 * before launch. See CONTENT_CHECKLIST.md for the full list of owner inputs.
 *
 * The WhatsApp number is intentionally a placeholder. It is used to keep all
 * contact actions functional during development. It must never be published
 * as the Madrasah's real number.
 */
export const madrasah: MadrasahConfig = {
  name: 'Madrasah Al-Noor',
  arabicName: 'مدرسة النور',
  shortName: 'Al-Noor',
  tagline: 'Qur\'an · Knowledge · Character',
  description:
    'A community Islamic school teaching the Qur\'an, the Arabic language and the foundations of Islamic knowledge to children, teenagers and adults.',

  siteUrl: 'https://example-madrasah.org',
  siteUrlIsPlaceholder: true,

  logo: null,

  contact: {
    // TODO(owner): replace with the real international number, digits only.
    whatsappNumber: '2348000000000',
    showWhatsAppNumber: false,
    phone: null,
    email: null,
    address: null,
    openingHours: [],
    socials: [],
    mapEmbedUrl: null,
    mapLink: null,
  },

  announcement: {
    enabled: true,
    text: 'Admissions enquiries are open for the coming term.',
    linkLabel: 'Start an enquiry',
    to: '/admissions',
  },

  admissionsOpen: true,

  isTemplateContent: true,
}
