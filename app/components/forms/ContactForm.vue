<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { buildStructuredMessage, buildWhatsAppUrl } from '~/utils/whatsapp'

interface FormState {
  name: string
  contact: string
  category: string
  message: string
}

type FieldName = keyof FormState
type FormErrors = Partial<Record<FieldName, string>>

const form = reactive<FormState>({
  name: '',
  contact: '',
  category: '',
  message: '',
})

const errors = reactive<FormErrors>({})
const errorCount = computed(() => Object.values(errors).filter(Boolean).length)
const status = ref<string | null>(null)
const preparedHref = ref<string | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const { mailtoHref } = useSiteConfig()

const categories = [
  'Admissions',
  'Programmes',
  'Fees',
  'Class schedules',
  'Online learning',
  'General enquiry',
]

const fieldIds: Record<FieldName, string> = {
  name: 'contact-name',
  contact: 'contact-details',
  category: 'contact-category',
  message: 'contact-message',
}

const emailFallback = computed(() => {
  if (!madrasah.contact.email) return null

  const subject = encodeURIComponent('Enquiry from the Madrasah website')
  const body = encodeURIComponent(
    buildStructuredMessage(
      'Assalamu Alaikum. I have an enquiry about your Madrasah.',
      [
        { label: 'Name', value: form.name },
        { label: 'Contact', value: form.contact },
        { label: 'Category', value: form.category },
        { label: 'Message', value: form.message },
      ],
    ),
  )

  return `mailto:${madrasah.contact.email}?subject=${subject}&body=${body}`
})

function clearError(field: FieldName) {
  errors[field] = undefined
  if (status.value) status.value = null
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => {
    errors[key as FieldName] = undefined
  })

  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!form.contact.trim()) errors.contact = 'Please provide an email address or phone number.'
  else if (form.contact.trim().length > 120) errors.contact = 'Please keep this under 120 characters.'
  if (!form.category) errors.category = 'Please choose an enquiry category.'
  if (form.message.trim().length < 10) errors.message = 'Please add a little more detail (at least 10 characters).'
  else if (form.message.length > 700) errors.message = 'Please keep your message under 700 characters.'

  return errorCount.value === 0
}

function onSubmit() {
  status.value = null
  preparedHref.value = null

  if (!validate()) {
    nextTick(() => {
      const firstField = Object.entries(errors).find(([, message]) => message)?.[0] as FieldName | undefined
      if (firstField) document.getElementById(fieldIds[firstField])?.focus()
    })
    return
  }

  const message = buildStructuredMessage(
    'Assalamu Alaikum. I have an enquiry about your Madrasah.',
    [
      { label: 'Name', value: form.name },
      { label: 'Contact', value: form.contact },
      { label: 'Enquiry category', value: form.category },
      { label: 'Message', value: form.message },
    ],
    'Kindly respond when convenient. Jazakumullahu Khairan.',
  )

  const href = buildWhatsAppUrl(madrasah.contact.whatsappNumber, message)

  if (!href) {
    status.value = emailFallback.value
      ? 'WhatsApp is not configured at the moment. Please use the email fallback below to contact the administration.'
      : 'Contact details are not configured at the moment. Please try again later.'
    return
  }

  preparedHref.value = href
  window.open(href, '_blank', 'noopener,noreferrer')
  status.value = 'Your message has been prepared in WhatsApp. Please review it and press Send — the Madrasah will only receive it once you send it.'
}

function resetForm() {
  formRef.value?.reset()
  Object.assign(form, { name: '', contact: '', category: '', message: '' })
  Object.keys(errors).forEach((key) => {
    errors[key as FieldName] = undefined
  })
  status.value = null
  preparedHref.value = null
}
</script>

<template>
  <form
    ref="formRef"
    class="space-y-5"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div
      v-if="errorCount"
      class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
      role="alert"
    >
      Please check the highlighted fields and try again.
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <FormField
        id="contact-name"
        label="Your name"
        :error="errors.name"
        required
      >
        <template #default="{ describedBy }">
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            maxlength="80"
            class="field-input"
            placeholder="Your full name"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="describedBy"
            @input="clearError('name')"
          >
        </template>
      </FormField>

      <FormField
        id="contact-details"
        label="Email or phone number"
        :error="errors.contact"
        hint="Whichever you prefer us to use."
        required
      >
        <template #default="{ describedBy }">
          <input
            id="contact-details"
            v-model="form.contact"
            type="text"
            autocomplete="email"
            maxlength="120"
            class="field-input"
            placeholder="Your email address or phone number"
            :aria-invalid="Boolean(errors.contact)"
            :aria-describedby="describedBy"
            @input="clearError('contact')"
          >
        </template>
      </FormField>
    </div>

    <FormField
      id="contact-category"
      label="Enquiry category"
      :error="errors.category"
      required
    >
      <template #default="{ describedBy }">
        <div class="relative">
          <select
            id="contact-category"
            v-model="form.category"
            class="field-select appearance-none pr-10"
            :aria-invalid="Boolean(errors.category)"
            :aria-describedby="describedBy"
            @change="clearError('category')"
          >
            <option
              value=""
              disabled
            >
              Select a category
            </option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <UIcon
            name="i-lucide-chevron-down"
            class="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-slate-600"
            aria-hidden="true"
          />
        </div>
      </template>
    </FormField>

    <FormField
      id="contact-message"
      label="Message"
      :error="errors.message"
      hint="Please avoid sharing sensitive personal information about a child."
      required
    >
      <template #default="{ describedBy }">
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="5"
          maxlength="700"
          class="field-textarea"
          placeholder="How can we help?"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="describedBy"
          @input="clearError('message')"
        />
      </template>
    </FormField>

    <p class="text-xs leading-6 text-slate-600">
      Submitting this form opens a prepared WhatsApp conversation; it does not store your details on this website. You must press Send in WhatsApp for the Madrasah to receive it. See our
      <NuxtLink
        to="/privacy-policy"
        class="font-medium text-forest-700 underline decoration-forest-700/30 underline-offset-2 hover:decoration-forest-700"
      >
        privacy policy
      </NuxtLink>.
    </p>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="submit"
        class="btn-primary"
      >
        <WhatsAppIcon class="h-4 w-4" />
        Send via WhatsApp
      </button>
      <a
        v-if="mailtoHref"
        :href="mailtoHref"
        class="text-xs font-medium text-forest-700 underline decoration-forest-700/30 underline-offset-2 hover:decoration-forest-700"
      >
        Or email the administration
      </a>
    </div>

    <div
      v-if="status"
      class="rounded-xl border border-forest-700/20 bg-mint p-4 text-sm leading-6 text-forest-900"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-start gap-2.5">
        <UIcon
          name="i-lucide-message-circle-check"
          class="mt-0.5 h-4 w-4 shrink-0 text-forest-700"
          aria-hidden="true"
        />
        <div>
          <p>{{ status }}</p>
          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <a
              v-if="preparedHref"
              :href="preparedHref"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 underline underline-offset-2"
            >
              Open WhatsApp again<span class="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              v-if="emailFallback"
              :href="emailFallback"
              class="inline-flex items-center gap-1 text-xs font-semibold text-forest-700 underline underline-offset-2"
            >
              Email instead
            </a>
            <button
              type="button"
              class="text-xs font-medium text-forest-700 underline underline-offset-2"
              @click="resetForm"
            >
              Clear form
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
