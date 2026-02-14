<script setup>
import { ref } from 'vue'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const name = ref('')
const attendance = ref('')
const guests = ref('1')
const status = ref('')
const sending = ref(false)

async function sendRSVP() {
  status.value = ''
  const cleanName = name.value.trim()

  if (!cleanName || !attendance.value) {
    status.value = 'សូមបញ្ចូលឈ្មោះ និងការចូលរួម'
    return
  }

  sending.value = true

  try {
    await addDoc(collection(db, 'rsvp'), {
      name: cleanName,
      attendance: attendance.value,
      guests: guests.value,
      time: Date.now()
    })

    status.value = 'សូមអរគុណសម្រាប់ការឆ្លើយតប'
    name.value = ''
    attendance.value = ''
    guests.value = '1'
  } catch (error) {
    status.value = 'មិនអាចផ្ញើបានទេ សូមព្យាយាមម្ដងទៀត'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="rsvp-section animate-[fade-up_1.5s_ease]">
    <div class="text-center mb-5">
      <h3 class="font-khmer-title text-xl gold-title max-[390px]:text-lg">បញ្ជាក់ការចូលរួម</h3>
      <p class="text-xs tracking-[0.06em] text-[#E6C27A]/80 mt-1 max-[390px]:text-[10px]">Confirm participation</p>
    </div>

    <div class="temple-frame max-w-2xl mx-auto">
      <form class="rsvp-form temple-panel p-5 sm:p-7 space-y-3 max-[390px]:p-4 max-[390px]:space-y-2.5" @submit.prevent="sendRSVP">
        <input v-model="name" class="royal-input" placeholder="ឈ្មោះភ្ញៀវ">

        <select v-model="attendance" class="royal-input">
          <option value="" disabled>ជ្រើសរើសការចូលរួម</option>
          <option value="attending">នឹងចូលរួមដោយក្តីរីករាយ</option>
          <option value="not-attending">មិនអាចចូលរួមបាន</option>
        </select>

        <select v-model="guests" class="royal-input">
          <option value="1">១ នាក់</option>
          <option value="2">២ នាក់</option>
          <option value="3">៣ នាក់</option>
          <option value="4+">៤ នាក់ឡើងទៅ</option>
        </select>


        <button type="submit" class="gold-btn rounded-xl px-5 py-3 w-full font-khmer-body tracking-[0.06em] text-xs transition max-[390px]:text-[10px]" :disabled="sending">
          {{ sending ? 'កំពុងផ្ញើ...' : 'ផ្ញើការបញ្ជាក់' }}
        </button>

        <p v-if="status" class="text-center text-sm text-[#F2D7A1] mt-2 break-words">{{ status }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 480px) {
  .rsvp-section .temple-frame {
    margin-left: 0.15rem;
    margin-right: 0.15rem;
  }

  .rsvp-form {
    padding: 1rem;
    gap: 0.62rem;
  }

  .rsvp-form .royal-input {
    min-height: 2.72rem;
    font-size: 0.92rem;
  }
}

@media (max-width: 430px) {
  .rsvp-section .temple-frame {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }

  .rsvp-form {
    padding: 0.95rem;
    gap: 0.58rem;
  }

  .rsvp-form .royal-input {
    min-height: 2.68rem;
    font-size: 0.88rem;
  }

  .rsvp-form textarea.royal-input {
    min-height: 5.1rem;
  }
}

@media (max-width: 414px) {
  .rsvp-form {
    padding: 0.9rem;
  }

  .rsvp-form .royal-input {
    min-height: 2.62rem;
    font-size: 0.86rem;
  }

  .rsvp-form button {
    min-height: 2.65rem;
    font-size: 0.66rem;
    letter-spacing: 0.11em;
  }
}

@media (max-width: 390px) {
  .rsvp-form {
    padding: 0.82rem;
    gap: 0.52rem;
  }

  .rsvp-form .royal-input {
    font-size: 0.84rem;
    min-height: 2.56rem;
    padding: 0.58rem 0.7rem;
  }

  .rsvp-form textarea.royal-input {
    min-height: 4.8rem;
  }

  .rsvp-form button {
    min-height: 2.56rem;
    font-size: 0.62rem;
  }
}

@media (max-width: 375px) {
  .rsvp-form .royal-input {
    font-size: 0.82rem;
    padding: 0.54rem 0.66rem;
  }

  .rsvp-form button {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
  }
}

@media (max-width: 360px) {
  .rsvp-form {
    padding: 0.76rem;
  }

  .rsvp-form .royal-input {
    min-height: 2.42rem;
    font-size: 0.8rem;
    padding: 0.5rem 0.62rem;
  }

  .rsvp-form textarea.royal-input {
    min-height: 4.5rem;
  }

  .rsvp-form button {
    min-height: 2.46rem;
    font-size: 0.58rem;
  }
}

@media (max-width: 320px) {
  .rsvp-form .royal-input {
    min-height: 2.28rem;
    font-size: 0.76rem;
    padding: 0.46rem 0.54rem;
  }

  .rsvp-form button {
    min-height: 2.32rem;
    font-size: 0.54rem;
    letter-spacing: 0.06em;
  }
}
</style>
