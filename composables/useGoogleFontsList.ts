import { ref } from 'vue'

export interface GoogleFontItem {
  family: string
  variants: string[]
  category?: string
}

export function useGoogleFontsList() {
  const fonts = ref<GoogleFontItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const load = async () => {
    loading.value = true
    error.value = null
    try {
      const res: any = await $fetch('/api/google-fonts')
      // Google Fonts API returns { items: [...] }
      fonts.value = (res?.items || []).map((it: any) => ({
        family: it.family,
        variants: it.variants || [],
        category: it.category
      }))
    } catch (e: any) {
      error.value = e?.message || 'Failed to fetch Google Fonts list'
    } finally {
      loading.value = false
    }
  }

  return { fonts, loading, error, load }
}
