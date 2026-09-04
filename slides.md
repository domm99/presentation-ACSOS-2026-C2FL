---
theme: default
title: "C2FL: Clustered Continual Federated Learning under Spatial and Temporal Drift"
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

<div class="cover-center-shell">
  <p class="cover-kicker">ACSOS 2026 · 7th IEEE International Conference on Autonomic Computing and Self-Organizing Systems</p>
  <h1 class="cover-paper-title">C²FL: Clustered Continual<br>Federated Learning</h1>
  <h2 class="cover-subtitle">Under Spatial and Temporal Drift</h2>
  <div class="cover-rule" />

  <div class="cover-meta-row">
    <div class="cover-mini-meta">
      <strong style="color: var(--deck-orange);">Davide Domini</strong> 
      · 
      Gianluca Aguzzi 
      · 
      Lorenzo Pellegrini 
      · 
      Mirko Viroli 
      · 
      Lukas Esterle 
    </div>
  </div>

  <div class="cover-affiliations">
      <div class="affiliation">
        <img
          src="./images/disi.svg"
          alt="University of Bologna"
          class="affiliation-logo unibo-logo"
        >
        <div>
          Department of Computer Science and Engineering,<br>
          University of Bologna, Cesena, Italy
        </div>
      </div>
      <div class="affiliation">
        <img
          src="./images/aarhus.svg"
          alt="Aarhus University"
          class="affiliation-logo aarhus-logo"
        >
        <div>
          Department of Electrical and Computer Engineering,<br>
          Aarhus University, Aarhus, Denmark
        </div>
      </div>
  </div>
</div>



---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell">

# Intelligence is moving to the edge

<div class="c2-split">
<div>

Devices in collective systems continuously sense their surroundings and adapt their behavior locally.

<ul class="c2-clean-list">
  <li><strong>Connected vehicles</strong> learn from traffic conditions</li>
  <li v-click="1"><strong>Drone swarms</strong> learn from the areas they monitor</li>
  <li v-click="2"><strong>Participatory sensing</strong> learns from personal devices</li>
</ul>

<div v-click="3" class="c2-value-strip">
  <span>The systems question</span>
  How can devices learn collectively when observations cannot be centralized?
</div>

</div>
<C2EdgeScenario :click="$clicks" />
</div>
</div>

<!-- [Sources]
Context and motivating domains: supplied C²FL paper, Introduction.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# Federated learning keeps observations local

> A distributed learning paradigm where devices collaboratively train a model without sharing their raw data.

<FederatedLearning :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

<p v-click="3" class="c2-centered-claim">The promise: <strong>collective learning</strong> without centralized data collection.</p>

<Cites refs="1" />
</div>

<!-- [Sources]
Federated learning process: supplied C²FL paper, Section II-A.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell">

# One global model may fit no region well

<div class="c2-split">
<div>

- Nearby devices often sense **similar phenomena**.
- Distant devices may experience **radically different conditions**.
- Their local updates therefore optimize **different objectives**.

<div v-click="1" class="c2-inline-note teal">
  <strong>Proximity-based non-IID data:</strong> distributions are approximately homogeneous <em>within</em> a region, but heterogeneous <em>across</em> regions.
</div>

<div v-click="2" class="c2-inline-note orange">
  <strong>Structure matters:</strong> heterogeneity follows the physical environment—it is not random across clients.
</div>

</div>
<C2SpatialMap :click="$clicks" mode="heterogeneity" />
</div>
</div>

<!-- [Sources]
Spatially structured heterogeneity: supplied C²FL paper, Figure 1 and Sections I–II-A.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# Clustered FL specializes models by region

> Devices exposed to similar distributions collaborate on one model per cluster instead of being forced into a single global average.

<div class="c2-split reverse">
<C2SpatialMap :click="$clicks" mode="clustered" />
<div>
  <div class="c2-feature-line"><strong>Local specialization</strong><span>One model follows the conditions of one region.</span></div>
  <div v-click="1" class="c2-feature-line"><strong>Self-organization</strong><span>Clusters can emerge from local interactions.</span></div>
  <div v-click="2" class="c2-feature-line catch"><strong>The catch</strong><span>Existing results mainly assume static membership.</span></div>
</div>
</div>

<Cites refs="3,4,5" />
</div>

<!-- [Sources]
Clustered FL and self-organizing spatial clusters: supplied C²FL paper, Sections I and II-A.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# Mobility turns spatial drift into temporal drift

<C2MobilityDrift :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

<div v-click="4" class="c2-research-question">
  Can a device <span class="mark-teal">adapt to the current region</span> without <span class="mark-orange">forgetting the previous ones</span>?
</div>

<div v-click="4" class="c2-value-strip"><span>The failure mode</span>Training on the current region can overwrite previously acquired knowledge: <strong>catastrophic forgetting</strong>.</div>
</div>

<!-- [Sources]
Mobility-induced temporal drift and catastrophic forgetting: supplied C²FL paper, Sections I and III-D.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# Continual learning adds memory across regions

> Continual learning enables a model to acquire new knowledge while preserving previously learned capabilities.

<C2ContinualBalance :click="$clicks" />
<div v-click="1" class="click-marker" />

<p v-click="2" class="c2-centered-claim">Our idea: bring this <strong>adaptation–retention balance</strong> into decentralized clustered FL.</p>

<Cites refs="2" />
</div>

<!-- [Sources]
Continual learning definition and motivation: supplied C²FL paper, Section II-B.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# C²FL connects space and time

<div class="c2-three-up">
  <div class="c2-contribution teal"><div class="c2-number">01</div><h3>Self-organizing clusters</h3><p>Devices form spatial learning groups through local interactions.</p></div>
  <div v-click="1" class="c2-contribution green"><div class="c2-number">02</div><h3>Regional federation</h3><p>Each cluster builds and disseminates its own consensus model.</p></div>
  <div v-click="2" class="c2-contribution orange"><div class="c2-number">03</div><h3>Continual adaptation</h3><p>Each mobile device learns new regions while retaining past experience.</p></div>
</div>

<p v-click="3" class="c2-centered-claim"><strong>C²FL</strong> = Clustered Continual Federated Learning</p>

<Cites refs="4,5" />
</div>

<!-- [Sources]
C²FL components: supplied C²FL paper, Section IV.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell">

# One round balances collective and individual knowledge

<C2RoundPipeline :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

<div v-click="4" class="c2-value-strip"><span>Why both?</span>Replay protects prior knowledge; adaptive averaging prevents abrupt overwriting after a move.</div>
</div>

<!-- [Sources]
Protocol, replay, and dwell-time-aware adaptive averaging: supplied C²FL paper, Section IV and Algorithm 1.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell">

# Experimental setup: controlled spatial and temporal drift

<div class="c2-setup-grid">
<div class="c2-setup-facts">
  <div class="c2-setup-fact teal"><span>01</span><strong>Spatial structure</strong><p><strong>EMNIST</strong> partitioned into 4 proximity-based non-IID regions.</p></div>
  <div class="c2-setup-fact orange"><span>02</span><strong>Mobile population</strong><p><strong>50 devices</strong>; 20% move through the four regions.</p></div>
  <div class="c2-setup-fact green"><span>03</span><strong>Evaluation rigor</strong><p><strong>120 rounds</strong>, two-layer MLP, 10 independent seeds.</p></div>
</div>

<div class="c2-paper-figure-shell c2-subregions-panel">
  <img src="./images/paper/subregions.png" alt="Four proximity-based non-IID spatial regions" class="c2-paper-figure contain" />
  <p>Four local distributions define the controlled mobility path.</p>
</div>
</div>

<div class="c2-timeline">
  <div><strong>0–30</strong><span>Region A</span></div><div><strong>30–60</strong><span>Region B</span></div><div><strong>60–90</strong><span>Region C</span></div><div><strong>90–120</strong><span>Region D</span></div>
</div>

<p class="c2-centered-claim">Each mobile node experiences three controlled distribution shifts along its trajectory.</p>
</div>

<!-- [Sources]
Dataset, population, mobility schedule, model, and repetitions: supplied C²FL paper, Section V-A.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# The baselines isolate each contribution

<div class="c2-comparison-grid">
  <div class="c2-comparison-card"><div>Local</div><p><strong>Neither mechanism</strong><br>Current regional data only.</p></div>
  <div class="c2-comparison-card"><div>FL</div><p><strong>Collaboration only</strong><br>Regional federation, no replay.</p></div>
  <div class="c2-comparison-card"><div>CL</div><p><strong>Memory only</strong><br>Replay, no regional federation.</p></div>
  <div class="c2-comparison-card highlight"><div>C²FL</div><p><strong>Both mechanisms</strong><br>Replay + adaptive regional integration.</p></div>
</div>

<div class="c2-metrics-row">
  <div><span>Metric 01</span><strong>Per-region accuracy</strong><p>Can a mobile node still solve earlier regions?</p></div>
  <div><span>Metric 02</span><strong>Cumulative accuracy</strong><p>How much competence is retained overall?</p></div>
</div>
</div>

<!-- [Sources]
Ablation baselines and evaluation metrics: supplied C²FL paper, Section V-A.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell c2-result-slide">

# Standard clustered FL forgets previous regions

<div class="c2-paper-figure-shell c2-wide-result">
  <img src="./images/paper/moving-node-FL_merge.png" alt="Per-area accuracy for the FBFL baseline under mobility" class="c2-paper-figure contain" />
</div>

<div class="c2-result-takeaway orange">After each move, accuracy shifts toward the <strong>current region</strong> and drops on regions visited before.</div>

<p class="c2-result-answer"><span>RQ1</span> Mobility alone is enough to induce catastrophic forgetting.</p>
</div>

<!-- [Sources]
Visual and interpretation: supplied C²FL paper, Figure 2a and Section V-B.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell c2-result-slide">

# C²FL retains knowledge across transitions

<div class="c2-paper-figure-shell c2-wide-result">
  <img src="./images/paper/moving-node-C2FL_merge.png" alt="Per-area accuracy for C2FL under mobility" class="c2-paper-figure contain" />
</div>

<div class="c2-result-takeaway teal">Accuracy on previously visited regions is <strong>substantially preserved</strong> as the device moves.</div>

<p class="c2-result-answer"><span>RQ2</span> Replay limits forgetting; regional integration accelerates adaptation.</p>
</div>

<!-- [Sources]
Visual and interpretation: supplied C²FL paper, Figure 2b and Section V-B.
-->

---
layout: default
class: c2-viz-slide
---

<div class="c2-slide-shell c2-result-slide">

# C²FL combines retention with regional collaboration

<div class="c2-comparison-result-grid">
  <div class="c2-paper-figure-shell c2-comparison-figure">
    <img src="./images/paper/comparison.png" alt="Cumulative accuracy comparison across Local, FL, CL, and C2FL methods" class="c2-paper-figure contain" />
  </div>
  <div class="c2-result-readout">
    <div class="c2-readout-line"><strong>Local / FL</strong><span>limited retention after area transitions.</span></div>
    <div class="c2-readout-line"><strong>CL</strong><span>replay improves retention but lacks regional consensus.</span></div>
    <div class="c2-readout-line accent"><strong>C²FL</strong><span>best cumulative accuracy by combining both mechanisms.</span></div>
  </div>
</div>

<p class="c2-result-answer"><span>RQ2</span> The full method improves cumulative accuracy over the ablations.</p>
</div>

<!-- [Sources]
Visual and interpretation: supplied C²FL paper, Figure 3 and Section V-B.
-->

---
layout: default
class: c2-stage-slide
---

<div class="c2-slide-shell">

# The key insight: mobility couples space and time

<div class="c2-takeaway-stack">
  <div><span>01</span><p>Spatially clustered data becomes a <strong>continual learning problem</strong> when devices move.</p></div>
  <div v-click="1"><span>02</span><p>C²FL combines <strong>self-organizing clusters</strong>, <strong>regional federation</strong>, and <strong>continual adaptation</strong>.</p></div>
  <div v-click="2"><span>03</span><p>The result is a better <strong>adaptation–retention balance</strong> under mobility-induced drift.</p></div>
</div>
</div>

<!-- [Sources]
Main conclusions: supplied C²FL paper, Section VI.
-->

---
layout: default
class: c2-end-slide
transition: fade
---

<div class="c2-slide-shell">

# Future work

<div class="c2-three-up future">
  <div class="c2-contribution teal"><h3>Harder tasks</h3><p>More complex datasets and realistic sensing scenarios.</p></div>
  <div class="c2-contribution green"><h3>Beyond replay</h3><p>Regularization-based and hybrid continual learning methods.</p></div>
  <div class="c2-contribution orange"><h3>Smoother drift</h3><p>Gradual spatial transitions instead of abrupt region changes.</p></div>
</div>

<div class="c2-future-grid">
  <div><span>Current boundary</span><p>Controlled mobility and an unbounded local replay memory.</p></div>
  <div><span>Next</span><p>Bounded, resource-aware memory policies for deployable mobile systems.</p></div>
</div>

<p class="c2-centered-claim">Toward continual federated learning in real mobile collective systems.</p>
</div>

<!-- [Sources]
Future directions: supplied C²FL paper, Section VI and replay limitations in Section IV.
Visual language inspired by the user-supplied colleague deck, slides.md.
-->
