import type { GalleryItem } from '~/types/gallery'

/**
 * Gallery.
 *
 * Every item below is illustrative artwork, not a photograph of the Madrasah.
 * Replace each item with an approved photograph before launch, update the alt
 * text and caption, and set `illustrative` to false.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'study-arch',
    src: '/images/gallery/study-arch.svg',
    alt: 'Illustrative artwork of an arched Islamic study niche in forest green, ivory and gold.',
    caption: 'A quiet place for guided study',
    category: 'classes',
    illustrative: true,
  },
  {
    id: 'recitation-rays',
    src: '/images/gallery/recitation-rays.svg',
    alt: 'Illustrative artwork of a golden medallion with radiating lines on an ivory background.',
    caption: 'The discipline of recitation',
    category: 'recitation',
    illustrative: true,
  },
  {
    id: 'study-pair',
    src: '/images/gallery/study-pair.svg',
    alt: 'Illustrative artwork of two open books beneath a geometric arch.',
    caption: 'Learning side by side',
    category: 'classes',
    illustrative: true,
  },
  {
    id: 'courtyard-arches',
    src: '/images/gallery/courtyard-arches.svg',
    alt: 'Illustrative artwork of repeating horseshoe arches in deep green and gold.',
    caption: 'An arched place of learning',
    category: 'facilities',
    illustrative: true,
  },
  {
    id: 'library-shelf',
    src: '/images/gallery/library-shelf.svg',
    alt: 'Illustrative artwork of a stylised bookshelf with gold and ivory spines.',
    caption: 'A shelf of trusted texts',
    category: 'facilities',
    illustrative: true,
  },
  {
    id: 'community-star',
    src: '/images/gallery/community-star.svg',
    alt: 'Illustrative artwork of an eight-point star surrounded by smaller geometric stars.',
    caption: 'Gatherings for the community',
    category: 'events',
    illustrative: true,
  },
  {
    id: 'achievement-medallion',
    src: '/images/gallery/achievement-medallion.svg',
    alt: 'Illustrative artwork of a gold geometric medallion on a deep green background.',
    caption: 'Marking steady progress',
    category: 'achievements',
    illustrative: true,
  },
  {
    id: 'revision-pages',
    src: '/images/gallery/revision-pages.svg',
    alt: 'Illustrative artwork of layered book pages and a gold bookmark.',
    caption: 'Revision, day by day',
    category: 'recitation',
    illustrative: true,
  },
  {
    id: 'children-lantern',
    src: '/images/gallery/children-lantern.svg',
    alt: 'Illustrative artwork of a geometric lantern and small stars on a warm ivory background.',
    caption: 'Foundations for younger learners',
    category: 'classes',
    illustrative: true,
  },
]

export function galleryByCategory(category: GalleryItem['category']): GalleryItem[] {
  return gallery.filter(item => item.category === category)
}
