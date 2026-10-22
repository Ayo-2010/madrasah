<script setup lang="ts">
import { pageTitle } from '~/composables/usePageSeo'
import { gallery } from '~/data/gallery'

usePageSeo({
  title: pageTitle('Facilities & Learning Environment'),
  description:
    'The learning environment we work to provide at our Madrasah — teaching spaces, Qur’an practice, reading resources, prayer facilities and online learning arrangements.',
  path: '/facilities',
})

const facilities = [
  {
    icon: 'i-lucide-door-open',
    title: 'Teaching spaces',
    image: '/images/gallery/study-arch.svg',
    alt: 'Illustrative artwork of an arched Islamic study niche in forest green, ivory and gold.',
    description:
      'Calm, uncluttered rooms arranged for focused reading, discussion and guided practice. Room arrangements are confirmed with students before the first lesson.',
  },
  {
    icon: 'i-lucide-book-open',
    title: 'Qur’an learning spaces',
    image: '/images/gallery/recitation-rays.svg',
    alt: 'Illustrative artwork of a golden medallion with radiating lines on an ivory background.',
    description:
      'Quiet settings for recitation and individual correction, where students can read aloud without distraction. Availability depends on the programme and timetable.',
  },
  {
    icon: 'i-lucide-library',
    title: 'Reading & study resources',
    image: '/images/gallery/library-shelf.svg',
    alt: 'Illustrative artwork of a stylised bookshelf with gold and ivory spines.',
    description:
      'Reference material and programme texts are recommended by teachers. Please ask which books or resources are provided and which you should bring.',
  },
  {
    icon: 'i-lucide-moon-star',
    title: 'Prayer and ablution',
    image: '/images/gallery/prayer-niche.svg',
    alt: 'Illustrative artwork of a geometric prayer niche in deep green and gold.',
    description:
      'Where available, prayer and ablution facilities support the practical side of learning. Please confirm current arrangements before your visit.',
  },
  {
    icon: 'i-lucide-building-2',
    title: 'Gathering spaces',
    image: '/images/gallery/courtyard-arches.svg',
    alt: 'Illustrative artwork of repeating horseshoe arches in deep green and gold.',
    description:
      'Shared areas for community learning, small gatherings and quiet conversation. The use of these spaces varies with the programme and term.',
  },
  {
    icon: 'i-lucide-monitor-check',
    title: 'Online learning',
    image: '/images/gallery/online-desk.svg',
    alt: 'Illustrative artwork of a desk with a screen and geometric arch motif.',
    description:
      'Where a programme can be taught online, lessons use a simple video setup and clear materials. Online availability is confirmed on enquiry.',
  },
]

const photoNote = gallery.every(item => item.illustrative)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Learning environment"
      title="Our Facilities"
      description="A learning environment should support attention, respect and practice. Here is how we think about the spaces and resources used for teaching."
      :breadcrumbs="[{ label: 'Facilities' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Ask About Facilities"
          message="Assalamu Alaikum. I would like to ask about the learning facilities and arrangements at your Madrasah."
        />
        <PrimaryButton
          to="/gallery"
          variant="secondary"
        >
          View the gallery
        </PrimaryButton>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div
          v-if="photoNote"
          class="mb-10 rounded-2xl border border-gold/25 bg-gold-soft/20 p-5"
        >
          <p class="flex items-start gap-2.5 text-xs leading-6 text-slate-600">
            <UIcon
              name="i-lucide-image"
              class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
              aria-hidden="true"
            />
            Images on this page are illustrative artwork, not photographs of the Madrasah. Approved photographs and confirmed facility details will be published with permission. Please ask the administration about current facilities before your visit.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
          <article
            v-for="facility in facilities"
            :key="facility.title"
            class="group overflow-hidden rounded-[1.5rem] border border-forest-900/10 bg-ivory"
          >
            <div class="relative aspect-[16/10] overflow-hidden">
              <img
                :src="facility.image"
                :alt="facility.alt"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
              >
              <span class="absolute top-4 right-4 rounded-full bg-forest-950/45 px-2.5 py-1 text-[0.5625rem] font-medium tracking-[0.08em] text-ivory/85 uppercase backdrop-blur">
                Illustration
              </span>
            </div>
            <div class="p-6 sm:p-7">
              <div class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    :name="facility.icon"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <h2 class="text-lg tracking-[-0.015em]">
                  {{ facility.title }}
                </h2>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                {{ facility.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="border-t border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="A respectful environment"
            title="Privacy and care come first."
            description="We do not publish identifiable photographs of children without appropriate permission. Any photograph of the Madrasah shown online should reflect genuine activities and be used with consent."
          />
          <div class="space-y-4 rounded-2xl border border-forest-900/10 bg-white p-6 sm:p-7">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-camera-off"
                class="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600"
                aria-hidden="true"
              />
              <p class="text-sm leading-6 text-slate-600">
                Current images are clearly labelled as illustrations, so they are never presented as real Madrasah activities.
              </p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-map-pin"
                class="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600"
                aria-hidden="true"
              />
              <p class="text-sm leading-6 text-slate-600">
                Venue details and directions are shared directly with enquirers once arrangements are discussed.
              </p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-message-circle"
                class="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600"
                aria-hidden="true"
              />
              <p class="text-sm leading-6 text-slate-600">
                Ask about access needs, prayer arrangements or anything else that would help you feel prepared.
              </p>
            </div>
            <WhatsAppButton
              label="Ask Before Your Visit"
              size="sm"
              class="mt-1"
              message="Assalamu Alaikum. I would like to ask about visiting your Madrasah and the current facilities."
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
