<script setup lang="ts">
import type { Crumb } from '~/types/ui'

const props = withDefaults(defineProps<{
  items: Crumb[]
  tone?: 'default' | 'light'
}>(), {
  tone: 'default',
})

const allItems = computed(() => [{ label: 'Home', to: '/' }, ...props.items])
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
      <li
        v-for="(item, index) in allItems"
        :key="`${item.label}-${index}`"
        class="flex items-center gap-1.5"
      >
        <NuxtLink
          v-if="item.to && index < allItems.length - 1"
          :to="item.to"
          class="rounded transition-colors"
          :class="tone === 'light' ? 'text-ivory/65 hover:text-gold-soft' : 'text-slate-600 hover:text-forest-700'"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="font-medium"
          :class="tone === 'light' ? 'text-ivory/85' : 'text-forest-900'"
          :aria-current="index === allItems.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <UIcon
          v-if="index < allItems.length - 1"
          name="i-lucide-chevron-right"
          class="h-3 w-3 opacity-40"
          :class="tone === 'light' ? 'text-ivory' : 'text-slate-600'"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
