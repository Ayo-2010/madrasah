<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Contact Us'),
  description:
    'Contact our Madrasah on WhatsApp for programme information, admissions and general enquiries. Ask about classes for children, teenagers and adults.',
  path: '/contact',
})

const { addressLines, telHref, mailtoHref, hasContactDetails } = useSiteConfig()
const whatsapp = useWhatsApp()
</script>

<template>
  <div>
    <PageHero
      eyebrow="Get in touch"
      title="Contact Our Madrasah"
      description="Ask about classes, programmes, admissions or anything else you would like to know. WhatsApp is the quickest way to reach the administration."
      :breadcrumbs="[{ label: 'Contact' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Chat With Us on WhatsApp"
          message="Assalamu Alaikum. I have an enquiry about your Madrasah."
        />
        <a
          href="#contact-form"
          class="btn-secondary"
        >
          Use the contact form
          <UIcon
            name="i-lucide-arrow-down"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </a>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <!-- WhatsApp card -->
          <div class="relative overflow-hidden rounded-[1.75rem] bg-forest-900 p-7 text-ivory sm:p-10">
            <IslamicPattern
              variant="stars"
              opacity="opacity-[0.1] text-gold"
            />
            <div
              class="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-gold/20"
              aria-hidden="true"
            />
            <div class="relative">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F9D55] text-white shadow-lg">
                <WhatsAppIcon class="h-6 w-6" />
              </span>
              <p class="mt-6 text-[0.625rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
                Preferred contact method
              </p>
              <h2 class="mt-3 text-[2rem] leading-tight tracking-[-0.025em] !text-ivory sm:text-[2.5rem]">
                Speak with us on WhatsApp.
              </h2>
              <p class="mt-4 max-w-lg text-sm leading-7 text-ivory/65">
                Send a message with your question and the administration will reply as soon as possible. Tell us the learner’s age group and programme of interest if your enquiry is about admissions.
              </p>

              <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton
                  label="Chat With Us on WhatsApp"
                  variant="white"
                  size="lg"
                  message="Assalamu Alaikum. I have an enquiry about your Madrasah."
                />
                <p
                  v-if="whatsapp.displayNumber.value"
                  class="text-xs text-ivory/65"
                >
                  {{ whatsapp.displayNumber.value }}
                </p>
              </div>

              <p class="mt-5 flex items-start gap-2 text-[0.6875rem] leading-5 text-ivory/65">
                <UIcon
                  name="i-lucide-external-link"
                  class="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                This opens WhatsApp. The Madrasah receives your message only after you press Send there.
              </p>
            </div>
          </div>

          <!-- Contact details -->
          <div class="rounded-[1.75rem] border border-forest-900/10 bg-ivory p-7 sm:p-9">
            <h2 class="text-xl tracking-[-0.02em]">
              Contact information
            </h2>

            <div
              v-if="hasContactDetails"
              class="mt-6 space-y-5"
            >
              <div
                v-if="madrasah.contact.phone && telHref"
                class="flex items-start gap-3"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-phone"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                    Phone
                  </p>
                  <a
                    :href="telHref"
                    class="mt-0.5 text-sm font-medium text-forest-900 hover:text-forest-700"
                  >{{ madrasah.contact.phone }}</a>
                </div>
              </div>

              <div
                v-if="madrasah.contact.email && mailtoHref"
                class="flex items-start gap-3"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-mail"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <div class="min-w-0">
                  <p class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                    Email
                  </p>
                  <a
                    :href="mailtoHref"
                    class="mt-0.5 block break-all text-sm font-medium text-forest-900 hover:text-forest-700"
                  >{{ madrasah.contact.email }}</a>
                </div>
              </div>

              <div
                v-if="addressLines.length"
                class="flex items-start gap-3"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <address class="text-sm not-italic text-slate-600">
                  <p class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                    Address
                  </p>
                  <span
                    v-for="line in addressLines"
                    :key="line"
                    class="mt-0.5 block first:mt-1"
                  >{{ line }}</span>
                </address>
              </div>

              <div
                v-if="madrasah.contact.openingHours.length"
                class="flex items-start gap-3"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest-700 shadow-sm">
                  <UIcon
                    name="i-lucide-clock"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                    Opening hours
                  </p>
                  <p
                    v-for="slot in madrasah.contact.openingHours"
                    :key="slot.days"
                    class="mt-1 text-sm text-slate-600"
                  >
                    {{ slot.days }}: {{ slot.hours }}
                  </p>
                </div>
              </div>

              <div v-if="madrasah.contact.socials.length">
                <p class="text-[0.625rem] font-medium tracking-wide text-slate-600 uppercase">
                  Social media
                </p>
                <ul class="mt-2 flex flex-wrap gap-2">
                  <li
                    v-for="social in madrasah.contact.socials"
                    :key="social.href"
                  >
                    <a
                      :href="social.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-forest-900/10 bg-white text-forest-700 transition hover:border-forest-700/30"
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

            <div
              v-else
              class="mt-6"
            >
              <div class="rounded-xl border border-forest-900/10 bg-white p-5">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-info"
                    class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                    aria-hidden="true"
                  />
                  <div>
                    <p class="text-sm font-medium text-forest-900">
                      Additional details are being confirmed.
                    </p>
                    <p class="mt-1.5 text-xs leading-6 text-slate-600">
                      A public phone number, email address and location will be published only when approved by the Madrasah. WhatsApp is available now for enquiries.
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-5 space-y-2.5">
                <NuxtLink
                  to="/admissions"
                  class="group flex items-center justify-between gap-2 rounded-xl border border-forest-900/10 bg-white px-4 py-3 text-xs font-medium text-forest-900 transition hover:border-forest-700/30"
                >
                  Admissions and registration
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="h-3.5 w-3.5 text-forest-600 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </NuxtLink>
                <NuxtLink
                  to="/faq"
                  class="group flex items-center justify-between gap-2 rounded-xl border border-forest-900/10 bg-white px-4 py-3 text-xs font-medium text-forest-900 transition hover:border-forest-700/30"
                >
                  Frequently asked questions
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="h-3.5 w-3.5 text-forest-600 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </NuxtLink>
              </div>
            </div>

            <div class="mt-6 border-t border-forest-900/10 pt-5">
              <p class="text-xs leading-6 text-slate-600">
                Messages are reviewed during administrative hours. Response times may vary, especially during weekends and holidays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact form -->
    <section
      id="contact-form"
      class="scroll-mt-28 border-y border-forest-900/[0.07] bg-ivory"
    >
      <div class="container-page py-16 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Send an enquiry"
              title="A form that opens in WhatsApp."
              description="Complete the fields below and we will prepare a clear WhatsApp message for you to review. Nothing is stored on this website."
            />

            <ul class="mt-8 space-y-4">
              <li class="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <UIcon
                  name="i-lucide-pen-line"
                  class="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                Give us enough detail to understand your enquiry.
              </li>
              <li class="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <UIcon
                  name="i-lucide-eye"
                  class="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                Review the prepared message before sending it.
              </li>
              <li class="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <UIcon
                  name="i-lucide-shield-check"
                  class="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                Avoid sensitive personal details about children.
              </li>
            </ul>

            <div class="mt-8 rounded-xl border border-gold/25 bg-gold-soft/20 p-4">
              <p class="text-xs leading-6 text-slate-600">
                Not sure which programme or age group applies? Say so in your message — the administration will guide you.
              </p>
            </div>
          </div>

          <div class="rounded-[1.5rem] border border-forest-900/10 bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Map -->
    <section
      v-if="madrasah.contact.mapEmbedUrl"
      class="bg-white"
    >
      <div class="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Find us"
          title="Location"
          description="Directions to the Madrasah. Please confirm the exact venue details with the administration before travelling."
        />
        <div class="mt-8 overflow-hidden rounded-[1.5rem] border border-forest-900/10">
          <iframe
            :src="madrasah.contact.mapEmbedUrl"
            title="Map showing the Madrasah location"
            class="h-[26rem] w-full"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>
        <a
          v-if="madrasah.contact.mapLink"
          :href="madrasah.contact.mapLink"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-700 hover:text-forest-900"
        >
          Open location in maps<span class="sr-only"> (opens in a new tab)</span>
          <UIcon
            name="i-lucide-arrow-up-right"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <ProgrammeEnquiryCTA
          title="We are happy to help."
          description="For programme details, placement or general questions, send a WhatsApp message and our administration will respond as soon as possible."
          message="Assalamu Alaikum. I have an enquiry about your Madrasah."
        />
      </div>
    </section>
  </div>
</template>
