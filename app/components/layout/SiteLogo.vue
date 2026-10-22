<script setup lang="ts">
import { madrasah } from '~/config/madrasah'

withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'light'
  showTagline?: boolean
}>(), {
  size: 'md',
  tone: 'default',
  showTagline: true,
})

const markSize = computed(() => ({ sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' }))
const nameSize = computed(() => ({
  sm: 'text-[0.95rem]',
  md: 'text-lg',
  lg: 'text-2xl',
}))
</script>

<template>
  <NuxtLink
    to="/"
    class="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-offset-4"
    :aria-label="`${madrasah.name} — home`"
  >
    <span
      class="relative shrink-0"
      :class="markSize[size]"
    >
      <img
        v-if="madrasah.logo"
        :src="madrasah.logo"
        :alt="`${madrasah.name} logo`"
        class="h-full w-full object-contain"
        width="56"
        height="56"
      >
      <svg
        v-else
        viewBox="0 0 48 48"
        class="h-full w-full"
        aria-hidden="true"
      >
        <rect
          width="48"
          height="48"
          rx="14"
          :fill="tone === 'light' ? '#FAF8F1' : '#123C2F'"
        />
        <rect
          x="3.5"
          y="3.5"
          width="41"
          height="41"
          rx="11"
          fill="none"
          :stroke="tone === 'light' ? '#C5A45D' : '#C5A45D'"
          stroke-opacity="0.55"
          stroke-width="0.9"
        />
        <path
          d="M15 33.5V22.6C15 18.4 19.03 15 24 15s9 3.4 9 7.6v10.9"
          fill="none"
          :stroke="tone === 'light' ? '#176B4D' : '#E6D8B4'"
          stroke-width="1.35"
          stroke-linecap="round"
        />
        <path
          d="M16 31.8c3.2-1.05 5.8-.7 8 1.05 2.2-1.75 4.8-2.1 8-1.05v3.6c-3.2-1.05-5.8-.7-8 1.05-2.2-1.75-4.8-2.1-8-1.05z"
          :fill="tone === 'light' ? '#176B4D' : '#C5A45D'"
        />
        <path
          d="M24 32.85v3.6"
          :stroke="tone === 'light' ? '#FAF8F1' : '#123C2F'"
          stroke-width="1"
          stroke-linecap="round"
        />
        <circle
          cx="24"
          cy="10.5"
          r="1.35"
          fill="#C5A45D"
        />
      </svg>
    </span>

    <span class="flex flex-col">
      <span
        class="font-display leading-tight font-semibold tracking-[-0.015em]"
        :class="[nameSize[size], tone === 'light' ? 'text-ivory' : 'text-forest-900']"
      >
        {{ madrasah.name }}
      </span>
      <span
        v-if="showTagline"
        class="mt-0.5 hidden text-[0.5625rem] font-medium tracking-[0.18em] uppercase sm:block"
        :class="tone === 'light' ? 'text-ivory/65' : 'text-slate-600'"
      >
        {{ madrasah.tagline }}
      </span>
    </span>
  </NuxtLink>
</template>
