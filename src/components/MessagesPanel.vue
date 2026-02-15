<template>
  <div class="temple-frame">
    <div class="temple-panel p-5 sm:p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold admin-title">Messages</h2>
        <button
          type="button"
          class="text-sm admin-action transition"
          @click="props.refresh"
        >
          Refresh
        </button>
      </div>

      <div v-if="rows.length === 0" class="text-sm admin-muted">
        No messages yet.
      </div>

      <div v-else class="table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Message</th>
              <th class="text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rows" :key="item.id ?? `message-${index}`">
              <td
                data-label="No."
                class="font-semibold admin-title text-xs admin-muted-strong"
              >{{ index + 1 }}</td>
              <td
                data-label="Name"
                class="font-semibold admin-title"
              >{{ item.name || 'Unknown' }}</td>
              <td
                data-label="Message"
                class="text-sm admin-ink-soft message-text message-cell"
              >{{ item.text || '-' }}</td>
              <td
                data-label="Time"
                class="text-right text-xs admin-time"
              >{{ formatEntryTime(item.time) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  refresh: {
    type: Function,
    default: () => {}
  },
  formatTime: {
    type: Function,
    default: (value) => {
      try {
        return new Date(value).toLocaleString()
      } catch {
        return '-'
      }
    }
  }
})

const rows = computed(() => {
  if (!Array.isArray(props.items)) return []
  return props.items.filter((item) => item && typeof item === 'object')
})

function formatEntryTime(value) {
  if (!value) return '-'
  try {
    const normalized = value?.toMillis ? value.toMillis() : value
    return props.formatTime(normalized)
  } catch {
    return '-'
  }
}
</script>
