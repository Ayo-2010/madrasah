<script setup lang="ts">
import { madrasah } from '~/config/madrasah'

const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({
  title: isNotFound.value
    ? `Page not found | ${madrasah.name}`
    : `Something went wrong | ${madrasah.name}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-ivory">
    <IslamicPattern
      variant="arches"
      opacity="opacity-[0.06] text-forest-700"
    />

    <div class="container-page relative flex flex-1 flex-col py-8">
      <header>
        <SiteLogo />
      </header>

      <main class="flex flex-1 items-center py-16">
        <div class="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div class="max-w-xl">
            <p class="eyebrow">
              {{ isNotFound ? 'Page not found' : 'Unexpected error' }}
            </p>
            <h1 class="mt-4 text-5xl leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              {{ isNotFound ? 'This page has wandered off.' : 'Something went wrong.' }}
            </h1>
            <p class="mt-5 text-base leading-8 text-slate-600">
              <template v-if="isNotFound">
                The page you are looking for may have moved, or the address may be incorrect. You can return home or ask us directly on WhatsApp.
              </template>
              <template v-else>
                We could not load this page. Please try again, return home, or contact the administration and we will help.
              </template>
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink
                to="/"
                class="btn-primary"
              >
                Return home
              </NuxtLink>
              <WhatsAppButton
                label="Ask on WhatsApp"
                variant="secondary"
              />
            </div>

            <p class="mt-8 text-xs text-slate-600">
              Error {{ error.statusCode }}<span v-if="error.statusMessage"> · {{ error.statusMessage }}</span>
            </p>
          </div>

          <div class="relative hidden justify-center lg:flex">
            <div class="arch-frame relative flex h-[22rem] w-[17rem] items-center justify-center overflow-hidden bg-forest-900">
              <IslamicPattern
                variant="stars"
                opacity="opacity-20 text-gold"
              />
              <span class="relative font-display text-8xl text-gold-soft">{{ error.statusCode }}</span>
            </div>
          </div>
        </div>
      </main>

      <footer class="border-t border-forest-900/10 py-6 text-xs text-slate-600">
        <NuxtLink
          to="/contact"
          class="transition-colors hover:text-forest-700"
        >
          Contact the Madrasah
        </NuxtLink>
      </footer>
    </div>
  </div>
</template>
