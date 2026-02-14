<script setup>
import { ref } from 'vue'

const props = defineProps({
  durationMs: {
    type: Number,
    default: 7600
  },
  lite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['complete'])
const isCompleted = ref(false)

function completeIntro() {
  if (isCompleted.value) return
  isCompleted.value = true
  emit('complete')
}
</script>

<template>
  <section
    class="intro-root fixed inset-0 z-[60] overflow-hidden bg-[#1b1309]"
    :class="{ 'intro-lite': lite }"
    @dragstart.prevent
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(230,194,122,0.24),transparent_45%),linear-gradient(140deg,#2a1d10_0%,#1b1309_56%,#3b2916_100%)]"></div>
    <div class="absolute inset-0 intro-vignette"></div>
    <div class="absolute inset-0 intro-aurora"></div>
    <div v-if="!lite" class="absolute inset-0 film-grain"></div>
    <div v-if="!lite" class="absolute inset-0 intro-sparkles"></div>
    <div class="fog-layer"></div>
    <div v-if="!lite" class="fog-layer layer-2"></div>

    <div class="absolute inset-0 flex">
      <div class="temple-door left-door w-1/2 h-full" :class="{ 'left-door-lite': lite }"></div>
      <div class="temple-door right-door w-1/2 h-full" :class="{ 'right-door-lite': lite }"></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center px-8 mt-auto text-center">
      <div class="intro-center max-w-2xl space-y-5" :class="{ 'intro-center-lite': lite }">
        <div class="intro-ornament"></div>
        <p class="font-khmer-body text-[11px] tracking-[0.3em] text-[#E6C27A]/85 intro-fade" :class="{ 'intro-fade-lite': lite }">
          លិខិតអញ្ជើញកម្មពិធីមង្គលការ
        </p>
        <h1 class="font-khmer-title text-4xl sm:text-5xl md:text-6xl gold-title intro-title" :class="{ 'intro-title-lite': lite }">
          រីណា ជាគូរ រ៉ាឆា
        </h1>
        <p class="font-khmer-body text-base sm:text-xl engraved-text intro-subtitle" :class="{ 'intro-subtitle-lite': lite }">
          ពិធីអាពាហ៍ពិពាហ៍
        </p>
        <div class="pt-2">
          <button
            type="button"
            class="gold-btn intro-cta font-khmer-body rounded-full px-7 py-2.5 text-xs tracking-[0.16em] transition"
            @click="completeIntro"
          >
            បើកធៀបអញ្ជើញ
          </button>
        </div>
        <div class="intro-ornament ornament-bottom"></div>
      </div>
    </div>

    <div v-if="!lite" class="absolute inset-0 pointer-events-none intro-beam"></div>
  </section>
</template>

<style scoped>
.intro-root {
  contain: layout paint style;
  transform: translateZ(0);
  touch-action: none;
  overscroll-behavior: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}

.intro-vignette {
  background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(10, 7, 4, 0.62) 100%);
}

.intro-aurora {
  background:
    radial-gradient(circle at 10% 20%, rgba(242, 215, 161, 0.18), transparent 42%),
    radial-gradient(circle at 85% 18%, rgba(230, 194, 122, 0.2), transparent 38%),
    radial-gradient(circle at 50% 110%, rgba(240, 207, 138, 0.16), transparent 45%);
  filter: blur(16px);
  animation: aurora-breathe 10s ease-in-out infinite;
}

.intro-sparkles {
  background:
    radial-gradient(circle at 16% 26%, rgba(242, 215, 161, 0.56) 0 1px, transparent 2px),
    radial-gradient(circle at 78% 22%, rgba(230, 194, 122, 0.5) 0 1px, transparent 2px),
    radial-gradient(circle at 58% 66%, rgba(240, 207, 138, 0.45) 0 1px, transparent 2px),
    radial-gradient(circle at 28% 74%, rgba(242, 215, 161, 0.42) 0 1px, transparent 2px);
  animation: sparkle-float 8s linear infinite;
}

.temple-door {
  background:
    linear-gradient(180deg, rgba(53, 37, 20, 0.95), rgba(22, 16, 10, 0.98)),
    repeating-linear-gradient(
      90deg,
      rgba(242, 215, 161, 0.11) 0,
      rgba(242, 215, 161, 0.11) 2px,
      transparent 2px,
      transparent 12px
    );
  box-shadow: inset 0 0 26px rgba(0, 0, 0, 0.9);
  border-top: 1px solid rgba(242, 215, 161, 0.4);
  border-bottom: 1px solid rgba(242, 215, 161, 0.4);
  will-change: transform;
}

.intro-center {
  position: relative;
  padding: clamp(1.2rem, 2.3vw, 2.2rem) clamp(1rem, 2.8vw, 2.5rem);
  border: 1px solid rgba(242, 215, 161, 0.28);
  border-radius: 30px;
  background:
    linear-gradient(120deg, rgba(44, 31, 18, 0.72), rgba(29, 20, 12, 0.82)),
    radial-gradient(circle at 50% 0%, rgba(242, 215, 161, 0.16), transparent 56%);
  box-shadow:
    inset 0 1px 0 rgba(242, 215, 161, 0.34),
    inset 0 0 48px rgba(230, 194, 122, 0.08),
    0 28px 54px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  animation: center-fade-in 1.2s ease 0.2s both;
}

.intro-center::before {
  content: '';
  position: absolute;
  inset: 7px;
  border-radius: 24px;
  border: 1px solid rgba(242, 215, 161, 0.18);
  pointer-events: none;
}

.intro-center-lite {
  box-shadow:
    inset 0 1px 0 rgba(242, 215, 161, 0.28),
    0 20px 36px rgba(0, 0, 0, 0.34);
}

.intro-ornament {
  height: 1px;
  width: min(420px, 68vw);
  margin: 0 auto 0.8rem;
  background: linear-gradient(90deg, transparent, rgba(240, 207, 138, 0.85), transparent);
  opacity: 0;
  animation: reveal-fade 2.6s ease 1.4s forwards;
}

.ornament-bottom {
  margin: 0.8rem auto 0;
  animation-delay: 2s;
}

.left-door {
  border-right: 1px solid rgba(242, 215, 161, 0.36);
  animation: open-left 7s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}

.right-door {
  border-left: 1px solid rgba(242, 215, 161, 0.36);
  animation: open-right 7s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}

.intro-title {
  opacity: 0;
  animation: reveal-title 3.6s ease 1.2s forwards;
  will-change: transform, opacity;
}

.intro-fade {
  opacity: 0;
  animation: reveal-fade 3.2s ease 0.8s forwards;
  will-change: transform, opacity;
}

.intro-subtitle {
  opacity: 0;
  animation: reveal-fade 3.2s ease 2.4s forwards;
  will-change: transform, opacity;
}

.intro-cta {
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(242, 215, 161, 0.45);
}

.intro-cta:hover {
  transform: translateY(-1px) scale(1.01);
}

.intro-beam {
  background: linear-gradient(
    110deg,
    transparent 32%,
    rgba(230, 194, 122, 0.2) 48%,
    rgba(242, 215, 161, 0.45) 52%,
    rgba(240, 207, 138, 0.18) 56%,
    transparent 72%
  );
  transform: translateX(-120%);
  animation: beam-sweep 7.2s ease-in-out 1.6s forwards;
  will-change: transform, opacity;
}

.left-door-lite {
  animation: open-left-lite 2.2s cubic-bezier(0.66, 0, 0.2, 1) forwards;
}

.right-door-lite {
  animation: open-right-lite 2.2s cubic-bezier(0.66, 0, 0.2, 1) forwards;
}

.intro-title-lite {
  animation: reveal-title-lite 1.4s ease 0.2s forwards;
}

.intro-fade-lite {
  animation: reveal-fade-lite 1.1s ease 0.1s forwards;
}

.intro-subtitle-lite {
  animation: reveal-fade-lite 1.1s ease 0.45s forwards;
}

@keyframes open-left {
  0%,
  45% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes open-right {
  0%,
  45% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@keyframes open-left-lite {
  0%,
  32% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes open-right-lite {
  0%,
  32% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@keyframes reveal-title {
  0% { opacity: 0; transform: scale(1.05); filter: blur(16px); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}

@keyframes reveal-fade {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes reveal-title-lite {
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes reveal-fade-lite {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes beam-sweep {
  0% { transform: translateX(-120%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(120%); opacity: 0; }
}

@keyframes aurora-breathe {
  0%, 100% { transform: scale(1) translateY(0); opacity: 0.75; }
  50% { transform: scale(1.08) translateY(-1.2%); opacity: 1; }
}

@keyframes sparkle-float {
  0% { transform: translateY(0); opacity: 0.45; }
  50% { opacity: 0.95; }
  100% { transform: translateY(-12px); opacity: 0.45; }
}

@keyframes center-fade-in {
  0% { opacity: 0; transform: translateY(16px) scale(0.985); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 768px) {
  .intro-root {
    backface-visibility: hidden;
  }

  .intro-center {
    width: min(94vw, 650px);
    border-radius: 22px;
    padding: 1.1rem 0.95rem 1.25rem;
  }

  .intro-center::before {
    border-radius: 17px;
  }

  .intro-fade {
    letter-spacing: 0.2em;
  }
}
</style>
