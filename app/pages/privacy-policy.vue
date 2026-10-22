<script setup lang="ts">
import { madrasah } from '~/config/madrasah'
import { formatEventDate } from '~/utils/seo'
import { pageTitle } from '~/composables/usePageSeo'

usePageSeo({
  title: pageTitle('Privacy Policy'),
  description:
    'How our Madrasah handles information submitted through this website, including WhatsApp enquiries and the limited technical data used to serve the site.',
  path: '/privacy-policy',
})

const lastUpdated = formatEventDate('2026-10-22')

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-you-provide', label: 'Information you provide' },
  { id: 'whatsapp', label: 'Enquiries through WhatsApp' },
  { id: 'technical-data', label: 'Technical data and cookies' },
  { id: 'children', label: 'Children’s privacy' },
  { id: 'how-we-use', label: 'How information is used' },
  { id: 'sharing', label: 'Sharing information' },
  { id: 'retention', label: 'Retention' },
  { id: 'your-rights', label: 'Your choices and rights' },
  { id: 'external-links', label: 'External links' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact' },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Legal and privacy"
      title="Privacy Policy"
      description="How we handle information when you visit this website or contact the Madrasah. We have kept this policy as clear and specific as possible."
      :breadcrumbs="[{ label: 'Privacy policy' }]"
    >
      <template #footer>
        <p class="text-xs text-slate-600">
          Last updated: <time datetime="2026-10-22">{{ lastUpdated }}</time>
        </p>
      </template>
    </PageHero>

    <section class="bg-white">
      <div class="container-page py-16 lg:py-20">
        <div class="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <aside class="hidden lg:block">
            <nav
              class="sticky top-28 rounded-2xl border border-forest-900/10 bg-ivory p-5"
              aria-label="On this page"
            >
              <p class="text-[0.5625rem] font-semibold tracking-[0.18em] text-slate-600 uppercase">
                On this page
              </p>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="section in sections"
                  :key="section.id"
                >
                  <a
                    :href="`#${section.id}`"
                    class="text-xs leading-5 text-slate-600 transition hover:text-forest-700"
                  >
                    {{ section.label }}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <div class="prose-legal max-w-3xl">
            <section
              id="overview"
              class="scroll-mt-28"
            >
              <h2 class="!mt-0">
                Overview
              </h2>
              <p>
                This policy explains how {{ madrasah.name }} (“the Madrasah”, “we”, “us”) handles information in connection with this website. It covers enquiries made through the site, including enquiries prepared through WhatsApp.
              </p>
              <p>
                The website is a public information site. It does not provide a student portal, user accounts or online payments, and it does not store enquiry-form submissions in a database.
              </p>
            </section>

            <section
              id="information-you-provide"
              class="scroll-mt-28"
            >
              <h2>Information you provide</h2>
              <p>
                The admission and contact forms on this website do not send data to a Madrasah database. Instead, they prepare a message and open WhatsApp, where you review the text and choose whether to send it.
              </p>
              <p>If you choose to send an enquiry, the information may include:</p>
              <ul>
                <li>Your name and a way to reply to you, such as an email address or phone number.</li>
                <li>The student’s age group and programme of interest.</li>
                <li>Your preferred learning format and any message you write.</li>
              </ul>
              <p>
                Please do not send sensitive documents, a child’s full name, date of birth, school details or other unnecessary personal information in an initial enquiry. If we need further information, we will explain what is required and why.
              </p>
            </section>

            <section
              id="whatsapp"
              class="scroll-mt-28"
            >
              <h2>Enquiries through WhatsApp</h2>
              <p>
                WhatsApp is an independent messaging service operated by Meta. When you open a WhatsApp conversation from this website, you leave this site and become subject to WhatsApp’s own terms and privacy policy. We do not control how WhatsApp processes metadata or message content.
              </p>
              <p>
                The Madrasah receives a WhatsApp message only after you press Send in WhatsApp. The prepared message is visible to you before it is sent. A message is not received merely because a form was completed on this website.
              </p>
            </section>

            <section
              id="technical-data"
              class="scroll-mt-28"
            >
              <h2>Technical data and cookies</h2>
              <p>
                Like most websites, the hosting infrastructure may process limited technical information needed to deliver pages securely, such as an IP address, browser type, requested page and time of request. This is used for operation, security and troubleshooting.
              </p>
              <p>
                This website does not currently use advertising cookies, behavioural tracking or third-party analytics. The announcement bar may store a small preference in your browser’s session storage so that it stays dismissed during your visit. That value is not sent to us.
              </p>
              <p>
                If analytics or other tools are added in future, this policy will be updated and, where required, consent will be requested.
              </p>
            </section>

            <section
              id="children"
              class="scroll-mt-28"
            >
              <h2>Children’s privacy</h2>
              <p>
                Our educational programmes serve children, but enquiries should be made by a parent, guardian or another responsible adult. We ask that adults avoid including a child’s sensitive personal information in an initial WhatsApp message or website form.
              </p>
              <p>
                Photographs of identifiable students are published only with appropriate permission. Images currently shown in the gallery and on other pages are labelled illustrative artwork, not photographs of Madrasah students.
              </p>
            </section>

            <section
              id="how-we-use"
              class="scroll-mt-28"
            >
              <h2>How information is used</h2>
              <p>Information you provide is used to:</p>
              <ul>
                <li>Respond to your enquiry and answer your questions.</li>
                <li>Discuss programme placement, class arrangements and registration.</li>
                <li>Keep appropriate administrative records if you proceed with enrolment.</li>
                <li>Meet legal, safeguarding or accounting obligations where they apply.</li>
              </ul>
              <p>
                We do not sell personal information, and we do not use enquiry details for unrelated marketing.
              </p>
            </section>

            <section
              id="sharing"
              class="scroll-mt-28"
            >
              <h2>Sharing information</h2>
              <p>
                Information may be handled by service providers that support the website or communications, such as hosting providers and WhatsApp/Meta. They process information under their own terms and security arrangements.
              </p>
              <p>
                We may disclose information where required by law, to protect someone’s safety, or to address a safeguarding concern. We do not publish individual enquiry details.
              </p>
            </section>

            <section
              id="retention"
              class="scroll-mt-28"
            >
              <h2>Retention</h2>
              <p>
                Enquiries are retained only for as long as needed to respond and, where relevant, to manage enrolment and associated records. The website itself does not retain form submissions. WhatsApp messages remain in the conversation until deleted in accordance with the Madrasah’s administrative practice.
              </p>
            </section>

            <section
              id="your-rights"
              class="scroll-mt-28"
            >
              <h2>Your choices and rights</h2>
              <p>
                Depending on where you live, you may have rights to access, correct or request deletion of personal information, or to object to certain processing. To make a request, contact the administration using the contact details below. We may need to verify your identity before responding.
              </p>
              <p>
                You can choose not to provide information, or to stop a WhatsApp message before sending it. Some enquiries cannot be answered without basic details such as a way to reply.
              </p>
            </section>

            <section
              id="external-links"
              class="scroll-mt-28"
            >
              <h2>External links</h2>
              <p>
                This website links to external services such as WhatsApp and, when configured, map providers or social media. Their privacy practices are governed by their own policies. We are not responsible for the content or privacy practices of external sites.
              </p>
            </section>

            <section
              id="changes"
              class="scroll-mt-28"
            >
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy to reflect changes in the website, our services or legal requirements. The date at the top of the page shows when it was last revised. Material changes will be reflected clearly on this page.
              </p>
            </section>

            <section
              id="contact"
              class="scroll-mt-28"
            >
              <h2>Contact</h2>
              <p>
                Questions about this policy or how your information is handled can be sent to the administration through WhatsApp. If email or postal contact details are later published on the
                <NuxtLink to="/contact">contact page</NuxtLink>, they may be used for privacy requests as well.
              </p>
              <div class="not-prose mt-6 rounded-2xl border border-forest-900/10 bg-ivory p-6">
                <p class="text-sm leading-7 text-slate-600">
                  Contact the Madrasah to ask a privacy question or request a correction.
                </p>
                <WhatsAppButton
                  label="Contact the Administration"
                  size="sm"
                  class="mt-4"
                  message="Assalamu Alaikum. I have a question about the Madrasah's privacy policy."
                />
              </div>
            </section>

            <p class="mt-12 border-t border-forest-900/10 pt-6 text-xs leading-6 text-slate-600">
              This policy is provided as part of the website and should be reviewed against the Madrasah’s actual administrative, safeguarding and legal obligations before launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
