<script setup lang="ts">
import { useId } from 'vue'

withDefaults(defineProps<{
  variant?: 'lattice' | 'stars' | 'arches'
  opacity?: string
}>(), {
  variant: 'lattice',
  opacity: 'opacity-[0.08]',
})

const uid = useId()
const patternId = computed(() => `islamic-pattern-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`)
</script>

<template>
  <svg
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 h-full w-full"
    :class="opacity"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        :id="patternId"
        width="84"
        height="84"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(0)"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="0.8"
        >
          <template v-if="variant === 'lattice'">
            <rect
              x="24"
              y="24"
              width="36"
              height="36"
            />
            <rect
              x="24"
              y="24"
              width="36"
              height="36"
              transform="rotate(45 42 42)"
            />
            <circle
              cx="42"
              cy="42"
              r="4"
            />
            <path d="M0 42h18M66 42h18M42 0v18M42 66v18" />
            <circle
              cx="0"
              cy="0"
              r="2"
            />
            <circle
              cx="84"
              cy="0"
              r="2"
            />
            <circle
              cx="0"
              cy="84"
              r="2"
            />
            <circle
              cx="84"
              cy="84"
              r="2"
            />
          </template>

          <template v-else-if="variant === 'stars'">
            <path d="M42 12 49 35 72 42 49 49 42 72 35 49 12 42 35 35Z" />
            <path
              d="M42 22 46 38 62 42 46 46 42 62 38 46 22 42 38 38Z"
              opacity="0.7"
            />
            <circle
              cx="42"
              cy="42"
              r="3"
            />
            <circle
              cx="0"
              cy="0"
              r="2"
            />
            <circle
              cx="84"
              cy="84"
              r="2"
            />
          </template>

          <template v-else>
            <path d="M15 72V42a27 27 0 0 1 54 0v30" />
            <path
              d="M24 72V43a18 18 0 0 1 36 0v29"
              opacity="0.65"
            />
            <path d="M0 72h84" />
            <path d="M42 15v8" />
          </template>
        </g>
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      :fill="`url(#${patternId})`"
    />
  </svg>
</template>
