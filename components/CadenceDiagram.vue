<script setup lang="ts">
import { computed } from 'vue'
import MathTex from './MathTex.vue'

const props = defineProps<{ click?: number }>()
// This slide is a roadmap, not a walkthrough: the three phases carry equal
// weight from the start, and the clicks reveal the two cadences instead.
const currentStep = computed(() => Math.min(Math.max(props.click ?? 0, 0), 2))
</script>

<template>
  <div class="algorithm-overview" role="img" aria-label="Discover compatible devices, form federations, and repeatedly train specialized models">
    <div class="overview-flow">
      <section class="overview-phase phase-discover is-complete">
        <div class="phase-heading">
          <span class="phase-number">1</span>
          <span class="phase-kicker">DISTRIBUTIONS</span>
        </div>
        <h3>Find compatible devices</h3>
        <p>Estimate which devices observe similar data.</p>
        <div class="phase-question">Who is similar?</div>
      </section>

      <div class="flow-arrow arrow-to-federate is-revealed" aria-hidden="true">
        <span class="arrow-shaft" />
        <span class="arrow-head" />
      </div>

      <section class="overview-phase phase-federate is-complete">
        <div class="phase-heading">
          <span class="phase-number">2</span>
          <span class="phase-kicker">COLLABORATION</span>
        </div>
        <h3>Form federations</h3>
        <p>Group compatible devices without fixing the number of groups in advance.</p>
        <div class="phase-question">Who collaborates?</div>
      </section>

      <div class="flow-arrow arrow-to-train is-revealed" aria-hidden="true">
        <span class="arrow-shaft" />
        <span class="arrow-head" />
      </div>

      <section class="overview-phase phase-train is-complete">
        <div class="phase-heading">
          <span class="phase-number">3</span>
          <span class="phase-kicker">TASK LEARNING</span>
        </div>
        <h3>Train specialized models</h3>
        <p>Run federated learning independently inside each discovered group.</p>
        <div class="training-loop" :class="{ 'is-revealed': currentStep >= 1 }">
          <span>FL round</span><b>→</b><span>FL round</span><b>→</b><span>⋯</span>
        </div>
        <div class="repeat-label" :class="{ 'is-revealed': currentStep >= 1 }">repeat many times</div>
        <div class="training-cadence" :class="{ 'is-revealed': currentStep >= 1 }">
          <span><MathTex math="r \leftarrow r+1" /></span>
          <span class="cadence-trigger">refresh when <MathTex math="r \bmod \tau = 0" /></span>
        </div>
      </section>

    </div>

    <div class="refresh-loop" :class="{ 'is-active': currentStep >= 2 }">
      <div class="loop-path" aria-hidden="true">
        <span class="loop-drop" />
        <span class="loop-run" />
        <span class="loop-rise" />
        <span class="loop-head" />
        <span class="loop-tail" />
        <span class="loop-chevron chevron-near" />
        <span class="loop-chevron chevron-far" />
      </div>
      <div class="loop-chip">
        <span class="loop-chip-icon" aria-hidden="true">&#8635;</span>
        <strong>Optional periodic refresh</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.algorithm-overview {
  width: 100%;
  margin-top: 0.35rem;
  color: var(--deck-ink);
}

.overview-flow {
  display: grid;
  grid-template-columns: 1fr 2.2rem 1fr 2.2rem 1.15fr;
  align-items: stretch;
  gap: 0.55rem;
}

.overview-phase {
  --phase-color: var(--deck-teal);
  --phase-soft: rgba(15, 76, 92, 0.075);
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 13rem;
  padding: 1rem 1.05rem 0.9rem;
  border-top: 4px solid var(--deck-line);
  background: rgba(255, 255, 255, 0.68);
  transition: opacity 260ms ease, transform 260ms ease, background-color 260ms ease, border-color 260ms ease;
}

.phase-federate {
  --phase-color: var(--deck-orange);
  --phase-soft: rgba(217, 119, 6, 0.08);
}

.phase-train {
  --phase-color: var(--deck-green);
  --phase-soft: rgba(47, 107, 91, 0.08);
}

.overview-phase.is-complete {
  border-top-color: var(--phase-color);
  background: rgba(255, 255, 255, 0.8);
}

.phase-heading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}

.phase-number {
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  flex: 0 0 auto;
  border: 1.5px solid var(--phase-color);
  border-radius: 50%;
  color: var(--phase-color);
  font-family: var(--deck-font-mono);
  font-size: 0.78rem !important;
  font-weight: 600;
}

.phase-kicker {
  color: var(--phase-color);
  font-size: 0.66rem !important;
  font-weight: 600;
  letter-spacing: 0.07em;
}

.overview-phase h3 {
  margin: 0 0 0.65rem;
  color: var(--deck-ink);
  font-size: 1.16rem !important;
  letter-spacing: -0.025em;
}

.overview-phase p {
  min-height: 3rem;
  margin: 0;
  color: var(--deck-muted);
  font-size: 0.82rem !important;
  line-height: 1.4;
}

.phase-question {
  margin-top: auto;
  padding-top: 0.6rem;
  border-top: 1px solid color-mix(in oklch, var(--phase-color) 32%, transparent);
  color: var(--phase-color);
  font-size: 0.77rem !important;
  font-weight: 600;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--deck-teal);
  opacity: 0.14;
  transform: translateX(-0.2rem);
  transition: opacity 260ms ease, transform 260ms ease;
}

.arrow-to-federate { color: var(--deck-orange); }
.arrow-to-train { color: var(--deck-green); }

.flow-arrow .arrow-shaft {
  width: 1.3rem;
  height: 2.5px;
  background: currentColor;
}

.flow-arrow .arrow-head {
  width: 0;
  height: 0;
  margin-left: -1px;
  border-top: 0.36rem solid transparent;
  border-bottom: 0.36rem solid transparent;
  border-left: 0.56rem solid currentColor;
}

.flow-arrow.is-revealed {
  opacity: 1;
  transform: translateX(0);
}

.training-loop {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  margin-top: 0.75rem;
  padding: 0.52rem 0.6rem;
  background: rgba(47, 107, 91, 0.1);
  color: var(--deck-green);
  opacity: 0.18;
  transition: opacity 220ms ease;
}

.training-loop span,
.training-loop b {
  font-size: 0.68rem !important;
}

.training-loop b {
  color: var(--deck-muted);
  font-weight: 500;
}

.repeat-label {
  margin-top: 0.34rem;
  color: var(--deck-green);
  font-size: 0.72rem !important;
  font-weight: 600;
  text-align: center;
  opacity: 0.18;
  transition: opacity 220ms ease;
}

.training-loop.is-revealed,
.repeat-label.is-revealed {
  opacity: 1;
}

.training-cadence {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  margin-top: 0.68rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(47, 107, 91, 0.2);
  color: var(--deck-ink);
  font-size: 0.82rem !important;
  line-height: 1.3;
  opacity: 0.16;
  transition: opacity 220ms ease;
}

.training-cadence.is-revealed {
  opacity: 1;
}

.training-cadence > span {
  font-size: 0.82rem !important;
}

.training-cadence :deep(.math-tex) {
  font-size: inherit !important;
}

.training-cadence :deep(.katex) {
  font-size: 1em;
}


.cadence-trigger {
  color: #9a5302;
  font-weight: 600;
}

.refresh-loop {
  /* column centres of the 1fr / 2.2rem / 1fr / 2.2rem / 1.15fr grid above */
  --col-unit: calc((100% - 6.6rem) / 3.15);
  --start-x: calc(100% - var(--col-unit) * 0.575);
  --end-x: calc(var(--col-unit) / 2);
  --rail: var(--deck-orange);
  --drop: 1.85rem;
  position: relative;
  height: 4.5rem;
  margin-top: 0.1rem;
  opacity: 0.14;
  transition: opacity 300ms ease;
}

.refresh-loop.is-active {
  opacity: 1;
}

.loop-path {
  position: absolute;
  inset: 0;
}

/* down from phase 3 */
.loop-drop {
  position: absolute;
  top: 0;
  left: var(--start-x);
  width: 0;
  height: var(--drop);
  border-left: 2.5px dashed var(--rail);
  transform: translateX(-1.25px);
}

/* back across the slide */
.loop-run {
  position: absolute;
  top: var(--drop);
  left: var(--end-x);
  right: calc(var(--col-unit) * 0.575);
  height: 0;
  border-top: 2.5px dashed var(--rail);
}

/* up into phase 1 */
.loop-rise {
  position: absolute;
  top: 0;
  left: var(--end-x);
  width: 0;
  height: var(--drop);
  border-left: 2.5px dashed var(--rail);
  transform: translateX(-1.25px);
}

/* solid head landing on the bottom edge of phase 1 */
.loop-head {
  position: absolute;
  top: -0.34rem;
  left: var(--end-x);
  width: 0;
  height: 0;
  border-left: 0.38rem solid transparent;
  border-right: 0.38rem solid transparent;
  border-bottom: 0.52rem solid var(--rail);
  transform: translateX(-0.38rem);
}

/* origin dot under phase 3 */
.loop-tail {
  position: absolute;
  top: -0.2rem;
  left: var(--start-x);
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--rail);
  transform: translateX(-0.21rem);
}

/* travel direction on the horizontal run */
.loop-chevron {
  position: absolute;
  top: var(--drop);
  width: 0;
  height: 0;
  border-top: 0.3rem solid transparent;
  border-bottom: 0.3rem solid transparent;
  border-right: 0.44rem solid var(--rail);
  transform: translateY(calc(-50% + 1.25px));
}

.chevron-near { left: calc(var(--end-x) + var(--col-unit) * 0.45); }
.chevron-far { left: calc(var(--start-x) - var(--col-unit) * 0.45); }

.loop-chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  top: var(--drop);
  left: 50%;
  transform: translate(-50%, calc(-50% + 1.25px));
  padding: 0.22rem 0.72rem;
  border: 1.5px solid color-mix(in oklch, var(--deck-orange) 45%, transparent);
  border-radius: 999px;
  background: #f7fafb;
  white-space: nowrap;
}

.loop-chip strong {
  color: #9a5302;
  font-size: 0.72rem !important;
  font-weight: 600;
  letter-spacing: 0.005em;
}

.loop-chip-icon {
  color: var(--deck-orange);
  font-size: 0.86rem !important;
  line-height: 1;
}
</style>
