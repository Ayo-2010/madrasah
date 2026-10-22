<script setup lang="ts">
import type { GalleryCategory } from '~/types/gallery'
import { GALLERY_CATEGORIES } from '~/types/gallery'
import { gallery } from '~/data/gallery'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Gallery'),
  description:
    'A visual gallery of our learning environment, Qur’an study, facilities and community activities. Current images are clearly labelled illustrative artwork.',
  path: '/gallery',
})

type FilterValue = 'all' | GalleryCategory

const labels: Record<GalleryCategory, string> = {
  classes: 'Classes',
  recitation: 'Recitation',
  facilities: 'Facilities',
  events: 'Events',
  achievements: 'Achievements',
}

const filters: { value: FilterValue, label: string }[] = [
  { value: 'all', label: 'All images' },
  ...GALLERY_CATEGORIES.map(category => ({
    value: category,
    label: labels[category],
  })),
]

const activeFilter = ref<FilterValue>('all')

const activeLabel = computed(() =>
  activeFilter.value === 'all' ? null : labels[activeFilter.value],
)

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeFilter.value),
)

function countFor(filter: FilterValue): number {
  return filter === 'all'
    ? gallery.length
    : gallery.filter(item => item.category === filter).length
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="A view of our learning"
      title="Gallery"
      description="Spaces, study and community life. Our gallery will grow as approved photographs of the Madrasah become available."
      :breadcrumbs="[{ label: 'Gallery' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Ask About the Madrasah"
          message="Assalamu Alaikum. I would like to learn more about the Madrasah and its learning environment."
        />
        <PrimaryButton
          to="/facilities"
          variant="secondary"
        >
          Explore facilities
        </PrimaryButton>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="rounded-2xl border border-gold/25 bg-gold-soft/20 p-5">
          <p class="flex items-start gap-2.5 text-xs leading-6 text-slate-600">
            <UIcon
              name="i-lucide-image"
              class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
              aria-hidden="true"
            />
            The images below are illustrative geometric artwork, not photographs of Madrasah activities. They are used until approved photographs can be published with appropriate consent. Each image is labelled so it cannot be mistaken for a real event.
          </p>
        </div>

        <div class="mt-8">
          <div
            class="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
            role="group"
            aria-label="Filter gallery by category"
          >
            <button
              v-for="filter in filters"
              :key="filter.value"
              type="button"
              class="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition"
              :class="activeFilter === filter.value
                ? 'border-forest-700 bg-forest-700 text-white'
                : 'border-forest-900/15 bg-white text-slate-600 hover:border-forest-700/30 hover:text-forest-900'"
              :aria-pressed="activeFilter === filter.value"
              @click="activeFilter = filter.value"
            >
              {{ filter.label }}
              <span
                class="text-[0.625rem]"
                :class="activeFilter === filter.value ? 'text-white/80' : 'text-slate-600'"
              >{{ countFor(filter.value) }}</span>
            </button>
          </div>
        </div>

        <p
          class="mt-5 text-xs text-slate-600"
          aria-live="polite"
        >
          Showing {{ filteredItems.length }} {{ filteredItems.length === 1 ? 'image' : 'images' }}{{ activeLabel ? ` in ${activeLabel}` : '' }}.
        </p>

        <div class="mt-5">
          <GalleryGrid
            v-if="filteredItems.length"
            :key="activeFilter"
            :items="filteredItems"
          />
          <EmptyState
            v-else
            title="No images in this category yet."
            description="Approved images will be added as they become available. In the meantime, you are welcome to ask us about the Madrasah directly."
            icon="i-lucide-image-off"
          >
            <template #actions>
              <WhatsAppButton label="Ask on WhatsApp" />
            </template>
          </EmptyState>
        </div>
      </div>
    </section>

    <section class="border-t border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading
            eyebrow="A growing record"
            title="Authentic images, published responsibly."
            description="We will only publish photographs that genuinely reflect the Madrasah, with permission where individuals are identifiable. For now, we have chosen labelled artwork over stock photography that could misrepresent our activities."
          />
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <WhatsAppButton
              label="Ask About the Madrasah"
              message="Assalamu Alaikum. I would like to learn more about your Madrasah."
            />
            <PrimaryButton
              to="/contact"
              variant="secondary"
            >
              Contact us
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
