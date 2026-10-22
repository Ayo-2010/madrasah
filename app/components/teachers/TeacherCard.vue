<script setup lang="ts">
import type { Teacher } from '~/types/teacher'

defineProps<{ teacher: Teacher }>()

const icons: Record<string, string> = {
  'quran-hifz': 'i-lucide-book-marked',
  'tajweed': 'i-lucide-audio-lines',
  'arabic': 'i-lucide-languages',
  'islamic-studies': 'i-lucide-book-open-text',
  'children': 'i-lucide-sprout',
}

const arabicMarks: Record<string, string> = {
  'quran-hifz': 'ق',
  'tajweed': 'ت',
  'arabic': 'ع',
  'islamic-studies': 'ع',
  'children': 'ن',
}
</script>

<template>
  <article class="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-forest-700/25 hover:shadow-soft sm:p-7">
    <div class="flex items-start justify-between gap-4">
      <span
        class="arch-small relative flex h-16 w-14 items-end justify-center overflow-hidden bg-gradient-to-b from-forest-800 to-forest-950 pb-3"
        aria-hidden="true"
      >
        <span
          class="absolute top-2 font-arabic text-lg text-gold/60"
          lang="ar"
        >{{ arabicMarks[teacher.id] ?? 'ع' }}</span>
        <UIcon
          :name="icons[teacher.id] ?? 'i-lucide-graduation-cap'"
          class="h-4 w-4 text-ivory/75"
        />
      </span>
      <span class="mt-1 rounded-full bg-mint px-2.5 py-1 text-[0.5625rem] font-semibold tracking-[0.12em] text-forest-700 uppercase">
        Teaching area
      </span>
    </div>

    <h3 class="mt-5 text-xl leading-snug tracking-[-0.02em]">
      {{ teacher.name ?? teacher.role }}
    </h3>
    <p
      v-if="teacher.name"
      class="mt-1 text-xs font-medium text-forest-700"
    >
      {{ teacher.role }}
    </p>
    <p class="mt-3 text-sm leading-7 text-slate-600">
      {{ teacher.focus }}
    </p>

    <ul class="mt-5 flex flex-wrap gap-1.5">
      <li
        v-for="specialism in teacher.specialisms"
        :key="specialism"
        class="rounded-full border border-forest-900/10 bg-ivory px-2.5 py-1 text-[0.6875rem] text-slate-600"
      >
        {{ specialism }}
      </li>
    </ul>

    <p
      v-if="teacher.profileStatus === 'pending'"
      class="mt-auto flex items-start gap-2 border-t border-line pt-4 mt-6 text-[0.6875rem] leading-5 text-slate-600"
    >
      <UIcon
        name="i-lucide-info"
        class="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep"
        aria-hidden="true"
      />
      A named profile and verified credentials will be published with the teacher’s approval.
    </p>
  </article>
</template>
