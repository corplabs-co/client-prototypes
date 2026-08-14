# HiTerra Design System

Shared components, tokens, and patterns powering the **13 Terra modules** across the **HiTerra smart farming platform** — spanning field ops, lab, logistics, and agribusiness.

HiTerra serves **smallholder growers**, **field agronomists**, and **enterprise agribusiness staff** across **Malaysia and Indonesia**. Interfaces must work for both low-digital-literacy users under the sun in the field AND data-heavy power users at a desk, and the UI frequently renders bilingually (English / Bahasa Melayu / Bahasa Indonesia).

## Sources
- **Figma file** (mounted VFS): `hi-terra (dynamic).fig` — 6 pages, 427 top-level frames
  - `/mobile-1.0` (319 frames, baseline mobile app)
  - `/mobile-2.0` (33), `/mobile-2.1` (49) — iterated mobile app
  - `/playstore` (8) — store screenshots
  - `/web` (8) — marketing site
  - `/dark` (10) — dark-mode explorations
- **Codebase** (attached, read-only): `htr-landing` — Gatsby + React + antd-mobile.
  - `components/styles/{variables.css, global.styles.css, typography.css}` — design tokens & theme
  - `components/common/icon.tsx` — 3500-line **SVG icon library** (authoritative)
  - `components/layout/{mainHeader, bottomBar, sideBar}.tsx` — app chrome
  - `components/images/{logos, icons, illus, badge}/` — static assets
- **Uploaded:** `uploads/htr-app-icon_512x512.png` — current app icon
- **GitHub repo:** `hiterra-co/htr-landing` (same codebase; browse on demand via GitHub tools)

---

## CONTENT FUNDAMENTALS

**Tone**: practical, workmanlike, localisation-first. HiTerra talks to growers and agronomists — not venture capitalists. Copy is direct, concrete, and uses nouns growers recognise (field, habitat, cycle, factor, habitat name) rather than abstractions ("asset", "resource"). Product copy sits side-by-side with i18n keys, so every string is short, unambiguous, and easy to translate.

**Voice / pronoun**: "You" (the user). Rarely "we". Never first-person plural of the brand.

**Casing**:
- **Navigation + tab labels**: `Title Case` — "Map", "Task", "Explore", "More".
- **Buttons**: `Title Case` — "Add Habitat", "Save", "Continue".
- **Form labels**: `Title Case`, 10px caption weight — "Habitat Name", "Crop Type".
- **Body copy / placeholders**: sentence case — "Fill in habitat name", "Access denied".
- **Errors / toasts**: sentence case, terse.
- **CJK / BM**: respect target-language conventions; leave room for ~30% longer strings.

**Emoji**: **Never** in product UI. The brand has a dedicated illustrated icon library (see Iconography); emoji are not part of the vocabulary.

**Numeric / date conventions**: Roboto (not Manrope) is used for small numeric labels, table cells, and meta text in the app — tabular numerics matter because users are reading harvest weights, temperatures, yields, prices. Dates use locale formatting; currency uses MYR / IDR symbols.

**Vibe**: *agritech, not fintech.* Rooted, practical, and slightly utilitarian — it's a working tool for someone with muddy boots. Not playful, not corporate-cold, not SaaS-generic. No exclamation points, no "Let's do this!", no forced warmth. The warmth comes from the agronomy accent colours (lime, leaf green, root browns), not the copy.

**Examples**:
- Tab labels: `Map` · `Task` · `Explore` · `More`
- Empty states: "No habitats yet." + `Add Habitat` CTA
- Access deny toast: "Access denied"
- Section titles: "Habitat Name", "Crop Type", "Cycle State", "Factor"

---

## VISUAL FOUNDATIONS

**Colour vibe.** Two parallel palettes:
1. **Primary lake blue** `#0A41F2` — buttons, links, the wordmark, focus rings. This is the *brand signal*: data-serious, tech-forward.
2. **Agronomy accents** — lime `#C0FF40` (logo highlight), leaf green `#6DB100`, mint success `#06B97D`, root browns `#635549 → #DCD8CC`, fruit warning `#D64913`. These tie the product to its *subject matter*.

**Dark mode** flips to a midnight `#000057` base with reverse-mapped tokens — and notably **swaps primary to mint `#2BDC9A`** on certain surfaces. This is codified in `variables.css` and respected in our tokens.

**Backgrounds.** Solid colour is dominant. Off-white root canvas (`#F8F7F4`) for calm surfaces, white (`#FFFFFF`) for cards. Imagery-led pages use **full-bleed photography** with **midnight gradient protection** (`linear-gradient(to left, #030c32, transparent)`) behind text. No hand-drawn whimsical patterns; no diamond or noise textures as hero material (Figma has a few noise/diamond gradients — approximated and reserved for onboarding hero illustrations).

**Illustrations.** Five role avatars (`farmer-role`, `labs-role`, `product-role`, `service-role`) in muted WebP — warm, desaturated, documentary-style photography of people in the field. One scene illustration (`bg-cp-scene-line01`) — flat line-art agronomy scene. Use these for onboarding/role-selection; everywhere else, use real imagery.

**Type.** **Manrope** (400/500/600/700/800) for UI / marketing headings; **Roboto** (regular/medium) is the workhorse for small labels, tabular data, form fields inside the mobile app (Figma shows 11,711 instances of Roboto 10–14px). **Noto Sans** (self-hosted variable, wght 100–900 + width axis) is the i18n fallback for Bahasa Melayu / Indonesia and accented Latin copy. CJK falls back to Noto Sans SC. No serif, no display face. Use the `--font-i18n` token where bilingual coverage matters.

**Type scale** is mobile-dense: 10px labels, 12px body meta, 14px body, 22px screen titles — anything larger is marketing. This density is intentional: field/lab tables carry a lot of rows.

**Spacing.** 4px base. Inline gaps 4/8/12; card padding 16/24; page padding 12/16 on mobile. Below 4px is disallowed.

**Radii.** 8px is the default (buttons, cards, inputs — `--adm-button-border-radius: 8px`). 12px on modals. Full-pill on search bars (`36px` / `9999px`) and chips.

**Borders.** Hair-line `1px` `#EEEEEE` is universal. Focus rings use `2px` primary with 20% opacity outer glow. In dark mode, borders shift to `#163B99`.

**Shadows.**
- Default card: `0 0 6px rgba(0,0,0,0.1)` — soft, omnidirectional, **not** a bottom drop-shadow. Very distinctive.
- Popover / modal: `0 8px 32px rgba(0,0,0,0.2)`.
- **Inset glow green** `inset 0 0 24px rgba(109,177,0,0.30)` — a signature HiTerra effect used on CTAs and cards tied to growth/active cycles.

**Animation.** Restrained. 200–300ms `ease` transitions on colour, background, and opacity. Page fades 300ms. `active:scale-95` (Tailwind) on all tappable buttons — **press = shrink**, never a colour pop. No bouncy springs. The one exception: a glowing animated conic gradient on the "Traffic Map" CTA (signature moment, 20s loop).

**Hover.** Desktop only (Playstore/web page). Opacity 0.9 or `bg-gray-100`/`bg-gray-800`; never a hue shift.

**Press state.** `active:scale-95` + slight opacity drop.

**Transparency & blur.** Used on top headers over maps (`bg-transparent` + `backdrop-filter: blur(2px)` on the Mapbox geocoder). Search bars on the public map have a translucent bg.

**Capsules vs protection gradients.** On imagery, we use **full-width left/right linear-gradient protection strips** (`--adm-bg-non-reverse-midnight-gradient-right`) rather than solid capsules behind text. Status labels use solid pill capsules.

**Layout rules.**
- Sticky top header (56px), sticky bottom tab bar (~73px), safe-area insets respected for notches and gesture bars.
- Floating action buttons sit `24px` above the bottom bar + safe-area.
- Maps are full-bleed; overlays float with rounded 36px pills.
- Web/marketing is centered 1200px max; mobile is edge-to-edge.

**Card anatomy.** White surface, 8px radius, `0 0 6px rgba(0,0,0,0.1)` shadow, 16–24px padding, optional 1px `#EEEEEE` divider inside. No colored-left-border-accent cards — that pattern is **not** in the system.

**Imagery colour vibe.** Warm, slightly desaturated, documentary. No heavy grain. No B&W. People + fields + soil + crops — real, not stock.

---

## ICONOGRAPHY

HiTerra uses a **custom hand-built SVG icon library**, authored inline in React (see `components/common/icon.tsx` — 3,550 lines, 200+ named icon components). This library is the **source of truth**; copied into `assets/icons/` where possible. Characteristics:

- **Stroke-based, 24×24 or 36×36 viewBox.** Stroke width `1.6` (line-icon) or `1.2` (small). `strokeLinecap="round"`, `strokeLinejoin="round"`.
- **currentColor** is used so icons pick up theme tokens. Many icons use `var(--adm-color-reverse-blue-900)` (navy / text) as the default stroke.
- **Two fill variants** exist for key icons (e.g. `HeartIcon` / `HeartFilledIcon`) — outline for rest, filled for active/selected.
- **Domain-specific agronomy set**: `SowingIcon`, `HarvestIcon`, `SamplingIcon`, `LabTestIcon`, `IrrigationIcon`, `InventoryCheckIcon`, `InventoryPlusIcon`, `FactorIcon`, `FieldIcon`, `HabitatIcon`, `CycleIcon`, `LeafIcon`, `CpIcon`, `ConsptionIcon`, `ReportIcon`, etc. **No generic SaaS iconography.**
- **Rich avatar icons** (`WorkerDefaultIcon`, `FarmerDefaultIcon`, `UserDefaultIcon`, `EarthIcon`) — 52×52 illustrated circular badges with multi-stop gradients. Used on profile headers, role selection, empty profile.
- **Role-selection WebP illustrations** (`farmer-role.webp`, `labs-role.webp`, `product-role.webp`, `service-role.webp`) — large documentary photography badges, used at onboarding.
- **Chinese component names** appear in Figma for some icons (e.g. `线性/LeftOutline`, `底部分割线=短线`) — these originate from the `antd-mobile` ecosystem or a Chinese icon kit the original designers borrowed from. Treat them as equivalents of standard Western icons (left chevron, divider).
- **Emoji**: never.
- **Unicode-as-icon**: never. Always an SVG component.
- **CDN fallback**: we pull **Lucide** from CDN for any icon *not* in the HiTerra library (e.g. generic UI glyphs like pencil/trash that the library duplicates but aren't central). Stroke 1.5–1.6, matches the house style. **Flagged substitution** — if/when a designer adds the missing icon to `icon.tsx`, swap the Lucide import.

Icons registered in `assets/` for preview cards:
- Agronomy glyphs: `buy.svg`, `field.svg`, `info.svg`, `interest.svg`, `map.svg`, `module.svg`, `notif.svg`, `task.svg`
- Badge plaques: `badges/badge_light_rd_{SI,SU}.svg`, `badges/badge_dark_rd_{SI,SU}.svg`
- Logo: `logo-long.svg` (wordmark), `logo.png`, `pwa-logo.svg`, `app-icon.png`
- Role illustrations: `farmer-role.webp`, `labs-role.webp`, `product-role.webp`, `service-role.webp`

---

## Index

Root manifest:
- `README.md` — this file
- `colors_and_type.css` — CSS custom properties for colors, type, radii, shadows, spacing
- `SKILL.md` — agent-skill bootstrap
- `fonts/` — Manrope (variable-weight woff2) + Roboto
- `assets/` — logos, icons, illustrations, badges, app-icon
- `preview/` — design-system review cards
- `ui_kits/`
  - `mobile/` — HiTerra mobile-app UI kit (field-ops, home, habitat/field/cycle flows)
  - `web/` — HiTerra marketing / landing UI kit

### UI kits at a glance
- **Mobile UI kit** (`ui_kits/mobile/index.html`) — home feed, habitat detail, add-cycle overlay, bottom nav, sub-header. Phone-frame preview, ~375×812.
- **Web UI kit** (`ui_kits/web/index.html`) — hero, product module grid, footer. Desktop preview, ~1280×800.

---

## Caveats & substitutions
- **Fonts**: all Manrope weights + Roboto variable shipped from the codebase; **Noto Sans** (variable, self-hosted) added for i18n/accented-Latin fallback via `--font-i18n`. **Noto Sans SC** (CJK, `--font-cjk`) loads from the Google Fonts CDN (weights 400–700) — swap to self-hosted woff2 for offline/perf if needed.
- **Lucide icons** are used as CDN fallback for generic glyphs outside `icon.tsx`. Flagged.
- Some Figma `.jsx` pseudocode uses Chinese component names (`线性/LeftOutline`, `底部分割线=短线`) — mapped by convention to chevron-left and divider. If actual design intent differs, please correct.
- `mobile-1.0` vs `mobile-2.1` Figma pages diverge slightly in styling; `2.1` is treated as the current direction.
