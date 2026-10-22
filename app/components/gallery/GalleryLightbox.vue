<script setup lang="ts">
import type { GalleryItem } from '~/types/gallery'

const props = defineProps<{
  items: GalleryItem[]
  index: number
}>()

const emit = defineEmits<{
  close: []
  navigate: [index: number]
}>()

const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let previousOverflow = ''

const current = computed(() => props.items[props.index])

function go(delta: number) {
  const total = props.items.length
  if (!total) return
  emit('navigate', (props.index + delta + total) % total)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    go(1)
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    go(-1)
    return
  }

  if (event.key !== 'Tab' || !dialog.value) return

  const focusable = Array.from(
    dialog.value.querySelectorAll<HTMLElement>('button:not([disabled])'),
  )

  if (!focusable.length) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onKeydown)
  nextTick(() => closeButton.value?.focus())
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="dialog"
      class="fixed inset-0 z-[90] flex flex-col bg-forest-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      @click.self="emit('close')"
    >
      <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p class="text-xs tracking-wide text-ivory/65">
          {{ index + 1 }} / {{ items.length }}
        </p>
        <button
          ref="closeButton"
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10"
          aria-label="Close image viewer"
          @click="emit('close')"
        >
          <UIcon
            name="i-lucide-x"
            class="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="flex min-h-0 flex-1 items-center gap-2 px-2 pb-4 sm:gap-5 sm:px-6">
        <button
          type="button"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10 disabled:opacity-30"
          aria-label="Previous image"
          @click="go(-1)"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="h-5 w-5"
            aria-hidden="true"
          />
        </button>

        <figure
          v-if="current"
          class="flex min-h-0 flex-1 flex-col items-center"
        >
          <img
            :src="current.src"
            :alt="current.alt"
            class="max-h-[68vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          >
          <figcaption class="mt-4 max-w-2xl text-center">
            <span class="block text-sm font-medium text-ivory">{{ current.caption }}</span>
            <span class="mt-1 block text-xs text-ivory/65">
              <span v-if="current.illustrative">Illustrative artwork · </span>{{ current.category }}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-ivory transition hover:bg-white/10 disabled:opacity-30"
          aria-label="Next image"
          @click="go(1)"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>

      <p
        class="sr-only"
        aria-live="polite"
      >
        Image {{ index + 1 }} of {{ items.length }}: {{ current?.caption }}
      </p>
    </div>
  </Teleport>
</template>
