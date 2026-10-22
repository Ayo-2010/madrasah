<script setup lang="ts">
import { teachers } from '~/data/teachers'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Our Teaching Team'),
  description:
    'Meet the teaching areas at our Madrasah — Qur’an and Hifz, Tajweed, Arabic, Islamic studies and children’s education. Named profiles are published only with approval.',
  path: '/teachers',
})

const principles = [
  {
    icon: 'i-lucide-message-circle-question',
    title: 'Teaching with clarity',
    text: 'Lessons are explained in plain language, with room for questions and a clear sense of what is being learned and why.',
  },
  {
    icon: 'i-lucide-hand-heart',
    title: 'Correction with care',
    text: 'Mistakes are part of learning. Feedback is given respectfully, without embarrassment or unnecessary pressure.',
  },
  {
    icon: 'i-lucide-line-chart',
    title: 'Honest progress',
    text: 'Teachers review work regularly and speak truthfully about progress. We do not promise outcomes that cannot be guaranteed.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Teaching team"
      title="Our Teachers"
      description="Dedicated teaching across the Qur’an, Arabic and Islamic studies — with a shared commitment to sound knowledge, patient correction and good character."
      :breadcrumbs="[{ label: 'Teachers' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Ask About Our Teaching Team"
          message="Assalamu Alaikum. I would like to ask about the teaching team at your Madrasah."
        />
        <PrimaryButton
          to="/programmes"
          variant="secondary"
        >
          Explore programmes
        </PrimaryButton>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="rounded-2xl border border-gold/25 bg-gold-soft/20 p-5 sm:p-6">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gold-deep shadow-sm">
              <UIcon
                name="i-lucide-shield-check"
                class="h-4.5 w-4.5"
                aria-hidden="true"
              />
            </span>
            <div>
              <h2 class="text-base font-semibold text-forest-900">
                Profiles are published only after verification.
              </h2>
              <p class="mt-1 max-w-3xl text-xs leading-6 text-slate-600">
                We do not publish invented names, photographs, qualifications or ijazah details. Named teacher profiles and verified credentials will appear here as they are approved. In the meantime, the teaching areas below show how our team is organised.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-10">
          <TeacherGrid :teachers="teachers" />
        </div>
      </div>
    </section>

    <section class="border-y border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Our teaching principles"
          title="What students can expect from a teacher here."
          description="Subjects differ, but the standard of care is shared across our programmes."
        />
        <ul class="mt-9 grid gap-5 sm:grid-cols-3">
          <li
            v-for="principle in principles"
            :key="principle.title"
            class="rounded-2xl border border-forest-900/10 bg-white p-6"
          >
            <UIcon
              :name="principle.icon"
              class="h-5 w-5 text-forest-600"
              aria-hidden="true"
            />
            <h2 class="mt-4 text-base font-semibold tracking-[-0.01em] text-forest-900">
              {{ principle.title }}
            </h2>
            <p class="mt-2 text-xs leading-6 text-slate-600">
              {{ principle.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-10 rounded-[1.75rem] border border-forest-900/10 bg-ivory p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div class="max-w-2xl">
            <SectionHeading
              eyebrow="Contact"
              title="Have a question about a specific teacher or class?"
              description="The administration can tell you which teaching area suits your needs and what information is currently available. We do not share teachers’ personal contact details without their permission."
            />
          </div>
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <WhatsAppButton
              label="Speak With the Administration"
              message="Assalamu Alaikum. I have a question about the teaching team and classes at your Madrasah."
            />
            <PrimaryButton
              to="/contact"
              variant="secondary"
            >
              Contact page
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
