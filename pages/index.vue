<script setup lang="ts">
// Font test page using the FontStatus component
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-8">
    <h1 class="text-3xl font-bold mb-6">Google Fonts Load Status</h1>
    <client-only>
      <div class="mb-10 space-y-8">
        <div>
          <div class="text-sm text-gray-600 mb-1">Static sample using Lato (bold from module):</div>
          <p
            class="text-2xl"
            style="font-family: 'Lato', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; font-weight: 700;"
          >
            Hello Vibecon
          </p>
        </div>
        <GoogleFontPicker defaultFamily="Lato" />
      </div>
    </client-only>
    <FontStatus />

    <div class="mt-10 text-xs text-gray-500">
      <p>Tip: Open DevTools → Network (filter "font") or Elements → Computed → Rendered Fonts.</p>
    </div>
  </div>
</template>