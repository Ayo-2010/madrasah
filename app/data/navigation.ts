import { programmes } from '~/data/programmes'

export interface NavigationLink {
  label: string
  to: string
  description?: string
  icon?: string
}

export interface NavigationGroup {
  label: string
  children: NavigationLink[]
  to?: string
}

export const programmeNav: NavigationLink[] = [
  {
    label: 'All programmes',
    to: '/programmes',
    description: 'Compare every programme we offer',
    icon: 'i-lucide-layout-grid',
  },
  ...programmes.map(programme => ({
    label: programme.shortTitle,
    to: `/programmes/${programme.slug}`,
    description: programme.tagline,
    icon: programme.icon,
  })),
]

export const moreNav: NavigationLink[] = [
  { label: 'Events', to: '/events', description: 'Upcoming learning and community activities' },
  { label: 'Gallery', to: '/gallery', description: 'A view of our learning environment' },
  { label: 'Facilities', to: '/facilities', description: 'The spaces and resources we use' },
  { label: 'FAQ', to: '/faq', description: 'Answers to common questions' },
]

export const desktopNav: Array<NavigationLink | NavigationGroup> = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes', children: programmeNav },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'More', children: moreNav },
  { label: 'Contact', to: '/contact' },
]

export const mobileNav: Array<NavigationLink | NavigationGroup> = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes', children: programmeNav },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]
