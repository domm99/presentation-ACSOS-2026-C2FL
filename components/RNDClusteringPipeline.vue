<script setup lang="ts">
import { computed } from 'vue'
import MathTex from './MathTex.vue'

const props = defineProps<{ click?: number }>()
const currentStep = computed(() => Math.min(Math.max(props.click ?? 0, 0), 2))

function stageClass(index: number) {
  return {
    'is-active': currentStep.value === index,
    'is-past': currentStep.value > index,
    'is-future': currentStep.value < index,
  }
}
</script>

<template>
  <div class="rnd-pipeline-root" role="img" aria-label="End-to-end RND federation discovery pipeline">
    <div class="pipeline-grid">

      <!-- ════════ STAGE 1: LOCAL TRAINING ════════ -->
      <div class="pipeline-col" :class="stageClass(0)">
        <div class="stage-card">
          <div class="stage-header header-teal">
            <span class="stage-number">1</span>
            <div class="header-titles">
              <h3>LOCAL RND TRAINING</h3>
              <p>One predictor per device</p>
            </div>
          </div>

          <div class="stage-body">
            <div class="devices-sketch">
              <div class="sketch-device grp-a">
                <div class="dev-top">
                  <span class="dev-id">d₁</span>
                  <span class="data-pill"><MathTex math="\mathcal{B}_1" /></span>
                </div>
                <div class="dev-arrow-down">
                  <svg viewBox="0 0 16 18" class="mini-arrow-svg">
                    <path d="M 8 0 L 8 13 M 4 9 L 8 14 L 12 9" fill="none" stroke="var(--deck-teal)" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span class="predictor-pill pill-teal"><MathTex math="\hat{f}_1" /></span>
              </div>

              <div class="sketch-device grp-a">
                <div class="dev-top">
                  <span class="dev-id">d₂</span>
                  <span class="data-pill"><MathTex math="\mathcal{B}_2" /></span>
                </div>
                <div class="dev-arrow-down">
                  <svg viewBox="0 0 16 18" class="mini-arrow-svg">
                    <path d="M 8 0 L 8 13 M 4 9 L 8 14 L 12 9" fill="none" stroke="var(--deck-teal)" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span class="predictor-pill pill-teal"><MathTex math="\hat{f}_2" /></span>
              </div>

              <div class="sketch-device grp-b">
                <div class="dev-top">
                  <span class="dev-id">d₃</span>
                  <span class="data-pill"><MathTex math="\mathcal{B}_3" /></span>
                </div>
                <div class="dev-arrow-down">
                  <svg viewBox="0 0 16 18" class="mini-arrow-svg">
                    <path d="M 8 0 L 8 13 M 4 9 L 8 14 L 12 9" fill="none" stroke="var(--deck-orange)" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span class="predictor-pill pill-orange"><MathTex math="\hat{f}_3" /></span>
              </div>

              <div class="sketch-device grp-b">
                <div class="dev-top">
                  <span class="dev-id">d₄</span>
                  <span class="data-pill"><MathTex math="\mathcal{B}_4" /></span>
                </div>
                <div class="dev-arrow-down">
                  <svg viewBox="0 0 16 18" class="mini-arrow-svg">
                    <path d="M 8 0 L 8 13 M 4 9 L 8 14 L 12 9" fill="none" stroke="var(--deck-orange)" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span class="predictor-pill pill-orange"><MathTex math="\hat{f}_4" /></span>
              </div>
            </div>

            <div class="stage-features">
              <div class="feature-item">
                <span class="feature-dot teal-dot" />
                <span><strong>Model:</strong> not the task model (typically smaller and faster)</span>
              </div>
              <div class="feature-item">
                <span class="feature-dot teal-dot" />
                <span><strong>Input:</strong> the device's own samples <MathTex math="\mathcal{B}_i" /></span>
              </div>
              <div class="feature-item">
                <span class="feature-dot teal-dot" />
                <span><strong>Objective:</strong> regress the frozen random target</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── CONNECTOR 1 ─── -->
      <div class="pipeline-connector" :class="{ 'is-revealed': currentStep >= 1 }">
        <div class="connector-arrow-box">
          <span class="conn-text">BROADCAST</span>
          <svg viewBox="0 0 46 22" class="connector-svg">
            <path d="M 2 11 H 34" fill="none" stroke="var(--deck-teal)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 30 5 L 42 11 L 30 17 Z" fill="var(--deck-teal)" />
          </svg>
          <span class="conn-sub">exchange <MathTex math="\hat{f}_i" /></span>
        </div>
      </div>

      <!-- ════════ STAGE 2: CROSS EVALUATION & NOVELTY MATRIX ════════ -->
      <div class="pipeline-col" :class="stageClass(1)">
        <div class="stage-card">
          <div class="stage-header header-green">
            <span class="stage-number">2</span>
            <div class="header-titles">
              <h3>CROSS-EVALUATION</h3>
              <p>Build pairwise Novelty Matrix <MathTex math="S" /></p>
            </div>
          </div>

          <div class="stage-body">
            <!-- Schematic Matrix Heatmap -->
            <div class="matrix-schematic">
              <div class="matrix-frame">
                <div class="matrix-axis top-axis">
                  <span>d₁</span><span>d₂</span><span>d₃</span><span>d₄</span>
                </div>
                <div class="matrix-content-row">
                  <div class="matrix-axis left-axis">
                    <span>d₁</span><span>d₂</span><span>d₃</span><span>d₄</span>
                  </div>
                  <div class="matrix-tiles">
                    <!-- Row 1 -->
                    <div class="tile tile-diag">0.02</div>
                    <div class="tile tile-diag">0.04</div>
                    <div class="tile tile-off">0.71</div>
                    <div class="tile tile-off">0.68</div>
                    <!-- Row 2 -->
                    <div class="tile tile-diag">0.05</div>
                    <div class="tile tile-diag">0.01</div>
                    <div class="tile tile-off">0.73</div>
                    <div class="tile tile-off">0.69</div>
                    <!-- Row 3 -->
                    <div class="tile tile-off">0.69</div>
                    <div class="tile tile-off">0.72</div>
                    <div class="tile tile-diag">0.03</div>
                    <div class="tile tile-diag">0.05</div>
                    <!-- Row 4 -->
                    <div class="tile tile-off">0.67</div>
                    <div class="tile tile-off">0.70</div>
                    <div class="tile tile-diag">0.04</div>
                    <div class="tile tile-diag">0.02</div>
                  </div>
                </div>
              </div>

              <!-- Matrix Legend -->
              <div class="schematic-legend">
                <div class="legend-chip diag-chip">
                  <span class="color-swatch swatch-diag" />
                  <span><strong>Near-zero diagonal blocks:</strong> compatible distributions</span>
                </div>
                <div class="legend-chip off-chip">
                  <span class="color-swatch swatch-off" />
                  <span><strong>High off-diagonal:</strong> feature distribution shift</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── CONNECTOR 2 ─── -->
      <div class="pipeline-connector" :class="{ 'is-revealed': currentStep >= 2 }">
        <div class="connector-arrow-box">
          <span class="conn-text">THRESHOLD</span>
          <svg viewBox="0 0 46 22" class="connector-svg">
            <path d="M 2 11 H 34" fill="none" stroke="var(--deck-orange)" stroke-width="2.5" stroke-linecap="round" />
            <path d="M 30 5 L 42 11 L 30 17 Z" fill="var(--deck-orange)" />
          </svg>
          <span class="conn-sub"><MathTex math="s_{ii} + \epsilon \sigma_i" /></span>
        </div>
      </div>

      <!-- ════════ STAGE 3: EMERGENT FEDERATIONS ════════ -->
      <div class="pipeline-col" :class="stageClass(2)">
        <div class="stage-card">
          <div class="stage-header header-orange">
            <span class="stage-number">3</span>
            <div class="header-titles">
              <h3>EMERGENT FEDERATIONS</h3>
              <p>Specialized FL within discovered clusters</p>
            </div>
          </div>

          <div class="stage-body">
            <div class="federations-stack">
              <!-- Federation 1 (Teal) -->
              <div class="fed-card fed-card-teal">
                <div class="fed-card-header">
                  <div class="fed-title-group">
                    <span class="fed-badge badge-teal"><MathTex math="\mathcal{F}_1" /></span>
                    <strong class="fed-name">Federation 1</strong>
                  </div>
                  <div class="fed-clients-chips">
                    <span class="client-chip chip-teal">d₁</span>
                    <span class="client-chip chip-teal">d₂</span>
                  </div>
                </div>
                <div class="fed-card-action">
                  <svg class="fed-action-arrow" viewBox="0 0 16 10">
                    <path d="M 1 5 L 12 5 M 8 1 L 12 5 L 8 9" fill="none" stroke="var(--deck-teal)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="model-banner banner-teal">
                    <span class="model-name">Task Model <MathTex math="\omega_1" /></span>
                    <span class="loop-tag">Isolated FedAvg</span>
                  </div>
                </div>
              </div>

              <!-- Federation 2 (Orange) -->
              <div class="fed-card fed-card-orange">
                <div class="fed-card-header">
                  <div class="fed-title-group">
                    <span class="fed-badge badge-orange"><MathTex math="\mathcal{F}_2" /></span>
                    <strong class="fed-name">Federation 2</strong>
                  </div>
                  <div class="fed-clients-chips">
                    <span class="client-chip chip-orange">d₃</span>
                    <span class="client-chip chip-orange">d₄</span>
                  </div>
                </div>
                <div class="fed-card-action">
                  <svg class="fed-action-arrow" viewBox="0 0 16 10">
                    <path d="M 1 5 L 12 5 M 8 1 L 12 5 L 8 9" fill="none" stroke="var(--deck-orange)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="model-banner banner-orange">
                    <span class="model-name">Task Model <MathTex math="\omega_2" /></span>
                    <span class="loop-tag">Isolated FedAvg</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="stage-features stage-features-tight">
              <div class="feature-item">
                <span class="feature-dot orange-dot" />
                <span><strong>Scope:</strong> gradients averaged only within a federation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.rnd-pipeline-root {
  width: 100%;
  margin: 0.5rem 0;
}

.pipeline-grid {
  display: grid;
  grid-template-columns: 0.95fr auto 1.05fr auto 1.25fr;
  align-items: stretch;
  gap: 0.4rem;
}

/* ─── Column & Cards ─── */
.pipeline-col {
  display: flex;
  transition: opacity 300ms ease, transform 300ms ease;
}

.pipeline-col.is-future {
  opacity: 0.32;
  filter: grayscale(40%);
}

.pipeline-col.is-past {
  opacity: 0.85;
}

.pipeline-col.is-active {
  opacity: 1;
  transform: translateY(-2px);
}

.stage-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.5px solid var(--deck-line);
  background: #ffffff;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(16, 32, 43, 0.06);
}

.pipeline-col.is-active .stage-card {
  border-color: rgba(15, 76, 92, 0.4);
  box-shadow: 0 6px 20px rgba(15, 76, 92, 0.12);
}

/* ─── Stage Headers ─── */
.stage-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.65rem;
  border-bottom: 1px solid var(--deck-line);
}

.header-teal { background: color-mix(in oklch, var(--deck-teal) 9%, white); }
.header-green { background: color-mix(in oklch, var(--deck-green) 9%, white); }
.header-orange { background: color-mix(in oklch, var(--deck-orange) 9%, white); }

.stage-number {
  display: grid;
  place-items: center;
  width: 1.55rem;
  height: 1.55rem;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.header-teal .stage-number { background: var(--deck-teal); }
.header-green .stage-number { background: var(--deck-green); }
.header-orange .stage-number { background: var(--deck-orange); }

.header-titles h3 {
  margin: 0;
  font-size: 0.72rem !important;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--deck-ink);
}

.header-titles p {
  margin: 0;
  font-size: 0.6rem !important;
  color: var(--deck-muted);
}

/* ─── Stage Body ─── */
.stage-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.6rem 0.65rem;
  gap: 0.55rem;
}

/* ─── Stage 1: Devices Sketch ─── */
.devices-sketch {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.35rem;
}

.sketch-device {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--deck-line);
  background: #fdfefe;
  border-radius: 5px;
  padding: 0.35rem 0.2rem;
  box-shadow: 0 1px 4px rgba(16, 32, 43, 0.04);
}

.sketch-device.grp-a { border-top: 3px solid var(--deck-teal); }
.sketch-device.grp-b { border-top: 3px solid var(--deck-orange); }

.dev-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.dev-id {
  font-weight: 700;
  font-size: 0.72rem;
  color: var(--deck-ink);
}

.data-pill {
  font-size: 0.62rem;
  color: var(--deck-muted);
  background: rgba(16, 32, 43, 0.06);
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
}

.dev-arrow-down {
  height: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.1rem 0;
}

.mini-arrow-svg {
  width: 0.9rem;
  height: 1.1rem;
}

.predictor-pill {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.pill-teal {
  background: var(--deck-teal-soft);
  color: var(--deck-teal);
  border: 1px solid rgba(15, 76, 92, 0.3);
}

.pill-orange {
  background: var(--deck-orange-soft);
  color: #9a5302;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

/* ─── Stage Features Bullet list ─── */
.stage-features {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.62rem;
  color: var(--deck-ink);
  line-height: 1.25;
}

.feature-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.teal-dot { background: var(--deck-teal); }
.orange-dot { background: var(--deck-orange); }

/* ─── Connector Arrows between Columns ─── */
.pipeline-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  opacity: 0.3;
  transition: opacity 300ms ease;
}

.pipeline-connector.is-revealed {
  opacity: 1;
}

.connector-arrow-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.15rem;
}

.conn-text {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--deck-ink);
}

.connector-svg {
  width: 3.2rem;
  height: 1.4rem;
  overflow: visible;
}

.conn-sub {
  font-size: 0.6rem;
  color: var(--deck-muted);
  white-space: nowrap;
}

/* ─── Stage 2: Matrix Schematic ─── */
.matrix-schematic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.matrix-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.top-axis {
  display: grid;
  grid-template-columns: repeat(4, 1.8rem);
  gap: 2px;
  margin-bottom: 2px;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--deck-muted);
  text-align: center;
}

.matrix-content-row {
  display: flex;
  align-items: center;
  gap: 3px;
}

.left-axis {
  display: grid;
  grid-template-rows: repeat(4, 1.4rem);
  gap: 2px;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--deck-muted);
  align-items: center;
  text-align: right;
  padding-right: 2px;
}

.matrix-tiles {
  display: grid;
  grid-template-columns: repeat(4, 1.8rem);
  grid-template-rows: repeat(4, 1.4rem);
  gap: 2px;
  border: 1.5px solid var(--deck-line);
  padding: 2px;
  background: #ffffff;
  border-radius: 4px;
}

.tile {
  display: grid;
  place-items: center;
  font-size: 0.6rem;
  font-family: var(--deck-font-mono);
  font-weight: 600;
  border-radius: 2px;
}

.tile-diag {
  background: rgba(15, 76, 92, 0.15);
  color: var(--deck-teal);
  border: 1px solid rgba(15, 76, 92, 0.3);
}

.tile-off {
  background: rgba(217, 119, 6, 0.14);
  color: #9a5302;
  border: 1px solid rgba(217, 119, 6, 0.25);
}

.schematic-legend {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
}

.legend-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.6rem;
  line-height: 1.25;
}

.color-swatch {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  flex-shrink: 0;
}

.swatch-diag {
  background: rgba(15, 76, 92, 0.2);
  border: 1.5px solid var(--deck-teal);
}

.swatch-off {
  background: rgba(217, 119, 6, 0.18);
  border: 1.5px solid var(--deck-orange);
}

/* ─── Stage 3: Federations Stack ─── */
.federations-stack {
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.fed-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1.5px solid;
  padding: 0.35rem 0.5rem;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(16, 32, 43, 0.04);
  gap: 0.25rem;
}

.fed-card-teal {
  border-color: rgba(15, 76, 92, 0.35);
  background: color-mix(in oklch, var(--deck-teal) 3%, #ffffff);
}

.fed-card-orange {
  border-color: rgba(217, 119, 6, 0.4);
  background: color-mix(in oklch, var(--deck-orange) 3%, #ffffff);
}

.fed-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fed-title-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.fed-badge {
  display: grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}

.badge-teal { background: var(--deck-teal); }
.badge-orange { background: var(--deck-orange); }

.fed-name {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--deck-ink);
  white-space: nowrap;
}

.fed-clients-chips {
  display: flex;
  gap: 0.25rem;
}

.client-chip {
  font-family: var(--deck-font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  line-height: 1;
}

.chip-teal {
  background: var(--deck-teal-soft);
  color: var(--deck-teal);
  border: 1px solid rgba(15, 76, 92, 0.3);
}

.chip-orange {
  background: var(--deck-orange-soft);
  color: #9a5302;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

.fed-card-action {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.fed-action-arrow {
  width: 1.1rem;
  height: 0.75rem;
  flex-shrink: 0;
}

.model-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
}

.banner-teal {
  background: rgba(15, 76, 92, 0.08);
  border: 1px solid rgba(15, 76, 92, 0.2);
}

.banner-orange {
  background: rgba(217, 119, 6, 0.09);
  border: 1px solid rgba(217, 119, 6, 0.2);
}

.model-name {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--deck-ink);
  white-space: nowrap;
}

.loop-tag {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--deck-muted);
  white-space: nowrap;
}

.stage-features-tight {
  margin-top: 0.35rem;
  gap: 0.25rem;
}
</style>
