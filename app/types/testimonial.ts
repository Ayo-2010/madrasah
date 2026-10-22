export interface Testimonial {
  id: string
  quote: string
  name: string
  relationship: string
  programme?: string
}

/**
 * Only add testimonials with the author's explicit permission.
 * Never fabricate reviews, names or ratings.
 */
export const testimonials: Testimonial[] = []
