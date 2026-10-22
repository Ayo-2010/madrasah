<script setup lang="ts">
import type { FaqCategory } from '~/types/faq'
import { FAQ_CATEGORIES } from '~/types/faq'
import { faqs } from '~/data/faqs'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Frequently Asked Questions'),
  description:
    'Answers about admissions, programmes, fees, class schedules, online learning, materials, student progress and contacting our Madrasah.',
  path: '/faq',
})

type FilterValue = 'all' | FaqCategory

const activeCategory = ref<FilterValue>('all')
const query = ref('')

const filters: { value: FilterValue, label: string }[] = [
  { value: 'all', label: 'All questions' },
  ...FAQ_CATEGORIES.map(category => ({ value: category, label: category })),
]

const filteredFaqs = computed(() => {
  const search = query.value.trim().toLowerCase()

  return faqs.filter((faq) => {
    const matchesCategory = activeCategory.value === 'all' || faq.category === activeCategory.value
    const matchesQuery = !search
      || faq.question.toLowerCase().includes(search)
      || faq.answer.toLowerCase().includes(search)

    return matchesCategory && matchesQuery
  })
})

const filterKey = computed(() => `${activeCategory.value}-${query.value.trim().toLowerCase()}`)

function countFor(filter: FilterValue): number {
  return filter === 'all'
    ? faqs.length
    : faqs.filter(faq => faq.category === filter).length
}

function clearFilters() {
  activeCategory.value = 'all'
  query.value = ''
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Help and information"
      title="Frequently Asked Questions"
      description="Practical answers about programmes, admissions, schedules and contacting the Madrasah. If your question is not covered here, please ask us directly."
      :breadcrumbs="[{ label: 'FAQ' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Ask Your Own Question"
          message="Assalamu Alaikum. I have a question about your Madrasah that is not answered on the website."
        />
        <PrimaryButton
          to="/admissions"
          variant="secondary"
        >
          Admissions information
        </PrimaryButton>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div class="min-w-0">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="relative w-full sm:max-w-xs">
                <label
                  for="faq-search"
                  class="sr-only"
                >Search frequently asked questions</label>
                <UIcon
                  name="i-lucide-search"
                  class="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-600"
                  aria-hidden="true"
                />
                <input
                  id="faq-search"
                  v-model="query"
                  type="search"
                  placeholder="Search questions…"
                  class="field-input pl-10"
                >
              </div>
              <p class="text-xs text-slate-600">
                {{ filteredFaqs.length }} of {{ faqs.length }} answers
              </p>
            </div>

            <div
              class="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
              role="group"
              aria-label="Filter questions by category"
            >
              <button
                v-for="filter in filters"
                :key="filter.value"
                type="button"
                class="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-medium transition"
                :class="activeCategory === filter.value
                  ? 'border-forest-700 bg-forest-700 text-white'
                  : 'border-forest-900/15 bg-ivory text-slate-600 hover:border-forest-700/30 hover:text-forest-900'"
                :aria-pressed="activeCategory === filter.value"
                @click="activeCategory = filter.value"
              >
                {{ filter.label }}
                <span
                  class="text-[0.5625rem]"
                  :class="activeCategory === filter.value ? 'text-white/80' : 'text-slate-600'"
                >{{ countFor(filter.value) }}</span>
              </button>
            </div>

            <div
              class="mt-8"
              aria-live="polite"
            >
              <h2 class="sr-only">
                Questions and answers
              </h2>
              <FAQAccordion
                v-if="filteredFaqs.length"
                :key="filterKey"
                :items="filteredFaqs"
              />
              <EmptyState
                v-else
                title="No matching questions."
                description="Try a different search term or category, or send your question to the administration on WhatsApp."
                icon="i-lucide-search-x"
              >
                <template #actions>
                  <button
                    type="button"
                    class="btn-secondary btn-sm"
                    @click="clearFilters"
                  >
                    Clear filters
                  </button>
                  <WhatsAppButton
                    label="Ask on WhatsApp"
                    size="sm"
                    message="Assalamu Alaikum. I have a question about your Madrasah."
                  />
                </template>
              </EmptyState>
            </div>
          </div>

          <aside class="space-y-5">
            <div class="rounded-2xl border border-forest-900/10 bg-ivory p-6">
              <h2 class="text-lg tracking-[-0.015em]">
                Ask the administration
              </h2>
              <p class="mt-2 text-xs leading-6 text-slate-600">
                Fees, class times and availability are confirmed individually so you receive current information.
              </p>
              <WhatsAppButton
                label="Chat With Us on WhatsApp"
                size="sm"
                block
                class="mt-4"
                message="Assalamu Alaikum. I have a question about your Madrasah."
              />
            </div>

            <div class="rounded-2xl border border-forest-900/10 bg-white p-6">
              <h2 class="text-sm font-semibold text-forest-900">
                Useful pages
              </h2>
              <ul class="mt-3 space-y-2.5">
                <li
                  v-for="link in [
                    { label: 'Admissions process', to: '/admissions' },
                    { label: 'Programmes', to: '/programmes' },
                    { label: 'Contact information', to: '/contact' },
                    { label: 'Privacy policy', to: '/privacy-policy' },
                  ]"
                  :key="link.to"
                >
                  <NuxtLink
                    :to="link.to"
                    class="group flex items-center justify-between gap-2 text-xs text-slate-600 transition hover:text-forest-900"
                  >
                    {{ link.label }}
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="h-3.5 w-3.5 text-forest-600 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="rounded-xl border border-gold/25 bg-gold-soft/20 p-4">
              <p class="text-[0.6875rem] leading-5 text-slate-600">
                Answers reflect general programme information. Specific arrangements, fees and dates must be confirmed with the administration.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
