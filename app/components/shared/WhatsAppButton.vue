<script setup lang="ts">
import { DEFAULT_WHATSAPP_MESSAGE } from '~/utils/whatsapp'

const props = withDefaults(defineProps<{
  label?: string
  message?: string
  variant?: 'primary' | 'secondary' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  floating?: boolean
  block?: boolean
  iconOnly?: boolean
  ariaLabel?: string
}>(), {
  label: 'Chat With Us on WhatsApp',
  message: DEFAULT_WHATSAPP_MESSAGE,
  variant: 'primary',
  size: 'md',
  showIcon: true,
  floating: false,
  block: false,
  iconOnly: false,
  ariaLabel: undefined,
})

const whatsapp = useWhatsApp()
const href = computed(() => whatsapp.link(props.message))
const isExternal = computed(() => href.value.startsWith('http'))
const isFallback = computed(() => !isExternal.value)

const variantClasses = computed(() => ({
  primary: 'bg-forest-700 text-white shadow-[0_12px_28px_-16px_rgba(18,60,47,0.85)] hover:bg-forest-900',
  secondary: 'border border-forest-900/15 bg-white/70 text-forest-900 hover:border-forest-900/35 hover:bg-white',
  white: 'bg-ivory text-forest-900 hover:bg-white',
  outline: 'border border-white/25 text-white hover:border-white/50 hover:bg-white/10',
})[props.variant])

const sizeClasses = computed(() => ({
  sm: 'min-h-10 gap-2 px-4 py-2.5 text-[0.8125rem]',
  md: 'min-h-11 gap-2.5 px-6 py-3 text-sm',
  lg: 'min-h-13 gap-3 px-7 py-4 text-[0.9375rem]',
})[props.size])
</script>

<template>
  <a
    v-if="floating"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F9D55] text-white shadow-[0_16px_36px_-12px_rgba(18,60,47,0.65)] ring-1 ring-white/60 transition duration-200 hover:bg-[#178a49] hover:shadow-[0_20px_44px_-12px_rgba(18,60,47,0.7)] focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
    :aria-label="ariaLabel ?? 'Contact the Madrasah on WhatsApp'"
  >
    <WhatsAppIcon class="h-7 w-7" />
    <span
      class="pointer-events-none absolute right-full mr-3 hidden items-center rounded-lg bg-forest-950 px-3 py-2 text-xs font-medium whitespace-nowrap text-ivory opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:flex"
      aria-hidden="true"
    >
      WhatsApp our team
    </span>
  </a>

  <a
    v-else
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition duration-200 active:scale-[0.99]"
    :class="[
      variantClasses,
      sizeClasses,
      block ? 'w-full' : '',
      iconOnly ? 'aspect-square !px-0' : '',
    ]"
    :aria-label="ariaLabel ?? (iconOnly ? label : undefined)"
  >
    <WhatsAppIcon
      v-if="showIcon"
      class="h-[1.15em] w-[1.15em] shrink-0"
    />
    <span v-if="!iconOnly">{{ label }}</span>
    <span
      v-if="!iconOnly && isExternal"
      class="sr-only"
    > (opens in a new tab)</span>
    <span
      v-if="isFallback && !iconOnly"
      class="sr-only"
    > (opens our contact page instead)</span>
  </a>
</template>
