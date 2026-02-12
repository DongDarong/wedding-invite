<script setup>
const events = [
  {
    timeKh: '០៧:៣០ ព្រឹក',
    titleKh: 'ទទួលភ្ញៀវកិត្តិយស',
    timeEn: '០៧:៣០ ព្រឹក',
    titleEn: 'ទទួលភ្ញៀវកិត្តិយស'
  },
  {
    timeKh: '០៨:៣០ ព្រឹក',
    titleKh: 'ពិធីបួងសួង និងសំពះផ្ទឹម',
    timeEn: '០៨:៣០ ព្រឹក',
    titleEn: 'ពិធីបួងសួង និងសំពះផ្ទឹម'
  },
  {
    timeKh: '១០:០០ ព្រឹក',
    titleKh: 'ពិធីចងដៃប្រពៃណីខ្មែរ',
    timeEn: '១០:០០ ព្រឹក',
    titleEn: 'ពិធីចងដៃប្រពៃណីខ្មែរ'
  },
  {
    timeKh: '១១:៣០ ថ្ងៃត្រង់',
    titleKh: 'អាហារសាមគ្គី និងថតរូប',
    timeEn: '១១:៣០ ថ្ងៃត្រង់',
    titleEn: 'អាហារសាមគ្គី និងថតរូប'
  }
]
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">កម្មវិធីពិធីការ</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">លំដាប់ពេលវេលាពិធី</p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <div class="temple-panel royal-scroll p-6 sm:p-8 max-[390px]:p-4">
        <div class="space-y-6 max-[390px]:space-y-5">
          <article
            v-for="(event, index) in events"
            :key="event.timeEn"
            class="relative pl-8 max-[390px]:pl-6"
          >
            <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full border border-[#f2cd84] bg-[#a87c33]/50 shadow-[0_0_10px_rgba(242,205,132,0.6)]"></div>
            <div v-if="index < events.length - 1" class="absolute left-[7px] top-5 w-[1px] h-[calc(100%+26px)] bg-[#caa861]/35"></div>

            <p class="font-khmer-body text-sm text-[#f3ddb0] max-[390px]:text-xs">{{ event.timeKh }}</p>
            <p class="font-khmer-title text-lg text-[#f5dfb3] mt-1 max-[390px]:text-base">{{ event.titleKh }}</p>
            <p class="font-khmer-body text-[11px] tracking-[0.05em] text-[#c9a45b] mt-2 max-[390px]:text-[10px]">
              {{ event.timeEn }} • {{ event.titleEn }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
