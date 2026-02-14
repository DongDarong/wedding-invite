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
<<<<<<< HEAD
  <div class="royal-page min-h-[100dvh] text-[#1F3529]">
=======
  <div class="royal-page min-h-[100dvh] text-[#F1D18A]">
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
    <CinematicIntro
      v-if="showIntro"
      :duration-ms="isMobile ? 2400 : 7600"
      :lite="isMobile || prefersReducedMotion"
      @complete="onIntroComplete"
    />

    <div class="fixed inset-0 pointer-events-none z-0">
<<<<<<< HEAD
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(31,53,41,0.22),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(45,67,57,0.18),transparent_35%),linear-gradient(140deg,#2a1d10_0%,#1b1309_56%,#3b2916_100%)]"></div>
      <div class="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(31,53,41,0.025)_0,rgba(31,53,41,0.025)_2px,transparent_2px,transparent_6px)] opacity-70"></div>
=======
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(241,209,138,0.22),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(212,175,55,0.18),transparent_35%),linear-gradient(140deg,#2a1d10_0%,#1b1309_56%,#3b2916_100%)]"></div>
      <div class="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(241,209,138,0.025)_0,rgba(241,209,138,0.025)_2px,transparent_2px,transparent_6px)] opacity-70"></div>
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
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
<<<<<<< HEAD
        class="absolute text-[18px] text-[#1B2820]/55"
=======
        class="absolute text-[18px] text-[#C9A45B]/55"
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
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
<<<<<<< HEAD
        class="absolute w-[5px] h-[5px] rounded-full bg-[#2D4339] opacity-0"
        :style="{
          left: p.left,
          top: p.top,
          boxShadow: '0 0 16px rgba(45,67,57,0.72)',
=======
        class="absolute w-[5px] h-[5px] rounded-full bg-[#D4AF37] opacity-0"
        :style="{
          left: p.left,
          top: p.top,
          boxShadow: '0 0 16px rgba(212,175,55,0.72)',
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
          animation: `floating ${p.duration} ease-in-out ${p.delay} infinite`
        }"
      />
    </div>

    <main class="relative z-10 mx-auto max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8 lg:px-10 max-[390px]:px-2 max-[390px]:pt-4">
      <div class="temple-frame">
<<<<<<< HEAD
        <div class="temple-panel px-4 pb-10 pt-4 sm:px-8 sm:pt-6 sm:pb-12 max-[390px]:px-3 max-[390px]:pb-8 bg-[linear-gradient(130deg,rgba(53,37,20,0.84),rgba(30,21,12,0.9)),radial-gradient(circle_at_20%_0%,rgba(31,53,41,0.12),transparent_35%)] border-[rgba(31,53,41,0.18)]">
=======
        <div class="temple-panel px-4 pb-10 pt-4 sm:px-8 sm:pt-6 sm:pb-12 max-[390px]:px-3 max-[390px]:pb-8 bg-[linear-gradient(130deg,rgba(53,37,20,0.84),rgba(30,21,12,0.9)),radial-gradient(circle_at_20%_0%,rgba(241,209,138,0.12),transparent_35%)] border-[rgba(241,209,138,0.18)]">
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
          <Header
            :bride-kh="weddingContent.brideKh"
            :groom-kh="weddingContent.groomKh"
            :bride-en="weddingContent.brideEn"
            :groom-en="weddingContent.groomEn"
          />

          <div class="space-y-10 mt-8 sm:mt-12 max-[390px]:space-y-7 max-[390px]:mt-6">
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

<<<<<<< HEAD
          <footer class="mt-12 text-center text-[#1B2820]/85 animate-[fade-up_1.5s_ease] max-[390px]:mt-9">
=======
          <footer class="mt-12 text-center text-[#C9A45B]/85 animate-[fade-up_1.5s_ease] max-[390px]:mt-9">
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
            <p class="font-khmer-title text-sm">សូមអរគុណសម្រាប់ពាក្យជូនពរ</p>
            <p class="text-[11px] tracking-[0.06em] mt-2">ក្តីស្រឡាញ់ និងព្រះពរ</p>
            <a
              href="https://dongdarong.github.io/dd-portfolio/"
              target="_blank"
              rel="noreferrer"
<<<<<<< HEAD
              class="inline-block m-3 text-[11px] tracking-[0.12em] text-[#2D4339] hover:text-[#1F3529] transition"
=======
              class="inline-block m-3 text-[11px] tracking-[0.12em] text-[#D4AF37] hover:text-[#F1D18A] transition"
>>>>>>> 43aa2a9670a957d67fb98471e7708bee6f0140ba
            >
              © Dong Darong (Click)
            </a>
            <router-link
              to="/admin"
              class="inline-flex mt-4 rounded-full px-4 py-2 text-xs tracking-[0.08em] gold-btn transition"
            >
              គ្រប់គ្រង
            </router-link>
          </footer>
        </div>
      </div>
    </main>

    <audio ref="audioRef" :src="weddingSong" loop preload="auto" autoplay playsinline></audio>
  </div>
</template>
