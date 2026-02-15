<template>
  <div class="temple-frame">
    <div class="temple-panel p-5 sm:p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold admin-title">RSVP Entries</h2>
        <button
          type="button"
          class="text-sm admin-action transition"
          @click="props.refresh"
        >
          Refresh
        </button>
      </div>

      <div v-if="items.length === 0" class="text-sm admin-muted">
        No RSVPs yet.
      </div>

      <div v-else class="table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>Guests</th>
              <th class="text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id || index">
              <td
                data-label="No."
                class="font-semibold admin-title text-xs admin-muted-strong"
              >{{ index + 1 }}</td>
              <td
                data-label="Name"
                class="font-semibold admin-title"
              >{{ item.name || 'Unknown' }}</td>
              <td
                data-label="Attendance"
                class="text-xs admin-muted-strong"
              >{{ formatAttendance(item.attendance) }}</td>
              <td
                data-label="Guests"
                class="text-xs admin-muted-strong"
              >{{ formatGuests(item.guests) }}</td>
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
    required: true
  },
  formatTime: {
    type: Function,
    required: true
  }
})

const items = computed(() => props.items ?? [])

const attendanceLabels = {
  attending: 'Will attend with pleasure',
  'not-attending': 'Unable to attend'
}

const guestLabels = {
  '1': '1 person',
  '2': '2 people',
  '3': '3 people',
  '4+': '4+ people'
}

function formatAttendance(value) {
  if (!value) return '-'
  return attendanceLabels[value] ?? value
}

function formatGuests(value) {
  if (!value) return '-'
  return guestLabels[value] ?? (Number.isNaN(Number(value)) ? value : `${value} guest${value === '1' ? '' : 's'}`)
}

function formatEntryTime(value) {
  if (!value) return '-'
  const normalized = value?.toMillis ? value.toMillis() : value
  return props.formatTime(normalized)
}
</script>
