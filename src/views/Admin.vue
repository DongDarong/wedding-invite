<template>
  <div class="min-h-screen px-5 py-10 admin-bg text-[#f4ddb2]">
    <div class="admin-overlay"></div>
    <div class="mx-auto max-w-3xl admin-container relative z-10">
      <header class="flex items-center justify-between gap-4 mb-8 animate-[fade-up_1.2s_ease]">
        <div>
          <h1 class="text-2xl font-engraved gold-title">Admin Dashboard</h1>
          <p class="text-sm text-[#d3b070]/80">Royal RSVP Registry</p>
        </div>
        <button
          v-if="user"
          class="gold-btn rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition"
          @click="logout"
        >
          Sign out
        </button>
      </header>

      <section v-if="!user" class="temple-frame animate-[fade-up_1.2s_ease]">
        <div class="temple-panel p-6 sm:p-7">
          <h2 class="text-lg font-semibold text-[#f2d6a0] mb-4">Admin sign in</h2>
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

      <section v-else class="space-y-4">
        <div class="temple-frame">
          <div class="temple-panel p-5 sm:p-6 flex items-center justify-between">
            <div>
              <p class="text-sm text-[#cba664]/80">Total RSVPs</p>
              <p class="text-2xl font-semibold text-[#f3ddb0]">{{ total }}</p>
            </div>
            <div>
              <p class="text-sm text-[#cba664]/80">Total Messages</p>
              <p class="text-2xl font-semibold text-[#f3ddb0]">{{ totalMessages }}</p>
            </div>
            <div class="text-right text-xs text-[#cba664]/80">
              Signed in as<br>
              <span class="font-semibold text-[#f3ddb0]">{{ user.email }}</span>
            </div>
          </div>
        </div>

        <div class="temple-frame">
          <div class="temple-panel p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-[#f3ddb0]">RSVP Entries</h2>
              <button class="text-sm text-[#d8b875] hover:text-[#f3ddb0] transition" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="rsvps.length === 0" class="text-sm text-[#d3b070]/80">
              No RSVPs yet.
            </div>

            <div v-else class="table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Guests</th>
                    <th class="text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in rsvps" :key="item.id">
                    <td data-label="Name" class="font-semibold text-[#f3ddb0]">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Attendance" class="text-xs text-[#d3b070]/90">{{ item.attendance || '-' }}</td>
                    <td data-label="Guests" class="text-xs text-[#d3b070]/90">{{ item.guests || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs text-[#c59e5c]/80">{{ formatTime(item.time) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="temple-frame">
          <div class="temple-panel p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-[#f3ddb0]">Messages</h2>
              <button class="text-sm text-[#d8b875] hover:text-[#f3ddb0] transition" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="messages.length === 0" class="text-sm text-[#d3b070]/80">
              No messages yet.
            </div>

            <div v-else class="table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Message</th>
                    <th class="text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in messages" :key="item.id">
                    <td data-label="Name" class="font-semibold text-[#f3ddb0]">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Message" class="text-sm text-[#ead4a8]/90 message-text message-cell">{{ item.text || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs text-[#c59e5c]/80">{{ formatTime(item.time) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const user = ref(null)
const rsvps = ref([])
const messages = ref([])

let unsubscribe = null
let unsubscribeMessages = null
let unsubAuth = null

const total = computed(() => rsvps.value.length)
const totalMessages = computed(() => messages.value.length)

function formatTime(value) {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return '-'
  }
}

function startListening() {
  if (unsubscribe || unsubscribeMessages) return

  const rsvpQuery = query(collection(db, 'rsvp'), orderBy('time', 'desc'))
  unsubscribe = onSnapshot(
    rsvpQuery,
    (snap) => {
      rsvps.value = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    },
    (err) => {
      error.value = err.message || 'Failed to load RSVPs.'
    }
  )

  const messageQuery = query(collection(db, 'messages'), orderBy('time', 'desc'))
  unsubscribeMessages = onSnapshot(
    messageQuery,
    (snap) => {
      messages.value = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
    },
    (err) => {
      error.value = err.message || 'Failed to load messages.'
    }
  )
}

function stopListening() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  if (unsubscribeMessages) {
    unsubscribeMessages()
    unsubscribeMessages = null
  }
  rsvps.value = []
  messages.value = []
}

async function login() {
  error.value = ''
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (err) {
    error.value = err?.message || 'Sign in failed.'
  } finally {
    loading.value = false
  }
}

async function logout() {
  await signOut(auth)
}

function refresh() {
  stopListening()
  if (user.value) startListening()
}

onMounted(() => {
  unsubAuth = onAuthStateChanged(auth, (u) => {
    user.value = u
    if (u) {
      startListening()
    } else {
      stopListening()
    }
  })
})

onBeforeUnmount(() => {
  if (unsubAuth) unsubAuth()
  stopListening()
})
</script>

<style scoped>
.admin-bg {
  position: relative;
  background:
    radial-gradient(circle at 20% 0%, rgba(178, 34, 34, 0.24), transparent 35%),
    radial-gradient(circle at 90% 15%, rgba(158, 27, 50, 0.16), transparent 35%),
    linear-gradient(140deg, #2a1d10 0%, #1b1309 56%, #3b2916 100%);
}

.admin-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      115deg,
      rgba(178, 34, 34, 0.025) 0,
      rgba(178, 34, 34, 0.025) 2px,
      transparent 2px,
      transparent 6px
    );
  opacity: 0.75;
}

.temple-panel {
  background:
    linear-gradient(130deg, rgba(53, 37, 20, 0.84), rgba(30, 21, 12, 0.9)),
    radial-gradient(circle at 20% 0%, rgba(178, 34, 34, 0.12), transparent 35%);
  border: 1px solid rgba(178, 34, 34, 0.2);
}

.table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(178, 34, 34, 0.26);
  background: linear-gradient(180deg, rgba(41, 29, 16, 0.82), rgba(29, 20, 11, 0.92));
  box-shadow:
    inset 0 1px 0 rgba(178, 34, 34, 0.08),
    0 16px 30px rgba(0, 0, 0, 0.32);
}

.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
}

.admin-table thead th {
  text-align: left;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(178, 34, 34, 0.9);
  background: linear-gradient(180deg, rgba(92, 65, 35, 0.82), rgba(61, 43, 24, 0.9));
  padding: 11px 13px;
  border-bottom: 1px solid rgba(158, 27, 50, 0.35);
  position: sticky;
  top: 0;
  z-index: 1;
}

.admin-table tbody td {
  padding: 12px 13px;
  vertical-align: top;
  border-bottom: 1px solid rgba(158, 27, 50, 0.16);
  background: rgba(34, 24, 14, 0.55);
}

.admin-table tbody tr:nth-child(even) td {
  background: rgba(40, 28, 17, 0.58);
}

.admin-table tbody tr:hover td {
  background: rgba(58, 41, 24, 0.62);
}

.admin-table tbody tr:last-child td {
  border-bottom: none;
}

.message-text {
  margin-top: 4px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
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

  .admin-table thead {
    display: none;
  }

  .admin-table tbody tr {
    display: block;
    padding: 10px 12px;
    margin: 8px 6px;
    border-radius: 10px;
    background: rgba(36, 25, 14, 0.78);
    border-bottom: 1px solid rgba(158, 27, 50, 0.2);
  }

  .admin-table tbody td {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 0;
    border-bottom: 1px dashed rgba(158, 27, 50, 0.18);
    background: transparent;
  }

  .admin-table tbody td::before {
    content: attr(data-label);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(158, 27, 50, 0.88);
  }

  .admin-table tbody tr td:last-child {
    border-bottom: none;
  }

  .message-cell {
    flex-direction: column;
    align-items: flex-start;
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

  .admin-table {
    font-size: 0.85rem;
  }

  .admin-table tbody tr {
    padding: 8px 10px;
  }

  .admin-table tbody td {
    padding: 4px 0;
  }

  .admin-table tbody td::before {
    font-size: 0.64rem;
  }

  .message-text {
    font-size: 0.82rem;
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

@media (max-width: 320px) {
  .admin-table tbody tr {
    padding: 7px 8px;
  }

  .admin-table tbody td {
    padding: 3px 0;
  }

  .admin-table tbody td::before {
    font-size: 0.6rem;
  }

  .admin-table {
    font-size: 0.8rem;
  }
}

@media (min-width: 1024px) {
  .admin-container {
    max-width: 72rem;
  }

  .admin-table thead th,
  .admin-table tbody td {
    padding: 14px 16px;
  }
}
</style>
