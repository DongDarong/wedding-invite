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
  <section class="intro-root fixed inset-0 z-[60] overflow-hidden bg-[#13211b]" :class="{ 'intro-lite': lite }">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(206,164,86,0.22),transparent_45%),linear-gradient(140deg,#1a2c23_0%,#14241d_56%,#21362a_100%)]"></div>
    <div v-if="!lite" class="absolute inset-0 film-grain"></div>
    <div class="fog-layer"></div>
    <div v-if="!lite" class="fog-layer layer-2"></div>

    <div class="absolute inset-0 flex">
      <div class="temple-door left-door w-1/2 h-full" :class="{ 'left-door-lite': lite }"></div>
      <div class="temple-door right-door w-1/2 h-full" :class="{ 'right-door-lite': lite }"></div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center px-8 mt-auto text-center">
      <div class="max-w-2xl space-y-5">
        <p class="font-khmer-body text-[11px] tracking-[0.3em] text-[#d7b97a]/80 intro-fade" :class="{ 'intro-fade-lite': lite }">
          លិខិតអញ្ជើញពិធីមង្គលការ
        </p>
        <h1 class="font-khmer-title text-4xl sm:text-5xl md:text-6xl gold-title intro-title" :class="{ 'intro-title-lite': lite }">
          រីណា និង រ៉ាឆា
        </h1>
        <p class="font-khmer-body text-base sm:text-xl engraved-text intro-subtitle" :class="{ 'intro-subtitle-lite': lite }">
          ពិធីអាពាហ៍ពិពាហ៍
        </p>
        <div class="pt-2">
          <button
            type="button"
            class="gold-btn font-khmer-body rounded-full px-6 py-2.5 text-xs tracking-[0.14em] transition"
            @click="completeIntro"
          >
            Open Web
          </button>
        </div>
      </div>
    </div>

    <div v-if="!lite" class="absolute inset-0 pointer-events-none intro-beam"></div>
  </section>
</template>

<style scoped>
.intro-root {
  contain: layout paint style;
  transform: translateZ(0);
}

.temple-door {
  background:
    linear-gradient(180deg, rgba(36, 53, 43, 0.95), rgba(14, 23, 19, 0.98)),
    repeating-linear-gradient(
      90deg,
      rgba(255, 220, 144, 0.11) 0,
      rgba(255, 220, 144, 0.11) 2px,
      transparent 2px,
      transparent 12px
    );
  box-shadow: inset 0 0 26px rgba(0, 0, 0, 0.9);
  border-top: 1px solid rgba(255, 221, 145, 0.4);
  border-bottom: 1px solid rgba(255, 221, 145, 0.4);
  will-change: transform;
}

.left-door {
  border-right: 1px solid rgba(255, 221, 145, 0.36);
  animation: open-left 7s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}

.right-door {
  border-left: 1px solid rgba(255, 221, 145, 0.36);
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

.intro-beam {
  background: linear-gradient(
    110deg,
    transparent 32%,
    rgba(255, 220, 144, 0.2) 48%,
    rgba(255, 240, 199, 0.45) 52%,
    rgba(255, 220, 144, 0.18) 56%,
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

@media (max-width: 768px) {
  .intro-root {
    backface-visibility: hidden;
  }

  .intro-fade {
    letter-spacing: 0.2em;
  }
}
</style>
