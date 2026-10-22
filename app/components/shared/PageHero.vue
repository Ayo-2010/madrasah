<script setup lang="ts">
import type { Crumb } from '~/types/ui'

withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs: Crumb[]
}>(), {
  eyebrow: undefined,
  description: undefined,
})
</script>

<template>
  <section class="relative overflow-hidden border-b border-forest-900/[0.07] bg-ivory">
    <IslamicPattern
      variant="lattice"
      opacity="opacity-[0.045] text-forest-800"
    />
    <div
      class="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full border border-gold/25"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-16 -bottom-40 h-72 w-72 rounded-full border border-forest-700/10"
      aria-hidden="true"
    />

    <div class="container-page relative pt-7 pb-12 sm:pt-9 sm:pb-16 lg:pb-20">
      <Breadcrumbs :items="breadcrumbs" />

      <div class="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div class="max-w-3xl">
          <p
            v-if="eyebrow"
            class="eyebrow"
          >
            <span
              class="h-px w-7 bg-current opacity-60"
              aria-hidden="true"
            />
            {{ eyebrow }}
          </p>

          <h1 class="mt-4 text-[2.5rem] leading-[1.05] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.75rem]">
            {{ title }}
          </h1>

          <p
            v-if="description"
            class="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[1.0625rem]"
          >
            {{ description }}
          </p>

          <div
            v-if="$slots.actions"
            class="mt-8 flex flex-wrap items-center gap-3"
          >
            <slot name="actions" />
          </div>
        </div>

        <div
          v-if="$slots.aside"
          class="hidden lg:block"
        >
          <slot name="aside" />
        </div>
      </div>

      <div
        v-if="$slots.footer"
        class="mt-10 border-t border-forest-900/10 pt-6"
      >
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>
