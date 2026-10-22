<script setup lang="ts">
import { programmes } from '~/data/programmes'
import { featuredFaqs } from '~/data/faqs'
import { teachers } from '~/data/teachers'
import { gallery } from '~/data/gallery'
import { pageTitle } from '~/composables/usePageSeo'

const homeMessage = 'Assalamu Alaikum. I would like to learn more about your Madrasah.'

usePageSeo({
  title: pageTitle('Qur\'an, Arabic & Islamic Studies'),
  description:
    'A community Islamic school teaching the Qur\'an, Arabic and Islamic studies to children, teenagers and adults. Enquire about programmes and admissions on WhatsApp.',
  path: '/',
})

const pillars = [
  {
    icon: 'i-lucide-book-open',
    title: 'Sound foundations',
    text: 'Learning built step by step, with care for correct understanding and practice.',
  },
  {
    icon: 'i-lucide-user-round-check',
    title: 'Personal attention',
    text: 'Programme placement that considers each learner’s age, level and goals.',
  },
  {
    icon: 'i-lucide-heart-handshake',
    title: 'Character alongside knowledge',
    text: 'Adab, responsibility and good manners woven into the learning experience.',
  },
]

const benefits = [
  {
    icon: 'i-lucide-list-checks',
    title: 'A clear structure',
    text: 'Each programme has defined objectives and a considered sequence, so learners know what they are working towards.',
  },
  {
    icon: 'i-lucide-users',
    title: 'Known by name',
    text: 'Teaching that pays attention to the individual, with placement and pace discussed before classes begin.',
  },
  {
    icon: 'i-lucide-sprout',
    title: 'Character matters',
    text: 'Knowledge is paired with adab, responsibility and the everyday practice of good manners.',
  },
  {
    icon: 'i-lucide-messages-square',
    title: 'A learning partnership',
    text: 'Clear communication with parents and guardians about progress and the next steps in learning.',
  },
]

const approachSteps = [
  {
    title: 'Start with a conversation',
    description:
      'Tell us about the learner, their goals and any previous study. We will answer your questions and explain what is available.',
  },
  {
    title: 'Find the right placement',
    description:
      'Age, reading level and preferred format help us suggest the programme and class arrangement that fits best.',
  },
  {
    title: 'Learn with guidance',
    description:
      'Lessons combine clear teaching, guided practice and gentle correction from a teacher who knows the learner’s pace.',
  },
  {
    title: 'Review and revise',
    description:
      'Regular review keeps earlier learning active, whether that is Qur’an revision, vocabulary or the essentials of worship.',
  },
  {
    title: 'Keep progress in view',
    description:
      'Feedback and progress conversations help students and families understand what is improving and what comes next.',
  },
]

const admissionsSteps = [
  {
    title: 'Contact the administration',
    description: 'Send a WhatsApp message with the student’s age group and programme of interest.',
  },
  {
    title: 'Discuss goals and placement',
    description: 'Talk through experience, learning goals and the format that would suit your family.',
  },
  {
    title: 'Receive the available options',
    description: 'We explain current class arrangements, fees and the information needed to register.',
  },
  {
    title: 'Confirm registration',
    description: 'Complete the arrangements agreed with the administration and prepare for the first lesson.',
  },
]

const environmentImages = [
  gallery.find(item => item.id === 'study-arch'),
  gallery.find(item => item.id === 'recitation-rays'),
  gallery.find(item => item.id === 'courtyard-arches'),
].filter((item): item is NonNullable<typeof item> => Boolean(item))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <IslamicPattern
        variant="lattice"
        opacity="opacity-[0.04] text-forest-800"
      />
      <div
        class="pointer-events-none absolute top-24 -left-40 h-96 w-96 rounded-full bg-forest-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div class="container-page relative grid items-center gap-16 pt-12 pb-24 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:pt-20 lg:pb-28">
        <div class="max-w-2xl">
          <p class="eyebrow">
            <span
              class="h-px w-7 bg-current opacity-60"
              aria-hidden="true"
            />
            An Islamic school for every generation
          </p>

          <h1 class="mt-5 text-[2.85rem] leading-[1.02] tracking-[-0.04em] sm:text-[3.75rem] lg:text-[4.25rem]">
            Building faith, knowledge and
            <em class="font-normal text-forest-700 italic">character.</em>
          </h1>

          <p class="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-[1.0625rem]">
            Discover a nurturing Islamic learning environment where students develop their relationship with the Qur’an, strengthen their understanding of Islam, and grow in knowledge and good character.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton
              label="Contact Us on WhatsApp"
              size="lg"
              :message="homeMessage"
            />
            <PrimaryButton
              to="/programmes"
              variant="secondary"
              size="lg"
            >
              Explore Our Programmes
            </PrimaryButton>
          </div>

          <dl class="mt-10 grid max-w-xl grid-cols-1 gap-x-6 gap-y-4 border-t border-forest-900/10 pt-6 sm:grid-cols-3">
            <div>
              <dt class="text-[0.5625rem] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                Programmes
              </dt>
              <dd class="mt-1 text-sm font-medium text-forest-900">
                {{ programmes.length }} focused pathways
              </dd>
            </div>
            <div>
              <dt class="text-[0.5625rem] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                Who we teach
              </dt>
              <dd class="mt-1 text-sm font-medium text-forest-900">
                Children, teenagers & adults
              </dd>
            </div>
            <div>
              <dt class="text-[0.5625rem] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                Placement
              </dt>
              <dd class="mt-1 text-sm font-medium text-forest-900">
                Guided by a conversation
              </dd>
            </div>
          </dl>
        </div>

        <div class="lg:pl-6">
          <HeroArtwork />
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="border-y border-forest-900/[0.07] bg-white">
      <div class="container-page grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-24">
        <div>
          <SectionHeading
            eyebrow="Welcome to the Madrasah"
            title="A place to learn, grow and belong."
            description="We are a community Islamic school dedicated to teaching the Qur’an, the Arabic language and the foundations of Islamic knowledge."
          >
            <template #actions>
              <PrimaryButton
                to="/about"
                variant="secondary"
                size="sm"
              >
                Read our story
              </PrimaryButton>
            </template>
          </SectionHeading>
        </div>

        <div>
          <div class="space-y-5 text-[0.9375rem] leading-8 text-slate-600">
            <p>
              Our students come from across the community — young children taking their first steps in Qur’an reading, teenagers building a deeper understanding of their faith, and adults returning to learning with purpose.
            </p>
            <p>
              Lessons are taught in a calm, structured way, with attention to correct recitation, sound knowledge and the character that should accompany both. We believe Islamic learning should be clear, encouraging and lived out beyond the classroom.
            </p>
          </div>

          <div class="mt-8 grid gap-5 sm:grid-cols-3">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="border-t border-forest-900/10 pt-5"
            >
              <UIcon
                :name="pillar.icon"
                class="h-5 w-5 text-forest-600"
                aria-hidden="true"
              />
              <h2 class="mt-3 text-[0.9375rem] font-semibold tracking-[-0.01em] text-forest-900">
                {{ pillar.title }}
              </h2>
              <p class="mt-1.5 text-xs leading-6 text-slate-600">
                {{ pillar.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Programmes -->
    <section class="bg-ivory">
      <div class="container-page py-20 lg:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our programmes"
            title="Learning pathways for every stage."
            description="From first Qur’an lessons to structured memorisation and deeper Islamic study, each programme is taught with purpose and care."
          />
          <NuxtLink
            to="/programmes"
            class="group inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-forest-700 transition hover:text-forest-900"
          >
            View all programmes
            <UIcon
              name="i-lucide-arrow-right"
              class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <ProgrammeCard
            v-for="programme in programmes"
            :key="programme.slug"
            :programme="programme"
          />

          <NuxtLink
            to="/programmes"
            class="group relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-forest-900 p-7 text-ivory transition duration-300 hover:-translate-y-1 hover:shadow-soft"
          >
            <IslamicPattern
              variant="stars"
              opacity="opacity-10 text-gold"
            />
            <div class="relative">
              <span class="inline-flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.16em] text-gold-soft uppercase">
                <span
                  class="h-px w-5 bg-gold/60"
                  aria-hidden="true"
                />
                Not sure where to start?
              </span>
              <h3 class="mt-4 text-2xl leading-snug tracking-[-0.02em] !text-ivory">
                Let us help you find the right programme.
              </h3>
              <p class="mt-3 text-sm leading-7 text-ivory/65">
                Tell us the learner’s age and goals, and we will advise on the most suitable starting point.
              </p>
            </div>
            <span class="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
              Compare programmes
              <UIcon
                name="i-lucide-arrow-right"
                class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="relative overflow-hidden bg-forest-950 text-ivory">
      <IslamicPattern
        variant="arches"
        opacity="opacity-[0.07] text-gold"
      />
      <div
        class="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full border border-gold/10"
        aria-hidden="true"
      />

      <div class="container-page relative grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
        <div>
          <SectionHeading
            eyebrow="Why families choose us"
            title="Taught with care. Built on sound foundations."
            description="We keep the essentials simple: clear teaching, personal attention and an environment where good character is part of the lesson."
            tone="light"
          />

          <figure class="mt-10 border-l border-gold/30 pl-6">
            <p
              class="font-arabic text-[1.75rem] leading-[2.4] text-gold-soft"
              lang="ar"
              dir="rtl"
            >
              خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
            </p>
            <blockquote class="mt-4 text-sm leading-7 text-ivory/65">
              “The best of you are those who learn the Qur’an and teach it.”
            </blockquote>
            <figcaption class="mt-2 text-[0.6875rem] tracking-wide text-ivory/65">
              Sahih al-Bukhari 5027
            </figcaption>
          </figure>
        </div>

        <ul class="grid gap-4 sm:grid-cols-2">
          <li
            v-for="benefit in benefits"
            :key="benefit.title"
            class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-gold/25 hover:bg-white/[0.06]"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-gold-soft">
              <UIcon
                :name="benefit.icon"
                class="h-4.5 w-4.5"
                aria-hidden="true"
              />
            </span>
            <h3 class="mt-5 text-lg tracking-[-0.01em] !text-ivory">
              {{ benefit.title }}
            </h3>
            <p class="mt-2 text-[0.8125rem] leading-6 text-ivory/60">
              {{ benefit.text }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Learning approach -->
    <section class="bg-white">
      <div class="container-page grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="How learning works"
            title="A clear path, from first enquiry to steady progress."
            description="We begin with a conversation rather than a form. That helps us place each learner thoughtfully and keep expectations realistic."
          />

          <div class="mt-8 rounded-2xl border border-forest-900/10 bg-ivory p-5">
            <p class="text-xs leading-6 text-slate-600">
              Every learner is different. Class availability and placement are confirmed individually.
            </p>
            <WhatsAppButton
              label="Ask about placement"
              variant="secondary"
              size="sm"
              class="mt-4"
              message="Assalamu Alaikum. I would like to ask about the right programme and class placement for a student."
            />
          </div>
        </div>

        <ol class="relative">
          <LearningStep
            v-for="(step, index) in approachSteps"
            :key="step.title"
            :step="String(index + 1).padStart(2, '0')"
            :title="step.title"
            :description="step.description"
            :last="index === approachSteps.length - 1"
          />
        </ol>
      </div>
    </section>

    <!-- Teachers -->
    <section class="border-y border-forest-900/[0.07] bg-mint/60">
      <div class="container-page py-20 lg:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our teaching team"
            title="Teaching that pays attention to the person."
            description="Our teachers guide students through recitation, memorisation, language and Islamic studies with patience and clarity."
          />
          <NuxtLink
            to="/teachers"
            class="group inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-forest-700 transition hover:text-forest-900"
          >
            Meet the teaching team
            <UIcon
              name="i-lucide-arrow-right"
              class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>

        <div class="mt-10">
          <TeacherGrid :teachers="teachers.slice(0, 3)" />
        </div>
      </div>
    </section>

    <!-- Admissions process -->
    <section class="bg-white">
      <div class="container-page py-20 lg:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Admissions"
            title="Joining is a conversation, not a queue."
            description="A few simple steps help us understand what you need and confirm the right arrangements before classes begin."
          />
          <PrimaryButton
            to="/admissions"
            variant="secondary"
            size="sm"
          >
            Admissions information
          </PrimaryButton>
        </div>

        <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, index) in admissionsSteps"
            :key="step.title"
            class="relative rounded-2xl border border-line bg-ivory p-6"
          >
            <span class="font-display text-3xl leading-none text-gold-deep">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="mt-4 text-base font-semibold tracking-[-0.01em] text-forest-900">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-xs leading-6 text-slate-600">
              {{ step.description }}
            </p>
          </li>
        </ol>

        <div class="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-forest-700/15 bg-forest-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm leading-6 text-slate-600">
            Ready to begin? Speak with our admissions team directly.
          </p>
          <WhatsAppButton
            label="Start an admissions enquiry"
            size="sm"
            message="Assalamu Alaikum. I would like to know how to register a student at your Madrasah."
          />
        </div>
      </div>
    </section>

    <!-- Learning environment -->
    <section class="bg-ivory">
      <div class="container-page py-20 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our learning environment"
              title="Calm spaces for focused learning."
              description="An environment designed around attention, respect and the practical needs of learners — from quiet reading to guided recitation."
            />
            <div class="mt-7 flex flex-wrap gap-3">
              <PrimaryButton
                to="/gallery"
                variant="secondary"
                size="sm"
              >
                View the gallery
              </PrimaryButton>
              <NuxtLink
                to="/facilities"
                class="inline-flex min-h-10 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-forest-700 transition hover:text-forest-900"
              >
                Facilities
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
            <p class="mt-6 max-w-md text-xs leading-6 text-slate-600">
              Images shown are illustrative artwork. Approved photographs of the Madrasah will be published with permission.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <NuxtLink
              v-if="environmentImages[0]"
              to="/gallery"
              class="group relative row-span-2 aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-forest-900/10"
            >
              <img
                :src="environmentImages[0].src"
                :alt="environmentImages[0].alt"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
                decoding="async"
                width="800"
                height="1067"
              >
              <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/80 to-transparent p-5 pt-12">
                <span class="text-sm font-medium text-ivory">{{ environmentImages[0].caption }}</span>
              </span>
            </NuxtLink>

            <div class="grid gap-3 sm:gap-4">
              <NuxtLink
                v-for="image in environmentImages.slice(1, 3)"
                :key="image?.id"
                to="/gallery"
                class="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-forest-900/10"
              >
                <img
                  :src="image?.src"
                  :alt="image?.alt"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                >
                <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/75 to-transparent p-4 pt-10">
                  <span class="text-xs font-medium text-ivory">{{ image?.caption }}</span>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="border-t border-forest-900/[0.07] bg-white">
      <div class="container-page grid gap-12 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:py-24">
        <div>
          <SectionHeading
            eyebrow="Common questions"
            title="Answers before you ask."
            description="A few practical questions families often raise. If yours is not here, our team is a message away."
          />

          <div class="mt-8 rounded-2xl bg-forest-900 p-6 text-ivory">
            <p class="text-sm leading-7 text-ivory/70">
              Still unsure about a programme, fee or class arrangement?
            </p>
            <WhatsAppButton
              label="Ask the administration"
              variant="white"
              size="sm"
              block
              class="mt-4"
              message="Assalamu Alaikum. I have a question about your Madrasah."
            />
            <NuxtLink
              to="/faq"
              class="mt-3 inline-flex text-xs font-medium text-gold-soft underline decoration-gold/30 underline-offset-4 hover:text-white"
            >
              Read all frequently asked questions
            </NuxtLink>
          </div>
        </div>

        <div>
          <FAQAccordion :items="featuredFaqs" />
          <p class="mt-6 text-xs leading-6 text-slate-600">
            Programme details, fees and class times are confirmed individually. Sending an enquiry does not reserve a place.
          </p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-ivory">
      <div class="container-page py-16 sm:py-20">
        <div class="relative overflow-hidden rounded-[1.75rem] bg-forest-900 px-6 py-14 sm:rounded-[2rem] sm:px-12 lg:px-16 lg:py-20">
          <IslamicPattern
            variant="arches"
            opacity="opacity-[0.1] text-gold"
          />
          <div
            class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border border-gold/15"
            aria-hidden="true"
          />
          <p
            class="pointer-events-none absolute right-8 bottom-0 hidden font-arabic text-[9rem] leading-none text-white/[0.04] lg:block"
            aria-hidden="true"
            lang="ar"
            dir="rtl"
          >
            اقرأ
          </p>

          <div class="relative grid items-center gap-10 lg:grid-cols-[1.15fr_auto]">
            <div class="max-w-2xl">
              <p class="eyebrow !text-gold-soft">
                <span
                  class="h-px w-6 bg-current opacity-60"
                  aria-hidden="true"
                />
                Begin your journey
              </p>
              <h2 class="mt-4 text-[2.25rem] leading-[1.08] tracking-[-0.03em] !text-ivory sm:text-[3rem]">
                Begin your Islamic learning journey.
              </h2>
              <p class="mt-4 max-w-xl text-sm leading-7 text-ivory/65 sm:text-base sm:leading-8">
                Contact our team to learn more about our programmes, class arrangements and admission process. We will help you take the next step.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <WhatsAppButton
                label="Chat With Us on WhatsApp"
                variant="white"
                size="lg"
                :message="homeMessage"
              />
              <PrimaryButton
                to="/admissions"
                variant="outline"
                size="lg"
              >
                View Admission Information
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
