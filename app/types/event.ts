export interface MadrasahEvent {
  id: string
  title: string
  /** ISO date (YYYY-MM-DD). Past events are never displayed as upcoming. */
  date: string
  endDate?: string
  time?: string
  format: string
  location?: string
  description: string
  image?: string
  cta?: {
    label: string
    to?: string
    message?: string
  }
}
