<script setup lang="ts">
import { madrasah } from '~/config/madrasah'

const { siteUrl, siteUrlIsPlaceholder, addressLines } = useSiteConfig()

const structuredData = computed(() => {
  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': madrasah.name,
    'alternateName': madrasah.arabicName,
    'description': madrasah.description,
    ...(siteUrlIsPlaceholder ? {} : { url: siteUrl }),
    ...(madrasah.contact.email ? { email: madrasah.contact.email } : {}),
    ...(madrasah.contact.phone ? { telephone: madrasah.contact.phone } : {}),
    ...(addressLines.value.length
      ? {
          address: {
            '@type': 'PostalAddress',
            'streetAddress': [madrasah.contact.address?.line1, madrasah.contact.address?.line2]
              .filter(Boolean)
              .join(', '),
            'addressLocality': madrasah.contact.address?.city,
            'addressRegion': madrasah.contact.address?.region,
            'postalCode': madrasah.contact.address?.postcode,
            'addressCountry': madrasah.contact.address?.country,
          },
        }
      : {}),
    ...(madrasah.contact.socials.length
      ? { sameAs: madrasah.contact.socials.map(social => social.href) }
      : {}),
  }

  return organization
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData.value),
    },
  ],
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main-content"
      class="skip-link"
    >
      Skip to main content
    </a>

    <AnnouncementBar />
    <AppHeader />

    <main
      id="main-content"
      tabindex="-1"
      class="flex-1 focus:outline-none"
    >
      <slot />
    </main>

    <AppFooter />
    <aside aria-label="Quick WhatsApp contact">
      <WhatsAppButton floating />
    </aside>
  </div>
</template>
