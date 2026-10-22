<script setup lang="ts">
import { programmes } from '~/data/programmes'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Islamic Programmes & Classes'),
  description:
    'Explore Qur’an memorisation, Tajweed, Arabic language, Islamic studies and children’s Islamic education at our Madrasah. Enquire about placement and class arrangements.',
  path: '/programmes',
})

const considerations = [
  {
    icon: 'i-lucide-user-round-search',
    title: 'Placement comes first',
    text: 'Age and prior study help us suggest a starting point that suits the learner. Beginners are welcome.',
  },
  {
    icon: 'i-lucide-calendar-clock',
    title: 'Arrangements confirmed',
    text: 'Class days, formats and fees are discussed directly so you receive current, accurate information.',
  },
  {
    icon: 'i-lucide-route',
    title: 'Clear progression',
    text: 'Each programme has defined objectives and a sequence, with regular review rather than rushed advancement.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Learning pathways"
      title="Our Programmes"
      description="Structured Islamic education for children, teenagers and adults — taught with clarity, patience and attention to each learner."
      :breadcrumbs="[{ label: 'Programmes' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Discuss the Right Programme"
          message="Assalamu Alaikum. I would like help choosing the right programme at your Madrasah."
        />
        <PrimaryButton
          to="/admissions"
          variant="secondary"
        >
          Admissions information
        </PrimaryButton>
      </template>
    </PageHero>

    <section class="bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHeading
            eyebrow="Start here"
            title="Find a pathway that fits the learner."
            description="Our programmes are connected by the same care for sound knowledge and good character, but each has its own focus, pace and entry guidance."
          />
          <div class="grid gap-5 sm:grid-cols-3">
            <div
              v-for="item in considerations"
              :key="item.title"
              class="border-t border-forest-900/10 pt-4"
            >
              <UIcon
                :name="item.icon"
                class="h-5 w-5 text-forest-600"
                aria-hidden="true"
              />
              <h2 class="mt-3 text-sm font-semibold text-forest-900">
                {{ item.title }}
              </h2>
              <p class="mt-1.5 text-xs leading-6 text-slate-600">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 lg:mt-16">
          <ProgrammeGrid :programmes="programmes" />
        </div>

        <p class="mt-6 text-xs leading-6 text-slate-600">
          Programme availability depends on current class numbers and placement. Sending an enquiry does not reserve a place.
        </p>
      </div>
    </section>

    <section class="border-t border-forest-900/[0.07] bg-white">
      <div class="container-page py-16 lg:py-20">
        <ProgrammeEnquiryCTA
          title="Not sure which programme is the right fit?"
          description="Tell us the learner’s age, experience and learning goals. We will recommend a suitable starting point and explain the current arrangements."
          message="Assalamu Alaikum. I would like advice on choosing the right programme for a student."
        />
      </div>
    </section>
  </div>
</template>
