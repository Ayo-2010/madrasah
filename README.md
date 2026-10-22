# Madrasah Al-Noor — website

A complete, responsive public website for an Islamic educational institution, built with **Nuxt 4**, **Vue 3**, **TypeScript**, **Tailwind CSS v4** and **Nuxt UI v4**.

The site is designed around one primary conversion action: starting a WhatsApp conversation with the Madrasah. Every contact action uses one central configuration file, a validated `wa.me` URL builder and message-specific prefill text.

---

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Nuxt (usually `http://localhost:3000`).

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with HMR |
| `npm run build` | Production server build (SSR) |
| `npm run generate` | Static generation into `.output/public` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Vue and TypeScript type checking |
| `npm run lint` | ESLint via the Nuxt ESLint module |
| `npm test` | Vitest unit and content-integrity tests |
| `npm run check:links` | Audit generated HTML for broken internal links and assets |
| `npm run audit:html` | Audit generated HTML for metadata, headings and content-honesty issues |
| `npm run art` | Regenerate the local SVG illustrations |
| `npm run icons` | Regenerate PNG social/favicon assets (requires `sharp`) |

> This project is a frontend. There is no database, authentication or student portal. The two enquiry forms validate locally, build a message and open WhatsApp. Nothing is delivered until the user presses **Send** inside WhatsApp.

---

## Before launch: replace the sample content

Read **`CONTENT_CHECKLIST.md`**. The site intentionally avoids inventing credentials, reviews, events, fees, address details or photographs. Some content is clearly illustrative or marked as pending:

- The institution name, Arabic name and description are placeholders.
- The WhatsApp number is a development placeholder (`2348000000000`). It **must** be replaced before publication. The number is not displayed publicly while `showWhatsAppNumber` is `false`.
- Phone, email, postal address, opening hours, map and social links are empty in the configuration, so they are hidden across the site rather than showing fake values.
- Teacher cards describe teaching areas. No names, portraits, qualifications or ijazah details are invented; named profiles are marked pending until approved.
- Events data is empty, so the Events page shows a truthful empty state.
- Gallery and facility images are geometric illustrations, labelled “Illustration”, with a visible notice. Replace them with approved photographs and set `illustrative: false`.
- Fees are not published; the Admissions page explains that current fees are confirmed in writing by the administration.
- The privacy policy is a practical template and should be reviewed against the institution’s actual legal, safeguarding and administrative obligations.

---

## Central configuration

**`app/config/madrasah.ts`** is the single source of truth for:

- Institution name, short name, Arabic name, tagline and description.
- Website URL and whether it is still a placeholder.
- WhatsApp number (international format, digits only), and whether to display it publicly.
- Phone, email, postal address, opening hours, social links, map embed/link.
- Announcement bar content and visibility.
- Admissions status (`admissionsOpen`).
- Logo path (falls back to the built-in typographic/geometric wordmark).

### WhatsApp number format

Store the number in international format, digits only, inside `contact.whatsappNumber`:

```ts
whatsappNumber: '2348012345678'
```

For a Nigerian number, use `234` followed by the number **without** its leading zero. Do not include `+`, spaces or punctuation. The utility normalises user-supplied variants, but configuration should be clean.

Every CTA uses `useWhatsApp()` → `buildWhatsAppUrl()`, which:

- validates the number (`8–15` digits, must not start with `0`),
- safely encodes messages with `encodeURIComponent()`,
- returns `null` for invalid configuration,
- falls back to `/contact` rather than emitting a broken `wa.me` link.

If a number is missing, buttons still lead to the contact page and announce the fallback to screen readers.

### Adding real contact details

Set `phone`, `email`, `address`, `openingHours` and `socials` in the configuration. Components conditionally render each field; empty values are hidden. When the real number is ready, set `showWhatsAppNumber: true` if it should be displayed, and `siteUrlIsPlaceholder: false` once the production URL is correct.

You can also provide the domain at build time:

```bash
NUXT_PUBLIC_SITE_URL=https://www.your-madrasah.org npm run generate
```

Until this is set (or `siteUrlIsPlaceholder` is changed), canonical URLs are omitted and Open Graph images use the same-origin `/og-image.png` path. The sitemap uses the placeholder domain, so set the real domain before launch.

---

## Content architecture

Typed content lives under `app/data/`:

| File | Content |
| --- | --- |
| `programmes.ts` | All programme detail content, cards, FAQs and WhatsApp messages |
| `teachers.ts` | Teaching-area cards; names/qualifications only when approved |
| `faqs.ts` | Categorised FAQs, including homepage featured answers |
| `events.ts` | Upcoming events; past events are filtered out automatically |
| `gallery.ts` | Gallery categories, captions and alt text |
| `navigation.ts` | Desktop, mobile, programme and secondary navigation |
| `testimonials.ts` | Empty by design; never fabricate reviews |

Programme detail pages are generated from `programmes.ts` at `/programmes/[slug]` and statically prerendered through link crawling. Add a programme by adding one typed object; the listing, footer, navigation, related programmes, sitemap and WhatsApp message all pick it up. Programme images are not required because cards use icon medallions.

Types are in `app/types/`. Shared utilities and composables:

- `app/utils/whatsapp.ts` — number validation, URL building, structured enquiry messages.
- `app/utils/seo.ts` — absolute URL and event-date helpers.
- `app/composables/useWhatsApp.ts` — central WhatsApp access.
- `app/composables/useSiteConfig.ts` — configuration plus contact-display helpers.
- `app/composables/usePageSeo.ts` — unique title, description, Open Graph and canonical metadata.

---

## Forms

`AdmissionEnquiryForm.vue` and `ContactForm.vue`:

- use native, labelled controls with inline error messages (`aria-invalid`, `aria-describedby`, `role="alert"`),
- focus the first invalid field after a failed submission,
- show a summary error and an accessible `role="status"` message after submission,
- build a structured message and open WhatsApp in a new tab,
- explicitly state that the Madrasah has not received the enquiry until the user presses Send,
- avoid requesting a child’s full name or other unnecessary sensitive data,
- offer a mailto fallback when an email address is configured,
- expose a link to reopen WhatsApp if the popup is blocked.

There is no false “message sent” state and no backend dependency.

---

## WhatsApp conversion points

WhatsApp is available in the header, hero, programme cards, programme details, admissions page, FAQs, contact page, footer, mobile menu and a fixed floating button. Messages are contextual (programme enquiries, fees, admissions, general questions) and share the same configured number.

The floating button is fixed above the mobile safe area, uses a 56px target, has an accessible label, and has no pulsing animation.

---

## Images and media

- All artwork is generated locally by `scripts/generate-art.mjs` as lightweight SVG (no stock-photo licensing or misrepresentation).
- Gallery and facility images carry visible “Illustration” labels and explanatory notices.
- Replace each SVG with an approved photograph, update `src`, `alt` and caption in `app/data/gallery.ts`, and set `illustrative: false`.
- Use correctly sized, compressed images (WebP/AVIF where possible). Keep explicit width/height or aspect ratios to prevent layout shift.
- Hero artwork is inline SVG and is immediately available; below-the-fold images use `loading="lazy"` and `decoding="async"`.
- `public/og-image.png` is the default social-sharing image; regenerate with `npm run icons`.
- The favicon is SVG with PNG fallbacks.

---

## SEO

- Every route sets a unique title and meta description via `usePageSeo`.
- Canonical URLs are added only when a real domain is configured.
- Open Graph and Twitter card metadata use an absolute social image once a domain is configured, and a same-origin `/og-image.png` fallback before then.
- JSON-LD for `EducationalOrganization` is emitted in the default layout; address, phone, email and social links are included only when configured. Programme pages add accurate `Course` structured data.
- `/sitemap.xml` and `/robots.txt` are generated by Nitro server routes and prerendered.
- No ratings, reviews, awards, accreditations, history or fees are fabricated in metadata.

> **Important:** change `siteUrl` (or set `NUXT_PUBLIC_SITE_URL`) before deploying. Until then the placeholder `example-madrasah.org` domain is used for the sitemap; canonical URLs are omitted and the social image falls back to a relative path.

---

## Accessibility

Targeting WCAG 2.2 AA where practical:

- Skip link, semantic landmarks and a single page `h1`.
- Keyboard-accessible desktop dropdowns and a focus-trapped mobile drawer with body scroll lock.
- Accessible accordions with `aria-expanded` / `aria-controls`, labelled regions and visible focus styles.
- Gallery lightbox with `role="dialog"`, Escape/arrow-key navigation, focus trap, scroll lock, focus restoration and live image count.
- Form labels, required indicators, hints and errors linked to inputs.
- Reduced-motion support via `prefers-reduced-motion`.
- Colour choices reviewed for contrast on ivory and deep green; WhatsApp buttons have accessible names.
- Missing contact information is hidden rather than rendered as empty placeholders.

---

## Deployment

Static rendering is the recommended deployment (no runtime backend needed):

```bash
npm run generate
```

The `generate` script also adds a small, self-contained no-JS fallback and social metadata to the static `200.html` / `404.html` files. The branded error UI still hydrates normally when JavaScript is available.

Deploy `.output/public` to Netlify, Cloudflare Pages, GitHub Pages, Firebase Hosting, S3/CloudFront or any static host. Direct navigation and refresh work because every route is prerendered (`/programmes/quran-memorisation` etc.).

For SSR hosting (Vercel, Node server):

```bash
npm run build
node .output/server/index.mjs
```

Set `NUXT_PUBLIC_SITE_URL` to the production origin at build time. Test the deployed WhatsApp links on an actual phone and on desktop (WhatsApp Web).

---

## Verification performed

- TypeScript / Vue type checking: passed with 0 errors.
- ESLint: passed with 0 errors or warnings.
- Vitest: **32 tests passed** (WhatsApp URL validation and encoding, structured messages, SEO helpers, navigation integrity, data completeness, image existence and content-honesty checks).
- Production static generation: passed; **36 routes prerendered**, including all five programme detail pages, `/sitemap.xml` and `/robots.txt`.
- Static output audit: 18 HTML documents checked (16 public routes plus the hardened static-host fallbacks), **0 broken internal links, 0 missing local assets and 0 metadata/heading/content problems**.
- Accessibility: automated axe-core audit run on all **16 public routes plus the 404 state**, with **0 violations**. Keyboard-visible focus styles and colour contrast were also reviewed manually.
- Responsive checks: all public routes at 320px and 1440px; key layouts additionally checked at 375, 430, 768, 1024 and 1280px. No horizontal overflow was found.
- Forms: tested empty-submission validation and a valid submission for both forms; confirmed focus moves to the first invalid field and the prepared WhatsApp URL contains the correct encoded message. No delivery-success state is shown.
- Keyboard and interaction checks: mobile drawer (Escape, focus return, scroll lock), desktop programmes dropdown, FAQ accordion, gallery lightbox (next/previous, Escape, focus return), announcement dismissal and mobile navigation.
- Error handling: unknown routes return HTTP 404, show the branded error page with a single `h1`, set `noindex`, and include a readable no-JS fallback in the generated `404.html`.

If dependencies or content are changed later, rerun:

```bash
npm run typecheck && npm run lint && npm test && npm run generate
```
