<script setup lang="ts">
defineProps<{
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  optionalLabel?: string
}>()

const describedBy = (hint?: string, error?: string, id?: string) => {
  const ids: string[] = []
  if (hint) ids.push(`${id}-hint`)
  if (error) ids.push(`${id}-error`)
  return ids.length ? ids.join(' ') : undefined
}
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-3">
      <label
        :for="id"
        class="text-[0.8125rem] font-semibold text-forest-900"
      >
        {{ label }}
        <span
          v-if="required"
          class="text-red-500"
          aria-hidden="true"
        >*</span>
        <span
          v-if="required"
          class="sr-only"
        > (required)</span>
      </label>
      <span
        v-if="optionalLabel"
        class="text-[0.6875rem] text-slate-600"
      >
        {{ optionalLabel }}
      </span>
    </div>

    <div class="mt-2">
      <slot :described-by="describedBy(hint, error, id)" />
    </div>

    <p
      v-if="hint"
      :id="`${id}-hint`"
      class="mt-1.5 text-xs leading-5 text-slate-600"
    >
      {{ hint }}
    </p>

    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1.5 flex items-start gap-1.5 text-xs leading-5 font-medium text-red-600"
    >
      <UIcon
        name="i-lucide-circle-alert"
        class="mt-0.5 h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      />
      {{ error }}
    </p>
  </div>
</template>
