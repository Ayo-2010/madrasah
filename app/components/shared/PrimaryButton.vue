<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  variant?: 'primary' | 'secondary' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  block: false,
})

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  white: 'btn-white',
  outline: 'btn-outline-light',
}

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group"
    :class="[variantClasses[variant], sizeClasses[size], block ? 'w-full' : '']"
  >
    <slot />
    <UIcon
      name="i-lucide-arrow-right"
      class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
