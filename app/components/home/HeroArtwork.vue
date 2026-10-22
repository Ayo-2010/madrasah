<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
</script>

<template>
  <div class="relative mx-auto w-full max-w-[30rem] lg:mx-0">
    <div
      class="pointer-events-none absolute -inset-4 rounded-[15rem_15rem_3rem_3rem] border border-gold/30 sm:-inset-6"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/3 -left-8 h-28 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent"
      aria-hidden="true"
    />

    <div class="arch-frame relative aspect-[4/5] w-full overflow-hidden bg-forest-900 shadow-[0_40px_90px_-45px_rgba(10,35,27,0.8)]">
      <div class="absolute inset-0 bg-gradient-to-b from-forest-800 via-forest-900 to-forest-950" />
      <IslamicPattern
        variant="stars"
        opacity="opacity-[0.14] text-gold-soft"
      />
      <div
        class="arch-frame pointer-events-none absolute inset-3 border border-gold/30 sm:inset-4"
        aria-hidden="true"
      />

      <div class="relative flex h-full flex-col items-center px-7 pt-9 text-center sm:px-10 sm:pt-11">
        <svg
          viewBox="0 0 48 48"
          class="h-8 w-8 text-gold/80"
          aria-hidden="true"
        >
          <path
            d="M24 4 29.5 18.5 44 24 29.5 29.5 24 44 18.5 29.5 4 24 18.5 18.5Z"
            fill="none"
            stroke="currentColor"
            stroke-width="0.9"
          />
          <path
            d="M24 12 27.5 20.5 36 24 27.5 27.5 24 36 20.5 27.5 12 24 20.5 20.5Z"
            fill="none"
            stroke="currentColor"
            stroke-width="0.6"
            opacity="0.7"
          />
          <circle
            cx="24"
            cy="24"
            r="1.6"
            fill="currentColor"
          />
        </svg>

        <p
          class="mt-5 font-arabic text-6xl leading-[1.35] text-gold-soft sm:text-7xl"
          lang="ar"
          dir="rtl"
        >
          اقرأ
        </p>
        <p class="mt-1 text-[0.5625rem] font-semibold tracking-[0.28em] text-ivory/65 uppercase">
          Read · Reflect · Practise
        </p>

        <div
          class="my-5 flex w-32 items-center gap-2"
          aria-hidden="true"
        >
          <span class="h-px flex-1 bg-gold/30" />
          <span class="h-1 w-1 rotate-45 bg-gold/70" />
          <span class="h-px flex-1 bg-gold/30" />
        </div>

        <p class="max-w-[16rem] text-[0.8125rem] leading-6 text-ivory/65">
          A calm, structured place to learn the Qur’an, understand the faith and grow in good character.
        </p>

        <div class="mt-auto w-full pt-5">
          <svg
            viewBox="0 0 260 118"
            class="mx-auto w-full max-w-[17rem]"
            aria-hidden="true"
          >
            <g opacity="0.5">
              <path
                d="M52 96 34 114M208 96l18 18"
                stroke="#C5A45D"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <path
                d="M86 100 72 112M174 100l14 12"
                stroke="#C5A45D"
                stroke-width="1"
                stroke-linecap="round"
              />
            </g>
            <path
              d="M130 30C107 19 76 18 46 29v66c30-11 61-10 84 1 23-11 54-12 84-1V29c-30-11-61-10-84 1Z"
              fill="#FAF8F1"
              fill-opacity="0.94"
            />
            <path
              d="M130 30v66"
              stroke="#C5A45D"
              stroke-width="1.4"
            />
            <path
              d="M130 30C107 19 76 18 46 29v66c30-11 61-10 84 1M130 30c23-11 54-12 84-1v66c-30-11-61-10-84 1"
              fill="none"
              stroke="#C5A45D"
              stroke-width="1.2"
            />
            <g
              stroke="#176B4D"
              stroke-width="1"
              stroke-linecap="round"
              opacity="0.45"
            >
              <path d="M60 45c18-5 38-5 55 1M60 56c18-5 38-5 55 1M60 67c18-5 38-5 55 1M60 78c12-3 25-3 36 0" />
              <path d="M145 46c17-6 37-6 55-1M145 57c17-6 37-6 55-1M145 68c17-6 37-6 55-1M164 79c11-3 24-3 36 0" />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <NuxtLink
      :to="madrasah.admissionsOpen ? '/admissions' : '/contact'"
      class="group absolute right-2 -bottom-6 left-2 flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white/95 p-3.5 shadow-card backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-soft sm:-right-6 sm:left-auto sm:w-[19rem] sm:p-4"
    >
      <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-forest-700">
        <UIcon
          :name="madrasah.admissionsOpen ? 'i-lucide-calendar-check' : 'i-lucide-message-circle'"
          class="h-4.5 w-4.5"
          aria-hidden="true"
        />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-xs font-semibold text-forest-900">
          {{ madrasah.admissionsOpen ? 'Admissions enquiries are open' : 'Speak with our administration' }}
        </span>
        <span class="mt-0.5 block text-[0.6875rem] text-slate-600">
          {{ madrasah.admissionsOpen ? 'Ask about programmes and placement' : 'We are happy to help' }}
        </span>
      </span>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="h-4 w-4 shrink-0 text-forest-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </NuxtLink>
  </div>
</template>
