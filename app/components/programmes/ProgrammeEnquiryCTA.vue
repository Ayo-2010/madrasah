<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  message?: string
}>(), {
  title: 'Have a question about this programme?',
  description:
    'Speak with the administration about placement, class arrangements and the next steps for joining.',
  message: undefined,
})
</script>

<template>
  <div class="relative overflow-hidden rounded-[1.75rem] bg-forest-900 px-6 py-10 sm:px-10 sm:py-12">
    <IslamicPattern
      variant="arches"
      opacity="opacity-[0.09] text-gold"
    />
    <div
      class="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-gold/20"
      aria-hidden="true"
    />

    <div class="relative grid items-center gap-7 lg:grid-cols-[1fr_auto]">
      <div class="max-w-xl">
        <p class="eyebrow !text-gold-soft">
          <span
            class="h-px w-6 bg-current opacity-60"
            aria-hidden="true"
          />
          We are here to help
        </p>
        <h2 class="mt-3 text-[1.75rem] leading-tight tracking-[-0.02em] !text-ivory sm:text-[2rem]">
          {{ title }}
        </h2>
        <p class="mt-3 text-sm leading-7 text-ivory/65 sm:text-[0.9375rem]">
          {{ description }}
        </p>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <WhatsAppButton
          label="Chat With Us on WhatsApp"
          variant="white"
          :message="message"
        />
        <NuxtLink
          to="/admissions"
          class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-ivory transition hover:border-white/40 hover:bg-white/10"
        >
          Admissions information
          <UIcon
            name="i-lucide-arrow-right"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
