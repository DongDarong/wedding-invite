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
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full royal-input"
            >
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

