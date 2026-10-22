<script setup lang="ts">
interface AccordionItem {
  id: string
  question: string
  answer: string
}

const props = withDefaults(defineProps<{
  items: AccordionItem[]
  defaultOpenId?: string | null
}>(), {
  defaultOpenId: null,
})

const openId = ref<string | null>(props.defaultOpenId)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

function panelId(id: string): string {
  return `faq-panel-${id}`
}

function triggerId(id: string): string {
  return `faq-trigger-${id}`
}
</script>

<template>
  <div class="border-y border-forest-900/10">
    <div
      v-for="item in items"
      :key="item.id"
      class="border-b border-forest-900/10 last:border-b-0"
    >
      <h3>
        <button
          :id="triggerId(item.id)"
          type="button"
          class="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-forest-700 sm:py-6"
          :aria-expanded="openId === item.id"
          :aria-controls="panelId(item.id)"
          @click="toggle(item.id)"
        >
          <span class="text-[0.9375rem] leading-7 font-semibold text-forest-900 sm:text-base">
            {{ item.question }}
          </span>
          <span
            class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200"
            :class="openId === item.id ? 'border-forest-700 bg-forest-700 text-white' : 'border-forest-900/15 bg-white text-forest-700'"
          >
            <UIcon
              :name="openId === item.id ? 'i-lucide-minus' : 'i-lucide-plus'"
              class="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>

      <div
        v-show="openId === item.id"
        :id="panelId(item.id)"
        role="region"
        :aria-labelledby="triggerId(item.id)"
        class="pb-6 sm:pr-12"
      >
        <p class="max-w-3xl text-sm leading-7 whitespace-pre-line text-slate-600 sm:text-[0.9375rem]">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>
