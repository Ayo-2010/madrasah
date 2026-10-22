<script setup lang="ts">
import type { Programme } from '~/types/programme'

defineProps<{ programme: Programme }>()

const whatsapp = useWhatsApp()
</script>

<template>
  <article class="group relative flex h-full flex-col rounded-[1.5rem] border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-forest-700/25 hover:shadow-soft focus-within:ring-2 focus-within:ring-forest-700/30 focus-within:ring-offset-2 sm:p-7">
    <div class="flex items-start justify-between gap-4">
      <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-ivory">
        <UIcon
          :name="programme.icon"
          class="h-5.5 w-5.5"
          aria-hidden="true"
        />
      </span>
      <span class="rounded-full border border-forest-900/10 px-2.5 py-1 text-[0.5625rem] font-semibold tracking-[0.12em] text-slate-600 uppercase">
        {{ programme.shortTitle }}
      </span>
    </div>

    <h3 class="mt-6 text-[1.35rem] leading-snug tracking-[-0.02em]">
      <NuxtLink
        :to="`/programmes/${programme.slug}`"
        class="after:absolute after:inset-0 after:rounded-[1.5rem] focus-visible:outline-none"
      >
        {{ programme.title }}
      </NuxtLink>
    </h3>

    <p class="mt-2.5 text-sm leading-7 text-slate-600">
      {{ programme.tagline }}
    </p>

    <p class="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-600">
      <UIcon
        name="i-lucide-users"
        class="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600"
        aria-hidden="true"
      />
      {{ programme.learnerGroup }}
    </p>

    <div class="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5 mt-6">
      <span class="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-forest-700">
        Learn more
        <UIcon
          name="i-lucide-arrow-right"
          class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>

      <a
        :href="whatsapp.link(programme.whatsappMessage)"
        target="_blank"
        rel="noopener noreferrer"
        class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-forest-900/10 bg-ivory text-forest-700 transition hover:border-forest-700/30 hover:bg-mint"
        :aria-label="`Ask about ${programme.title} on WhatsApp (opens in a new tab)`"
      >
        <WhatsAppIcon class="h-4 w-4" />
      </a>
    </div>
  </article>
</template>
