# Slidev Reusable Template

A reusable template for building presentations with Slidev.

The repository provides a ready-to-use presentation structure, a shared design system, reusable Vue components, bibliography management, slide patterns, and automatic deployment to GitHub Pages.

## What's Included

```text
template-slidev/
├── slides.md                  # Slide scaffold with reusable presentation patterns
├── package.json
├── styles/index.css           # Design system: colors, typography, and utility classes
├── components/
│   ├── BaseImg.vue            # Image component that respects the GitHub Pages base path
│   ├── QrCard.vue             # QR code card with title
│   ├── Cites.vue              # Per-slide citation footnotes
│   ├── References.vue         # Final bibliography slide generated from references.ts
│   ├── references.ts          # Single source of truth for bibliography entries
│   ├── Logo.vue               # Placeholder SVG logo
│   └── FlowDiagram.vue        # Reusable animated step diagram with click reveal
├── scripts/postbuild.mjs      # Generates redirects for direct links to individual slides
└── .github/workflows/
    └── deploy-slides.yml      # Automatic deployment to GitHub Pages
```

## Setup

```bash
npm install
npm run dev      # Local preview at http://localhost:3030
npm run build    # Static build in dist/, including slide redirects
npm run export   # Export the presentation to PDF
```

## Slide Patterns

`slides.md` contains reusable examples for the main presentation layouts.

Each slide uses the `class:` property in its frontmatter to select a layout defined in `styles/index.css`.

* **`first-slide` / `deck-cover`** — presentation cover with centered content.
* **`stage-slide`** — title and text layout, vertically centered. Suitable for narrative or argumentative slides. Use `<v-clicks>` to progressively reveal bullet points.
* **`viz-slide`** — two-column layout based on `split-grid`, with text on the left and a visual on the right.
* **`code-slide`** — code-focused layout supporting progressive line highlighting, such as `{all|3-5|6}`, with a three-column breakdown below.
* **`end-slide`** — layout for takeaways, summaries, or the final presentation slide.

Several reusable CSS utility classes are also available, including:

* `mark-teal`, `mark-orange`, `mark-green`
* `u-solid-*`, `u-dashed-*`, `u-wavy-*`, `u-dotted-*`
* `comparison-grid`
* `comparison-card`
* `three-up`
* `pipeline-grid`
* `soft-card`
* `slide-shell`

See `styles/index.css` for the complete design system and available utilities.

## Reusable Components

### Logo

```vue
<Logo text="..." />
```

A placeholder SVG logo component. Replace it with your own logo, customize the component, or use `BaseImg` with an image stored in `public/`.

### QR Card

```vue
<QrCard title="..." url="..." :size="6.5" />
```

Generates a QR code at runtime and displays it together with a title.

### Citations and References

```vue
<Cites refs="1,3" />
<References />
```

The citation system is based on `components/references.ts`.

Bibliography entries are defined in one place and reused both for per-slide citation notes and for the final references slide.

### Flow Diagram

```vue
<FlowDiagram :stages="[...]" :click="$clicks" />
```

A reusable multi-step diagram with progressive click-based reveal.

Provide the stages as data instead of creating a dedicated component for every diagram.

## Customization

1. Edit `slides.md` to define the title, authors, and presentation content.
2. Update `components/references.ts` with your bibliography.
3. Replace or customize `Logo.vue` with your own logo.
4. Customize colors, typography, layouts, and utility classes in `styles/index.css`.
5. Add images and other static assets to `public/` when needed.
6. Create additional Vue components in `components/` for presentation-specific visualizations or animations.
7. Reuse the existing component patterns when implementing click-based or staged animations.

## GitHub Pages Deployment

The repository includes a GitHub Actions workflow for deploying the presentation to GitHub Pages:

```text
.github/workflows/deploy-slides.yml
```

The workflow can be used to automatically build and publish the presentation when changes are pushed to the repository.

The post-build script:

```text
scripts/postbuild.mjs
```

generates the redirects required to support direct links to individual slides in the deployed presentation.

## Repository Structure

The template is designed to keep presentation content, styling, reusable components, references, and deployment configuration separated.

This makes it possible to use the repository as a starting point for different Slidev presentations while keeping a consistent presentation structure and design system.
