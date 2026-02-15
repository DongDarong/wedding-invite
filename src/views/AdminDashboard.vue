<template>
  <div class="min-h-screen px-5 py-10 admin-bg admin-ink">
    <div class="admin-overlay"></div>
    <div class="mx-auto max-w-3xl admin-container relative z-10">
      <header class="admin-header flex items-center justify-between gap-4 mb-8 animate-[fade-up_1.2s_ease]">
        <div>
          <h1 class="text-2xl font-engraved gold-title">Admin Dashboard</h1>
          <p class="text-sm admin-muted">Royal RSVP Registry</p>
        </div>
        <button
          class="admin-signout-btn gold-btn rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition"
          @click="logout"
        >
          Sign out
        </button>
      </header>

      <section class="space-y-4">
        <div class="temple-frame">
          <div class="temple-panel summary-grid p-5 sm:p-6 flex items-center justify-between">
            <div>
              <p class="text-sm admin-muted">Total RSVPs</p>
              <p class="text-2xl font-semibold admin-title">{{ total }}</p>
            </div>
            <div>
              <p class="text-sm admin-muted">Total Messages</p>
              <p class="text-2xl font-semibold admin-title">{{ totalMessages }}</p>
            </div>
            <div class="summary-account text-right text-xs admin-muted">
              Signed in as<br>
              <span class="font-semibold admin-title">{{ user?.email }}</span>
            </div>
          </div>
        </div>

        <div class="temple-frame">
          <div class="temple-panel p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold admin-title">RSVP Entries</h2>
              <button class="text-sm admin-action transition" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="rsvps.length === 0" class="text-sm admin-muted">
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
                    <td data-label="Name" class="font-semibold admin-title">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Attendance" class="text-xs admin-muted-strong">{{ item.attendance || '-' }}</td>
                    <td data-label="Guests" class="text-xs admin-muted-strong">{{ item.guests || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs admin-time">{{ formatTime(item.time) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="temple-frame">
          <div class="temple-panel p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold admin-title">Messages</h2>
              <button class="text-sm admin-action transition" @click="refresh">
                Refresh
              </button>
            </div>

            <div v-if="messages.length === 0" class="text-sm admin-muted">
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
                    <td data-label="Name" class="font-semibold admin-title">{{ item.name || 'Unknown' }}</td>
                    <td data-label="Message" class="text-sm admin-ink-soft message-text message-cell">{{ item.text || '-' }}</td>
                    <td data-label="Time" class="text-right text-xs admin-time">{{ formatTime(item.time) }}</td>
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
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { clearAuthToken, syncAuthToken } from '../utils/authToken'

const router = useRouter()

const user = ref(null)
const error = ref('')
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

async function logout() {
  await signOut(auth)
  clearAuthToken()
  await router.push('/admin')
}

function refresh() {
  stopListening()
  if (user.value) startListening()
}

onMounted(() => {
  unsubAuth = onAuthStateChanged(auth, async (u) => {
    user.value = u
    await syncAuthToken(u)
    if (u) {
      startListening()
    } else {
      stopListening()
      await router.replace('/admin')
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

.table-wrap {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid var(--line);
  background:
    radial-gradient(circle at 100% 0, rgba(232, 207, 144, 0.08), transparent 38%),
    linear-gradient(180deg, var(--panel), var(--panel-soft));
  box-shadow:
    inset 0 1px 0 rgba(232, 207, 144, 0.2),
    0 14px 28px rgba(0, 0, 0, 0.28);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
}

.admin-table thead th {
  text-align: left;
  font-size: 0.72rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--royal-black);
  background:
    linear-gradient(180deg, rgba(232, 207, 144, 0.98), rgba(201, 164, 91, 0.95));
  padding: 12px 14px;
  border-bottom: 1px solid rgba(126, 100, 45, 0.55);
  position: sticky;
  top: 0;
  z-index: 1;
}

.admin-table tbody td {
  padding: 12px 14px;
  vertical-align: top;
  border-bottom: 1px solid rgba(201, 164, 91, 0.18);
  background: rgba(26, 42, 34, 0.52);
  transition: background-color 0.2s ease;
}

.admin-table tbody tr:nth-child(even) td {
  background: rgba(20, 34, 28, 0.58);
}

.admin-table tbody tr:hover td {
  background: rgba(26, 44, 35, 0.82);
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

.admin-ink {
  color: var(--ink);
}

.admin-ink-soft {
  color: var(--ink);
  opacity: 0.9;
}

.admin-title {
  color: var(--royal-gold-light);
}

.admin-muted {
  color: var(--royal-gold);
  opacity: 0.8;
}

.admin-muted-strong {
  color: var(--royal-gold);
  opacity: 0.9;
}

.admin-time {
  color: var(--royal-gold-dark);
  opacity: 0.85;
}

.admin-action {
  color: var(--royal-gold);
}

.admin-action:hover {
  color: var(--royal-gold-light);
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

  .admin-signout-btn {
    width: 100%;
  }

  .summary-grid {
    display: grid;
    gap: 0.9rem;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .summary-account {
    grid-column: 1 / -1;
    text-align: left;
  }

  .admin-table thead {
    display: none;
  }

  .admin-table tbody tr {
    display: block;
    padding: 11px 12px;
    margin: 8px 6px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(20, 34, 28, 0.92), rgba(26, 42, 34, 0.9));
    border-bottom: 1px solid var(--line);
    box-shadow: inset 0 1px 0 rgba(232, 207, 144, 0.15);
  }

  .admin-table tbody td {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 7px 0;
    border-bottom: 1px dashed rgba(201, 164, 91, 0.24);
    background: transparent;
  }

  .admin-table tbody td::before {
    content: attr(data-label);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--royal-gold-dark);
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

  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr minmax(220px, 1fr);
    align-items: center;
    gap: 1.2rem;
  }

  .table-wrap {
    max-height: 32rem;
    overflow-y: auto;
  }

  .admin-header {
    margin-bottom: 2.1rem;
  }

  .admin-table thead th,
  .admin-table tbody td {
    padding: 14px 16px;
  }
}
</style>
