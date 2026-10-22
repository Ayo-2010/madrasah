<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { programmes } from '~/data/programmes'
import { buildStructuredMessage, buildWhatsAppUrl } from '~/utils/whatsapp'

interface FormState {
  parentName: string
  ageGroup: string
  programme: string
  format: string
  message: string
}

type FieldName = keyof FormState
type FormErrors = Partial<Record<FieldName, string>>

const form = reactive<FormState>({
  parentName: '',
  ageGroup: '',
  programme: '',
  format: '',
  message: '',
})

const errors = reactive<FormErrors>({})
const errorCount = computed(() => Object.values(errors).filter(Boolean).length)
const status = ref<string | null>(null)
const preparedHref = ref<string | null>(null)
const submitted = ref(false)
const formRef = ref<HTMLFormElement | null>(null)

const fieldIds: Record<FieldName, string> = {
  parentName: 'admission-parent-name',
  ageGroup: 'admission-age-group',
  programme: 'admission-programme',
  format: 'admission-format',
  message: 'admission-message',
}

const ageGroups = ['Under 5', '5–7', '8–10', '11–13', '14–17', '18+']
const formats = ['In person', 'Online', 'Either / not sure yet']
const programmeOptions = [
  ...programmes.map(programme => ({ label: programme.title, value: programme.slug })),
  { label: 'Not sure yet', value: 'not-sure' },
]

function clearError(field: FieldName) {
  errors[field] = undefined
  if (status.value) status.value = null
}

function validate(): boolean {
  Object.keys(errors).forEach((key) => {
    errors[key as FieldName] = undefined
  })

  if (form.parentName.trim().length < 2) {
    errors.parentName = 'Please enter the name of the parent, guardian or adult student.'
  }
  else if (form.parentName.trim().length > 80) {
    errors.parentName = 'Please keep this name under 80 characters.'
  }

  if (!form.ageGroup) errors.ageGroup = 'Please select the student’s age group.'
  if (!form.programme) errors.programme = 'Please select a programme, or choose “Not sure yet”.'
  if (!form.format) errors.format = 'Please let us know which learning format you are considering.'

  if (form.message.length > 600) {
    errors.message = 'Please keep your message under 600 characters.'
  }

  return errorCount.value === 0
}

function onSubmit() {
  status.value = null
  preparedHref.value = null

  if (!validate()) {
    submitted.value = false
    nextTick(() => {
      const firstField = Object.entries(errors).find(([, message]) => message)?.[0] as FieldName | undefined
      if (firstField) document.getElementById(fieldIds[firstField])?.focus()
    })
    return
  }

  const programme = programmeOptions.find(
    option => option.value === form.programme,
  )?.label ?? 'Not sure yet'

  const message = buildStructuredMessage(
    'Assalamu Alaikum. I would like to enquire about admission to your Madrasah.',
    [
      { label: 'Parent / guardian name', value: form.parentName },
      { label: 'Student age group', value: form.ageGroup },
      { label: 'Programme', value: programme },
      { label: 'Preferred format', value: form.format },
      { label: 'Message', value: form.message },
    ],
    'Kindly provide further information. Jazakumullahu Khairan.',
  )

  const href = buildWhatsAppUrl(madrasah.contact.whatsappNumber, message)

  if (!href) {
    status.value = 'WhatsApp is not configured at the moment. Please use the contact page to reach the administration.'
    return
  }

  preparedHref.value = href
  submitted.value = true
  window.open(href, '_blank', 'noopener,noreferrer')
  status.value = 'Your enquiry has been prepared in WhatsApp. Please review the message and press Send — the Madrasah will only receive it once you send it.'
}

function resetForm() {
  formRef.value?.reset()
  Object.assign(form, {
    parentName: '',
    ageGroup: '',
    programme: '',
    format: '',
    message: '',
  })
  Object.keys(errors).forEach((key) => {
    errors[key as FieldName] = undefined
  })
  submitted.value = false
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

    <FormField
      id="admission-parent-name"
      label="Parent / guardian name"
      :error="errors.parentName"
      hint="If the student is an adult, their own name is fine."
      required
    >
      <template #default="{ describedBy }">
        <input
          id="admission-parent-name"
          v-model="form.parentName"
          type="text"
          autocomplete="name"
          maxlength="80"
          class="field-input"
          placeholder="e.g. parent or guardian name"
          :aria-invalid="Boolean(errors.parentName)"
          :aria-describedby="describedBy"
          @input="clearError('parentName')"
        >
      </template>
    </FormField>

    <div class="grid gap-5 sm:grid-cols-2">
      <FormField
        id="admission-age-group"
        label="Student age group"
        :error="errors.ageGroup"
        required
      >
        <template #default="{ describedBy }">
          <div class="relative">
            <select
              id="admission-age-group"
              v-model="form.ageGroup"
              class="field-select appearance-none pr-10"
              :aria-invalid="Boolean(errors.ageGroup)"
              :aria-describedby="describedBy"
              @change="clearError('ageGroup')"
            >
              <option
                value=""
                disabled
              >
                Select an age group
              </option>
              <option
                v-for="age in ageGroups"
                :key="age"
                :value="age"
              >
                {{ age }}
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
        id="admission-programme"
        label="Programme of interest"
        :error="errors.programme"
        required
      >
        <template #default="{ describedBy }">
          <div class="relative">
            <select
              id="admission-programme"
              v-model="form.programme"
              class="field-select appearance-none pr-10"
              :aria-invalid="Boolean(errors.programme)"
              :aria-describedby="describedBy"
              @change="clearError('programme')"
            >
              <option
                value=""
                disabled
              >
                Select a programme
              </option>
              <option
                v-for="option in programmeOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
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
    </div>

    <FormField
      id="admission-format"
      label="Preferred learning format"
      :error="errors.format"
      required
    >
      <template #default="{ describedBy }">
        <div class="relative">
          <select
            id="admission-format"
            v-model="form.format"
            class="field-select appearance-none pr-10"
            :aria-invalid="Boolean(errors.format)"
            :aria-describedby="describedBy"
            @change="clearError('format')"
          >
            <option
              value=""
              disabled
            >
              Select a format
            </option>
            <option
              v-for="format in formats"
              :key="format"
              :value="format"
            >
              {{ format }}
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
      id="admission-message"
      label="Message"
      :error="errors.message"
      hint="Optional. Please do not include a child’s full name or sensitive personal details."
      optional-label="Optional"
    >
      <template #default="{ describedBy }">
        <textarea
          id="admission-message"
          v-model="form.message"
          rows="4"
          maxlength="600"
          class="field-textarea"
          placeholder="Tell us about your learning goals or ask a question."
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="describedBy"
          @input="clearError('message')"
        />
      </template>
    </FormField>

    <p class="text-xs leading-6 text-slate-600">
      This form prepares a message in WhatsApp. Nothing is sent to the Madrasah until you review the message and press Send. Read our
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
        Prepare WhatsApp enquiry
      </button>
      <p class="text-xs text-slate-600">
        You will review the message before sending.
      </p>
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
          <a
            v-if="preparedHref"
            :href="preparedHref"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-forest-700 underline underline-offset-2"
          >
            Open WhatsApp again<span class="sr-only"> (opens in a new tab)</span>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="h-3 w-3"
              aria-hidden="true"
            />
          </a>
          <button
            v-if="submitted"
            type="button"
            class="mt-2 ml-4 text-xs font-medium text-forest-700 underline underline-offset-2"
            @click="resetForm"
          >
            Start another enquiry
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
