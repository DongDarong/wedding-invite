<script setup>
import { computed, onMounted, ref } from 'vue'
import { db } from '../firebase'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useLanguage } from '../composables/useLanguage'

const { isKh } = useLanguage()
const name = ref('')
const message = ref('')
const messages = ref([])
const status = ref('')
const sending = ref(false)

const latestMessages = computed(() => messages.value.slice(0, 6))

async function submitWish() {
  status.value = ''

  if (!name.value || !message.value) {
    status.value = isKh.value
      ? 'សូមបញ្ចូលឈ្មោះ និងពាក្យជូនពរ'
      : 'Please enter your name and message.'
    return
  }

  sending.value = true

  try {
    await addDoc(collection(db, 'messages'), {
      name: name.value,
      text: message.value,
      time: Date.now()
    })

    status.value = isKh.value
      ? 'សូមអរគុណសម្រាប់ពាក្យជូនពរ'
      : 'Thank you for your blessing message.'
    name.value = ''
    message.value = ''
  } catch {
    status.value = isKh.value
      ? 'មិនអាចផ្ញើសារបាន សូមព្យាយាមម្ដងទៀត'
      : 'Unable to send message. Please try again.'
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
            <h3 class="font-engraved text-xl sm:text-2xl blessing-title">{{ isKh ? 'ផ្ញើសារជូនពរ' : 'Send Your Blessings' }}</h3>
            <p class="blessing-subtitle text-[11px] sm:text-xs tracking-[0.06em] mt-2">{{ isKh ? 'សូមទុកពាក្យជូនពរ' : 'Send a greeting message' }}</p>
          </div>

          <form class="wishes-form mt-5 sm:mt-6 space-y-3 sm:space-y-4" @submit.prevent="submitWish">
            <input
              v-model="name"
              class="blessing-input"
              :placeholder="isKh ? 'ឈ្មោះ' : 'Name'"
            >
            <textarea
              v-model="message"
              rows="5"
              class="blessing-input blessing-textarea"
              :placeholder="isKh ? 'សូមសរសេរពាក្យជូនពរ' : 'Write your blessing message'"
            ></textarea>

            <button
              type="submit"
              class="blessing-button w-full rounded-xl px-5 py-3 font-khmer-body text-xs tracking-[0.06em] transition"
              :disabled="sending"
            >
              {{ sending ? (isKh ? 'កំពុងផ្ញើ...' : 'Sending...') : (isKh ? 'ផ្ញើពាក្យជូនពរ' : 'Send Message') }}
            </button>

            <p v-if="status" class="blessing-status text-sm text-center break-words">{{ status }}</p>
          </form>

          <div class="mt-6 sm:mt-7">
            <p class="blessing-recent-label font-khmer-body text-xs tracking-[0.06em] text-center mb-3">
              {{ isKh ? 'សារជូនពរចុងក្រោយ' : 'Recent Messages' }}
            </p>
            <div class="wishes-list space-y-2.5 sm:space-y-3 max-h-[290px] sm:max-h-[320px] overflow-auto pr-1">
              <article
                v-for="wish in latestMessages"
                :key="wish.id"
                class="blessing-note rounded-xl px-4 py-3"
              >
                <p class="blessing-note-name font-khmer-title text-sm">{{ wish.name || (isKh ? 'ភ្ញៀវ' : 'Guest') }}</p>
                <p class="blessing-note-text text-sm mt-1 whitespace-pre-wrap break-words">{{ wish.text || '' }}</p>
              </article>

              <p v-if="latestMessages.length === 0" class="blessing-empty text-sm text-center py-4">
                {{ isKh ? 'មិនទាន់មានសារជូនពរ' : 'No messages yet.' }}
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

.wishes-section {
  --wish-black: var(--royal-black);
  --wish-night: var(--royal-night);
  --wish-gold: var(--royal-gold);
  --wish-gold-light: var(--royal-gold-light);
  --wish-gold-dark: var(--royal-gold-dark);
  --wish-smoke: var(--smoke);
  --wish-ink: var(--ink);
  --wish-panel: var(--panel);
  --wish-panel-soft: var(--panel-soft);
  --wish-line: var(--line);
}

.blessing-shell::before {
  content: '';
  position: absolute;
  inset: -2rem -1rem auto;
  height: 11rem;
  background: radial-gradient(circle at center, rgba(232, 207, 144, 0.22), transparent 68%);
  filter: blur(18px);
  pointer-events: none;
}

.blessing-frame {
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--wish-gold) 90%, transparent) 0%,
    color-mix(in srgb, var(--wish-gold-light) 84%, transparent) 30%,
    color-mix(in srgb, var(--wish-night) 86%, transparent) 58%,
    color-mix(in srgb, var(--wish-gold-dark) 84%, transparent) 100%
  );
  box-shadow:
    0 26px 60px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px color-mix(in srgb, var(--wish-gold) 24%, transparent);
}

.blessing-panel {
  background:
    radial-gradient(circle at 30% 12%, rgba(232, 207, 144, 0.16), transparent 38%),
    linear-gradient(165deg, var(--wish-night) 0%, var(--wish-smoke) 44%, var(--wish-night) 100%);
  border: 1px solid color-mix(in srgb, var(--wish-gold) 24%, transparent);
  box-shadow:
    inset 0 12px 24px color-mix(in srgb, var(--wish-gold) 8%, transparent),
    inset 0 -18px 26px rgba(0, 0, 0, 0.45);
}

.blessing-title {
  color: var(--wish-gold-light);
  text-shadow:
    0 1px 0 var(--wish-gold-dark),
    0 10px 24px rgba(0, 0, 0, 0.65),
    0 0 14px rgba(232, 207, 144, 0.24);
}

.blessing-input {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid color-mix(in srgb, var(--wish-gold) 28%, transparent);
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--wish-black) 94%, transparent), color-mix(in srgb, var(--wish-night) 95%, transparent)),
    radial-gradient(circle at top, color-mix(in srgb, var(--wish-gold) 8%, transparent), transparent 42%);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--wish-gold) 8%, transparent),
    inset 0 -14px 24px rgba(0, 0, 0, 0.42);
  color: var(--wish-gold-light);
  padding: 0.78rem 0.95rem;
  transition: all 180ms ease;
}

.blessing-input:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--wish-gold) 62%, transparent);
  box-shadow:
    0 0 0 3px rgba(232, 207, 144, 0.16),
    inset 0 1px 0 color-mix(in srgb, var(--wish-gold) 10%, transparent);
}

.blessing-input::placeholder {
  color: color-mix(in srgb, var(--wish-gold) 50%, transparent);
}

.blessing-textarea {
  min-height: 7.2rem;
  resize: vertical;
}

.blessing-button {
  border: 1px solid color-mix(in srgb, var(--wish-gold) 45%, transparent);
  background: linear-gradient(135deg, var(--wish-gold-light) 0%, var(--wish-gold) 42%, var(--wish-gold-dark) 100%);
  color: var(--wish-night);
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 color-mix(in srgb, var(--wish-gold) 50%, transparent);
}

.blessing-button:hover:not(:disabled) {
  filter: brightness(1.04);
  transform: translateY(-1px);
}

.blessing-button:disabled {
  opacity: 0.62;
}

.blessing-note {
  border: 1px solid color-mix(in srgb, var(--wish-gold) 18%, transparent);
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--wish-black) 94%, transparent), color-mix(in srgb, var(--wish-night) 96%, transparent));
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--wish-gold) 8%, transparent),
    0 10px 16px rgba(0, 0, 0, 0.34);
}

.blessing-subtitle {
  color: color-mix(in srgb, var(--wish-gold) 80%, transparent);
}

.blessing-status {
  color: var(--wish-gold-light);
}

.blessing-recent-label {
  color: color-mix(in srgb, var(--wish-gold) 85%, transparent);
}

.blessing-note-name {
  color: var(--wish-gold-light);
}

.blessing-note-text {
  color: color-mix(in srgb, var(--wish-gold-dark) 90%, transparent);
}

.blessing-empty {
  color: color-mix(in srgb, var(--wish-gold) 75%, transparent);
}

.wishes-list::-webkit-scrollbar {
  width: 6px;
}

.wishes-list::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--wish-gold-light), var(--wish-gold-dark));
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
