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
layout: two-cols
---

# Learning at the edge

Devices in collective systems continuously sense their surroundings and must adapt their behavior locally.

Examples:

- connected vehicles
- drone swarms
- participatory sensing

::right::

> **VISUAL PLACEHOLDER**  
> Mobile devices sensing different physical environments

### Why not centralize the data?

Privacy constraints, communication costs, and limited connectivity make centralized training impractical.

<!--
Start from the application setting: intelligence is moving to the edge, where data is generated. The issue is not only scale; raw observations may be sensitive or expensive to transmit.
-->

---
layout: two-cols
---

# Federated learning keeps data local

Each device:

1. trains on its own observations
2. shares model updates—not raw data
3. receives an aggregated model

The process repeats over multiple communication rounds.

::right::

> **VISUAL PLACEHOLDER**  
> Standard federated learning loop:  
> devices → model updates → aggregation → shared model

### The promise

Collective learning without centralized data collection.

<!--
Introduce only the basic FL loop. Emphasize that data stays on the devices while knowledge is combined through model updates.
-->

---
layout: two-cols
---

# One global model may fit no region well

Classical FL works best when clients observe similar data distributions.

In spatial systems, this assumption often fails:

- nearby devices sense similar phenomena
- distant devices experience different conditions

::right::

> **VISUAL PLACEHOLDER**  
> Map with locally homogeneous colored regions and non-IID data across regions

### Proximity-based non-IID data

Data is approximately homogeneous **within** a region, but heterogeneous **across** regions.

<!--
Move from generic non-IID data to the structured case that matters here. The heterogeneity is not random: it follows the physical environment.
-->

---
layout: two-cols
---

# Clustered FL learns one model per region

Devices collaborate only with peers exposed to similar data.

This yields:

- one learning group per spatial cluster
- one specialized model per group
- better alignment with local conditions

::right::

> **VISUAL PLACEHOLDER**  
> Three spatial clusters, each with its own regional model

Self-organizing approaches can discover these clusters without a central coordinator—but existing results mainly assume **static nodes**.

<small>[CITATION PLACEHOLDER: IoT paper] · [CITATION PLACEHOLDER: ACSOS 2024 paper]</small>

<!--
Connect the spatial structure to clustered FL. Mention your previous work as the starting point: decentralized clustering and regional model aggregation already work well when membership is stable.
-->

---
layout: two-cols
---

# Mobility turns spatial drift into temporal drift

A moving device encounters a sequence of region-specific distributions:

### Area 0 → Area 1 → Area 2 → Area 3

After every transition, the device must learn the new region without losing what it learned before.

::right::

> **VISUAL PLACEHOLDER**  
> A device trajectory crossing four differently colored regions

### The failure mode

Adapting to the current region can overwrite knowledge from previous ones: **catastrophic forgetting**.

<!--
This is the key conceptual transition. The same heterogeneity that is spatial for the system becomes a temporal sequence for each mobile node.
-->

---
layout: two-cols
---

# Continual learning adds memory across regions

Continual learning is designed for models exposed to changing tasks or data distributions over time.

The objective is twofold:

- **adapt** to the current environment
- **retain** useful knowledge from past environments

::right::

> **VISUAL PLACEHOLDER**  
> New regional data entering a model while past knowledge is retained

### Our idea

Combine continual learning with decentralized clustered FL.

<!--
Keep the continual learning background short. The audience only needs the adaptation-versus-retention tension before seeing the proposed method.
-->

---

# C²FL connects space and time

<div class="grid grid-cols-3 gap-8 mt-12 text-center">
  <div>
    <div class="text-5xl mb-4">①</div>
    <h3>Self-organizing clustering</h3>
    <p>Form learning groups from local interactions.</p>
  </div>
  <div>
    <div class="text-5xl mb-4">②</div>
    <h3>Regional federated learning</h3>
    <p>Build a model for each spatial cluster.</p>
  </div>
  <div>
    <div class="text-5xl mb-4">③</div>
    <h3>Continual adaptation</h3>
    <p>Retain past knowledge while entering new regions.</p>
  </div>
</div>

<div class="mt-12 text-center text-2xl">
  <strong>C²FL: Clustered Continual Federated Learning</strong>
</div>

<!--
Present C²FL as the integration of three pieces, not as a monolithic algorithm. The novelty lies in making them work together under mobility-induced drift.
-->

---
layout: two-cols
---

# Regional consensus emerges without a server

Within each self-organized cluster:

1. devices train locally
2. updates flow toward an elected leader
3. the leader computes a weighted average
4. the regional model flows back to the cluster

::right::

> **VISUAL PLACEHOLDER**  
> Cluster leader election, collect-cast aggregation, and gradient-cast dissemination

Clusters continuously realign as topology changes.

<!--
Explain this at the system level rather than detailing the aggregate-computing primitives. The important point is that both cluster formation and model exchange are decentralized and self-stabilizing.
-->

---
layout: two-cols
---

# Two mechanisms balance retention and adaptation

### Experience replay

When a device leaves a region, samples from that region enter its local replay memory.

Future local training combines current observations with past experience.

::right::

### Dwell-time-aware integration

Immediately after moving, the device gives limited weight to the new regional model.

That weight gradually increases while the device remains in the same region.

> **VISUAL PLACEHOLDER**  
> Regional-model weight increasing with dwell time

<!--
Replay protects prior knowledge; adaptive averaging avoids abruptly overwriting the device model with a newly received regional consensus. Stress that replay data remains local and is never shared.
-->

---

# Experimental setup

<div class="grid grid-cols-2 gap-x-16 gap-y-7 mt-8">
  <div><strong>Dataset</strong><br>EMNIST with proximity-based non-IID partitions</div>
  <div><strong>Environment</strong><br>4 spatial regions</div>
  <div><strong>Population</strong><br>50 devices, 20% mobile</div>
  <div><strong>Local data</strong><br>≈200 samples per device and round</div>
  <div><strong>Training</strong><br>120 global rounds</div>
  <div><strong>Mobility</strong><br>Region changes at rounds 30, 60, and 90</div>
  <div><strong>Model</strong><br>Two-hidden-layer MLP</div>
  <div><strong>Repetitions</strong><br>10 independent random seeds</div>
</div>

<!--
Explain that the benchmark deliberately controls both spatial heterogeneity and temporal shifts. Static devices provide a stable regional signal, while mobile devices follow circular trajectories across the four regions.
-->

---
layout: two-cols
---

# We isolate the contribution of each component

### Compared methods

- **Local:** current regional data only
- **FL:** regional federation, no replay
- **CL:** replay, no regional federation
- **C²FL:** replay + adaptive regional integration

::right::

### Evaluation

- per-region accuracy for each mobile device
- cumulative accuracy across all regions

> **VISUAL PLACEHOLDER**  
> Timeline: 0–30–60–90–120 with one region per interval

<!--
Frame the baselines as an ablation: FL tests collaboration without memory, while CL tests memory without federation. Figure 2 focuses on per-region accuracy for one representative mobile node.
-->

---

# Standard clustered FL forgets previous regions

> **FIGURE PLACEHOLDER — Figure 2a**  
> FBFL baseline: four per-area accuracy plots with mobility transitions at rounds 30, 60, and 90  
> Suggested asset: `./images/fig2a-fbfl.png`

### After each move, accuracy shifts toward the current region and drops on regions visited before.

Mobility alone is enough to induce catastrophic forgetting in decentralized clustered FL.

<!--
Walk through one transition rather than every curve. When the device enters a new area, it learns that distribution but overwrites knowledge from previous areas. This answers RQ1.
-->

---

# C²FL retains knowledge across transitions

> **FIGURE PLACEHOLDER — Figure 2b**  
> C²FL: four per-area accuracy plots with mobility transitions at rounds 30, 60, and 90  
> Suggested asset: `./images/fig2b-c2fl.png`

### Accuracy on previously visited regions is substantially preserved as the device moves.

Replay limits forgetting, while regional integration supports faster adaptation to the current area.

<!--
Use the same reading order as the previous slide so the contrast is immediate. This provides the qualitative evidence behind RQ2.
-->

---

# Takeaway

<div class="text-3xl leading-relaxed mt-14">
  Spatially clustered data becomes a <strong>continual learning problem</strong> when devices move.
</div>

<div class="text-3xl leading-relaxed mt-10">
  C²FL combines <strong>self-organizing clusters</strong>, <strong>regional federation</strong>, and <strong>continual adaptation</strong> in one decentralized process.
</div>

<div class="text-3xl leading-relaxed mt-10">
  The result is better <strong>adaptation–retention balance</strong> under mobility-induced drift.
</div>

<!--
Return to the central insight: mobility couples the collective spatial problem with an individual temporal problem. C²FL addresses both dimensions together.
-->

---
layout: two-cols
---

# Future work

- Evaluate more complex datasets and realistic sensing tasks
- Compare replay with regularization-based and hybrid continual learning methods
- Replace abrupt region changes with gradual spatial distribution shifts
- Study bounded and resource-aware replay memories

::right::

> **VISUAL PLACEHOLDER**  
> Roadmap from controlled spatial regions to realistic mobile sensing environments

### Goal

Move from a controlled proof of concept toward deployable learning in mobile collective systems.

<!--
Close on the path toward realism: harder tasks, alternative continual learning strategies, gradual shifts, and bounded memory. Then invite questions.
-->
