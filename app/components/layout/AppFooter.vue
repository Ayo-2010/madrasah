<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { programmes } from '~/data/programmes'

const { addressLines, telHref, mailtoHref } = useSiteConfig()
const whatsapp = useWhatsApp()
const currentYear = new Date().getFullYear()

const exploreLinks = [
  { label: 'About the Madrasah', to: '/about' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Our teachers', to: '/teachers' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-forest-950 text-ivory">
    <IslamicPattern
      variant="arches"
      opacity="opacity-[0.07] text-gold"
    />

    <div class="container-page relative py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_1fr_1.15fr] lg:gap-10">
        <div>
          <SiteLogo
            tone="light"
            size="md"
          />
          <p class="mt-5 max-w-sm text-sm leading-7 text-ivory/65">
            {{ madrasah.description }}
          </p>
          <p
            class="mt-6 font-arabic text-xl leading-relaxed text-gold/80"
            lang="ar"
            dir="rtl"
          >
            {{ madrasah.arabicName }}
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2
            id="footer-explore"
            class="text-[0.6875rem] font-semibold tracking-[0.18em] text-ivory/65 uppercase"
          >
            Explore
          </h2>
          <ul class="mt-5 space-y-3">
            <li
              v-for="link in exploreLinks"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-sm text-ivory/70 transition-colors hover:text-gold-soft"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-programmes">
          <h2
            id="footer-programmes"
            class="text-[0.6875rem] font-semibold tracking-[0.18em] text-ivory/65 uppercase"
          >
            Programmes
          </h2>
          <ul class="mt-5 space-y-3">
            <li
              v-for="programme in programmes"
              :key="programme.slug"
            >
              <NuxtLink
                :to="`/programmes/${programme.slug}`"
                class="text-sm text-ivory/70 transition-colors hover:text-gold-soft"
              >
                {{ programme.shortTitle }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/programmes"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft transition-colors hover:text-white"
              >
                All programmes
                <UIcon
                  name="i-lucide-arrow-right"
                  class="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="text-[0.6875rem] font-semibold tracking-[0.18em] text-ivory/65 uppercase">
            Speak with us
          </h2>
          <p class="mt-5 max-w-xs text-sm leading-7 text-ivory/65">
            Ask about programmes, class arrangements or the admissions process. WhatsApp is the quickest way to reach the administration.
          </p>

          <WhatsAppButton
            label="Chat With Us on WhatsApp"
            variant="white"
            size="sm"
            class="mt-5"
            block
          />

          <div class="mt-5 space-y-3 text-sm">
            <p
              v-if="whatsapp.displayNumber.value"
              class="flex items-start gap-2.5 text-ivory/70"
            >
              <UIcon
                name="i-lucide-message-circle"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold/70"
                aria-hidden="true"
              />
              <span>WhatsApp: {{ whatsapp.displayNumber.value }}</span>
            </p>

            <p
              v-if="madrasah.contact.phone && telHref"
              class="flex items-start gap-2.5 text-ivory/70"
            >
              <UIcon
                name="i-lucide-phone"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold/70"
                aria-hidden="true"
              />
              <a
                :href="telHref"
                class="transition-colors hover:text-white"
              >{{ madrasah.contact.phone }}</a>
            </p>

            <p
              v-if="madrasah.contact.email && mailtoHref"
              class="flex items-start gap-2.5 break-all text-ivory/70"
            >
              <UIcon
                name="i-lucide-mail"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold/70"
                aria-hidden="true"
              />
              <a
                :href="mailtoHref"
                class="transition-colors hover:text-white"
              >{{ madrasah.contact.email }}</a>
            </p>

            <address
              v-if="addressLines.length"
              class="flex items-start gap-2.5 text-sm not-italic text-ivory/70"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold/70"
                aria-hidden="true"
              />
              <span>
                <span
                  v-for="line in addressLines"
                  :key="line"
                  class="block"
                >{{ line }}</span>
              </span>
            </address>

            <div
              v-if="madrasah.contact.openingHours.length"
              class="flex items-start gap-2.5 text-ivory/70"
            >
              <UIcon
                name="i-lucide-clock"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold/70"
                aria-hidden="true"
              />
              <span>
                <span
                  v-for="slot in madrasah.contact.openingHours"
                  :key="slot.days"
                  class="block"
                >{{ slot.days }}: {{ slot.hours }}</span>
              </span>
            </div>
          </div>

          <ul
            v-if="madrasah.contact.socials.length"
            class="mt-5 flex flex-wrap gap-2"
            aria-label="Social media"
          >
            <li
              v-for="social in madrasah.contact.socials"
              :key="social.href"
            >
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory/70 transition hover:border-gold/50 hover:text-gold-soft"
                :aria-label="`${social.label} (opens in a new tab)`"
              >
                <UIcon
                  :name="social.icon"
                  class="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ currentYear }} {{ madrasah.name }}. All rights reserved.</p>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <NuxtLink
            to="/privacy-policy"
            class="transition-colors hover:text-gold-soft"
          >
            Privacy policy
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="transition-colors hover:text-gold-soft"
          >
            Contact
          </NuxtLink>
          <NuxtLink
            to="/admissions"
            class="transition-colors hover:text-gold-soft"
          >
            Admissions
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
