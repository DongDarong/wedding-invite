<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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

const mobileMediaQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null
const currentSlide = ref(0)
const isMobile = ref(mobileMediaQuery ? mobileMediaQuery.matches : false)
const imageOrientations = ref(new Map())
let timer = null

const visibleSlides = computed(() => slides.filter((slide) => {
  const orientation = imageOrientations.value.get(slide.src)

  if (!orientation) return true

  if (isMobile.value) {
    return orientation === 'portrait'
  }

  return orientation !== 'portrait'
}))

const hasSlides = computed(() => visibleSlides.value.length > 0)
const activeSlide = computed(() => (hasSlides.value ? visibleSlides.value[currentSlide.value] : null))
const currentImageSrc = computed(() => (activeSlide.value ? activeSlide.value.src : ''))
const currentIsLandscape = computed(() => imageOrientations.value.get(currentImageSrc.value) === 'landscape')

function detectImageOrientations() {
  slides.forEach((slide) => {
    const image = new Image()
    image.onload = () => {
      const nextMap = new Map(imageOrientations.value)
      if (image.naturalHeight > image.naturalWidth) {
        nextMap.set(slide.src, 'portrait')
      } else if (image.naturalWidth > image.naturalHeight) {
        nextMap.set(slide.src, 'landscape')
      } else {
        nextMap.set(slide.src, 'square')
      }
      imageOrientations.value = nextMap
    }
    image.src = slide.src
  })
}

function updateMobileState() {
  isMobile.value = mobileMediaQuery ? mobileMediaQuery.matches : false
}

function syncAutoSlide() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  if (visibleSlides.value.length <= 1) return

  timer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % visibleSlides.value.length
  }, 5000)
}

function attachMediaListener(query, handler) {
  if (!query) return
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', handler)
    return
  }
  if (typeof query.addListener === 'function') {
    query.addListener(handler)
  }
}

function detachMediaListener(query, handler) {
  if (!query) return
  if (typeof query.removeEventListener === 'function') {
    query.removeEventListener('change', handler)
    return
  }
  if (typeof query.removeListener === 'function') {
    query.removeListener(handler)
  }
}

watch(visibleSlides, () => {
  if (currentSlide.value >= visibleSlides.value.length) {
    currentSlide.value = 0
  }
  syncAutoSlide()
})

onMounted(() => {
  updateMobileState()
  detectImageOrientations()
  attachMediaListener(mobileMediaQuery, updateMobileState)
  syncAutoSlide()
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
  detachMediaListener(mobileMediaQuery, updateMobileState)
})
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">រូបភាពអនុស្សាវរីយ៍</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">Souvenir pictures</p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div
        class="gallery-stage relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] max-h-[78vh] rounded-2xl overflow-hidden shadow-[0_16px_44px_rgba(0,0,0,0.55)] sm:shadow-[0_22px_58px_rgba(0,0,0,0.62)]"
      >
          <img
            v-if="hasSlides && currentIsLandscape"
            :src="currentImageSrc"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 z-[1] hidden max-[768px]:block w-full h-full object-cover scale-[1.08] max-[768px]:blur-xl opacity-80"
          >
          <transition v-if="hasSlides" name="fade" mode="out-in">
            <div
              :key="activeSlide.src"
              class="cinematic-zoom relative z-[1] w-full h-full"
              :class="currentIsLandscape ? 'landscape-mobile' : ''"
            >
              <img
                :src="activeSlide.src"
                :alt="activeSlide.alt"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-contain object-center p-1.5 sm:p-2 lg:p-2.5"
                :class="currentIsLandscape ? 'max-[768px]:p-0 max-[768px]:scale-[0.95]' : ''"
              >
            </div>
          </transition>
          <div
            v-else
            class="h-full w-full grid place-items-center bg-[linear-gradient(145deg,rgba(45,67,57,0.88),rgba(19,31,24,0.95))] text-[#d9c18d]"
          >
            <p class="font-khmer-body text-sm tracking-[0.06em]">No matching images for this screen size</p>
          </div>

          <div class="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.32))] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.52))]"></div>

          <div class="absolute z-[3] bottom-3 sm:bottom-4 left-4 right-4 text-center">
<<<<<<< HEAD
            <p class="font-khmer-body text-[10px] sm:text-[11px] tracking-[0.06em] text-[#1F3529] drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)]">
=======
            <p class="font-khmer-body text-[10px] sm:text-[11px] tracking-[0.06em] text-[#F1D18A] drop-shadow-[0_2px_5px_rgba(0,0,0,0.75)]">
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
              អនុស្សាវរីយ៍ក្រោមពន្លឺមាស
            </p>
          </div>
      </div>

      <div v-if="visibleSlides.length > 1" class="flex justify-center gap-2 mt-3.5 sm:mt-4">
        <button
          v-for="(slide, index) in visibleSlides"
          :key="slide.alt"
          type="button"
          class="h-2.5 rounded-full transition-all duration-300"
          :class="index === currentSlide ? 'w-8 bg-[#1F3529] shadow-[0_0_10px_rgba(31,53,41,0.8)]' : 'w-2.5 bg-[#a27c3b]/75'"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 1.2s ease; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }

.gallery-stage {
  background: #0d1713;
}

.cinematic-zoom {
  transform-origin: 50% 50%;
  will-change: transform;
  animation: ken-burns 6.8s ease-out both;
}

@keyframes ken-burns {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

@media (max-width: 768px) {
  .cinematic-zoom {
    animation-duration: 5.2s;
  }

  .cinematic-zoom.landscape-mobile {
    animation-name: ken-burns-landscape-mobile;
  }

  @keyframes ken-burns-landscape-mobile {
    0% { transform: scale(1); }
    100% { transform: scale(1.04); }
  }
}
</style>
