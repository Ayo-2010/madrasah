<script setup lang="ts">
import { getProgramme, getRelatedProgrammes } from '~/data/programmes'
import { pageTitle } from '~/composables/usePageSeo'
import { madrasah } from '~/config/madrasah'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const programme = computed(() => getProgramme(slug.value))

if (!programme.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Programme not found',
  })
}

usePageSeo({
  title: pageTitle(programme.value.title),
  description: programme.value.description.slice(0, 155),
  path: `/programmes/${programme.value.slug}`,
})

const related = computed(() => getRelatedProgrammes(programme.value!.slug, 3))

const programmeFaqItems = computed(() =>
  programme.value?.faqs.map((faq, index) => ({
    id: `${programme.value!.slug}-faq-${index}`,
    ...faq,
  })) ?? [],
)

const quickFacts = computed(() => [
  { label: 'Who it is for', value: programme.value!.learnerGroup },
  { label: 'Age guidance', value: programme.value!.ages },
  { label: 'Level', value: programme.value!.level },
  { label: 'Format', value: programme.value!.format },
  { label: 'Schedule', value: programme.value!.schedule ?? 'Discussed on enquiry' },
])

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        'name': programme.value!.title,
        'description': programme.value!.description,
        'provider': {
          '@type': 'EducationalOrganization',
          'name': madrasah.name,
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="programme">
    <PageHero
      :eyebrow="`${programme.shortTitle} programme`"
      :title="programme.title"
      :description="programme.tagline"
      :breadcrumbs="[
        { label: 'Programmes', to: '/programmes' },
        { label: programme.title },
      ]"
    >
      <template #actions>
        <WhatsAppButton
          label="Enquire About This Programme"
          :message="programme.whatsappMessage"
        />
        <PrimaryButton
          to="/admissions"
          variant="secondary"
        >
          How to register
        </PrimaryButton>
      </template>

      <template #aside>
        <div class="w-64 rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
          <p class="text-[0.5625rem] font-semibold tracking-[0.18em] text-slate-600 uppercase">
            At a glance
          </p>
          <dl class="mt-4 space-y-3.5">
            <div>
              <dt class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                Learners
              </dt>
              <dd class="mt-0.5 text-xs leading-5 font-medium text-forest-900">
                {{ programme.learnerGroup }}
              </dd>
            </div>
            <div>
              <dt class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                Level
              </dt>
              <dd class="mt-0.5 text-xs leading-5 font-medium text-forest-900">
                {{ programme.level }}
              </dd>
            </div>
            <div>
              <dt class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                Format
              </dt>
              <dd class="mt-0.5 text-xs leading-5 text-slate-600">
                {{ programme.format }}
              </dd>
            </div>
          </dl>
        </div>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div class="min-w-0">
            <div class="max-w-3xl">
              <p class="eyebrow">
                <span
                  class="h-px w-6 bg-current opacity-60"
                  aria-hidden="true"
                />
                The programme
              </p>
              <p class="mt-4 font-display text-[1.5rem] leading-[1.5] tracking-[-0.015em] text-forest-900 sm:text-[1.75rem]">
                {{ programme.description }}
              </p>
            </div>

            <!-- Objectives -->
            <section class="mt-14">
              <h2 class="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">
                What students work towards
              </h2>
              <ul class="mt-6 grid gap-3 sm:grid-cols-2">
                <li
                  v-for="objective in programme.objectives"
                  :key="objective"
                  class="flex items-start gap-3 rounded-xl border border-forest-900/[0.08] bg-ivory p-4"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                    aria-hidden="true"
                  />
                  <span class="text-sm leading-6 text-slate-600">{{ objective }}</span>
                </li>
              </ul>
            </section>

            <!-- Topics -->
            <section class="mt-14">
              <h2 class="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">
                Topics covered
              </h2>
              <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                The exact sequence is adapted to the learner’s level and the teacher’s assessment. These are the core areas of study.
              </p>
              <div class="mt-6 divide-y divide-forest-900/10 border-y border-forest-900/10">
                <div
                  v-for="(topic, index) in programme.topics"
                  :key="topic.title"
                  class="grid grid-cols-[2rem_1fr] gap-4 py-5"
                >
                  <span class="pt-0.5 font-display text-sm font-semibold text-gold-deep">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div>
                    <h3 class="text-base font-semibold text-forest-900">
                      {{ topic.title }}
                    </h3>
                    <p class="mt-1 text-sm leading-7 text-slate-600">
                      {{ topic.description }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Methodology -->
            <section class="mt-14">
              <h2 class="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">
                How lessons are taught
              </h2>
              <ol class="mt-6 space-y-5">
                <li
                  v-for="(step, index) in programme.methodology"
                  :key="step"
                  class="flex gap-4"
                >
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest-700/20 bg-forest-50 text-xs font-semibold text-forest-700">
                    {{ index + 1 }}
                  </span>
                  <p class="pt-1 text-sm leading-7 text-slate-600">
                    {{ step }}
                  </p>
                </li>
              </ol>
            </section>

            <!-- Entry and materials -->
            <div class="mt-14 grid gap-5 sm:grid-cols-2">
              <section class="rounded-2xl border border-forest-900/10 bg-ivory p-6">
                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-door-open"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <h2 class="mt-4 text-lg tracking-[-0.01em]">
                  Entry guidance
                </h2>
                <ul class="mt-3 space-y-2.5">
                  <li
                    v-for="requirement in programme.entryRequirements"
                    :key="requirement"
                    class="flex items-start gap-2 text-xs leading-6 text-slate-600"
                  >
                    <span
                      class="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest-600"
                      aria-hidden="true"
                    />
                    {{ requirement }}
                  </li>
                </ul>
              </section>

              <section class="rounded-2xl border border-forest-900/10 bg-ivory p-6">
                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-backpack"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <h2 class="mt-4 text-lg tracking-[-0.01em]">
                  What to bring
                </h2>
                <ul class="mt-3 space-y-2.5">
                  <li
                    v-for="material in programme.materials"
                    :key="material"
                    class="flex items-start gap-2 text-xs leading-6 text-slate-600"
                  >
                    <span
                      class="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest-600"
                      aria-hidden="true"
                    />
                    {{ material }}
                  </li>
                </ul>
              </section>
            </div>

            <!-- Programme FAQs -->
            <section
              v-if="programme.faqs.length"
              class="mt-14"
            >
              <h2 class="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">
                Common questions
              </h2>
              <div class="mt-6">
                <FAQAccordion
                  :items="programmeFaqItems"
                />
              </div>
            </section>

            <div class="mt-12 rounded-2xl border border-gold/25 bg-gold-soft/20 p-5">
              <p class="flex items-start gap-2.5 text-xs leading-6 text-slate-600">
                <UIcon
                  name="i-lucide-info"
                  class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                  aria-hidden="true"
                />
                We do not guarantee completion times or specific outcomes. Progress depends on the learner’s starting point, attendance and practice between lessons.
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-5">
            <div class="lg:sticky lg:top-28">
              <div class="rounded-2xl border border-forest-900/10 bg-ivory p-6">
                <p class="text-[0.5625rem] font-semibold tracking-[0.18em] text-slate-600 uppercase">
                  Programme details
                </p>
                <dl class="mt-4 divide-y divide-forest-900/10">
                  <div
                    v-for="fact in quickFacts"
                    :key="fact.label"
                    class="py-3 first:pt-0 last:pb-0"
                  >
                    <dt class="text-[0.625rem] font-medium tracking-[0.1em] text-slate-600 uppercase">
                      {{ fact.label }}
                    </dt>
                    <dd class="mt-1 text-[0.8125rem] leading-6 text-slate-700">
                      {{ fact.value }}
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="mt-5 rounded-2xl bg-forest-900 p-6 text-ivory">
                <h2 class="text-xl tracking-[-0.015em] !text-ivory">
                  Ask about this programme
                </h2>
                <p class="mt-2 text-xs leading-6 text-ivory/60">
                  We can explain current arrangements, fees and placement.
                </p>
                <WhatsAppButton
                  label="Chat With Us on WhatsApp"
                  variant="white"
                  size="sm"
                  block
                  class="mt-4"
                  :message="programme.whatsappMessage"
                />
                <NuxtLink
                  to="/admissions"
                  class="mt-3 flex items-center justify-between gap-2 text-xs font-medium text-gold-soft transition hover:text-white"
                >
                  Read the admissions process
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Related programmes -->
    <section class="border-t border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Keep exploring"
          title="Related programmes"
          description="Other pathways that may suit the same learner or complement this study."
        />
        <div class="mt-8">
          <ProgrammeGrid :programmes="related" />
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <ProgrammeEnquiryCTA
          :title="`Enquire about ${programme.title}`"
          :description="`Speak with the administration about placement, current class arrangements and the next steps for joining this programme.`"
          :message="programme.whatsappMessage"
        />
      </div>
    </section>
  </div>
</template>
