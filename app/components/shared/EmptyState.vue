<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  icon?: string
  tone?: 'default' | 'light'
}>(), {
  icon: 'i-lucide-inbox',
  tone: 'default',
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-[1.5rem] border px-6 py-14 text-center sm:px-12"
    :class="tone === 'light' ? 'border-white/15 bg-white/[0.04]' : 'border-forest-900/10 bg-white'"
  >
    <IslamicPattern
      variant="stars"
      :opacity="tone === 'light' ? 'opacity-[0.07] text-gold' : 'opacity-[0.04] text-forest-800'"
    />

    <div class="relative mx-auto max-w-lg">
      <span
        class="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        :class="tone === 'light' ? 'bg-white/10 text-gold-soft' : 'bg-mint text-forest-700'"
      >
        <UIcon
          :name="icon"
          class="h-6 w-6"
          aria-hidden="true"
        />
      </span>
      <h2
        class="mt-5 text-2xl tracking-[-0.02em]"
        :class="tone === 'light' ? '!text-ivory' : ''"
      >
        {{ title }}
      </h2>
      <p
        class="mt-3 text-sm leading-7"
        :class="tone === 'light' ? 'text-ivory/65' : 'text-slate-600'"
      >
        {{ description }}
      </p>
      <div
        v-if="$slots.actions"
        class="mt-6 flex flex-wrap justify-center gap-3"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
