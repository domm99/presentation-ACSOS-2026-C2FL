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
  
  <h1>C²FL: Clustered Continual Federated Learning under Spatial and Temporal Drift</h1>
  <h2 class="cover-subtitle">The 7th IEEE International Conference on Autonomic Computing and Self-Organizing Systems</h2>

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

  <div style="display:flex;justify-content:center;gap:4rem;margin-top:1.4rem">
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.6rem;text-align:center">
      <img src="./images/disi.svg" alt="University of Bologna" style="height:5rem;width:auto;object-fit:contain">
      <div style="font-size:0.82rem;color:var(--deck-muted)">
        Department of Computer Science and Engineering,<br>
        University of Bologna, Cesena, Italy
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.6rem;text-align:center">
      <img src="./images/aarhus.svg" alt="Aarhus University" style="height:5rem;width:auto;object-fit:contain">
      <div style="font-size:0.82rem;color:var(--deck-muted)">
        Department of Electrical and Computer Engineering,<br>
        Aarhus University, Aarhus, Denmark
      </div>
    </div>
  </div>
</div>

<!--
Cover slide.
-->

---
layout: two-cols
---

# Intelligence at the edge

<p style="margin:0.6rem 0 0.9rem;font-size:0.95rem;color:var(--deck-ink,#1a1a1a);opacity:0.75;line-height:1.45"><strong>Collective Adaptive Systems</strong> rely on machine learning directly on the devices — each node learning from what it locally senses.</p>

Paradigmatic domains:

- **Connected vehicles** — speed, density, congestion prediction
- **Drone swarms** — cooperative sensing and navigation
- **Participatory crowdsensing** — environmental monitoring

<div class="mt-6 p-4" style="background:var(--deck-teal-soft);border-left:4px solid var(--deck-teal);border-radius:4px">
  <strong>Two fundamental tensions</strong><br>
  Data is <em>privacy-sensitive</em> — raw observations cannot leave the device.<br>
  Devices are <em>mobile</em> — they traverse regions with different distributions.
</div>

::right::

<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:0.6rem">
  <img src="/figures/heterogeneity.png" alt="Spatially heterogeneous data distribution" style="width:100%;border-radius:8px" />

</div>

<!--
Open with the application context. The picture shows the spatial structure that will drive everything: locally coherent data, globally heterogeneous.
-->

---
layout: default
class: stage-slide top-slide
---

<div class="slide-shell">

# Federated learning - Standard paradigm

> a distributed learning paradigm where devices train a shared model collaboratively without sharing their raw data. <Cite n="1" />

<FederatedLearning :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />


<Cites refs="1" />

</div>

<!-- [Sources]
Federated learning process: supplied manuscript, Background and Related Works.
McMahan et al., Communication-Efficient Learning of Deep Networks from Decentralized Data, AISTATS 2017.
-->

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Data heterogeneity

## Federated learning struggles with non-IID data

<div class="split-grid wide-visual-grid">

<div class="static-points">

- Different zones, different **feature distributions**: cars, speeds, flow patterns.
- Local updates then optimize **different objectives**, on the very same task.
- Averaging conflicting updates degrades FedAvg: the **non-IID problem**. <Cite n="2" />

<div class="inline-note angle-note" :class="{ 'highlight-angle': ($clicks || 0) >= 3 }">
  <strong>This work:</strong> average only within groups of devices whose distributions already agree.
</div>

</div>

<HeterogeneityDiagram :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" />

</div>

<Cites refs="2" />

</div>

<!-- [Sources]
Non-IID discussion and clustered feature skew: supplied manuscript, Background and Related Works.
Visual: supplied manuscript figure paper/figures/subregions.pdf, rasterized without content changes.
Kairouz et al., Advances and Open Problems in Federated Learning, 2021.
-->

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Clustered federated learning

## Specializing models by device group

> Devices with similar distributions share one model per cluster, instead of one global average. <Cite n="3,4" />

<ClusteredFL :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" />

<div v-click="2" class="inline-note center-note cfl-catch"><strong>The catch:</strong> the groups must be inferred from the data that defines them &mdash; exactly what cannot be observed.</div>

<Cites refs="3,4" />

</div>

<!-- [Sources]
Clustered federated learning framing: supplied manuscript, Background and Related Works.
Ghosh et al., An Efficient Framework for Clustered Federated Learning, 2022.
Domini et al., Decentralized proximity-aware clustering for collective self-federated learning, 2026.
-->

---
layout: default
---

<div style="display:grid;grid-template-columns:1fr 2.5rem 42%;height:100%;align-items:center;gap:0">
<div>

# Mobility turns space into time

<p style="margin:0.55rem 0 0.8rem;font-size:0.95rem;color:var(--deck-ink,#1a1a1a);opacity:0.75">A moving device experiences a <strong>sequence</strong> of different regional distributions:</p>

<div class="mt-3 mb-3 p-3 text-center" style="font-size:1.1rem;border:1.5px solid var(--deck-line);border-radius:6px;background:#fff">
  Area 0 → Area 1 → Area 2 → Area 3
</div>

Each transition brings a new distribution — the model must **adapt** to the current region **without forgetting** the ones it visited before.

This is the **continual learning** problem, now arising naturally in mobile CAS.

<div class="mt-4 p-3" style="background:var(--deck-orange-soft);border-left:4px solid var(--deck-orange);border-radius:4px;font-size:0.85rem">
  <strong>Catastrophic forgetting:</strong> optimizing on the current region's data overwrites knowledge from previously visited ones.
</div>

</div>
<div/>
<div style="display:flex;align-items:center">
<MobilityDrift :click="$clicks" />
<div v-click="1" class="click-marker" /><div v-click="2" class="click-marker" /><div v-click="3" class="click-marker" /><div v-click="4" class="click-marker" /><div v-click="5" class="click-marker" /><div v-click="6" class="click-marker" />
</div>
</div>

<!--
This is the key conceptual pivot. The MobilityDrift component animates the device moving through 4 coloured regions on clicks. Click once per transition (3 clicks total).
-->

---

# Research questions

<div style="display:flex;gap:2rem;margin-top:2.5rem">
  <div v-click="1" class="click-marker"/>
  <div v-click="2" class="click-marker"/>
  <div :style="{ border:'2px solid var(--deck-orange)', borderRadius:'10px', padding:'1.4rem 1.5rem', background:'#fff', display:'flex', flexDirection:'column', gap:'0.8rem', flex:1, transition:'opacity 0.4s ease, filter 0.4s ease', opacity: $clicks === 2 ? 0.35 : 1, filter: $clicks === 2 ? 'grayscale(0.5)' : 'none' }">
    <div style="display:flex;align-items:center;gap:0.7rem">
      <span style="background:var(--deck-orange);color:#fff;border-radius:5px;padding:0.2rem 0.7rem;font-weight:800;font-size:1.1rem;letter-spacing:0.04em">RQ1</span>
      <span style="font-weight:700;font-size:0.95rem;color:var(--deck-ink)">Forgetting</span>
    </div>
    <p style="margin:0;font-size:0.88rem;line-height:1.6;color:var(--deck-ink)">Does node mobility in decentralized clustered FL induce <strong>sequential distribution shifts</strong> that lead to <strong>performance degradation</strong> and <strong>catastrophic forgetting</strong>?</p>
  </div>
  <div :style="{ border:'2px solid var(--deck-teal)', borderRadius:'10px', padding:'1.4rem 1.5rem', background:'#fff', display:'flex', flexDirection:'column', gap:'0.8rem', flex:1, transition:'opacity 0.4s ease, filter 0.4s ease', opacity: $clicks === 1 ? 0.35 : 1, filter: $clicks === 1 ? 'grayscale(0.5)' : 'none' }">
    <div style="display:flex;align-items:center;gap:0.7rem">
      <span style="background:var(--deck-teal);color:#fff;border-radius:5px;padding:0.2rem 0.7rem;font-weight:800;font-size:1.1rem;letter-spacing:0.04em">RQ2</span>
      <span style="font-weight:700;font-size:0.95rem;color:var(--deck-ink)">Knowledge retention</span>
    </div>
    <p style="margin:0;font-size:0.88rem;line-height:1.6;color:var(--deck-ink)">Can a decentralized approach balancing <strong>local adaptation</strong> with <strong>global model integration</strong>, enriched with continual learning mechanisms, improve <strong>knowledge retention</strong> under mobility-induced drift?</p>
  </div>
</div>

---

# C²FL brings three mechanisms together

<div class="grid grid-cols-3 gap-6 mt-8">
  <div style="border:1.5px solid var(--deck-teal);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.5rem;min-height:2.6rem">
      <span style="background:var(--deck-teal);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">1</span>
      <h3 style="margin:0;font-size:0.85rem">Decentralized Clustering</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Devices elect local leaders and join the nearest one — no fixed infrastructure, groups form and dissolve automatically as nodes move.</p>
  </div>
  <div style="border:1.5px solid var(--deck-orange);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.5rem;min-height:2.6rem">
      <span style="background:var(--deck-orange);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">2</span>
      <h3 style="margin:0;font-size:0.85rem">Intra-Cluster Federated Learning</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Within each cluster, devices train locally and aggregate a shared model — federation stays within the region, entirely without a central server.</p>
  </div>
  <div style="border:1.5px solid var(--deck-green);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.5rem;min-height:2.6rem">
      <span style="background:var(--deck-green);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">3</span>
      <h3 style="margin:0;font-size:0.85rem">Continual Adaptation</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Experience replay preserves knowledge from past regions; the new regional consensus is blended in gradually as the device settles.</p>
  </div>
</div>

<div class="mt-8 text-center" style="font-size:1.05rem;padding:0.8rem;background:var(--deck-teal-soft);border-radius:6px">
  <strong>C²FL = Clustered Continual Federated Learning</strong><br>
  <span style="font-size:0.85rem;color:var(--deck-muted)">A unified decentralized framework for mobile CAS with spatially structured data</span>
</div>

<!--
Present C²FL as the integration of three pieces. Emphasize that the novelty is the combination, not each component in isolation.
-->

---
layout: two-cols
---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-teal);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">1</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Decentralized Clustering</h1></div>

Devices organize into spatial clusters using a **distributed leader election** — each device picks the nearest active leader, with no fixed infrastructure and no central coordinator.

Groups form and dissolve **automatically** as devices move: when a node drifts away from its leader, a new election triggers locally.

::right::

<div style="font-size:0.82rem;display:flex;flex-direction:column;gap:0.7rem;margin-top:0.5rem;padding-left:1.5rem">
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Leader election</strong><br>
    Each device elects a local leader through neighborhood interactions — no fixed access point or server required.
  </div>
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Self-stabilizing</strong><br>
    If a node moves away or a leader disappears, re-election fires automatically — the system recovers without intervention.
  </div>
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-green);background:#fff;border-radius:4px">
    <strong>Purely local</strong><br>
    Membership and boundaries emerge from device-to-device interactions only — no global view is ever needed.
  </div>
  <div style="margin-top:0.3rem;padding:0.5rem 0.7rem;background:var(--deck-teal-soft);border-radius:4px;font-size:0.75rem">
    Built on <strong>field-based FL</strong> — previously validated for static CAS <span style="color:var(--deck-orange);font-weight:600">[9, 4]</span>.
  </div>
</div>

<Cites refs="9,4" />

<!--
Keep the focus on the intuition: no fixed infrastructure, self-repair under mobility.
-->

---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-orange);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">2</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Intra-Cluster Federated Learning</h1></div>

Within each cluster, devices **train locally** on their own data and share model updates to build a **regional consensus** — without any central server.

<div style="margin-top:0.7rem;display:flex;flex-direction:column;gap:0.55rem;font-size:0.85rem">
  <div style="padding:0.55rem 0.75rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Aggregation</strong><br>
    Model updates flow toward the cluster leader, which computes a weighted average — no data ever leaves the device.
    <div style="margin:0.4rem 0 0.1rem;text-align:center;font-family:'Georgia',serif;font-size:0.83rem">
      &#x3B8;<sub>cluster</sub> = &#x2211;<sub>i</sub> <span style="font-size:0.78rem">(n<sub>i</sub> / N)</span> &#x00B7; &#x3B8;<sub>i</sub>
    </div>
  </div>
  <div style="padding:0.55rem 0.75rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Dissemination</strong><br>
    The regional consensus propagates back to every cluster member, replacing the old local model.
  </div>
  <div style="padding:0.55rem 0.75rem;border-left:3px solid var(--deck-green);background:#fff;border-radius:4px">
    <strong>Fully decentralized</strong><br>
    The cluster leader role is transient and elected locally — the system works with no permanent infrastructure.
  </div>
</div>

<!--
Focus on the intuition: local training, regional aggregation, no server.
-->

---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-green);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">3</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Continual Adaptation</h1></div>

Two complementary mechanisms prevent a device from forgetting what it learned in past regions.

<div style="margin-top:0.8rem;display:flex;flex-direction:column;gap:0.6rem;font-size:0.85rem">
  <div style="padding:0.6rem 0.85rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Experience replay</strong><br>
    When a device moves, it retains a memory buffer of past samples. Training minimizes a mixed loss:
    <div style="margin:0.45rem 0 0.1rem;text-align:center;font-family:'Georgia',serif;font-size:0.83rem;letter-spacing:0.01em">
      &#x2112;(&#x3B8;) = (1&#x2212;&#x3BB;)&#x202F;&#x2112;<sub>curr</sub>(&#x3B8;) + &#x3BB;&#x202F;&#x2112;<sub>rep</sub>(&#x3B8;)
    </div>
  </div>
  <div style="padding:0.6rem 0.85rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Dwell-time-aware averaging</strong><br>
    The cluster model is blended with the local one using a weight that grows with dwell time <em>t</em>:
    <div style="margin:0.45rem 0 0.1rem;text-align:center;font-family:'Georgia',serif;font-size:0.83rem;letter-spacing:0.01em">
      &#x3B8; &#x2190; (1&#x2212;&#x3B1;<sub>t</sub>)&#x202F;&#x3B8;<sub>local</sub> + &#x3B1;<sub>t</sub>&#x202F;&#x3B8;<sub>cluster</sub> &nbsp;,&nbsp; &#x3B1;<sub>t</sub> = 1&#x2212;<em>e</em><sup>&#x2212;t/&#x3C4;</sup>
    </div>
  </div>
</div>



<!--
Two mechanisms: replay for the past, dwell-time averaging for the present.
-->

---

# Experimental setup

<div class="grid grid-cols-2 gap-x-14 gap-y-5 mt-6" style="font-size:0.88rem">
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Dataset</strong><br>EMNIST — proximity-based non-IID partition via ProFed benchmark
  </div>
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Environment</strong><br>4 spatial regions; 50 devices (≈12 per region)
  </div>
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Mobile devices</strong><br>20% of population — circular trajectory: 0→1→2→3 at rounds 30, 60, 90
  </div>
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-green);background:#fff;border-radius:4px">
    <strong>Evaluation</strong><br>120 rounds; 10 independent seeds; per-area accuracy + cumulative accuracy
  </div>
</div>

<div class="mt-6" style="padding:0.6rem 0.9rem;background:var(--deck-teal-soft);border-radius:6px;font-size:0.82rem">
  <strong>Baselines (ablation):</strong>
  &nbsp;<span style="background:var(--deck-teal);color:#fff;border-radius:3px;padding:0.1rem 0.4rem;font-size:0.78rem">Local</span>&nbsp; only current region, no FL, no CL &nbsp;·&nbsp;
  <span style="background:var(--deck-orange);color:#fff;border-radius:3px;padding:0.1rem 0.4rem;font-size:0.78rem">FL</span>&nbsp; clustered FL, no replay &nbsp;·&nbsp;
  <span style="background:var(--deck-green);color:#fff;border-radius:3px;padding:0.1rem 0.4rem;font-size:0.78rem">CL</span>&nbsp; replay, no regional federation
</div>

<!--
Keep setup crisp. The ablation design is the key methodological point: FL tests collaboration without memory, CL tests memory without federation.
-->

---
layout: two-cols
---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.2rem">
  <span style="background:var(--deck-orange);color:#fff;border-radius:4px;padding:0.1rem 0.55rem;font-weight:800;font-size:0.95rem;letter-spacing:0.03em;flex-shrink:0">RQ1</span>
  <h1 style="margin:0;font-size:1.45rem;line-height:1.2">Standard FL forgets across transitions</h1>
</div>
<p style="margin:0 0 0.7rem;font-size:0.82rem;color:var(--deck-muted)">FBFL has no continual-learning mechanism — it learns <strong>only</strong> the distribution currently observed.</p>

After each region change:

<div style="display:flex;flex-direction:column;gap:0.35rem;margin:0.4rem 0 0.7rem;font-size:0.84rem">
  <div style="display:flex;align-items:center;gap:0.5rem">
    <span style="background:var(--deck-teal-soft);color:var(--deck-teal);border-radius:3px;padding:0.1rem 0.4rem;font-weight:700;font-size:0.75rem;flex-shrink:0">↑ RISE</span>
    <span>accuracy on the <strong>new</strong> region</span>
  </div>
  <div style="display:flex;align-items:center;gap:0.5rem">
    <span style="background:#fde8e8;color:#c0392b;border-radius:3px;padding:0.1rem 0.4rem;font-weight:700;font-size:0.75rem;flex-shrink:0">↓ DROP</span>
    <span>accuracy on <strong>previously visited</strong> ones</span>
  </div>
</div>

Each move overwrites knowledge from the previous stay.

<div style="margin-top:0.6rem;padding:0.55rem 0.8rem;background:#fde8e8;border-left:3px solid #c0392b;border-radius:4px;font-size:0.83rem">
  <strong>Catastrophic forgetting is present and substantial</strong> in decentralized clustered FL under mobility.
</div>

::right::

<div style="margin-top:0.3rem;padding-left:1.5rem">
  <img src="./images/paper/moving-node-FL_merge.png" alt="FBFL: per-area accuracy for a mobile device" style="width:100%;border:1px solid var(--deck-line);border-radius:6px;box-shadow:0 2px 8px rgba(16,32,43,0.08)" />

</div>

<!--
Walk through one transition. At round 30 the device enters Area 1 — Area 1 accuracy rises, Area 0 accuracy collapses. This is RQ1: yes, mobility alone induces catastrophic forgetting.
-->

---
layout: two-cols
---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.2rem">
  <span style="background:var(--deck-teal);color:#fff;border-radius:4px;padding:0.1rem 0.55rem;font-weight:800;font-size:0.95rem;letter-spacing:0.03em;flex-shrink:0">RQ2</span>
  <h1 style="margin:0;font-size:1.45rem;line-height:1.2">C²FL preserves past knowledge</h1>
</div>
<p style="margin:0 0 0.7rem;font-size:0.82rem;color:var(--deck-muted)">Accuracy on <strong>previously visited regions is substantially retained</strong> across transitions.</p>

<div style="display:flex;flex-direction:column;gap:0.4rem;margin:0.3rem 0 0.7rem;font-size:0.83rem">
  <div style="display:flex;gap:0.5rem;align-items:flex-start">
    <span style="background:var(--deck-teal-soft);color:var(--deck-teal);border-radius:3px;padding:0.1rem 0.45rem;font-weight:700;font-size:0.72rem;flex-shrink:0;margin-top:0.1rem">REPLAY</span>
    <span>Maintains past-region knowledge in the local training objective.</span>
  </div>
  <div style="display:flex;gap:0.5rem;align-items:flex-start">
    <span style="background:var(--deck-orange-soft);color:var(--deck-orange);border-radius:3px;padding:0.1rem 0.45rem;font-weight:700;font-size:0.72rem;flex-shrink:0;margin-top:0.1rem">AVERAGING</span>
    <span>Gradually integrates the new regional consensus without abrupt overwriting.</span>
  </div>
</div>

<div style="padding:0.55rem 0.8rem;background:var(--deck-teal-soft);border-left:3px solid var(--deck-teal);border-radius:4px;font-size:0.83rem">
  <strong>Takeaway:</strong> replay + dwell-time-aware averaging effectively mitigates forgetting while still benefiting from regional federation.
</div>

::right::

<div style="margin-top:0.3rem;padding-left:1.5rem">
  <img src="./images/paper/moving-node-C2FL_merge.png" alt="C²FL: per-area accuracy for a mobile device" style="width:100%;border:1px solid var(--deck-line);border-radius:6px;box-shadow:0 2px 8px rgba(16,32,43,0.08)" />

</div>

<!--
Use the same reading order as the previous slide for immediate contrast. Areas that were forgotten in FBFL are now maintained. This answers RQ2 qualitatively.
-->

---
layout: two-cols
---

<h1 style="margin:0 0 0.15rem;font-size:1.45rem;line-height:1.2">C²FL outperforms all baselines</h1>
<div style="margin:0 0 0.6rem;font-size:0.82rem;color:var(--deck-ink)"><strong style="color:var(--deck-teal)">Cumulative accuracy</strong> — avg per-area accuracy over all regions and all mobile devices.</div>

<div style="display:flex;flex-direction:column;gap:0.32rem;font-size:0.8rem;margin-bottom:0.65rem">
  <div style="display:flex;gap:0.5rem;align-items:center">
    <span style="background:#eee;color:#555;border-radius:3px;padding:0.08rem 0.4rem;font-weight:700;font-size:0.72rem;flex-shrink:0;min-width:3.8rem;text-align:center">Local / FL</span>
    <span>Low retention — no mechanism preserves past-region knowledge.</span>
  </div>
  <div style="display:flex;gap:0.5rem;align-items:center">
    <span style="background:var(--deck-teal-soft);color:var(--deck-teal);border-radius:3px;padding:0.08rem 0.4rem;font-weight:700;font-size:0.72rem;flex-shrink:0;min-width:3.8rem;text-align:center">CL</span>
    <span>Better (replay helps!) but no federation benefit in the first 30 rounds.</span>
  </div>
  <div style="display:flex;gap:0.5rem;align-items:center">
    <span style="background:var(--deck-orange);color:#fff;border-radius:3px;padding:0.08rem 0.4rem;font-weight:700;font-size:0.72rem;flex-shrink:0;min-width:3.8rem;text-align:center">C²FL</span>
    <span><strong>Best overall</strong> — replay + regional consensus complement each other.</span>
  </div>
</div>

<div style="padding:0.5rem 0.75rem;background:var(--deck-orange-soft);border-left:3px solid var(--deck-orange);border-radius:4px;font-size:0.78rem">
  CL slightly underperforms FL before round 30 — pure replay without federation gives a weaker start, yet recovers sharply once mobility begins.
</div>

::right::

<div style="margin-top:0.5rem;padding-left:1.5rem">
  <img src="./images/paper/comparison.png" alt="Cumulative accuracy comparison" style="width:100%;border:1px solid var(--deck-line);border-radius:6px;box-shadow:0 2px 8px rgba(16,32,43,0.08)" />

</div>

<!--
The quantitative answer to RQ2. C²FL strictly dominates at every round after the first transition. The CL baseline confirms that federation alone is insufficient — you need both.
-->

---

# Takeaways

<div class="grid grid-cols-3 gap-6 mt-6" style="font-size:0.85rem">
  <div style="padding:0.9rem;border:1.5px solid var(--deck-teal);border-radius:8px;background:#fff">
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">Spatial → temporal</h3>
    <p style="margin:0;color:var(--deck-muted)">Mobility turns a distributed spatial learning problem into a per-device continual learning stream — and standard CFL ignores this.</p>
  </div>
  <div style="padding:0.9rem;border:1.5px solid var(--deck-orange);border-radius:8px;background:#fff">
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">C²FL: unified design</h3>
    <p style="margin:0;color:var(--deck-muted)">Self-organizing clusters + decentralized FL + experience replay + adaptive averaging, all in one protocol round.</p>
  </div>
  <div style="padding:0.9rem;border:1.5px solid var(--deck-green);border-radius:8px;background:#fff">
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">Better retention</h3>
    <p style="margin:0;color:var(--deck-muted)">C²FL outperforms all baselines in cumulative accuracy, retaining past-region knowledge while adapting to new environments.</p>
  </div>
</div>

<div class="mt-6" style="padding:1rem 1.2rem;background:#fff;border:2px solid var(--deck-ink);border-radius:8px">
  <div style="font-size:0.95rem;font-weight:700;color:var(--deck-ink);margin-bottom:0.5rem">Future work</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem 1.5rem;font-size:0.82rem;color:var(--deck-ink)">
    <div>→ More complex sensing datasets</div>
    <div>→ Gradual (non-abrupt) spatial distribution shifts</div>
  </div>
</div>

<!--
Bring it back to the central insight. Three bullets map to the three contributions. Future work is concise — then invite questions.
-->

---

# Thank you

<div style="margin-top:1.2rem;display:flex;flex-direction:column;align-items:center;gap:0.8rem;font-size:0.88rem;text-align:center">
  <div>
    <strong>Davide Domini</strong> — davide.domini@unibo.it<br>
    University of Bologna, Cesena
  </div>
  <div style="padding:0.6rem 1.2rem;background:var(--deck-teal-soft);border-radius:6px;display:flex;flex-direction:column;align-items:center">
    <strong>Reproducibility</strong><br>
    Code, data, and scripts available at<br>
    <img src="/figures/qr.svg" alt="QR code — repository" style="width:130px;height:130px;display:block;margin-top:0.5rem" />
  </div>
  <div style="padding:0.5rem 1.2rem;background:var(--deck-orange-soft);border-left:3px solid var(--deck-orange);border-radius:4px;font-size:0.82rem;text-align:left">
    <strong>Acknowledgments</strong><br>
    Lukas Esterle: Independent Research Fund Denmark, FLOCKD project (1032-00179B).<br>
    Lorenzo Pellegrini: European funds, Emilia-Romagna Region, FSE+ 2021–2027.
  </div>
</div>

<!--
Close slide. Invite questions. Repository link is real.
-->

---

# References

<References />
