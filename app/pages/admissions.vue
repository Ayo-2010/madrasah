<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { programmes } from '~/data/programmes'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Admissions & Registration'),
  description:
    'How to enquire and register at our Madrasah. Learn who can apply, what information we need, how placement works and how to ask about current fees.',
  path: '/admissions',
})

const eligibility = [
  {
    icon: 'i-lucide-sprout',
    title: 'Children',
    text: 'Younger learners can begin with Qur’an reading, short surahs, du’as and the foundations of Islamic manners.',
  },
  {
    icon: 'i-lucide-user-round',
    title: 'Teenagers',
    text: 'Teenagers can study Qur’an, Tajweed, Arabic and Islamic studies at a level suited to their experience.',
  },
  {
    icon: 'i-lucide-users-round',
    title: 'Adults',
    text: 'Adults are welcome in every programme, including beginners returning to learning after many years.',
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Complete beginners',
    text: 'No prior Islamic studies are required for most programmes. Qur’an memorisation begins with a reading-readiness check.',
  },
]

const requiredInfo = [
  'The parent or guardian’s name (or the adult student’s name).',
  'The student’s age group — not a full date of birth.',
  'The programme you are interested in, or “not sure yet”.',
  'Whether you are considering in-person or online learning.',
  'Your preferred contact method for the reply.',
]

const steps = [
  {
    title: 'Send an enquiry',
    description:
      'Use the form below or message us on WhatsApp. Share the learner’s age group, programme interest and any relevant experience. Please avoid sending sensitive documents at this stage.',
  },
  {
    title: 'Talk through placement',
    description:
      'We will discuss goals, prior learning and the format you prefer. Where needed, the teacher will assess reading level to recommend a suitable starting point.',
  },
  {
    title: 'Receive the current options',
    description:
      'We explain available class arrangements, current fees and the information required to register. Availability is confirmed individually; an enquiry does not reserve a place.',
  },
  {
    title: 'Complete registration',
    description:
      'Once you are ready, complete the arrangements agreed with the administration and receive the practical details for the first lesson.',
  },
]

const afterEnquiry = [
  'A member of the administration reviews your message during working hours.',
  'We reply with suitable options, or ask a short follow-up question.',
  'You decide whether to proceed — there is no obligation to register.',
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Admissions"
      title="Join Our Madrasah"
      description="A clear, personal admissions process. Tell us about the learner, and we will help you find a suitable programme and understand the next steps."
      :breadcrumbs="[{ label: 'Admissions' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Start an Enquiry on WhatsApp"
          message="Assalamu Alaikum. I would like to know how to register a student at your Madrasah."
        />
        <a
          href="#enquiry-form"
          class="btn-secondary"
        >
          Use the enquiry form
          <UIcon
            name="i-lucide-arrow-down"
            class="h-4 w-4"
            aria-hidden="true"
          />
        </a>
      </template>

      <template #aside>
        <div class="w-64 rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
          <div class="flex items-center gap-2">
            <span
              class="h-2 w-2 rounded-full"
              :class="madrasah.admissionsOpen ? 'bg-forest-500' : 'bg-gold'"
              aria-hidden="true"
            />
            <p class="text-[0.625rem] font-semibold tracking-[0.14em] text-forest-700 uppercase">
              {{ madrasah.admissionsOpen ? 'Enquiries open' : 'Enquire for availability' }}
            </p>
          </div>
          <p class="mt-3 text-xs leading-6 text-slate-600">
            {{ madrasah.admissionsOpen
              ? 'We are accepting admission enquiries for current and upcoming classes.'
              : 'Contact the administration to ask about current availability.' }}
          </p>
          <div class="mt-4 border-t border-line pt-4">
            <p class="text-[0.6875rem] leading-5 text-slate-600">
              Placement and fees are confirmed directly with the administration.
            </p>
          </div>
        </div>
      </template>
    </PageHero>

    <!-- Who can apply -->
    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Who can apply"
          title="A place for every stage of learning."
          description="We teach children, teenagers and adults. The right class depends on age, experience and the programme chosen."
        />

        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="item in eligibility"
            :key="item.title"
            class="rounded-2xl border border-line bg-ivory p-6"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-forest-700 shadow-sm">
              <UIcon
                :name="item.icon"
                class="h-4.5 w-4.5"
                aria-hidden="true"
              />
            </span>
            <h2 class="mt-4 text-base font-semibold tracking-[-0.01em] text-forest-900">
              {{ item.title }}
            </h2>
            <p class="mt-2 text-xs leading-6 text-slate-600">
              {{ item.text }}
            </p>
          </li>
        </ul>

        <div class="mt-10 rounded-2xl border border-gold/25 bg-gold-soft/20 p-5">
          <p class="flex items-start gap-2.5 text-xs leading-6 text-slate-600">
            <UIcon
              name="i-lucide-info"
              class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
              aria-hidden="true"
            />
            Age guidance is indicative. Final placement considers the learner’s readiness, the programme and current class availability. Please ask us if you are unsure.
          </p>
        </div>
      </div>
    </section>

    <!-- Programmes -->
    <section class="border-y border-forest-900/[0.07] bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Available programmes"
            title="Choose a starting point."
            description="Every programme has its own page with objectives, topics and entry guidance."
          />
          <PrimaryButton
            to="/programmes"
            variant="secondary"
            size="sm"
          >
            Compare programmes
          </PrimaryButton>
        </div>

        <ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="programme in programmes"
            :key="programme.slug"
          >
            <NuxtLink
              :to="`/programmes/${programme.slug}`"
              class="group flex items-center justify-between gap-4 rounded-xl border border-forest-900/10 bg-white px-5 py-4 transition hover:border-forest-700/30 hover:bg-white"
            >
              <span class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-mint text-forest-700">
                  <UIcon
                    :name="programme.icon"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <span class="text-sm font-medium text-forest-900">{{ programme.title }}</span>
              </span>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="h-4 w-4 shrink-0 text-forest-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Registration process -->
    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Registration process"
              title="Four straightforward steps."
              description="We keep the process personal and unhurried. You will always know what happens next before you commit to anything."
            />
            <div class="mt-8 rounded-2xl bg-forest-900 p-6">
              <h2 class="text-lg !text-ivory">
                Questions before you start?
              </h2>
              <p class="mt-2 text-xs leading-6 text-ivory/60">
                Ask about age groups, class formats or the information we need.
              </p>
              <WhatsAppButton
                label="Ask the admissions team"
                variant="white"
                size="sm"
                block
                class="mt-4"
                message="Assalamu Alaikum. I have a question about admission to your Madrasah."
              />
            </div>
          </div>

          <ol class="relative">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="relative flex gap-5 pb-8 last:pb-0"
            >
              <div class="flex flex-col items-center">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-700/20 bg-forest-50 font-display text-sm font-semibold text-forest-700">
                  {{ index + 1 }}
                </span>
                <span
                  v-if="index < steps.length - 1"
                  class="mt-2 w-px flex-1 bg-gradient-to-b from-forest-700/25 to-forest-700/5"
                  aria-hidden="true"
                />
              </div>
              <div class="pt-1">
                <h3 class="text-base font-semibold tracking-[-0.01em] text-forest-900">
                  {{ step.title }}
                </h3>
                <p class="mt-1.5 text-sm leading-7 text-slate-600">
                  {{ step.description }}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Required information and fees -->
    <section class="border-t border-forest-900/[0.07] bg-ivory">
      <div class="container-page grid gap-5 py-16 lg:grid-cols-2 lg:py-20">
        <div class="rounded-[1.5rem] border border-forest-900/10 bg-white p-7 sm:p-8">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-forest-700">
            <UIcon
              name="i-lucide-clipboard-list"
              class="h-4.5 w-4.5"
              aria-hidden="true"
            />
          </span>
          <h2 class="mt-5 text-2xl tracking-[-0.02em]">
            What we need to begin
          </h2>
          <p class="mt-2 text-sm leading-7 text-slate-600">
            For an initial enquiry, the following is enough. We do not ask for unnecessary personal information or copies of documents at this stage.
          </p>
          <ul class="mt-5 space-y-3">
            <li
              v-for="item in requiredInfo"
              :key="item"
              class="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                aria-hidden="true"
              />
              {{ item }}
            </li>
          </ul>
          <p class="mt-5 text-xs leading-6 text-slate-600">
            Your details are only used to respond to your enquiry. Read the
            <NuxtLink
              to="/privacy-policy"
              class="font-medium text-forest-700 underline decoration-forest-700/30 underline-offset-2"
            >
              privacy policy
            </NuxtLink>.
          </p>
        </div>

        <div class="rounded-[1.5rem] border border-forest-900/10 bg-white p-7 sm:p-8">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-forest-700">
            <UIcon
              name="i-lucide-banknote"
              class="h-4.5 w-4.5"
              aria-hidden="true"
            />
          </span>
          <h2 class="mt-5 text-2xl tracking-[-0.02em]">
            Fees and payment
          </h2>
          <p class="mt-2 text-sm leading-7 text-slate-600">
            Programme fees depend on the programme, the class format and the number of sessions. Current fees are not published on this website because they must be confirmed as accurate for your chosen arrangement.
          </p>
          <div class="mt-5 rounded-xl bg-ivory p-4">
            <p class="text-xs leading-6 text-slate-600">
              The administration provides the approved fee information in writing before registration. Please do not make a payment using details from any other source.
            </p>
          </div>
          <WhatsAppButton
            label="Ask About Current Fees"
            variant="secondary"
            size="sm"
            class="mt-5"
            message="Assalamu Alaikum. Please provide information about your programme fees."
          />
        </div>
      </div>
    </section>

    <!-- Enquiry form -->
    <section
      id="enquiry-form"
      class="scroll-mt-28 bg-white"
    >
      <div class="container-page py-16 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Admission enquiry"
              title="Tell us a little about the learner."
              description="Complete the short form and we will prepare a WhatsApp message for you. You can review it before sending."
            />

            <div class="mt-8 space-y-5">
              <div class="border-t border-forest-900/10 pt-4">
                <h2 class="text-sm font-semibold text-forest-900">
                  What happens after you enquire
                </h2>
                <ol class="mt-3 space-y-2.5">
                  <li
                    v-for="(item, index) in afterEnquiry"
                    :key="item"
                    class="flex items-start gap-2.5 text-xs leading-6 text-slate-600"
                  >
                    <span class="mt-1 font-display text-[0.6875rem] font-semibold text-gold-deep">
                      {{ index + 1 }}.
                    </span>
                    {{ item }}
                  </li>
                </ol>
              </div>

              <div class="rounded-xl border border-gold/25 bg-gold-soft/20 p-4">
                <p class="flex items-start gap-2 text-xs leading-6 text-slate-600">
                  <UIcon
                    name="i-lucide-shield-check"
                    class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                    aria-hidden="true"
                  />
                  Please do not include a child’s full name, date of birth, school details or any sensitive documents in the message. We will request what is genuinely needed through an agreed channel.
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-[1.5rem] border border-forest-900/10 bg-ivory p-6 shadow-card sm:p-8">
            <div class="mb-6 flex items-start gap-3 border-b border-forest-900/10 pb-5">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1F9D55] text-white">
                <WhatsAppIcon class="h-5 w-5" />
              </span>
              <div>
                <h2 class="text-lg tracking-[-0.01em]">
                  Admission enquiry
                </h2>
                <p class="mt-0.5 text-xs text-slate-600">
                  Fields marked * are required.
                </p>
              </div>
            </div>
            <AdmissionEnquiryForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <ProgrammeEnquiryCTA
          title="Prefer to speak with someone directly?"
          description="Send a WhatsApp message and our administration will help with programmes, placement and the registration process."
          message="Assalamu Alaikum. I would like to know how to register a student at your Madrasah."
        />
      </div>
    </section>
  </div>
</template>
