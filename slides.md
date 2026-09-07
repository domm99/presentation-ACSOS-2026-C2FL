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

**Collective Adaptive Systems** rely on machine learning directly on the devices — each node learning from what it locally senses.

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
  <p style="font-size:0.7rem;color:var(--deck-muted);text-align:center;margin:0">
    Colour = local data distribution &nbsp;·&nbsp;
    <strong>IID within</strong> each cluster, <strong>non-IID across</strong> clusters
  </p>
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

A moving device experiences a **sequence** of different regional distributions:

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

# C²FL brings three mechanisms together

<div class="grid grid-cols-3 gap-6 mt-8">
  <div style="border:1.5px solid var(--deck-teal);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
      <span style="background:var(--deck-teal);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">1</span>
      <h3 style="margin:0;font-size:0.95rem">Self-organizing clustering</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Devices autonomously form learning groups through leader election — no central coordinator, adapts to mobility.</p>
  </div>
  <div style="border:1.5px solid var(--deck-orange);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
      <span style="background:var(--deck-orange);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">2</span>
      <h3 style="margin:0;font-size:0.95rem">Regional federated learning</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Cluster-level consensus via collect-cast aggregation and gradient-cast dissemination — entirely decentralized.</p>
  </div>
  <div style="border:1.5px solid var(--deck-green);border-radius:8px;padding:1.1rem;background:#fff">
    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
      <span style="background:var(--deck-green);color:#fff;border-radius:50%;width:1.6rem;height:1.6rem;display:grid;place-items:center;font-weight:700;font-size:0.85rem;flex-shrink:0">3</span>
      <h3 style="margin:0;font-size:0.95rem">Continual adaptation</h3>
    </div>
    <p style="margin:0;font-size:0.8rem;color:var(--deck-muted)">Experience replay preserves past knowledge; dwell-time-aware averaging blends the regional consensus gradually.</p>
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

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-teal);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">1</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Self-organizing clustering</h1></div>

Devices form spatial clusters via a **leader election** based on the S-building block (Sparse-choice) from aggregate computing.

Each device maintains:
- **η** — the elected cluster leader ID
- **g** — distance to that leader

At each round, a node:
1. collects leadership claims from neighbors
2. keeps only those within radius **R**
3. elects the highest-priority candidate

::right::

<div style="font-size:0.82rem;display:flex;flex-direction:column;gap:0.7rem;margin-top:0.5rem">
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Voronoi-like partition</strong><br>
    Each node joins the cluster of its nearest leader — naturally aligning groups with the geographic data structure.
  </div>
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Self-stabilizing</strong><br>
    When a node moves beyond its leader's radius, claims expire, re-election fires automatically.
  </div>
  <div style="padding:0.6rem 0.8rem;border-left:3px solid var(--deck-green);background:#fff;border-radius:4px">
    <strong>No central coordinator</strong><br>
    Cluster membership, leader identity, and boundaries emerge from local interactions only.
  </div>
  <div style="margin-top:0.3rem;padding:0.5rem 0.7rem;background:var(--deck-teal-soft);border-radius:4px;font-size:0.77rem">
    Built on <strong>FBFL</strong> (Field-Based Federated Learning) — previously validated for static CAS. C²FL extends it to mobile settings.
  </div>
</div>

<!--
Explain the S-building block at the system level. The key properties are: local interactions only, convergence under static topology, and self-stabilization under mobility.
-->

---
layout: two-cols
---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-orange);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">2</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Regional federated learning</h1></div>

Within each cluster, C²FL builds a **regional consensus** via two aggregate-computing patterns:

<div style="margin-top:0.7rem;display:flex;flex-direction:column;gap:0.55rem;font-size:0.85rem">
  <div style="padding:0.55rem 0.75rem;border-left:3px solid var(--deck-teal);background:#fff;border-radius:4px">
    <strong>Collect-cast (C-block)</strong><br>
    Locally trained models flow toward the cluster leader following the distance field — a decentralized weighted average.
  </div>
  <div style="padding:0.55rem 0.75rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Gradient-cast (G-block)</strong><br>
    The regional consensus θₖ propagates back from the leader to every cluster member.
  </div>
</div>

The resulting aggregation is:
$$\theta_k^{(t+1)} = \frac{1}{N_k^{(t)}} \sum_{d \in \mathcal{R}_k^{(t)}} n_d^{(t)}\,\widetilde{\theta}_d^{(t+1)}$$

::right::

<div style="font-size:0.82rem">
  <div style="border:1.5px solid var(--deck-line);border-radius:6px;overflow:hidden;margin-bottom:0.7rem">
    <div style="background:var(--deck-teal);color:#fff;padding:0.4rem 0.7rem;font-size:0.75rem;font-weight:700;letter-spacing:0.05em">ROUND STRUCTURE</div>
    <div style="display:flex;flex-direction:column;gap:0">
      <div v-for="(ph, i) in [
        {n:'1', t:'Clustering update', c:'var(--deck-teal)'},
        {n:'2', t:'Continual local training', c:'var(--deck-green)'},
        {n:'3', t:'Collect-cast (aggregate)', c:'var(--deck-teal)'},
        {n:'4', t:'Gradient-cast (disseminate)', c:'var(--deck-teal)'},
        {n:'5', t:'Adaptive averaging', c:'var(--deck-orange)'},
      ]" :key="i"
        style="display:flex;align-items:center;gap:0.5rem;padding:0.38rem 0.65rem;border-top:1px solid var(--deck-line)">
        <span :style="{background: ph.c, color:'#fff', borderRadius:'50%', width:'1.3rem', height:'1.3rem', display:'grid', placeItems:'center', fontWeight:'700', fontSize:'0.68rem', flexShrink:0}">{{ ph.n }}</span>
        <span style="font-size:0.78rem">{{ ph.t }}</span>
      </div>
    </div>
  </div>
  <div style="padding:0.5rem 0.7rem;background:var(--deck-orange-soft);border-left:3px solid var(--deck-orange);border-radius:4px;font-size:0.77rem">
    Multi-hop propagation introduces latency — devices perform a <strong>knowledge merging</strong> step to reconcile asynchronously received consensus with their current state.
  </div>
</div>

<!--
Describe the two aggregate-computing communication patterns. The round table on the right shows all 5 phases of Algorithm 1 at a glance.
-->

---
layout: two-cols
---

<div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.15rem"><span style="background:var(--deck-green);color:#fff;border-radius:50%;width:1.8rem;height:1.8rem;display:grid;place-items:center;font-weight:800;font-size:1rem;flex-shrink:0">3</span><h1 style="margin:0;font-size:1.6rem;line-height:1.15">Continual adaptation</h1></div>

Two complementary mechanisms counteract forgetting.

### Experience replay

When a device **leaves a region**, its local dataset from that region is added to the replay memory **Mᵈ**.

Future local training optimizes on current data **plus** replayed past samples:

$$\widetilde{\theta}_d^{(t+1)} \approx \text{Update}\!\left(\theta_d^{(t)},\; \widehat{\mathcal{L}}_d^{(t)}(\theta)\right)$$

where $\widehat{\mathcal{L}}$ mixes current and replayed losses.

Replay data **stays local** — nothing extra is shared with other nodes.

::right::

### Dwell-time-aware averaging

After receiving the regional consensus, the device blends it with its local model using an **adaptive mixing factor**:

$$\alpha_d^{(t)} = \min\!\left\{\Gamma,\; \frac{s_d^{(t)}}{H}\right\}$$

$$\theta_d^{(t+1)} = (1-\alpha_d^{(t)})\,\widetilde{\theta}_d^{(t+1)} + \alpha_d^{(t)}\,\theta_k^{(t+1)}$$

<div style="margin-top:0.5rem;padding:0.5rem 0.7rem;background:var(--deck-teal-soft);border-left:3px solid var(--deck-teal);border-radius:4px;font-size:0.8rem">
  <strong>Intuition:</strong> α starts near zero immediately after a region change and grows linearly with dwell time <em>s</em>, capping at Γ. The collective consensus is trusted more as the device settles in.
</div>

<div style="margin-top:0.5rem;padding:0.5rem 0.7rem;background:var(--deck-orange-soft);border-left:3px solid var(--deck-orange);border-radius:4px;font-size:0.8rem">
  Parameters: Γ = 0.3, H = 30 — α reaches its cap after ~9 rounds in the same region.
</div>

<!--
Replay = memory from the past; adaptive averaging = careful integration of new regional knowledge. Stress that replay is privacy-preserving (no additional sharing).
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
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-orange);background:#fff;border-radius:4px">
    <strong>Local data</strong><br>≈200 samples per device per round; batch size 32
  </div>
  <div style="padding:0.5rem 0.75rem;border-left:3px solid var(--deck-green);background:#fff;border-radius:4px">
    <strong>Model</strong><br>MLP — 2 hidden layers × 128 neurons, ReLU; Adam lr=0.001
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
  <p style="font-size:0.7rem;color:var(--deck-muted);margin-top:0.4rem;text-align:center">
    Per-area accuracy of a mobile device under FBFL.<br>
    Vertical dashed lines mark mobility transitions (rounds 30, 60, 90).
  </p>
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
  <p style="font-size:0.7rem;color:var(--deck-muted);margin-top:0.4rem;text-align:center">
    Per-area accuracy of the same mobile device under C²FL.<br>
    Vertical dashed lines mark mobility transitions (rounds 30, 60, 90).
  </p>
</div>

<!--
Use the same reading order as the previous slide for immediate contrast. Areas that were forgotten in FBFL are now maintained. This answers RQ2 qualitatively.
-->

---
layout: two-cols
---

<h1 style="margin:0 0 0.15rem;font-size:1.45rem;line-height:1.2">C²FL outperforms all baselines</h1>
<p style="margin:0 0 0.6rem;font-size:0.82rem;color:var(--deck-muted)"><strong>Cumulative accuracy</strong> — avg per-area accuracy over all regions and all mobile devices.</p>

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
  <p style="font-size:0.7rem;color:var(--deck-muted);margin-top:0.4rem;text-align:center">
    Cumulative accuracy (CAcc) across 120 rounds for all four methods.<br>
    Shaded bands = 95% CI over 10 random seeds.
  </p>
</div>

<!--
The quantitative answer to RQ2. C²FL strictly dominates at every round after the first transition. The CL baseline confirms that federation alone is insufficient — you need both.
-->

---

# Summary

<div class="grid grid-cols-3 gap-6 mt-8" style="font-size:0.85rem">
  <div style="padding:0.9rem;border:1.5px solid var(--deck-teal);border-radius:8px;background:#fff">
    <div style="font-size:1.8rem;text-align:center;margin-bottom:0.5rem">🗺️</div>
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">Spatial → temporal</h3>
    <p style="margin:0;color:var(--deck-muted)">Mobility turns a distributed spatial learning problem into a per-device continual learning stream — and standard CFL ignores this.</p>
  </div>
  <div style="padding:0.9rem;border:1.5px solid var(--deck-orange);border-radius:8px;background:#fff">
    <div style="font-size:1.8rem;text-align:center;margin-bottom:0.5rem">🔄</div>
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">C²FL: unified design</h3>
    <p style="margin:0;color:var(--deck-muted)">Self-organizing clusters + decentralized FL + experience replay + adaptive averaging, all in one protocol round.</p>
  </div>
  <div style="padding:0.9rem;border:1.5px solid var(--deck-green);border-radius:8px;background:#fff">
    <div style="font-size:1.8rem;text-align:center;margin-bottom:0.5rem">📈</div>
    <h3 style="font-size:0.9rem;margin:0 0 0.4rem">Better retention</h3>
    <p style="margin:0;color:var(--deck-muted)">C²FL outperforms all baselines in cumulative accuracy, retaining past-region knowledge while adapting to new environments.</p>
  </div>
</div>

<div class="mt-8" style="padding:0.9rem 1.2rem;background:var(--deck-teal-soft);border-radius:8px">
  <strong>Future directions:</strong>
  more complex sensing datasets ·
  regularization-based and hybrid CL strategies ·
  gradual (non-abrupt) spatial distribution shifts ·
  bounded replay memory policies
</div>

<!--
Bring it back to the central insight. Three bullets map to the three contributions. Future work is concise — then invite questions.
-->

---
layout: two-cols
---

# Thank you

<div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:0.8rem;font-size:0.88rem">
  <div>
    <strong>Davide Domini</strong> — davide.domini@unibo.it<br>
    University of Bologna, Cesena
  </div>
  <div style="padding:0.6rem 0.8rem;background:var(--deck-teal-soft);border-radius:6px">
    📦 <strong>Reproducibility</strong><br>
    Code, data, and scripts available at<br>
    <code style="font-size:0.8rem">github.com/domm99/experiments-2026-ACSOS-CL-for-nodes-movement-in-CAS</code>
  </div>
</div>

::right::

<div style="margin-top:1rem;font-size:0.82rem;display:flex;flex-direction:column;gap:0.6rem">
  <strong style="font-size:0.9rem">Selected references</strong>
  <div style="color:var(--deck-muted)">Domini et al., <em>FBFL: Field-Based Federated Learning</em>, LMCS 2026</div>
  <div style="color:var(--deck-muted)">Domini et al., <em>ProFed benchmark</em>, JORS 2026</div>
  <div style="color:var(--deck-muted)">Parisi et al., <em>Continual lifelong learning with neural networks</em>, Neural Networks 2019</div>
  <div style="color:var(--deck-muted)">McMahan et al., <em>Communication-efficient learning of deep networks</em>, AISTATS 2017</div>
  <div style="color:var(--deck-muted)">Ghosh et al., <em>An efficient framework for clustered federated learning</em>, IEEE Trans. Inf. Theory 2022</div>
  <div style="margin-top:0.5rem;padding:0.5rem 0.7rem;background:var(--deck-orange-soft);border-left:3px solid var(--deck-orange);border-radius:4px">
    <strong>Acknowledgments</strong><br>
    Lukas Esterle: Independent Research Fund Denmark, FLOCKD project (1032-00179B).<br>
    Lorenzo Pellegrini: European funds, Emilia-Romagna Region, FSE+ 2021–2027.
  </div>
</div>

<!--
Close slide. Invite questions. Repository link is real.
-->
