<script setup lang="ts">
defineProps<{
  step: string
  title: string
  description: string
  last?: boolean
}>()
</script>

<template>
  <li class="relative flex gap-5 pb-9 last:pb-0">
    <div class="flex flex-col items-center">
      <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-700/20 bg-white font-display text-sm font-semibold text-forest-700 shadow-sm">
        {{ step }}
      </span>
      <span
        v-if="!last"
        class="mt-2 w-px flex-1 bg-gradient-to-b from-forest-700/25 to-forest-700/5"
        aria-hidden="true"
      />
    </div>

    <div class="pt-1.5">
      <h3 class="text-base font-semibold tracking-[-0.01em] text-forest-900">
        {{ title }}
      </h3>
      <p class="mt-1.5 max-w-xl text-sm leading-7 text-slate-600">
        {{ description }}
      </p>
    </div>
  </li>
</template>
