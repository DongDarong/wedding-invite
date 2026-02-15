<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import CinematicIntro from '../components/CinematicIntro.vue'
import Header from '../components/Header.vue'
import Countdown from '../components/Countdown.vue'
import Calendar from '../components/Calendar.vue'
import Location from '../components/Location.vue'
import Timeline from '../components/Timeline.vue'
import Gallery from '../components/Gallery.vue'
import RSVP from '../components/RSVP.vue'
import Wishes from '../components/Wishes.vue'
import Footer from '../components/Footer.vue'
import weddingSong from '../assets/wealth-of-love.mp3'

const mobileMediaQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null
const reducedMotionQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

const showIntro = ref(true)
const audioRef = ref(null)
const isMobile = ref(mobileMediaQuery ? mobileMediaQuery.matches : false)
const prefersReducedMotion = ref(reducedMotionQuery ? reducedMotionQuery.matches : false)
const weddingContent = {
  brideKh: 'រ៉ុង រីណា',
  groomKh: 'ឈឿន រ៉ាឆា',
  brideEn: 'កូនស្រី',
  groomEn: 'កូនប្រុស',
  dateISO: '2026-02-28T08:00:00+07:00',
  monthKh: 'កុម្ភៈ',
  weekdayKh: 'ថ្ងៃសៅរ៍',
  eventTimeKh: 'ថ្ងៃសៅរ៍ ២៨ កុម្ភៈ ឆ្នាំ ២០២៦ វេលាម៉ោង១១:០០ ថ្ងៃត្រង់'
}

Object.assign(weddingContent, {
  brideKh: 'រ៉ុង រីណា',
  groomKh: 'ឈឿន រ៉ាឆា',
  brideEn: 'Rong Rina',
  groomEn: 'Chhoeun Racha',
  monthKh: 'កុម្ភៈ',
  weekdayKh: 'ថ្ងៃសៅរ៍',
  eventTimeKh: 'ថ្ងៃសៅរ៍ ទី២៨ ខែកុម្ភៈ ឆ្នាំ២០២៦ វេលាម៉ោង ១១:០០ ថ្ងៃត្រង់'
})

const lotusParticles = Array.from({ length: 12 }, (_, index) => ({
  left: `${6 + index * 8}%`,
  bottom: `${-4 - (index % 5) * 6}%`,
  duration: `${17 + (index % 6) * 3}s`,
  delay: `${(index % 8) * 1.2}s`
}))

const dustParticles = Array.from({ length: 18 }, (_, index) => ({
  left: `${4 + index * 5}%`,
  top: `${12 + (index % 9) * 8}%`,
  duration: `${6 + (index % 4) * 1.2}s`,
  delay: `${(index % 7) * 0.7}s`
}))

function updateDeviceState() {
  isMobile.value = mobileMediaQuery ? mobileMediaQuery.matches : false
  prefersReducedMotion.value = reducedMotionQuery ? reducedMotionQuery.matches : false

  if (prefersReducedMotion.value) {
    showIntro.value = false
  }
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

function onIntroComplete() {
  showIntro.value = false
}

async function tryAutoPlay() {
  const audio = audioRef.value
  if (!audio || !audio.paused) return

  try {
    audio.volume = 1
    await audio.play()
  } catch {}
}

function unlockAndPlay() {
  tryAutoPlay()
}

function onVisibleRetry() {
  if (!document.hidden) {
    tryAutoPlay()
  }
}

onMounted(() => {
  updateDeviceState()
  nextTick(() => {
    tryAutoPlay()
    setTimeout(tryAutoPlay, 120)
    setTimeout(tryAutoPlay, 500)
  })

  window.addEventListener('pageshow', tryAutoPlay)
  document.addEventListener('visibilitychange', onVisibleRetry)

  window.addEventListener('pointerdown', unlockAndPlay, { passive: true })
  window.addEventListener('touchstart', unlockAndPlay, { passive: true })
  window.addEventListener('click', unlockAndPlay, { passive: true })
  window.addEventListener('keydown', unlockAndPlay, { once: true })
  attachMediaListener(mobileMediaQuery, updateDeviceState)
  attachMediaListener(reducedMotionQuery, updateDeviceState)
})

onBeforeUnmount(() => {
  window.removeEventListener('pageshow', tryAutoPlay)
  document.removeEventListener('visibilitychange', onVisibleRetry)
  window.removeEventListener('pointerdown', unlockAndPlay)
  window.removeEventListener('touchstart', unlockAndPlay)
  window.removeEventListener('click', unlockAndPlay)
  window.removeEventListener('keydown', unlockAndPlay)
  detachMediaListener(mobileMediaQuery, updateDeviceState)
  detachMediaListener(reducedMotionQuery, updateDeviceState)
})
</script>

<template>
  <div class="royal-page min-h-[100dvh] text-[#f6e7c5]">
    <CinematicIntro
      v-if="showIntro"
      :duration-ms="isMobile ? 2400 : 7600"
      :lite="isMobile || prefersReducedMotion"
      @complete="onIntroComplete"
    />

    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(186,150,73,0.22),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(126,84,25,0.14),transparent_35%),linear-gradient(140deg,#1a2c23_0%,#14241d_56%,#21362a_100%)]"></div>
      <div class="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,236,191,0.02)_0,rgba(255,236,191,0.02)_2px,transparent_2px,transparent_6px)] opacity-70"></div>
      <div class="silk-overlay absolute inset-0"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="fog-layer"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="fog-layer layer-2"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="fog-layer layer-3"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="film-grain absolute inset-0"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="candle-glow top-[-4rem] left-[-4rem]"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="candle-glow right-[-5rem] top-[25%]"></div>
      <div v-if="!isMobile && !prefersReducedMotion" class="candle-glow left-[35%] bottom-[-6rem]"></div>

      <span
        v-for="(p, index) in (isMobile || prefersReducedMotion ? [] : lotusParticles)"
        :key="`lotus-${index}`"
        class="absolute text-[18px] text-[#d8b875]/55"
        :style="{
          left: p.left,
          bottom: p.bottom,
          animation: `floating ${p.duration} ease-in-out ${p.delay} infinite`
        }"
      >
        &#10048;
      </span>

      <span
        v-for="(p, index) in (isMobile || prefersReducedMotion ? [] : dustParticles)"
        :key="`dust-${index}`"
        class="absolute w-[5px] h-[5px] rounded-full bg-[#c5b383] opacity-0"
        :style="{
          left: p.left,
          top: p.top,
          boxShadow: '0 0 16px rgba(245,211,144,0.7)',
          animation: `floating ${p.duration} ease-in-out ${p.delay} infinite`
        }"
      />
    </div>

    <main class="home-main relative z-10 mx-auto max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8 lg:px-10 max-[390px]:px-2 max-[390px]:pt-4">
      <div class="temple-frame">
        <div class="home-shell temple-panel px-4 pb-10 pt-4 sm:px-8 sm:pt-6 sm:pb-12 max-[390px]:px-3 max-[390px]:pb-8 bg-[linear-gradient(130deg,rgba(28,45,36,0.84),rgba(18,31,25,0.9)),radial-gradient(circle_at_20%_0%,rgba(255,228,155,0.08),transparent_35%)] border-[rgba(255,223,141,0.18)]">
          <Header
            :bride-kh="weddingContent.brideKh"
            :groom-kh="weddingContent.groomKh"
            :bride-en="weddingContent.brideEn"
            :groom-en="weddingContent.groomEn"
          />

          <div class="home-stack space-y-10 mt-8 sm:mt-12 max-[390px]:space-y-7 max-[390px]:mt-6">
            <Countdown :target-date-iso="weddingContent.dateISO" />
            <Calendar
              :month-kh="weddingContent.monthKh"
              :weekday-kh="weddingContent.weekdayKh"
              :date-iso="weddingContent.dateISO"
            />
            <Location
            />
            <Timeline />
            <Gallery />
            <RSVP />
            <Wishes />
          </div>
          <Footer />
        </div>
      </div>
    </main>

    <audio ref="audioRef" :src="weddingSong" loop preload="auto" autoplay playsinline></audio>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) and (max-width: 1279px) {
  .home-main {
    max-width: 69rem;
    padding-top: 2rem;
    padding-bottom: 3.8rem;
  }

  .home-shell {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1.8rem;
    padding-bottom: 2.9rem;
    backdrop-filter: blur(6px);
  }

  .home-stack {
    margin-top: 2.35rem;
    gap: 0;
  }

  .home-stack > * + * {
    margin-top: 2.4rem;
  }

  .home-footer {
    margin-top: 3.4rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(201, 164, 91, 0.2);
  }
}

@media (min-width: 1280px) and (max-width: 1535px) {
  .home-main {
    max-width: 74rem;
    padding-top: 2.25rem;
    padding-bottom: 4.25rem;
  }

  .home-shell {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 2rem;
    padding-bottom: 3.25rem;
    backdrop-filter: blur(7px);
  }

  .home-stack {
    margin-top: 2.75rem;
    gap: 0;
  }

  .home-stack > * + * {
    margin-top: 3rem;
  }

  .home-footer {
    margin-top: 4rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(201, 164, 91, 0.22);
  }
}

@media (min-width: 1536px) {
  .home-main {
    max-width: 79rem;
    padding-top: 2.6rem;
    padding-bottom: 4.8rem;
  }

  .home-shell {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 2.2rem;
    padding-bottom: 3.6rem;
    backdrop-filter: blur(8px);
  }

  .home-stack {
    margin-top: 3rem;
    gap: 0;
  }

  .home-stack > * + * {
    margin-top: 3.35rem;
  }

  .home-footer {
    margin-top: 4.4rem;
    padding-top: 1.35rem;
    border-top: 1px solid rgba(201, 164, 91, 0.24);
  }
}
</style>

