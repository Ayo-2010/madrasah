export const FAQ_CATEGORIES = [
  'Admissions',
  'Programmes',
  'Fees',
  'Class schedules',
  'Online learning',
  'Learning materials',
  'Student progress',
  'Contact and location',
] as const

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]

export interface Faq {
  id: string
  question: string
  answer: string
  category: FaqCategory
  featured: boolean
}
