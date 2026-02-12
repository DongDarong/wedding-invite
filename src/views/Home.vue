<template>
  <div
    class="min-h-screen relative overflow-hidden before:content-[''] before:fixed before:inset-0 before:z-0 before:opacity-[0.22] before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_15%,rgba(201,164,91,0.2)_0_2px,transparent_2px_100%),radial-gradient(circle_at_80%_25%,rgba(111,131,111,0.2)_0_2px,transparent_2px_100%),radial-gradient(circle_at_30%_75%,rgba(111,131,111,0.14)_0_2px,transparent_2px_100%),radial-gradient(circle_at_70%_85%,rgba(201,164,91,0.14)_0_2px,transparent_2px_100%)] before:[background-size:120px_120px]"
  >

    <!-- Curtain -->
    <div v-if="showCurtain" class="fixed inset-0 z-[9999] flex pointer-events-none">
      <div class="w-1/2 h-full bg-[linear-gradient(135deg,#ffffff,#e7e1d6)] shadow-[inset_0_0_60px_rgba(111,131,111,0.2)] animate-[openLeft_4.5s_cubic-bezier(.77,0,.175,1)_forwards]"></div>
      <div class="w-1/2 h-full bg-[linear-gradient(135deg,#ffffff,#e7e1d6)] shadow-[inset_0_0_60px_rgba(111,131,111,0.2)] animate-[openRight_4.5s_cubic-bezier(.77,0,.175,1)_forwards]"></div>

      <!-- Emblem -->
      <div class="absolute inset-0 flex items-center justify-center animate-[emblemFade_3.2s_ease_forwards]">
        <div class="text-[4rem] bg-[linear-gradient(135deg,#C9A45B,#E6C77A,#6F836F)] text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]">❖</div>
      </div>
    </div>

    <!-- Sparkles -->
    <div v-if="showSparkle" class="fixed inset-0 z-[9998] pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="absolute w-[6px] h-[6px] rounded-full opacity-0 bg-[radial-gradient(circle,#fff,#d8d2c6)] drop-shadow-[0_0_6px_rgba(111,131,111,0.4)] animate-[sparkleAnim_3.5s_ease_forwards]"
        :style="{
          left: s.x + '%',
          top: s.y + '%',
          animationDelay: s.delay + 's'
        }"
      />
    </div>

    <!-- Video Effect Foreground -->
    <div class="fixed inset-0 z-[15] pointer-events-none opacity-[0.12]" aria-hidden="true">
      <video
        :src="videoUrl"
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover scale-[1.08]"
      />
    </div>

    <!-- Main Content -->
    <main class="relative z-10 mx-auto max-w-lg min-h-screen px-5 bg-[linear-gradient(180deg,rgba(255,255,255,.88),rgba(255,255,255,.76)),radial-gradient(circle_at_top,#f1ede4_0%,#e6dfd3_55%,#d8d2c6_100%)] shadow-[0_18px_50px_rgba(63,51,40,0.15)] border border-[rgba(111,131,111,0.18)] rounded-[24px] lg:max-w-[60rem]">
      <Header />
      <div class="space-y-4 pb-20">
        <Countdown />
        <Location />
        <Calendar />
        <Timeline />
        <Gallery />
        <Hashtag />
        <RSVP />
        <Wishes />
      </div>

      <footer class="text-center pb-12 opacity-40">
        <div class="font-khmer-title text-blue-900 text-sm">សូមអរគុណ</div>
        <div class="text-xs text-blue-700 mt-2">❖ ❀ ❖</div>
        <a
          class="inline-block mt-3 text-[11px] tracking-[0.08em] uppercase text-blue-700 no-underline hover:underline"
          href="https://dongdarong.github.io/dd-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2026 Dong Darong
        </a>
        <div class="flex justify-center mt-3 opacity-85">
          <router-link to="/admin" class="inline-flex items-center justify-center px-[14px] py-2 rounded-full text-[12px] tracking-[0.08em] uppercase text-white bg-[linear-gradient(135deg,#C9A45B,#6F836F)] shadow-[0_10px_18px_rgba(111,131,111,0.3)] active:translate-y-[1px]">
            Admin Page
          </router-link>
        </div>
      </footer>
    </main>

    <audio
      ref="audioRef"
      :src="audioUrl"
      autoplay
      loop
      playsinline
    />

    <div v-if="showAudioGate" class="fixed inset-0 z-[10000] bg-[radial-gradient(circle_at_top,#f5f0e6,#e6dfd3_55%,#d8d2c6_100%)] flex items-center justify-center">
      <div
        v-if="showButterfly"
        class="absolute left-[20%] bottom-[18%] w-[34px] h-[24px] rounded-full bg-[radial-gradient(circle_at_30%_50%,#f8c9d6_0_60%,transparent_61%),radial-gradient(circle_at_70%_50%,#f8c9d6_0_60%,transparent_61%),radial-gradient(circle_at_50%_60%,#c58c7a_0_30%,transparent_31%)] drop-shadow-[0_4px_10px_rgba(138,109,59,0.2)] animate-[butterflyFly_2.2s_ease_forwards]"
        aria-hidden="true"
      ></div>
      <div v-if="showStar" class="absolute right-[18%] top-[18%] text-[48px] text-[#d8d2c6] drop-shadow-[0_0_16px_rgba(111,131,111,0.6)] animate-[starPop_1.8s_ease_forwards]" aria-hidden="true">*</div>
      <button class="bg-[linear-gradient(135deg,#C9A45B,#6F836F)] text-white border-none px-[22px] py-[14px] rounded-full text-[13px] tracking-[0.1em] uppercase shadow-[0_10px_22px_rgba(138,109,59,0.25)] active:translate-y-[1px]" @click="startAudio">
        Tap to Enter
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Header from '../components/Header.vue'
import Countdown from '../components/Countdown.vue'
import Location from '../components/Location.vue'
import Calendar from '../components/Calendar.vue'
import Timeline from '../components/Timeline.vue'
import Gallery from '../components/Gallery.vue'
import RSVP from '../components/RSVP.vue'
import Wishes from '../components/Wishes.vue'
import Hashtag from '../components/Hashtag.vue'

const showCurtain = ref(true)
const showSparkle = ref(false)
const sparkles = ref([])
const audioRef = ref(null)
const audioUrl = new URL('../assets/eternal-love-flower.mp3', import.meta.url).href
const videoUrl = new URL('../assets/video-effects/effects1.mp4', import.meta.url).href
const showAudioGate = ref(true)
const showButterfly = ref(false)
const showStar = ref(false)

function createSparkles() {
  sparkles.value = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1.5
  }))
}

async function tryPlayAudio() {
  if (!audioRef.value) return
  try {
    await audioRef.value.play()
    return true
  } catch {
    return false
  }
}

async function startAudio() {
  showButterfly.value = true
  showStar.value = true
  await tryPlayAudio()
  setTimeout(() => {
    showButterfly.value = false
    showStar.value = false
    showAudioGate.value = false
  }, 2200)
}

onMounted(() => {
  createSparkles()
  tryPlayAudio().then((ok) => {
    if (ok) showAudioGate.value = false
  })

  // sparkles appear after curtain opens
  setTimeout(() => {
    showSparkle.value = true
  }, 4800)

  // remove curtain
  setTimeout(() => {
    showCurtain.value = false
  }, 5200)

  // remove sparkles
  setTimeout(() => {
    showSparkle.value = false
  }, 9000)
})
</script>

