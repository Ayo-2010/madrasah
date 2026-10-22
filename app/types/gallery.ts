export const GALLERY_CATEGORIES = [
  'classes',
  'recitation',
  'facilities',
  'events',
  'achievements',
] as const

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption: string
  category: GalleryCategory
  /** True when the image is illustrative artwork rather than a photograph of the Madrasah. */
  illustrative: boolean
}
