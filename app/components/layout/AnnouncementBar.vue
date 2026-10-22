<script setup lang="ts">
import { madrasah } from '~/config/madrasah'

const STORAGE_KEY = 'madrasah-announcement-dismissed'
const dismissed = ref(false)

onMounted(() => {
  try {
    dismissed.value = sessionStorage.getItem(STORAGE_KEY) === '1'
  }
  catch {
    dismissed.value = false
  }
})

const visible = computed(() => madrasah.announcement.enabled && !dismissed.value)

function dismiss() {
  dismissed.value = true
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  }
  catch {
    // Session storage may be unavailable; the announcement simply returns on reload.
  }
}
</script>

<template>
  <aside
    v-if="visible"
    aria-label="Site announcement"
    class="relative overflow-hidden bg-forest-950 text-ivory"
  >
    <IslamicPattern
      variant="stars"
      opacity="opacity-[0.1] text-gold"
    />
    <div class="container-page relative flex items-center justify-between gap-3 py-2.5">
      <div class="flex min-w-0 items-center gap-2.5">
        <span
          class="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
          aria-hidden="true"
        />
        <p class="text-[0.6875rem] leading-5 tracking-wide text-ivory/85 sm:text-xs">
          {{ madrasah.announcement.text }}
          <NuxtLink
            :to="madrasah.announcement.to"
            class="ml-1.5 inline-flex items-center gap-1 font-semibold text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-white hover:decoration-white/60"
          >
            {{ madrasah.announcement.linkLabel }}
            <UIcon
              name="i-lucide-arrow-right"
              class="h-3 w-3"
              aria-hidden="true"
            />
          </NuxtLink>
        </p>
      </div>

      <button
        type="button"
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ivory/60 transition hover:bg-white/10 hover:text-white"
        aria-label="Dismiss announcement"
        @click="dismiss"
      >
        <UIcon
          name="i-lucide-x"
          class="h-4 w-4"
          aria-hidden="true"
        />
      </button>
    </div>
  </aside>
</template>
