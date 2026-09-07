<script setup lang="ts">
import MathTex from './MathTex.vue'
</script>

<template>
  <div class="compat-rule-root" role="img" aria-label="From novelty to compatibility: pairwise cross-novelty and adaptive compatibility threshold">
    
    <!-- Top Row: Two Primary Formal Equations -->
    <div class="equations-grid">
      <!-- Card 1: Cross-Novelty -->
      <div class="rule-card card-teal">
        <div class="card-header">
          <span class="badge-num num-teal">1</span>
          <div>
            <strong>PAIRWISE CROSS-NOVELTY</strong>
            <small>Cross-evaluated predictor residual</small>
          </div>
        </div>

        <div class="equation-box eq-teal">
          <MathTex math="s_{ij} = \mathbb{E}_{x \sim \mathcal{B}_i} \left[ \|\hat{f}_j(x; \theta_j^*) - f(x)\|_2^2 \right]" :display="true" />
        </div>

        <p class="card-caption">
          Device <MathTex math="d_i" /> feeds its local data <MathTex math="\mathcal{B}_i" /> through peer <MathTex math="d_j" />'s predictor.
          <strong>Low residual</strong> indicates shared feature distributions.
        </p>
      </div>

      <!-- Card 2: Adaptive Threshold -->
      <div class="rule-card card-orange">
        <div class="card-header">
          <span class="badge-num num-orange">2</span>
          <div>
            <strong>ADAPTIVE COMPATIBILITY CRITERION</strong>
            <small>Threshold relative to self-novelty</small>
          </div>
        </div>

        <div class="equation-box eq-orange">
          <MathTex math="d_j \sim d_i \iff s_{ij} \le s_{ii} + \epsilon \cdot \sigma_i" :display="true" />
        </div>

        <div class="terms-row">
          <div class="term-pill">
            <span class="term-math"><MathTex math="s_{ii}" /></span>
            <span class="term-desc">Self-novelty baseline (reconstruction floor)</span>
          </div>
          <div class="term-pill">
            <span class="term-math"><MathTex math="\sigma_i" /></span>
            <span class="term-desc">Local peer variance across scores</span>
          </div>
          <div class="term-pill">
            <span class="term-math"><MathTex math="\epsilon" /></span>
            <span class="term-desc">Tolerance margin hyperparameter</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Decision Spectrum -->
    <div class="decision-banner">
      <div class="decision-side side-compat">
        <div class="side-badge badge-green">
          <span>COMPATIBLE</span>
        </div>
        <p>Peer's predictor generalizes well to local data <MathTex math="\mathcal{B}_i" /> &rarr; <strong>collaborate in same federation</strong></p>
      </div>

      <div class="decision-arrow">
        <svg viewBox="0 0 36 24" class="arrow-icon">
          <path d="M 2 12 H 26" fill="none" stroke="var(--deck-muted)" stroke-width="2.5" stroke-linecap="round" />
          <path d="M 23 6 L 33 12 L 23 18 Z" fill="var(--deck-muted)" />
        </svg>
      </div>

      <div class="decision-side side-diverge">
        <div class="side-badge badge-amber">
          <span>DIVERGENT</span>
        </div>
        <p>Residual divergence indicates feature shift &rarr; <strong>separate into distinct federations</strong></p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.compat-rule-root {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.35rem 0;
}

.equations-grid {
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 0.85rem;
}

.rule-card {
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  border-radius: 7px;
  padding: 0.65rem 0.85rem;
  box-shadow: 0 3px 12px rgba(16, 32, 43, 0.05);
}

.card-teal { border-top: 4px solid var(--deck-teal); }
.card-orange { border-top: 4px solid var(--deck-orange); }

.card-header {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.45rem;
}

.badge-num {
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  font-size: 0.78rem;
  flex-shrink: 0;
}

.num-teal { background: var(--deck-teal); }
.num-orange { background: var(--deck-orange); }

.card-header strong {
  display: block;
  font-size: 0.74rem;
  color: var(--deck-ink);
  letter-spacing: 0.04em;
}

.card-header small {
  display: block;
  font-size: 0.6rem;
  color: var(--deck-muted);
}

.equation-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.6rem;
  border-radius: 5px;
  margin-bottom: 0.45rem;
}

.eq-teal {
  background: color-mix(in oklch, var(--deck-teal) 5%, #f9fbfb);
  border: 1px solid rgba(15, 76, 92, 0.2);
  color: var(--deck-teal);
}

.eq-orange {
  background: color-mix(in oklch, var(--deck-orange) 5%, #fffdfa);
  border: 1px solid rgba(217, 119, 6, 0.25);
  color: #9a5302;
}

.card-caption {
  margin: 0;
  font-size: 0.68rem !important;
  color: var(--deck-muted);
  line-height: 1.35;
}

.card-caption strong {
  color: var(--deck-teal);
}

.terms-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  margin-top: auto;
}

.term-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.25rem 0.25rem;
  background: #f6f8f9;
  border: 1px solid var(--deck-line);
  border-radius: 4px;
  gap: 0.1rem;
}

.term-math {
  font-weight: 700;
  font-size: 0.78rem;
  color: var(--deck-ink);
}

.term-desc {
  font-size: 0.6rem !important;
  color: var(--deck-muted);
  line-height: 1.15;
}

/* ─── Bottom Decision Banner ─── */
.decision-banner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.85rem;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(16, 32, 43, 0.04);
}

.decision-side {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.side-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  width: fit-content;
}

.badge-green {
  background: rgba(47, 107, 91, 0.12);
  border: 1.5px solid var(--deck-green);
  color: var(--deck-green);
}

.badge-amber {
  background: rgba(217, 119, 6, 0.12);
  border: 1.5px solid var(--deck-orange);
  color: #9a5302;
}

.decision-side p {
  margin: 0;
  font-size: 0.72rem !important;
  color: var(--deck-ink);
  line-height: 1.25;
}

.decision-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  width: 2.2rem;
  height: 1.4rem;
}

</style>
