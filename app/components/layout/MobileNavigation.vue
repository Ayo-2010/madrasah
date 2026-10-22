<script setup lang="ts">
import type { NavigationGroup, NavigationLink } from '~/data/navigation'
import { mobileNav } from '~/data/navigation'
import { madrasah } from '~/config/madrasah'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const route = useRoute()
const closeButton = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const programmesExpanded = ref(false)
const menuId = 'mobile-site-menu'

const isGroup = (item: NavigationLink | NavigationGroup): item is NavigationGroup =>
  Array.isArray((item as NavigationGroup).children)

function close() {
  emit('update:open', false)
}

function isActive(to?: string): boolean {
  if (!to) return false
  if (to === '/') return route.path === '/'
  if (to === '/programmes') return route.path.startsWith('/programmes')
  return route.path === to
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab' || !panel.value) return

  const focusable = Array.from(
    panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(element => element.offsetParent !== null)

  if (!focusable.length) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

let previousOverflow = ''

watch(() => props.open, async (open) => {
  if (!import.meta.client) return

  if (open) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    programmesExpanded.value = route.path.startsWith('/programmes')
    await nextTick()
    closeButton.value?.focus()
  }
  else {
    document.body.style.overflow = previousOverflow
  }
})

watch(() => route.fullPath, () => {
  if (props.open) close()
})

// Ensure the drawer is closed when the viewport grows to desktop size.
let desktopQuery: MediaQueryList | null = null

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches && props.open) close()
}

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 80rem)')
  desktopQuery.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener('change', onDesktopChange)
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[70] bg-forest-950/55 backdrop-blur-[2px] xl:hidden"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="open"
        :id="menuId"
        ref="panel"
        class="fixed inset-y-0 right-0 z-[80] flex w-[min(88vw,24rem)] flex-col bg-ivory shadow-2xl xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        @keydown="onKeydown"
      >
        <div class="flex items-center justify-between border-b border-forest-900/10 px-5 py-4">
          <SiteLogo size="sm" />
          <button
            ref="closeButton"
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 text-forest-900 transition hover:bg-white"
            aria-label="Close menu"
            @click="close"
          >
            <UIcon
              name="i-lucide-x"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <nav
          class="flex-1 overflow-y-auto overscroll-contain px-4 py-5"
          aria-label="Mobile navigation"
        >
          <ul class="space-y-1">
            <li
              v-for="item in mobileNav"
              :key="item.label"
            >
              <template v-if="isGroup(item)">
                <button
                  type="button"
                  class="flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors"
                  :class="isActive(item.to) ? 'bg-mint text-forest-900' : 'text-slate-700 hover:bg-white'"
                  :aria-expanded="programmesExpanded"
                  aria-controls="mobile-programme-menu"
                  @click="programmesExpanded = !programmesExpanded"
                >
                  {{ item.label }}
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="h-4 w-4 text-slate-600 transition-transform"
                    :class="{ 'rotate-180': programmesExpanded }"
                    aria-hidden="true"
                  />
                </button>

                <div
                  v-show="programmesExpanded"
                  id="mobile-programme-menu"
                  class="mt-1 mb-2 ml-3 space-y-0.5 border-l border-forest-900/10 pl-3"
                >
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.to"
                    :to="child.to"
                    class="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm transition-colors"
                    :class="isActive(child.to) ? 'bg-forest-50 font-semibold text-forest-900' : 'text-slate-600 hover:bg-white hover:text-forest-900'"
                    @click="close"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </template>

              <NuxtLink
                v-else
                :to="item.to"
                class="flex min-h-12 items-center rounded-xl px-4 py-3 text-[0.9375rem] font-medium transition-colors"
                :class="isActive(item.to) ? 'bg-mint text-forest-900' : 'text-slate-700 hover:bg-white'"
                @click="close"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="border-t border-forest-900/10 bg-white/60 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <WhatsAppButton
            label="Contact on WhatsApp"
            block
            size="md"
          />
          <p class="mt-3 text-center text-[0.6875rem] leading-relaxed text-slate-600">
            {{ madrasah.contact.showWhatsAppNumber ? 'Message our administration directly.' : 'Our administration will reply as soon as possible.' }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
