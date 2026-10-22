import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { programmes } from '../app/data/programmes'
import { faqs } from '../app/data/faqs'
import { gallery } from '../app/data/gallery'
import { teachers } from '../app/data/teachers'
import { desktopNav, mobileNav, moreNav, programmeNav } from '../app/data/navigation'
import { madrasah } from '../app/config/madrasah'
import { isValidWhatsAppNumber } from '../app/utils/whatsapp'

describe('programme content', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = programmes.map(programme => programme.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('provides complete detail-page content', () => {
    for (const programme of programmes) {
      expect(programme.title.length).toBeGreaterThan(3)
      expect(programme.objectives.length).toBeGreaterThanOrEqual(4)
      expect(programme.topics.length).toBeGreaterThanOrEqual(3)
      expect(programme.methodology.length).toBeGreaterThanOrEqual(3)
      expect(programme.entryRequirements.length).toBeGreaterThan(0)
      expect(programme.materials.length).toBeGreaterThan(0)
      expect(programme.faqs.length).toBeGreaterThan(0)
      expect(programme.whatsappMessage).toContain('Assalamu Alaikum')
    }
  })

  it('does not publish unsupported completion guarantees', () => {
    for (const programme of programmes) {
      const text = JSON.stringify(programme).toLowerCase()
      expect(text).not.toMatch(/guarantee(d)? (completion|fluency|hifz)|\bwithin \d+ (weeks|months|years)\b/)
    }
  })
})

describe('navigation', () => {
  it('only links to internal routes', () => {
    const links = [
      ...programmeNav,
      ...moreNav,
      ...desktopNav.flatMap(item => ('children' in item ? item.children : [item])),
      ...mobileNav.flatMap(item => ('children' in item ? item.children : [item])),
    ]

    for (const link of links) {
      expect(link.to.startsWith('/')).toBe(true)
      expect(link.to).not.toContain('undefined')
    }
  })

  it('includes every programme in the programme menu', () => {
    for (const programme of programmes) {
      expect(programmeNav.some(link => link.to === `/programmes/${programme.slug}`)).toBe(true)
    }
  })
})

describe('FAQ content', () => {
  it('has unique IDs and complete answers', () => {
    const ids = faqs.map(faq => faq.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const faq of faqs) {
      expect(faq.question.length).toBeGreaterThan(10)
      expect(faq.answer.length).toBeGreaterThan(40)
    }
  })

  it('has featured answers for the homepage', () => {
    const featured = faqs.filter(faq => faq.featured)
    expect(featured.length).toBeGreaterThanOrEqual(5)
    expect(featured.length).toBeLessThanOrEqual(8)
  })
})

describe('gallery and media', () => {
  it('uses a known category and non-empty alt text for every item', () => {
    const categories = new Set(['classes', 'recitation', 'facilities', 'events', 'achievements'])
    for (const item of gallery) {
      expect(categories.has(item.category)).toBe(true)
      expect(item.alt.length).toBeGreaterThan(20)
      expect(item.caption.length).toBeGreaterThan(3)
    }
  })

  it('has all referenced local images on disk', () => {
    for (const item of gallery) {
      expect(existsSync(join(process.cwd(), 'public', item.src.replace(/^\//, '')))).toBe(true)
    }
  })

  it('marks illustrations honestly', () => {
    for (const item of gallery) {
      expect(item.illustrative).toBe(true)
    }
  })
})

describe('teacher profiles', () => {
  it('never publishes a name without a published profile', () => {
    for (const teacher of teachers) {
      if (teacher.name) {
        expect(teacher.profileStatus).toBe('published')
      }
    }
  })

  it('does not invent qualifications while profiles are pending', () => {
    for (const teacher of teachers.filter(entry => entry.profileStatus === 'pending')) {
      expect(teacher.qualifications).toHaveLength(0)
      expect(teacher.bio).toBeNull()
      expect(teacher.portrait).toBeNull()
    }
  })
})

describe('central configuration', () => {
  it('keeps a valid international WhatsApp number for development', () => {
    expect(isValidWhatsAppNumber(madrasah.contact.whatsappNumber)).toBe(true)
  })

  it('hides placeholder contact details from the public site', () => {
    expect(madrasah.contact.showWhatsAppNumber).toBe(false)
    expect(madrasah.contact.phone).toBeNull()
    expect(madrasah.contact.email).toBeNull()
    expect(madrasah.contact.address).toBeNull()
    expect(madrasah.contact.socials).toHaveLength(0)
  })

  it('flags the site URL as a placeholder until launch', () => {
    expect(madrasah.siteUrlIsPlaceholder).toBe(true)
  })
})
