<script setup lang="ts">
import { computed } from 'vue'
import MathTex from './MathTex.vue'

const props = defineProps<{ click?: number }>()
const currentStep = computed(() => Math.min(Math.max(props.click ?? 0, 0), 2))

// 0: how the predictor is trained, 1: familiar input, 2: shifted input
function stepClass(index: number) {
  return {
    'is-active': currentStep.value === index,
    'is-past': currentStep.value > index,
    'is-future': currentStep.value < index,
  }
}
</script>

<template>
  <div
    class="rnd-mechanism"
    role="img"
    aria-label="RND mechanism: training a local predictor to mimic a frozen target, then using prediction error to detect novelty"
  >
    <!-- ─── PHASE 1: LOCAL TRAINING ─── -->
    <section class="rnd-card training-card" :class="stepClass(0)">
      <div class="card-header header-teal">
        <span class="step-badge">1</span>
        <div class="header-text">
          <span class="header-title">LOCAL TRAINING PHASE</span>
          <span class="header-desc">Device <MathTex math="d_i" /> trains on local data <MathTex math="\mathcal{B}_i" /></span>
        </div>
      </div>

      <div class="training-layout">
        <!-- Input Datum -->
        <div class="node-box input-box">
          <span class="box-tag">LOCAL SAMPLE</span>
          <div class="math-main">
            <MathTex math="x \sim \mathcal{B}_i" />
          </div>
          <span class="box-sub">local data</span>
        </div>

        <!-- Fork SVG Arrow -->
        <div class="arrow-cell">
          <svg class="flow-svg" viewBox="0 0 60 90" preserveAspectRatio="none">
            <path d="M 5 45 C 25 45, 30 22, 48 22" fill="none" stroke="var(--deck-teal)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 45 17 L 55 22 L 45 27 Z" fill="var(--deck-teal)" />
            <path d="M 5 45 C 25 45, 30 68, 48 68" fill="none" stroke="var(--deck-teal)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 45 63 L 55 68 L 45 73 Z" fill="var(--deck-teal)" />
          </svg>
        </div>

        <!-- Networks Stack -->
        <div class="networks-col">
          <!-- Target Network (Frozen) -->
          <div class="net-row target-net">
            <div class="net-symbol target-sym">
              <MathTex math="f" />
            </div>
            <div class="net-info">
              <strong>Random Target <MathTex math="f(x)" /></strong>
              <span class="badge-status status-frozen">FROZEN (Fixed)</span>
            </div>
          </div>

          <!-- Predictor Network (Trainable) -->
          <div class="net-row predictor-net">
            <div class="net-symbol predictor-sym">
              <MathTex math="\hat{f}_i" />
            </div>
            <div class="net-info">
              <strong>Predictor <MathTex math="\hat{f}_i(x; \theta_i)" /></strong>
              <span class="badge-status status-train">TRAINABLE (<MathTex math="\theta_i" />)</span>
            </div>
          </div>
        </div>

        <!-- Convergence SVG Arrow -->
        <div class="arrow-cell">
          <svg class="flow-svg" viewBox="0 0 60 90" preserveAspectRatio="none">
            <path d="M 5 22 C 25 22, 30 45, 48 45" fill="none" stroke="var(--deck-teal)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 5 68 C 25 68, 30 45, 48 45" fill="none" stroke="var(--deck-orange)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 45 40 L 55 45 L 45 50 Z" fill="var(--deck-orange)" />
          </svg>
        </div>

        <!-- Loss & Gradient Box -->
        <div class="node-box loss-box">
          <span class="box-tag">PREDICTION ERROR</span>
          <div class="loss-equation">
            <MathTex math="\left\|\hat{f}_i(x; \theta_i) - f(x)\right\|_{\!2}^{\,2}" />
          </div>
          <div class="gradient-feedback">
            <svg class="backprop-svg" viewBox="0 0 160 36">
              <path d="M 22 28 C 5 28, 5 8, 35 8 L 145 8" fill="none" stroke="var(--deck-orange)" stroke-width="2" stroke-dasharray="3 3" stroke-linecap="round" />
              <path d="M 22 23 L 12 28 L 22 33 Z" fill="var(--deck-orange)" />
            </svg>
            <span class="feedback-label">
              <MathTex math="\nabla_{\theta_i} \mathcal{L}" /> updates <MathTex math="\hat{f}_i" /> only
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PHASE 2: INFERENCE / NOVELTY EVALUATION ─── -->
    <section class="rnd-card inference-card" :class="{ 'is-future': currentStep < 1 }">
      <div class="card-header header-green">
        <span class="step-badge">2</span>
        <div class="header-text">
          <span class="header-title">INFERENCE: NOVELTY AS AN ERROR SIGNAL</span>
          <span class="header-desc">Residual magnitude reveals distributional compatibility</span>
        </div>
      </div>

      <div class="test-rows">
        <!-- In-Distribution Case -->
        <div class="test-row familiar-case" :class="stepClass(1)">
          <div class="test-input">
            <span class="case-label">In-Distribution Input</span>
            <div class="case-math"><MathTex math="x \sim \mathcal{B}_i" /></div>
          </div>
          <div class="arrow-inline">
            <svg viewBox="0 0 40 20" class="arrow-svg-inline">
              <path d="M 2 10 H 30" fill="none" stroke="var(--deck-green)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 27 5 L 37 10 L 27 15 Z" fill="var(--deck-green)" />
            </svg>
          </div>
          <div class="test-behavior">
            <div class="behavior-math"><MathTex math="\hat{f}_i(x) \approx f(x) \implies \|\hat{f}_i(x) - f(x)\|_2^2 \approx 0" /></div>
          </div>
          <div class="arrow-inline">
            <svg viewBox="0 0 40 20" class="arrow-svg-inline">
              <path d="M 2 10 H 30" fill="none" stroke="var(--deck-green)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 27 5 L 37 10 L 27 15 Z" fill="var(--deck-green)" />
            </svg>
          </div>
          <div class="verdict-box verdict-familiar">
            <span class="verdict-tag">LOW NOVELTY</span>
            <strong>Familiar data</strong>
          </div>
        </div>

        <!-- Out-of-Distribution Case -->
        <div class="test-row novel-case" :class="stepClass(2)">
          <div class="test-input">
            <span class="case-label">Unfamiliar / Shifted Input</span>
            <div class="case-math"><MathTex math="x' \notin \mathcal{B}_i" /></div>
          </div>
          <div class="arrow-inline">
            <svg viewBox="0 0 40 20" class="arrow-svg-inline">
              <path d="M 2 10 H 30" fill="none" stroke="var(--deck-orange)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 27 5 L 37 10 L 27 15 Z" fill="var(--deck-orange)" />
            </svg>
          </div>
          <div class="test-behavior">
            <div class="behavior-math"><MathTex math="\hat{f}_i(x') \neq f(x') \implies \|\hat{f}_i(x') - f(x')\|_2^2 \gg 0" /></div>
          </div>
          <div class="arrow-inline">
            <svg viewBox="0 0 40 20" class="arrow-svg-inline">
              <path d="M 2 10 H 30" fill="none" stroke="var(--deck-orange)" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 27 5 L 37 10 L 27 15 Z" fill="var(--deck-orange)" />
            </svg>
          </div>
          <div class="verdict-box verdict-novel">
            <span class="verdict-tag">HIGH NOVELTY</span>
            <strong>Distribution Shift</strong>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rnd-mechanism {
  display: grid;
  gap: 0.42rem;
  margin: 0.2rem 0;
}

.rnd-card {
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(16, 32, 43, 0.04);
  border-radius: 6px;
  overflow: hidden;
}

.rnd-card,
.test-row {
  transition: opacity 300ms ease, transform 300ms ease, border-color 300ms ease,
    box-shadow 300ms ease;
}

.rnd-card.is-future,
.test-row.is-future {
  opacity: 0.32;
  filter: grayscale(40%);
}

.rnd-card.is-past,
.test-row.is-past {
  opacity: 0.85;
}

.rnd-card.is-active,
.test-row.is-active {
  opacity: 1;
  transform: translateY(-2px);
  border-color: rgba(15, 76, 92, 0.4);
  box-shadow: 0 6px 20px rgba(15, 76, 92, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.32rem 0.75rem;
  border-bottom: 1px solid var(--deck-line);
}

.header-teal {
  background: color-mix(in oklch, var(--deck-teal) 7%, white);
}

.header-green {
  background: color-mix(in oklch, var(--deck-green) 7%, white);
}

.step-badge {
  display: grid;
  place-items: center;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  font-size: 0.76rem;
  flex-shrink: 0;
}

.header-teal .step-badge {
  background: var(--deck-teal);
}

.header-green .step-badge {
  background: var(--deck-green);
}

.header-text {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--deck-ink);
}

.header-desc {
  font-size: 0.62rem;
  color: var(--deck-muted);
}

/* ─── Training Layout ─── */
.training-layout {
  display: grid;
  grid-template-columns: 7.2rem 2.2rem 13.5rem 2.2rem 1fr;
  align-items: center;
  padding: 0.38rem 0.75rem;
  gap: 0.3rem;
}

.node-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  border-radius: 5px;
  padding: 0.35rem 0.5rem;
  text-align: center;
}

.box-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--deck-muted);
  margin-bottom: 0.15rem;
  text-transform: uppercase;
}

.math-main {
  font-size: 0.92rem;
  color: var(--deck-teal);
  font-weight: 600;
  margin: 0.05rem 0;
}

.box-sub {
  font-size: 0.6rem;
  color: var(--deck-muted);
}

.arrow-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.flow-svg {
  width: 100%;
  height: 3.8rem;
  overflow: visible;
}

.networks-col {
  display: grid;
  gap: 0.32rem;
}

.net-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.22rem 0.45rem;
  border: 1.5px solid var(--deck-line);
  background: #fdfdfd;
  border-radius: 5px;
}

.net-symbol {
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  font-size: 0.88rem;
  flex-shrink: 0;
}

.target-sym {
  background: var(--deck-muted);
}

.predictor-sym {
  background: var(--deck-teal);
}

.net-info {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
}

.net-info strong {
  font-size: 0.7rem;
  color: var(--deck-ink);
}

.badge-status {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.06rem 0.3rem;
  border-radius: 3px;
  width: fit-content;
}

.status-frozen {
  background: rgba(82, 97, 109, 0.12);
  color: var(--deck-muted);
}

.status-train {
  background: rgba(217, 119, 6, 0.14);
  color: #9a5302;
}

.loss-box {
  border-left: 3.5px solid var(--deck-orange);
  padding: 0.35rem 0.65rem;
  align-items: center;
}

.loss-equation {
  font-size: 0.86rem;
  color: var(--deck-ink);
  font-weight: 600;
  margin: 0.15rem 0;
  white-space: nowrap;
}

.gradient-feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0.15rem;
}

.backprop-svg {
  width: 100%;
  height: 1rem;
}

.feedback-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: #9a5302;
}

/* ─── Inference Layout ─── */
.test-rows {
  display: grid;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
}

.test-row {
  display: grid;
  grid-template-columns: 1fr auto 1.65fr auto 1.15fr;
  align-items: center;
  border: 1.5px solid var(--deck-line);
  background: #fdfefe;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  gap: 0.45rem;
  box-shadow: 0 1px 4px rgba(16, 32, 43, 0.03);
}

.test-row.familiar-case {
  border-color: rgba(47, 107, 91, 0.25);
}

.test-row.novel-case {
  border-color: rgba(217, 119, 6, 0.3);
}

.test-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(16, 32, 43, 0.03);
  border: 1px solid rgba(16, 32, 43, 0.07);
  border-radius: 4px;
  padding: 0.22rem 0.4rem;
}

.case-label {
  font-size: 0.6rem;
  color: var(--deck-muted);
  font-weight: 600;
  white-space: nowrap;
}

.case-math {
  font-size: 0.88rem;
  color: var(--deck-ink);
  font-weight: 700;
}

.arrow-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
}

.arrow-svg-inline {
  width: 1.8rem;
  height: 1.1rem;
  overflow: visible;
}

.test-behavior {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(16, 32, 43, 0.02);
  border: 1px solid rgba(16, 32, 43, 0.06);
  border-radius: 4px;
  padding: 0.22rem 0.6rem;
}

.behavior-math {
  font-size: 0.74rem;
  color: var(--deck-ink);
  font-weight: 600;
  white-space: nowrap;
}

.verdict-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.22rem 0.5rem;
  border-radius: 4px;
  width: 100%;
}

.verdict-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.verdict-box strong {
  font-size: 0.68rem;
  white-space: nowrap;
}

.verdict-familiar {
  background: rgba(47, 107, 91, 0.12);
  border: 1.5px solid var(--deck-green);
  color: var(--deck-green);
}

.verdict-novel {
  background: rgba(217, 119, 6, 0.12);
  border: 1.5px solid var(--deck-orange);
  color: #9a5302;
}
</style>
