export interface ProgrammeTopic {
  title: string
  description: string
}

export interface ProgrammeFaq {
  question: string
  answer: string
}

export interface Programme {
  /** URL segment used at /programmes/[slug] */
  slug: string
  title: string
  shortTitle: string
  icon: string
  tagline: string
  description: string
  learnerGroup: string
  ages: string
  level: string
  format: string
  schedule: string | null
  objectives: string[]
  topics: ProgrammeTopic[]
  methodology: string[]
  entryRequirements: string[]
  materials: string[]
  faqs: ProgrammeFaq[]
  featured: boolean
  whatsappMessage: string
}
