<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface FontSpec { name: string; weights: number[] }
const props = defineProps<{ fonts?: FontSpec[] }>()

const fonts: FontSpec[] = props.fonts || [
  { name: 'Roboto', weights: [400, 700] },
  { name: 'Open Sans', weights: [400, 700] },
  { name: 'Lato', weights: [100, 400, 700] },
  { name: 'Canela', weights: [700] }
]

const status = ref<Record<string, boolean>>({})
const details = ref<Record<string, string>>({})

onMounted(async () => {
  // @ts-ignore
  await document.fonts.ready
  for (const f of fonts) {
    const results: string[] = []
    let all = true
    for (const w of f.weights) {
      const ok = document.fonts.check(`${w} 16px "${f.name}"`)
      results.push(`${w}: ${ok ? '✓' : '✗'}`)
      if (!ok) all = false
    }
    status.value[f.name] = all
    details.value[f.name] = results.join(', ')
  }
})
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <div v-for="f in fonts" :key="f.name" class="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
      <h2 class="text-xl font-semibold mb-2" :style="{ fontFamily: f.name }">{{ f.name }}</h2>
      <p class="text-sm mb-2" :class="status[f.name] ? 'text-green-600' : 'text-red-600'">
        Status: <strong>{{ status[f.name] ? 'Loaded' : 'Missing weights' }}</strong>
      </p>
      <p class="text-xs text-gray-500 mb-3">Weights: {{ details[f.name] || 'Checking…' }}</p>
      <div class="space-y-2">
        <p v-for="w in f.weights" :key="w" :style="{ fontFamily: f.name, fontWeight: w }" class="text-sm">
          {{ f.name }} weight {{ w }} – The quick brown fox jumps over the lazy dog 0123456789
        </p>
      </div>
    </div>
  </div>
</template>
