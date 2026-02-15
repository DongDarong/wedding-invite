<template>
  <div class="min-h-screen px-5 py-10 admin-bg admin-ink">
    <div class="admin-overlay"></div>
    <div class="mx-auto max-w-3xl admin-container relative z-10">
      <header class="admin-header flex items-center justify-between gap-4 mb-8 animate-[fade-up_1.2s_ease]">
        <div>
          <h1 class="text-2xl font-engraved gold-title">Admin Login</h1>
          <p class="text-sm admin-muted">Royal RSVP Registry</p>
        </div>
        <router-link
          to="/"
          class="admin-home-btn gold-btn rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition"
        >
          Back to Home
        </router-link>
      </header>

      <section class="temple-frame animate-[fade-up_1.2s_ease]">
        <div class="temple-panel p-6 sm:p-7">
          <h2 class="text-lg font-semibold admin-title mb-4">Admin sign in</h2>
          <div class="space-y-3">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full royal-input"
            >
            <div class="password-field">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="w-full royal-input pr-12"
              >
              <button
                type="button"
                class="password-toggle"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :title="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="showPassword"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="password-icon"
                >
                  <path
                    d="M4 4l16 16M10.7 10.7A3 3 0 0012 15a3 3 0 002.3-1.1M9.9 5.1A10.3 10.3 0 0112 5c5 0 8.6 3.8 10 7-0.6 1.3-1.6 2.8-3.1 4M6.3 7.6C4.6 8.8 3.4 10.4 2 12c1.4 3.2 5 7 10 7 1.5 0 2.8-.3 4-.8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="password-icon"
                >
                  <path
                    d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                </svg>
              </button>
            </div>
            <button
              class="gold-btn w-full rounded-xl py-3 text-xs tracking-[0.14em] uppercase transition"
              :disabled="loading"
              @click="login"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
          <p v-if="error" class="mt-3 text-red-300 text-sm">{{ error }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { syncAuthToken } from '../utils/authToken'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
let unsubAuth = null

async function login() {
  error.value = ''
  loading.value = true
  try {
    const credential = await signInWithEmailAndPassword(auth, email.value, password.value)
    await syncAuthToken(credential.user)
    await router.push('/admin/dashboard')
  } catch (err) {
    error.value = err?.message || 'Sign in failed.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  unsubAuth = onAuthStateChanged(auth, async (user) => {
    await syncAuthToken(user)
    if (user) {
      await router.replace('/admin/dashboard')
    }
  })
})

onBeforeUnmount(() => {
  if (unsubAuth) unsubAuth()
})
</script>

<style scoped>
.admin-bg {
  position: relative;
  background:
    radial-gradient(circle at 20% 0%, var(--royal-night) 0%, transparent 35%),
    radial-gradient(circle at 90% 15%, var(--smoke) 0%, transparent 35%),
    linear-gradient(140deg, var(--royal-black) 0%, var(--smoke) 56%, var(--royal-night) 100%);
}

.admin-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      115deg,
      var(--line) 0,
      var(--line) 2px,
      transparent 2px,
      transparent 6px
    );
  opacity: 0.35;
}

.temple-panel {
  background:
    linear-gradient(130deg, var(--panel), var(--panel-soft)),
    radial-gradient(circle at 20% 0%, var(--royal-night), transparent 35%);
  border: 1px solid var(--line);
}

.admin-ink {
  color: var(--ink);
}

.admin-title {
  color: var(--royal-gold-light);
}

.admin-muted {
  color: var(--royal-gold);
  opacity: 0.8;
}

.password-field {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  opacity: 0.8;
}

.password-toggle:hover {
  opacity: 1;
}

.password-icon {
  width: 1.15rem;
  height: 1.15rem;
}

@media (min-width: 1024px) {
  .admin-container {
    max-width: 56rem;
  }

  .admin-header {
    margin-bottom: 2.2rem;
  }

  .temple-panel {
    padding: 2rem 2.25rem;
  }
}

@media (max-width: 430px) {
  .admin-bg {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .admin-container header h1 {
    font-size: 1.25rem;
  }

  .admin-container header p {
    font-size: 0.75rem;
  }

  .temple-panel {
    padding: 1rem;
  }

  .gold-btn {
    font-size: 0.68rem;
    letter-spacing: 0.11em;
    padding-top: 0.62rem;
    padding-bottom: 0.62rem;
  }
}

@media (max-width: 640px) {
  .admin-bg {
    padding-left: 0.85rem;
    padding-right: 0.85rem;
    padding-top: 1rem;
  }

  .admin-container {
    max-width: 100%;
  }

  .admin-header {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .admin-home-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 390px) {
  .admin-bg {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
  }

  .admin-container header {
    gap: 0.5rem;
  }

  .admin-container header h1 {
    font-size: 1.12rem;
  }

  .admin-container header p {
    font-size: 0.7rem;
  }
}

@media (max-width: 360px) {
  .admin-bg {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .admin-container header {
    align-items: flex-start;
    flex-direction: column;
  }

  .temple-panel {
    padding: 0.86rem;
  }

  .gold-btn {
    width: 100%;
  }
}
</style>

