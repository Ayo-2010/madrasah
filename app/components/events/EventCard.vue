<script setup lang="ts">
import type { MadrasahEvent } from '~/types/event'
import { formatEventDate } from '~/utils/seo'

defineProps<{ event: MadrasahEvent }>()

const whatsapp = useWhatsApp()
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-card">
    <div
      v-if="event.image"
      class="aspect-[16/9] overflow-hidden bg-mint"
    >
      <img
        :src="event.image"
        :alt="`Illustration for ${event.title}`"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        width="800"
        height="450"
      >
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span class="inline-flex items-center gap-1.5 font-medium text-forest-700">
          <UIcon
            name="i-lucide-calendar-days"
            class="h-3.5 w-3.5"
            aria-hidden="true"
          />
          <time :datetime="event.date">{{ formatEventDate(event.date) }}</time>
        </span>
        <span class="inline-flex items-center gap-1.5">
          <UIcon
            name="i-lucide-map-pin"
            class="h-3.5 w-3.5"
            aria-hidden="true"
          />
          {{ event.location || event.format }}
        </span>
      </div>

      <h3 class="mt-4 text-xl leading-snug tracking-[-0.02em]">
        {{ event.title }}
      </h3>
      <p class="mt-2.5 text-sm leading-7 text-slate-600">
        {{ event.description }}
      </p>

      <div class="mt-auto pt-6">
        <NuxtLink
          v-if="event.cta?.to"
          :to="event.cta.to"
          class="btn-secondary btn-sm"
        >
          {{ event.cta.label }}
        </NuxtLink>
        <a
          v-else-if="event.cta?.message"
          :href="whatsapp.link(event.cta.message)"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary btn-sm"
        >
          {{ event.cta.label }}
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  </article>
</template>
