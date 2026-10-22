<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'default' | 'light'
  as?: 'h2' | 'h3'
}>(), {
  eyebrow: undefined,
  description: undefined,
  align: 'left',
  tone: 'default',
  as: 'h2',
})
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <p
      v-if="eyebrow"
      class="eyebrow"
      :class="tone === 'light' ? '!text-gold-soft' : ''"
    >
      <span
        class="h-px w-6 bg-current opacity-60"
        aria-hidden="true"
      />
      {{ eyebrow }}
    </p>

    <component
      :is="as"
      class="mt-4 text-[2rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[2.75rem]"
      :class="tone === 'light' ? '!text-ivory' : ''"
    >
      {{ title }}
    </component>

    <p
      v-if="description"
      class="mt-4 max-w-2xl text-[0.9375rem] leading-7 sm:text-base sm:leading-8"
      :class="[
        tone === 'light' ? 'text-ivory/70' : 'text-slate-600',
        align === 'center' ? 'mx-auto' : '',
      ]"
    >
      {{ description }}
    </p>

    <div
      v-if="$slots.actions"
      class="mt-7 flex flex-wrap items-center gap-3"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
