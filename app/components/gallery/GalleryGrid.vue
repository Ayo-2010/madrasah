<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { GalleryItem } from '~/types/gallery'

defineProps<{ items: GalleryItem[] }>()

const activeIndex = ref<number | null>(null)
const triggers = ref<HTMLButtonElement[]>([])

function setTrigger(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLButtonElement) triggers.value[index] = el
}

function open(index: number) {
  activeIndex.value = index
}

function close() {
  const last = activeIndex.value
  activeIndex.value = null
  nextTick(() => {
    if (last !== null) triggers.value[last]?.focus()
  })
}

function navigate(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <button
        v-for="(item, index) in items"
        :key="item.id"
        :ref="(el) => setTrigger(el, index)"
        type="button"
        class="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-forest-900/10 bg-forest-900 text-left focus-visible:outline-offset-4"
        :class="index === 0 && items.length > 4 ? 'lg:col-span-2 lg:aspect-[16/9]' : ''"
        :aria-label="`View larger image: ${item.caption}`"
        @click="open(index)"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.025]"
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        >
        <span
          class="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span class="absolute top-4 left-4 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.5625rem] font-semibold tracking-[0.12em] text-forest-900 uppercase backdrop-blur">
          {{ item.category }}
        </span>
        <span
          v-if="item.illustrative"
          class="absolute top-4 right-4 rounded-full border border-white/20 bg-forest-950/40 px-2.5 py-1 text-[0.5625rem] font-medium tracking-[0.08em] text-ivory/80 uppercase backdrop-blur"
        >
          Illustration
        </span>

        <span class="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4">
          <span class="text-sm leading-snug font-medium text-ivory">
            {{ item.caption }}
          </span>
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-ivory backdrop-blur transition group-hover:bg-white group-hover:text-forest-900">
            <UIcon
              name="i-lucide-maximize-2"
              class="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </span>
        </span>
      </button>
    </div>

    <GalleryLightbox
      v-if="activeIndex !== null"
      :items="items"
      :index="activeIndex"
      @close="close"
      @navigate="navigate"
    />
  </div>
</template>
