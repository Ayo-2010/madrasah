<script setup lang="ts">
import { useId } from 'vue'
import type { NavigationLink } from '~/data/navigation'

const props = withDefaults(defineProps<{
  label: string
  items: NavigationLink[]
  active?: boolean
  align?: 'left' | 'right'
  /** Optional route for the group label shown at the bottom of the panel. */
  overviewTo?: string
  overviewLabel?: string
}>(), {
  active: false,
  align: 'left',
  overviewTo: undefined,
  overviewLabel: undefined,
})

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const panelId = useId()

function close(restoreFocus = false) {
  isOpen.value = false
  if (restoreFocus) {
    nextTick(() => trigger.value?.focus())
  }
}

function onPointerDown(event: PointerEvent) {
  if (!isOpen.value) return
  if (root.value && !root.value.contains(event.target as Node)) {
    close()
  }
}

function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && root.value && !root.value.contains(next)) {
    close()
  }
}

function onPanelKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close(true)
  }
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    isOpen.value = true
    nextTick(() => {
      panel.value?.querySelector<HTMLAnchorElement>('a')?.focus()
    })
  }
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  if (open) document.addEventListener('pointerdown', onPointerDown)
  else document.removeEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  if (import.meta.client) document.removeEventListener('pointerdown', onPointerDown)
})

const panelClasses = computed(() => props.align === 'right' ? 'right-0' : 'left-0')
</script>

<template>
  <div
    ref="root"
    class="relative"
    @focusout="onFocusOut"
  >
    <button
      ref="trigger"
      type="button"
      class="inline-flex min-h-10 items-center gap-1 rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors xl:text-sm"
      :class="active || isOpen ? 'bg-forest-900/[0.06] text-forest-900' : 'text-slate-600 hover:bg-forest-900/[0.04] hover:text-forest-900'"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      aria-haspopup="true"
      @click="isOpen = !isOpen"
      @keydown="onTriggerKeydown"
    >
      {{ label }}
      <UIcon
        name="i-lucide-chevron-down"
        class="h-3.5 w-3.5 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        :id="panelId"
        ref="panel"
        class="absolute top-full z-50 mt-3 w-[21rem] rounded-2xl border border-forest-900/10 bg-white p-2 shadow-soft"
        :class="panelClasses"
        @keydown="onPanelKeydown"
      >
        <ul class="space-y-0.5">
          <li
            v-for="item in items"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-mint focus-visible:bg-mint"
              @click="close()"
            >
              <span
                v-if="item.icon"
                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700"
              >
                <UIcon
                  :name="item.icon"
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </span>
              <span class="min-w-0">
                <span class="block text-[0.8125rem] font-semibold text-forest-900">{{ item.label }}</span>
                <span
                  v-if="item.description"
                  class="mt-0.5 block text-xs leading-relaxed text-slate-600"
                >
                  {{ item.description }}
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink
          v-if="overviewTo && overviewLabel"
          :to="overviewTo"
          class="mt-1 flex items-center justify-between rounded-xl border-t border-line px-3 pt-3 pb-2 text-xs font-semibold text-forest-700 hover:text-forest-900"
          @click="close()"
        >
          {{ overviewLabel }}
          <UIcon
            name="i-lucide-arrow-right"
            class="h-3.5 w-3.5"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>
