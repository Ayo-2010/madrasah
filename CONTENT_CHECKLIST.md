# Content checklist — before launch

This site deliberately avoids presenting invented institutional facts. Work through this list with the Madrasah owner, replace sample content, and verify every claim.

---

## 1. Identity and branding

- [ ] Confirm the official institution name, short name and preferred spelling.
- [ ] Confirm the Arabic name (`مدرسة النور` is currently a placeholder) with a qualified reviewer.
- [ ] Replace `app/config/madrasah.ts` → `name`, `shortName`, `arabicName`, `tagline`, `description`.
- [ ] Supply an official logo file in `public/images/` and set `logo: '/images/logo.svg'` (or `.png`). The built-in geometric wordmark is a temporary fallback.
- [ ] Confirm the brand colours. Tokens are in `app/assets/css/main.css` (`--color-forest-*`, ivory, gold).
- [ ] Check with the owner/scholars that the homepage hadith quotation and attribution (Sahih al-Bukhari 5027) and the Arabic phrase used on the About page are acceptable and accurately presented.

---

## 2. Contact details and WhatsApp

- [ ] Replace `contact.whatsappNumber` with the real international number, digits only, no `+`, spaces or leading domestic zero. Example: `2348012345678`.
- [ ] Set `contact.showWhatsAppNumber: true` if the number should be displayed publicly.
- [ ] Test on a real mobile (WhatsApp app) and desktop (WhatsApp Web).
- [ ] Send test messages from every context: header, hero, programme card, programme detail, admissions, fees, FAQ, contact, footer, floating button, both forms.
- [ ] Confirm the pre-filled messages are appropriate and contain no sensitive data.
- [ ] Add `phone`, `email`, and `postal address` if they should be public. They are currently null and hidden.
- [ ] Add `openingHours` only when confirmed.
- [ ] Add official `socials` with `{ label, href, icon }`; icons use Iconify names such as `i-lucide-facebook` or `i-lucide-instagram`.
- [ ] Add `mapEmbedUrl` and `mapLink` only with the real venue/location.
- [ ] Set `siteUrl` to the production domain and `siteUrlIsPlaceholder: false` (or set `NUXT_PUBLIC_SITE_URL`).
- [ ] Review whether the placeholder number `2348000000000` appears in any logs, screenshots or demonstrations before publishing.
- [ ] Update the announcement text/link or set `announcement.enabled: false`.
- [ ] Set `admissionsOpen` truthfully.

---

## 3. Programme content

For each of the five programmes in `app/data/programmes.ts`:

- [ ] Confirm the programme is actually offered. Remove it if not.
- [ ] Confirm the title, short title, tagline and description.
- [ ] Confirm learner groups, age guidance, level and format wording.
- [ ] Confirm objectives, topics, methodology, entry requirements and materials.
- [ ] Confirm class schedules. `schedule` is currently `null`, which renders “Discussed on enquiry”.
- [ ] Review programme-specific FAQs and answers.
- [ ] Check that no completion time, fluency level or outcome is guaranteed.
- [ ] Confirm contextual WhatsApp messages.
- [ ] Add a sixth programme only if it genuinely exists; the navigation, footer, listing, sitemap and related links update automatically.
- [ ] Remove or revise the “programme availability depends on current class numbers” statements if they do not reflect practice.

## 4. Admissions and fees

- [ ] Confirm who can apply and any real eligibility rules.
- [ ] Confirm the four-step registration process and required information list.
- [ ] Publish approved fees only when current. If publishing, add a clearly dated fee table and update the admissions page and FAQ.
- [ ] Confirm payment methods and warning language; never publish unverified account details.
- [ ] Confirm the admissions form fields are sufficient and lawful; avoid unnecessary child data.
- [ ] Confirm the response-time wording (currently “administrative hours”, with no invented specific hours).
- [ ] Confirm privacy notice wording with whoever handles enquiries.

## 5. Teachers

- [ ] Obtain written approval from each teacher before publishing a name, portrait, biography or qualification.
- [ ] Add verified qualifications and ijazah details only if accurate and approved.
- [ ] Replace each teaching-area card with a named profile: set `name`, `bio`, `qualifications`, `portrait`, and `profileStatus: 'published'`.
- [ ] Use genuine portraits with permission; never use a stock image as a real teacher’s identity.
- [ ] Confirm public contact routes. Do not publish personal teacher phone numbers.
- [ ] Remove the “profiles pending” notice once all cards are published.

## 6. Events

- [ ] Add confirmed events to `app/data/events.ts` with ISO dates (`YYYY-MM-DD`).
- [ ] Include date, time (if confirmed), format, venue, description and a registration/enquiry CTA.
- [ ] Confirm speakers, topics and any fees before announcing.
- [ ] Check that past events are not displayed as upcoming; the page filters by date automatically.
- [ ] Verify event dates against the current date before each term.

## 7. Gallery and facilities

- [ ] Obtain appropriate permission/consent for every identifiable person, especially children.
- [ ] Replace each illustrative SVG with an approved photograph.
- [ ] Update `src`, `alt`, caption and category; set `illustrative: false`.
- [ ] Optimise photographs (WebP/AVIF, sensible dimensions, compressed).
- [ ] Confirm facility descriptions are true. Current wording is deliberately hedged (“where available”, “please confirm”).
- [ ] Update the gallery/facilities notices once real photographs are published.
- [ ] Ensure the map/location is real before embedding it.

## 8. Reviews and testimonials

- [ ] Collect genuine feedback with explicit permission to publish.
- [ ] Add entries to `app/data/testimonials.ts` and add a testimonials section only when approved content exists.
- [ ] Never invent names, relationships, ratings or quotations.
- [ ] Prefer first name + relationship if full names are not consented to.

## 9. Policies and legal

- [ ] Review the privacy policy against the Madrasah’s actual practices, hosting provider, WhatsApp usage and applicable law (including data-protection and safeguarding obligations).
- [ ] Confirm the “last updated” date after edits.
- [ ] Add a safeguarding policy, complaints procedure or other required policies if the institution has them; link them in the footer.
- [ ] Confirm the copyright statement and any registered charity/company details.
- [ ] Confirm that no analytics or cookies are used, or update the policy and add consent if they are introduced.

## 10. Technical launch checks

- [ ] Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run generate`.
- [ ] Verify every route via direct URL and refresh, especially `/programmes/quran-memorisation`, `/programmes/tajweed`, `/programmes/arabic`, `/programmes/islamic-studies`, `/programmes/children`.
- [ ] Test keyboard-only navigation (skip link, header dropdowns, mobile drawer, accordions, gallery lightbox, forms).
- [ ] Test at 320, 375, 430, 768, 1024, 1280 and 1440+ widths.
- [ ] Check focus visibility and colour contrast after any brand-colour changes.
- [ ] Test forms with empty, valid, overlong and malformed values; confirm error messages and WhatsApp message contents.
- [ ] Confirm the new WhatsApp number appears in every generated link and only one number exists in the codebase.
- [ ] Replace `public/og-image.png` with a branded image containing accurate details; update the title/description metadata.
- [ ] Confirm `/sitemap.xml` and `/robots.txt` use the production domain.
- [ ] Remove any remaining sample wording before launch.
- [ ] Set `isTemplateContent: false` once the review is complete (documentation flag).
