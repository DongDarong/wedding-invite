<script setup>
import { useLanguage } from '../composables/useLanguage'

const { isKh } = useLanguage()

const events = [
  {
    id: 'fri-procession',
    dayKh: 'ថ្ងៃសុក្រ ទី២៧ ខែកម្ភៈ ឆ្នាំ២០២៦',
    dayEn: 'Friday (February, 2026)',
    timeKh: 'ម៉ោង៖០១:០០ ល្ងាច',
    titleKh: 'ពិធីហែរជំនូន',
    timeEn: '01:00 PM',
    titleEn: 'Wedding Procession Ceremony'
  },
  {
    id: 'fri-haircut',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖០២:០០ ល្ងាច',
    titleKh: 'ពិធីកាត់សក់កូនប្រុស និង កូនស្រី',
    timeEn: '02:00 PM',
    titleEn: 'Hair-Cutting Ceremony for Bride and Groom'
  },
  {
    id: 'fri-chant',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖០៣:៣០នាទី ល្ងាច',
    titleKh: 'ពិធីសូត្រមន្ត',
    timeEn: '03:30 PM',
    titleEn: 'Blessing Chant Ceremony'
  },
  {
    id: 'fri-meal',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖ ០៤:៣០ ល្ងាច ដល់​ ម៉ោង៖ ០៥:០០ ល្ងាច',
    titleKh: 'ពិសាបាយជុំគ្នា',
    timeEn: '04:30 PM - 05:00 PM',
    titleEn: 'Family Meal Together'
  },
  {
    id: 'fri-betel',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖ ០៦:០០ ល្ងាច',
    titleKh: 'កាត់ខាន់ស្លា',
    timeEn: '06:00 PM',
    titleEn: 'Betel-Leaf Cutting Ceremony'
  },
  {
    id: 'sat-auspicious-time',
    dayKh: 'ថ្ងៃសៅរ៍ ទី២៨ ខែកម្ភៈ ឆ្នាំ២០២៦',
    dayEn: 'Saturday (February, 2026)',
    timeKh: 'ម៉ោង៖ ០៥:០០ ព្រឹក',
    titleKh: 'ពិធីយកវេលា',
    timeEn: '05:00 AM',
    titleEn: 'Auspicious Time Ceremony'
  },
  {
    id: 'sat-blessing',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖ ០៧:០០ ព្រឹក',
    titleKh: 'សែនសិនព្រេនចងដៃ  បាចផ្កាស្លា  ព្រះថោងតោងស្បៃ',
    timeEn: '07:00 AM',
    titleEn: 'Wrist-Tying, Flower Scattering, and Traditional Rituals'
  },
  {
    id: 'sat-reception-meal',
    dayKh: '',
    dayEn: '',
    timeKh: 'ម៉ោង៖ ១១:៣០ ព្រឹក',
    titleKh: 'អញ្ជើញភ្ញៀវទទួលទានអាហារ',
    timeEn: '11:30 AM',
    titleEn: 'Invite Guests for Meal Reception'
  }
]
</script>

<template>
  <section class="animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">{{ isKh ? 'កម្មវិធីមង្គលការ' : 'Wedding Program' }}</h3>
      <p class="text-xs tracking-[0.06em] text-[#d4bb86]/75 mt-1 max-[390px]:text-[10px]">
        {{ isKh ? 'លំដាប់ពិធីនៅថ្ងៃមង្គលការ' : 'Ceremony Timeline' }}
      </p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <div class="temple-panel royal-scroll p-6 sm:p-8 max-[390px]:p-4">
        <div class="space-y-6 max-[390px]:space-y-5">
          <article
            v-for="(event, index) in events"
            :key="event.id"
            class="relative pl-8 max-[390px]:pl-6"
          >
            <p
              v-if="event.dayKh"
              class="font-khmer-title text-base text-[#f2cd84] mb-2 max-[390px]:text-sm"
            >
              {{ isKh ? event.dayKh : event.dayEn }}
            </p>

            <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full border border-[#f2cd84] bg-[#a87c33]/50 shadow-[0_0_10px_rgba(242,205,132,0.6)]"></div>
            <div v-if="index < events.length - 1" class="absolute left-[7px] top-5 w-[1px] h-[calc(100%+26px)] bg-[#caa861]/35"></div>

            <p class="font-khmer-body text-sm text-[#f3ddb0] max-[390px]:text-xs">{{ isKh ? event.timeKh : event.timeEn }}</p>
            <p class="font-khmer-title text-lg text-[#f5dfb3] mt-1 max-[390px]:text-base">{{ isKh ? event.titleKh : event.titleEn }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
