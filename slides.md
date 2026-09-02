---
theme: default
title: Your Talk Title
titleTemplate: '%s'
colorSchema: light
routerMode: hash
mdc: true
selectable: true
layout: default
class: first-slide
transition: slide-left
defaults:
  layout: default
  transition: slide-left
---

<!--
Cover slide.
- Remove the .cover-badges block if you don't have artifact badges.
- Swap <Logo /> for your own logo (see components/Logo.vue), or a
  <BaseImg src="logo.png" /> pointing at a file in /public.
- Both <QrCard> entries are optional; delete the row if you don't need them.
-->

<div class="cover-badges">
  <div class="cover-badge badge-available" role="img" aria-label="Artifacts Available"></div>
  <div class="cover-badge badge-reusable" role="img" aria-label="Artifacts Evaluated — Reusable"></div>
</div>

<div class="cover-qr-row" style="position: absolute; top: 1.4rem; left: 1.6rem; display: flex; gap: 1rem; align-items: center; z-index: 10;">
  <QrCard title="Repository" url="https://github.com/your-org/your-repo" short="github.com/.../your-repo" :size="6.5" />
</div>

<div class="cover-center-shell">
  <div class="cover-logo-wrap">
    <Logo text="Your Project" />
  </div>

  <h2 class="cover-subtitle">A one-line subtitle describing your talk</h2>

  <div class="cover-meta-row">
    <div class="cover-mini-meta"><strong style="color: var(--deck-orange);">First Author</strong> · Second Author · Third Author</div>
    <div class="cover-mini-meta">Your Institution</div>
  </div>

  <p class="cover-kicker">CONFERENCE 2026 · City · Day Month Year</p>
</div>

---
layout: default
class: stage-slide
---

<!--
"stage-slide": a title + prose slide, vertically centered. Good default
for narrative/argument slides. Use <v-clicks> to reveal bullets one by
one, and the three-column "callout row" below for a quick visual break.
-->

<div class="slide-shell">

# The problem, stated plainly

- First point framing the problem you're addressing, with <span class="mark-teal">key terms highlighted</span>.
- Second point, building on the first — use <span class="u-solid-orange">underline emphasis</span> for a different accent.
- Third point setting up why this matters.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div v-click style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Where it matters</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting detail.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">The bottleneck</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting detail.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">What's needed</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting detail.</div>
  </div>
</div>

</div>

---
layout: default
class: stage-slide
---

<!--
Example using the reusable animated FlowDiagram component together with
<v-clicks>: click through the bullets and the matching stage lights up.
-->

<div class="slide-shell" style="gap: 0.6rem;">

# Your Approach
## A one-line description of the core idea

<div class="visual-box visual-box-wide" style="margin: 0 auto 0.2rem;">
  <FlowDiagram
    :click="$clicks"
    :stages="[
      { label: 'Stage One', sub: 'short caption' },
      { label: 'Stage Two', sub: 'short caption' },
      { label: 'Stage Three', sub: 'short caption' },
    ]"
  />
</div>

<v-clicks>

- Explain stage one and why it matters<sup class="cite">[1]</sup>.
- Explain stage two, building on stage one.
- Explain stage three, the payoff.

</v-clicks>

<Cites refs="1" />

</div>

---
layout: default
class: viz-slide
---

<!--
"viz-slide": split-grid layout (text left, visual right) for slides that
pair an explanation with a diagram, image, or chart.
-->

<div class="slide-shell">

# A closer look

<div class="split-grid">

<div>

<ul>
  <li><strong>Break the idea into steps:</strong>
    <ul>
      <li v-click="1"><strong style="color: var(--deck-orange);">1. First</strong> — description of the first step.</li>
      <li v-click="2"><strong style="color: var(--deck-teal);">2. Second</strong> — description of the second step.</li>
      <li v-click="3"><strong style="color: var(--deck-green);">3. Third</strong> — description of the third step.</li>
    </ul>
  </li>
</ul>

</div>

<div class="visual-box">
  <!-- Swap for a real image once you have one, e.g.: -->
  <!-- <BaseImg src="your-diagram.png" alt="Diagram" /> -->
  <FlowDiagram
    :click="$clicks"
    :stages="[
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ]"
  />
</div>

</div>

</div>

---
layout: default
class: code-slide
---

<!--
"code-slide": for a code sample plus a short breakdown. The {all|3-5|6}
syntax after the language name step-highlights lines on each click.
-->

<div class="slide-shell">

# Core API

```python {all|1-2|3|4}
def example(input):
    step = transform(input)
    result = process(step)
    return result
```

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div v-click="1" style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Input</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">What comes in and why.</div>
  </div>
  <div v-click="2" style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Transform</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">What happens in between.</div>
  </div>
  <div v-click="3" style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Output</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">What comes out.</div>
  </div>
</div>

</div>

---
layout: default
class: stage-slide
---

<!--
Example of the "comparison-card" / "module-card" utility classes from
styles/index.css for a 3-up feature or comparison grid.
-->

<div class="slide-shell">

# Comparing options

<div class="comparison-grid">
  <div class="comparison-card">
    <div class="card-title">Option A</div>
    <div class="card-text">What it is and its main trade-off.</div>
  </div>
  <div class="comparison-card highlight">
    <div class="card-title">Option B <span class="text-orange">(chosen)</span></div>
    <div class="card-text">Why this is the pick.</div>
  </div>
  <div class="comparison-card">
    <div class="card-title">Option C</div>
    <div class="card-text">What it is and its main trade-off.</div>
  </div>
</div>

</div>

---
layout: default
class: end-slide
transition: fade
---

<!--
"end-slide": for takeaways / summary slides, vertically centered like
stage-slide but without top padding.
-->

<div class="slide-shell">

# Key takeaways

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Takeaway one</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting line.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Takeaway two</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting line.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Takeaway three</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Short supporting line.</div>
  </div>
</div>

<p class="closing-line">
  Next: <span class="mark-teal">future direction one</span> · <span class="mark-orange">future direction two</span> · <span class="mark-green">future direction three</span>
</p>

</div>

---
layout: default
class: end-slide
---

<!--
Thank-you / contact slide with QR codes. Delete the collage on the right
if you don't have supporting images/animated components to show off, or
replace it with a single centered <BaseImg>.
-->

<div class="slide-shell">

<div class="thanks-grid" style="grid-template-columns: 1fr;">

<div class="thanks-left">
  <div class="thanks-title">Thank You!</div>
  <Logo text="Your Project" style="margin-bottom: 0.2rem;" />

  <div class="thanks-subtitle">
    A one-line description of your talk
  </div>
  <div class="thanks-qr-row">
    <QrCard title="Repository" url="https://github.com/your-org/your-repo" :size="5.8" />
  </div>
  <div class="thanks-details">
    <strong>Contact:</strong> you@example.com
  </div>
</div>

</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# References

<References />

</div>
