<script setup lang="ts">
import type { Programme } from '~/types/programme'

withDefaults(defineProps<{
  programmes: Programme[]
  columns?: 2 | 3
}>(), {
  columns: 3,
})
</script>

<template>
  <div
    class="grid gap-5 sm:grid-cols-2 lg:gap-6"
    :class="columns === 3 ? 'xl:grid-cols-3' : ''"
  >
    <ProgrammeCard
      v-for="programme in programmes"
      :key="programme.slug"
      :programme="programme"
    />
  </div>
</template>
