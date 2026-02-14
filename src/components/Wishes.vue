<script setup>
import { computed, onMounted, ref } from 'vue'
import { db } from '../firebase'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const name = ref('')
const message = ref('')
const messages = ref([])
const status = ref('')
const sending = ref(false)

const latestMessages = computed(() => messages.value.slice(0, 6))

async function submitWish() {
  status.value = ''

  if (!name.value || !message.value) {
    status.value = 'សូមបញ្ចូលឈ្មោះ និងពាក្យជូនពរ'
    return
  }

  sending.value = true

  try {
    await addDoc(collection(db, 'messages'), {
      name: name.value,
      text: message.value,
      time: Date.now()
    })

    status.value = 'សូមអរគុណសម្រាប់ពាក្យជូនពរ'
    name.value = ''
    message.value = ''
  } catch (error) {
    status.value = 'មិនអាចផ្ញើសារបាន សូមព្យាយាមម្ដងទៀត'
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  onSnapshot(query(collection(db, 'messages'), orderBy('time', 'desc')), (snapshot) => {
    messages.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})
</script>

<template>
  <section class="wishes-section animate-[fade-up_1.5s_ease]">
    <div class="blessing-shell max-w-4xl mx-auto">
      <div class="blessing-frame p-[1px] rounded-[24px]">
        <div class="blessing-panel rounded-[23px] p-5 sm:p-7">
          <div class="text-center">
            <h3 class="font-engraved text-xl sm:text-2xl blessing-title">ផ្ញើរសារជូនពរ</h3>
            <p class="text-[11px] sm:text-xs tracking-[0.06em] text-[#2D4339]/80 mt-2">Send a greeting message</p>
          </div>

          <form class="wishes-form mt-5 sm:mt-6 space-y-3 sm:space-y-4" @submit.prevent="submitWish">
            <input
              v-model="name"
              class="blessing-input"
              placeholder="ឈ្មោះ"
            >
            <textarea
              v-model="message"
              rows="5"
              class="blessing-input blessing-textarea"
              placeholder="សូមសរសេរពាក្យជូនពរ"
            ></textarea>

            <button
              type="submit"
              class="blessing-button w-full rounded-xl px-5 py-3 font-khmer-body text-xs tracking-[0.06em] transition"
              :disabled="sending"
            >
              {{ sending ? 'កំពុងផ្ញើ...' : 'ផ្ញើពាក្យជូនពរ' }}
            </button>

            <p v-if="status" class="text-sm text-center text-[#1F3529] break-words">{{ status }}</p>
          </form>

          <div class="mt-6 sm:mt-7">
            <p class="font-khmer-body text-xs tracking-[0.06em] text-[#2D4339]/85 text-center mb-3">
              សារជូនពរចុងក្រោយ
            </p>
            <div class="wishes-list space-y-2.5 sm:space-y-3 max-h-[290px] sm:max-h-[320px] overflow-auto pr-1">
              <article
                v-for="wish in latestMessages"
                :key="wish.id"
                class="blessing-note rounded-xl px-4 py-3"
              >
                <p class="font-khmer-title text-sm text-[#1F3529]">{{ wish.name || 'ភ្ញៀវ' }}</p>
                <p class="text-sm text-[#1B2820]/90 mt-1 whitespace-pre-wrap break-words">{{ wish.text || '' }}</p>
              </article>

              <p v-if="latestMessages.length === 0" class="text-sm text-[#2D4339]/75 text-center py-4">
                មិនទាន់មានសារជូនពរ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blessing-shell {
  position: relative;
}

.blessing-shell::before {
  content: '';
  position: absolute;
  inset: -2rem -1rem auto;
  height: 11rem;
  background: radial-gradient(circle at center, rgba(45, 67, 57, 0.22), transparent 68%);
  filter: blur(18px);
  pointer-events: none;
}

.blessing-frame {
  background: linear-gradient(
    140deg,
    rgba(31, 53, 41, 0.9) 0%,
    rgba(45, 67, 57, 0.84) 30%,
    rgba(111, 78, 37, 0.9) 58%,
    rgba(27, 40, 32, 0.84) 100%
  );
  box-shadow:
    0 26px 60px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(31, 53, 41, 0.24);
}

.blessing-panel {
  background:
    radial-gradient(circle at 30% 12%, rgba(45, 67, 57, 0.16), transparent 38%),
    linear-gradient(165deg, #2a1d10 0%, #3a2916 44%, #2a1d10 100%);
  border: 1px solid rgba(31, 53, 41, 0.24);
  box-shadow:
    inset 0 12px 24px rgba(31, 53, 41, 0.08),
    inset 0 -18px 26px rgba(0, 0, 0, 0.45);
}

.blessing-title {
  color: #1F3529;
  text-shadow:
    0 1px 0 #7f5a22,
    0 10px 24px rgba(0, 0, 0, 0.65),
    0 0 14px rgba(45, 67, 57, 0.24);
}

.blessing-input {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid rgba(31, 53, 41, 0.28);
  background:
    linear-gradient(160deg, rgba(36, 25, 14, 0.94), rgba(22, 16, 10, 0.95)),
    radial-gradient(circle at top, rgba(31, 53, 41, 0.08), transparent 42%);
  box-shadow:
    inset 0 1px 0 rgba(31, 53, 41, 0.08),
    inset 0 -14px 24px rgba(0, 0, 0, 0.42);
  color: #1F3529;
  padding: 0.78rem 0.95rem;
  transition: all 180ms ease;
}

.blessing-input:focus {
  outline: none;
  border-color: rgba(31, 53, 41, 0.62);
  box-shadow:
    0 0 0 3px rgba(45, 67, 57, 0.16),
    inset 0 1px 0 rgba(31, 53, 41, 0.1);
}

.blessing-input::placeholder {
  color: rgba(31, 53, 41, 0.5);
}

.blessing-textarea {
  min-height: 7.2rem;
  resize: vertical;
}

.blessing-button {
  border: 1px solid rgba(31, 53, 41, 0.45);
  background: linear-gradient(135deg, #1F3529 0%, #2D4339 42%, #8f6430 100%);
  color: #2c1f10;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(31, 53, 41, 0.5);
}

.blessing-button:hover:not(:disabled) {
  filter: brightness(1.04);
  transform: translateY(-1px);
}

.blessing-button:disabled {
  opacity: 0.62;
}

.blessing-note {
  border: 1px solid rgba(31, 53, 41, 0.18);
  background:
    linear-gradient(160deg, rgba(39, 27, 15, 0.94), rgba(24, 17, 10, 0.96));
  box-shadow:
    inset 0 1px 0 rgba(31, 53, 41, 0.08),
    0 10px 16px rgba(0, 0, 0, 0.34);
}

.wishes-list::-webkit-scrollbar {
  width: 6px;
}

.wishes-list::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #1F3529, #8f6430);
  border-radius: 999px;
}

@media (max-width: 480px) {
  .blessing-panel {
    padding: 1rem;
  }

  .blessing-title {
    font-size: 1.15rem;
  }

  .blessing-input {
    min-height: 2.72rem;
    font-size: 0.9rem;
  }

  .blessing-textarea {
    min-height: 5.8rem;
  }
}

@media (max-width: 430px) {
  .blessing-panel {
    padding: 0.95rem;
  }

  .blessing-input {
    min-height: 2.64rem;
    font-size: 0.86rem;
    padding: 0.7rem 0.78rem;
  }

  .blessing-textarea {
    min-height: 5.4rem;
  }

  .blessing-button {
    min-height: 2.62rem;
    font-size: 0.66rem;
    letter-spacing: 0.1em;
  }

  .wishes-list {
    max-height: 250px;
  }
}

@media (max-width: 414px) {
  .blessing-panel {
    padding: 0.88rem;
  }

  .blessing-input {
    min-height: 2.58rem;
    font-size: 0.84rem;
  }

  .blessing-button {
    min-height: 2.54rem;
    font-size: 0.62rem;
  }
}

@media (max-width: 390px) {
  .blessing-panel {
    padding: 0.82rem;
  }

  .blessing-title {
    font-size: 1.02rem;
  }

  .blessing-input {
    min-height: 2.48rem;
    font-size: 0.82rem;
    padding: 0.56rem 0.68rem;
  }

  .blessing-textarea {
    min-height: 5rem;
  }

  .blessing-button {
    min-height: 2.44rem;
    font-size: 0.6rem;
  }

  .wishes-list {
    max-height: 232px;
  }
}

@media (max-width: 375px) {
  .blessing-input {
    min-height: 2.4rem;
    font-size: 0.8rem;
    padding: 0.52rem 0.64rem;
  }

  .blessing-button {
    min-height: 2.36rem;
    font-size: 0.58rem;
  }

  .wishes-list {
    max-height: 220px;
  }
}

@media (max-width: 360px) {
  .blessing-panel {
    padding: 0.74rem;
  }

  .blessing-input {
    min-height: 2.34rem;
    font-size: 0.78rem;
    padding: 0.48rem 0.6rem;
  }

  .blessing-textarea {
    min-height: 4.6rem;
  }

  .blessing-button {
    min-height: 2.3rem;
    font-size: 0.56rem;
    letter-spacing: 0.08em;
  }

  .wishes-list {
    max-height: 210px;
  }
}

@media (max-width: 320px) {
  .blessing-title {
    font-size: 0.94rem;
  }

  .blessing-input {
    min-height: 2.24rem;
    font-size: 0.74rem;
    padding: 0.44rem 0.52rem;
  }

  .blessing-button {
    min-height: 2.22rem;
    font-size: 0.52rem;
    letter-spacing: 0.06em;
  }

  .wishes-list {
    max-height: 188px;
  }
}
</style>
