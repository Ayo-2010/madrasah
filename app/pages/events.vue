<script setup lang="ts">
import { events } from '~/data/events'
import { pageTitle } from '~/composables/usePageSeo'
import { isUpcomingEvent } from '~/utils/seo'

usePageSeo({
  title: pageTitle('Events & Activities'),
  description:
    'Upcoming lectures, Qur’an programmes and community learning activities at our Madrasah. Contact the administration for current dates and registration.',
  path: '/events',
})

const upcomingEvents = computed(() =>
  [...events]
    .filter(event => isUpcomingEvent(event.date, event.endDate))
    .sort((a, b) => a.date.localeCompare(b.date)),
)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Community and learning"
      title="Events & Activities"
      description="Lectures, Qur’an programmes, seasonal learning and community gatherings will be listed here as dates are confirmed."
      :breadcrumbs="[{ label: 'Events' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Ask About Upcoming Events"
          message="Assalamu Alaikum. I would like to ask about upcoming events and activities at your Madrasah."
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
        <div
          v-if="upcomingEvents.length"
          class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <EventCard
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <div v-else>
          <EmptyState
            title="No upcoming events are listed at present."
            description="We only publish events once their dates and arrangements are confirmed. Message the administration to ask about upcoming lectures, seasonal programmes or community activities."
            icon="i-lucide-calendar-days"
          >
            <template #actions>
              <WhatsAppButton
                label="Ask About Upcoming Activities"
                message="Assalamu Alaikum. Please let me know about any upcoming events or activities at your Madrasah."
              />
              <PrimaryButton
                to="/programmes"
                variant="secondary"
              >
                View programmes
              </PrimaryButton>
            </template>
          </EmptyState>

          <div class="mt-10 grid gap-5 sm:grid-cols-3">
            <div class="border-t border-forest-900/10 pt-5">
              <h2 class="text-sm font-semibold text-forest-900">
                Educational gatherings
              </h2>
              <p class="mt-2 text-xs leading-6 text-slate-600">
                Talks and learning sessions will be announced with their topic, speaker where confirmed, date and format.
              </p>
            </div>
            <div class="border-t border-forest-900/10 pt-5">
              <h2 class="text-sm font-semibold text-forest-900">
                Qur’an activities
              </h2>
              <p class="mt-2 text-xs leading-6 text-slate-600">
                Recitation and memorisation activities are published only when arrangements are finalised.
              </p>
            </div>
            <div class="border-t border-forest-900/10 pt-5">
              <h2 class="text-sm font-semibold text-forest-900">
                Seasonal programmes
              </h2>
              <p class="mt-2 text-xs leading-6 text-slate-600">
                Ramadan and holiday programmes will appear here when dates and registration details are confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <ProgrammeEnquiryCTA
          title="Would you like to hear about the next event?"
          description="Send us a message and the administration will share details of upcoming activities when they are available."
          message="Assalamu Alaikum. I would like to hear about upcoming events at your Madrasah."
        />
      </div>
    </section>
  </div>
</template>
