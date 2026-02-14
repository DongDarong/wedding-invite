<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const imageModules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default'
})

const slides = Object.entries(imageModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath, undefined, { numeric: true }))
  .map(([, src], index) => ({
    src,
    alt: `Wedding memory photo ${index + 1}`
  }))

const currentSlide = ref(0)
let timer = null
const hasSlides = slides.length > 0

onMounted(() => {
  if (slides.length <= 1) return

  timer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">រូបភាពអនុស្សាវរីយ៍</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">សួនរូបភាពមង្គលការ</p>
    </div>

    <div class="temple-frame max-w-3xl mx-auto overflow-hidden">
      <div class="temple-panel p-4 sm:p-6 max-[390px]:p-3">
        <div
          class="relative h-[270px] sm:h-[360px] max-[390px]:h-[220px] rounded-2xl overflow-hidden border border-[#f0cf8a]/25"
        >
          <transition v-if="hasSlides" name="fade" mode="out-in">
            <img
              :key="slides[currentSlide].src"
              :src="slides[currentSlide].src"
              :alt="slides[currentSlide].alt"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-contain scale-[1.03] saturate-90 brightness-90"
            >
          </transition>
          <div
            v-else
            class="h-full w-full grid place-items-center bg-[linear-gradient(145deg,rgba(45,67,57,0.88),rgba(19,31,24,0.95))] text-[#d9c18d]"
          >
            <p class="font-khmer-body text-sm tracking-[0.06em]">No gallery images found</p>
          </div>

          <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.78))]"></div>

          <div class="absolute bottom-4 left-4 right-4 text-center">
            <p class="font-khmer-body text-[10px] tracking-[0.06em] text-[#efd19a]">
              អនុស្សាវរីយ៍ក្រោមពន្លឺមាស
            </p>
          </div>
        </div>

        <div v-if="slides.length > 1" class="flex justify-center gap-2 mt-4">
          <button
            v-for="(slide, index) in slides"
            :key="slide.alt"
            type="button"
            class="h-2.5 rounded-full transition-all"
            :class="index === currentSlide ? 'w-8 bg-[#e9c77f]' : 'w-2.5 bg-[#9c7739]/80'"
            @click="currentSlide = index"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 1.2s ease; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
