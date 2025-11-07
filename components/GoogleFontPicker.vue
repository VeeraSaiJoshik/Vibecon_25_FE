<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGoogleFontsList } from '@/composables/useGoogleFontsList'

const props = defineProps<{ defaultFamily?: string }>()
const { fonts, loading, error, load } = useGoogleFontsList()
const selected = ref(props.defaultFamily || 'Lato')

onMounted(() => {
  load()
  applyFont(selected.value)
})

watch(selected, (val) => {
  applyFont(val)
})

function applyFont(family: string) {
  if (!family) return
  // Insert/update a dynamic Google Fonts stylesheet link
  const id = 'dynamic-google-font'
  let link = document.getElementById(id) as HTMLLinkElement | null
  const qsFamily = encodeURIComponent(`${family}:wght@400;700`)
  const href = `https://fonts.googleapis.com/css2?family=${qsFamily}&display=swap`
  if (!link) {
    link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  } else {
    link.href = href
  }
}
</script>

<template>
  <div class="space-y-3">
    <label class="block text-sm text-gray-600">Pick a Google Font (via API)</label>
    <select v-model="selected" class="border rounded px-3 py-2 w-full">
      <option v-if="loading" disabled>Loading…</option>
      <option v-if="error" disabled>{{ error }}</option>
      <option v-for="f in fonts" :key="f.family" :value="f.family">{{ f.family }}</option>
    </select>

    <div class="mt-2">
      <div class="text-xs text-gray-500 mb-1">Sample with selected font (700):</div>
      <p
        class="text-2xl"
        :style="{ fontFamily: selected + ', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', fontWeight: 700 }"
      >
        The quick brown fox jumps over the lazy dog — 0123456789
      </p>
    </div>
  </div>
</template>
