<script setup lang="ts">
import type { NavigationGroup, NavigationLink } from '~/data/navigation'
import { desktopNav } from '~/data/navigation'

const route = useRoute()
const mobileOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

const isGroup = (item: NavigationLink | NavigationGroup): item is NavigationGroup =>
  Array.isArray((item as NavigationGroup).children)

function isActive(to?: string): boolean {
  if (!to) return false
  if (to === '/') return route.path === '/'
  if (to === '/programmes') return route.path.startsWith('/programmes')
  return route.path === to
}

function isGroupActive(item: NavigationGroup): boolean {
  return item.children.some(child => isActive(child.to)) || isActive(item.to)
}

watch(mobileOpen, (open, wasOpen) => {
  if (!open && wasOpen) {
    nextTick(() => menuButton.value?.focus())
  }
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-forest-900/10 bg-ivory/90 backdrop-blur-md">
    <div class="container-page flex h-[4.5rem] items-center justify-between gap-4">
      <SiteLogo size="md" />

      <nav
        class="hidden items-center gap-0.5 xl:flex"
        aria-label="Main navigation"
      >
        <template
          v-for="item in desktopNav"
          :key="item.label"
        >
          <NavDropdown
            v-if="isGroup(item)"
            :label="item.label"
            :items="item.children"
            :active="isGroupActive(item)"
            :align="item.label === 'More' ? 'right' : 'left'"
          />
          <NuxtLink
            v-else
            :to="item.to"
            class="inline-flex min-h-10 items-center rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors xl:text-sm"
            :class="isActive(item.to) ? 'bg-forest-900/[0.06] text-forest-900' : 'text-slate-600 hover:bg-forest-900/[0.04] hover:text-forest-900'"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="hidden xl:block">
        <WhatsAppButton
          label="Contact on WhatsApp"
          size="sm"
        />
      </div>

      <button
        ref="menuButton"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-forest-900/10 bg-white/60 text-forest-900 transition hover:bg-white xl:hidden"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-site-menu"
        aria-label="Open menu"
        @click="mobileOpen = true"
      >
        <UIcon
          name="i-lucide-menu"
          class="h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </div>
  </header>

  <MobileNavigation v-model:open="mobileOpen" />
</template>
