<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { teachers } from '~/data/teachers'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('About Our Madrasah'),
  description:
    'Learn about our mission, vision, values and educational approach — a community Islamic school serving children, teenagers and adults.',
  path: '/about',
})

const values = [
  {
    title: 'Sincerity',
    arabic: 'إخلاص',
    description:
      'We encourage learning for the right reasons: seeking knowledge, drawing closer to Allah and serving others well.',
  },
  {
    title: 'Knowledge',
    arabic: 'علم',
    description:
      'We value sound, carefully taught knowledge over hurried claims of progress.',
  },
  {
    title: 'Good character',
    arabic: 'أخلاق',
    description:
      'Knowledge should be visible in patience, honesty, respect and the way we treat those around us.',
  },
  {
    title: 'Excellence',
    arabic: 'إحسان',
    description:
      'We ask for careful effort, whether in a single letter of recitation or a full lesson of study.',
  },
  {
    title: 'Respect',
    arabic: 'احترام',
    description:
      'Teachers, students and families are treated with dignity, kindness and a willingness to listen.',
  },
  {
    title: 'Service',
    arabic: 'خدمة',
    description:
      'We see education as a responsibility to our community and a way of contributing beyond ourselves.',
  },
]

const philosophy = [
  {
    title: 'The Qur’an at the centre',
    text: 'Recitation, memorisation and understanding are treated as connected parts of one relationship with the Book of Allah.',
  },
  {
    title: 'Knowledge with context',
    text: 'Students learn what they practice and why it matters, with space to ask questions and grow in understanding.',
  },
  {
    title: 'Practice over performance',
    text: 'We value consistent, careful effort. Progress is reviewed honestly rather than measured by promises or comparisons.',
  },
  {
    title: 'Character in everyday life',
    text: 'Adab is not an extra subject. It is part of how lessons are taught, how students treat one another and how learning is applied at home.',
  },
  {
    title: 'A partnership with families',
    text: 'Parents and guardians are treated as part of the learning journey, with clear communication about progress and next steps.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="A community of learning"
      title="About Our Madrasah"
      description="A community Islamic school dedicated to teaching the Qur’an, the Arabic language and the foundations of Islamic knowledge — with care, structure and good character."
      :breadcrumbs="[{ label: 'About' }]"
    >
      <template #actions>
        <WhatsAppButton
          label="Speak With the Administration"
          message="Assalamu Alaikum. I would like to learn more about your Madrasah."
        />
        <PrimaryButton
          to="/programmes"
          variant="secondary"
        >
          Explore programmes
        </PrimaryButton>
      </template>

      <template #aside>
        <div class="arch-frame relative flex h-56 w-44 items-center justify-center overflow-hidden border border-gold/25 bg-forest-900">
          <IslamicPattern
            variant="stars"
            opacity="opacity-[0.16] text-gold"
          />
          <div class="relative text-center">
            <p
              class="font-arabic text-3xl text-gold-soft"
              lang="ar"
              dir="rtl"
            >
              {{ madrasah.arabicName }}
            </p>
            <div class="mx-auto mt-3 h-px w-10 bg-gold/40" />
            <p class="mt-3 text-[0.5625rem] tracking-[0.2em] text-ivory/65 uppercase">
              {{ madrasah.shortName }}
            </p>
          </div>
        </div>
      </template>
    </PageHero>

    <!-- Our story -->
    <section class="bg-white">
      <div class="container-page grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-24">
        <SectionHeading
          eyebrow="Our story"
          title="Founded to serve a simple need."
        />

        <div class="space-y-5 text-[0.9375rem] leading-8 text-slate-600">
          <p class="text-lg leading-8 text-forest-900">
            Families need a place where Islamic learning is taught properly, patiently and with genuine care for the learner.
          </p>
          <p>
            The Madrasah exists to meet that need: a community school where children can begin with the letters of the Qur’an, teenagers can strengthen their understanding of the faith, and adults can return to learning without embarrassment or pressure.
          </p>
          <p>
            Our work is built around a straightforward conviction — that sound knowledge, correct worship and good character belong together. Lessons are planned, progress is reviewed, and every learner is encouraged to take one careful step at a time.
          </p>
          <p>
            We continue to develop our programmes around the needs of the families we serve, while keeping the essentials at the centre: the Qur’an, authentic knowledge, and adab.
          </p>

          <div class="mt-8 rounded-2xl border border-forest-900/10 bg-ivory p-6">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-info"
                class="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                aria-hidden="true"
              />
              <p class="text-xs leading-6 text-slate-600">
                Institutional history, founding details and affiliations are supplied by the Madrasah and will be published once confirmed. We do not publish unverified claims about our history or credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission and vision -->
    <section class="bg-ivory">
      <div class="container-page py-20 lg:py-24">
        <div class="grid gap-5 lg:grid-cols-2">
          <div class="relative overflow-hidden rounded-[1.75rem] bg-forest-900 p-8 text-ivory sm:p-10">
            <IslamicPattern
              variant="lattice"
              opacity="opacity-[0.08] text-gold"
            />
            <div class="relative">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-gold-soft">
                <UIcon
                  name="i-lucide-compass"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
              <p class="mt-6 text-[0.625rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
                Our mission
              </p>
              <h2 class="mt-3 text-[1.75rem] leading-tight tracking-[-0.02em] !text-ivory sm:text-[2rem]">
                To help every learner build a sound, lasting relationship with the Qur’an and the knowledge and character that follow from it.
              </h2>
              <p class="mt-4 text-sm leading-7 text-ivory/65">
                We do this through structured teaching, personal attention and an environment in which faith is learned with understanding and lived with care.
              </p>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-white p-8 sm:p-10">
            <IslamicPattern
              variant="stars"
              opacity="opacity-[0.04] text-forest-800"
            />
            <div class="relative">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-forest-700">
                <UIcon
                  name="i-lucide-sunrise"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
              <p class="mt-6 text-[0.625rem] font-semibold tracking-[0.2em] text-forest-700 uppercase">
                Our vision
              </p>
              <h2 class="mt-3 text-[1.75rem] leading-tight tracking-[-0.02em] sm:text-[2rem]">
                A community in which Islamic learning is accessible, well taught and lived out in daily life.
              </h2>
              <p class="mt-4 text-sm leading-7 text-slate-600">
                We want our students to leave with more than information: a confident relationship with their faith, a habit of careful practice and a commitment to serving others well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-white">
      <div class="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="What guides us"
          title="Values that shape the classroom."
          description="Our values are practical. They influence how lessons are planned, how students are treated and what we ask of ourselves as teachers."
        />

        <ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="value in values"
            :key="value.title"
            class="border-t border-forest-900/10 pt-5"
          >
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="text-lg tracking-[-0.01em]">
                {{ value.title }}
              </h3>
              <span
                class="font-arabic text-lg text-gold-deep"
                lang="ar"
                dir="rtl"
              >{{ value.arabic }}</span>
            </div>
            <p class="mt-2 text-sm leading-7 text-slate-600">
              {{ value.description }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Educational philosophy -->
    <section class="border-y border-forest-900/[0.07] bg-ivory">
      <div class="container-page grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Our educational approach"
            title="Knowledge that is understood, practised and lived."
            description="Islamic learning is not a race. We teach in a way that respects the subject, the learner and the responsibilities that come with knowledge."
          />
          <div class="mt-8 overflow-hidden rounded-2xl border border-forest-900/10 bg-white">
            <div class="arch-frame relative flex h-44 items-center justify-center border-b border-forest-900/10 bg-forest-50">
              <span
                class="font-arabic text-4xl leading-loose text-forest-800"
                lang="ar"
                dir="rtl"
              >
                العلم نور
              </span>
            </div>
            <div class="p-5">
              <p class="text-[0.6875rem] leading-5 text-slate-600">
                “Knowledge is light” — a widely quoted phrase on the value of learning. It is used here as a thematic reflection, not as an attributed hadith.
              </p>
            </div>
          </div>
        </div>

        <ol class="space-y-1">
          <li
            v-for="(item, index) in philosophy"
            :key="item.title"
            class="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-forest-900/10 py-6 first:pt-0 last:border-b-0"
          >
            <span class="pt-0.5 font-display text-sm font-semibold text-gold-deep">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="text-base font-semibold tracking-[-0.01em] text-forest-900">
                {{ item.title }}
              </h3>
              <p class="mt-1.5 text-sm leading-7 text-slate-600">
                {{ item.text }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Leadership and teachers -->
    <section class="bg-white">
      <div class="container-page py-20 lg:py-24">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Leadership and teaching"
            title="The people behind the learning."
            description="Our teaching team is organised around the subjects we teach, with each teacher responsible for a clear area of learning and student support."
          />
          <PrimaryButton
            to="/teachers"
            variant="secondary"
            size="sm"
          >
            About our teachers
          </PrimaryButton>
        </div>

        <div class="mt-10">
          <TeacherGrid :teachers="teachers.slice(0, 3)" />
        </div>

        <p class="mt-6 max-w-3xl text-xs leading-6 text-slate-600">
          Named profiles, qualifications and ijazah details are published only with each teacher’s approval and after verification. Until then, teaching areas are shown without invented credentials or photographs.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ivory">
      <div class="container-page py-16 lg:py-20">
        <div class="relative overflow-hidden rounded-[1.75rem] bg-forest-900 px-6 py-12 sm:px-10 lg:px-14">
          <IslamicPattern
            variant="arches"
            opacity="opacity-[0.09] text-gold"
          />
          <div class="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div class="max-w-2xl">
              <p class="eyebrow !text-gold-soft">
                <span
                  class="h-px w-6 bg-current opacity-60"
                  aria-hidden="true"
                />
                Come and learn
              </p>
              <h2 class="mt-3 text-3xl tracking-[-0.025em] !text-ivory sm:text-4xl">
                Take the next step in your learning.
              </h2>
              <p class="mt-3 text-sm leading-7 text-ivory/65">
                Speak with our administration about programmes, placement and the admissions process. We will help you find a suitable starting point.
              </p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <WhatsAppButton
                label="Chat With Us on WhatsApp"
                variant="white"
                message="Assalamu Alaikum. I would like to learn more about your Madrasah."
              />
              <PrimaryButton
                to="/admissions"
                variant="outline"
              >
                Admissions
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
