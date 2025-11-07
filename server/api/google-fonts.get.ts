import { $fetch } from 'ofetch'
import { defineEventHandler, createError, sendError, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const key = (config as any).googleFontsApiKey as string
  if (!key) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Missing GOOGLE_FONTS_API_KEY' }))
  }

  const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${encodeURIComponent(key)}`
  try {
    const data = await $fetch(url)
    return data
  } catch (e: any) {
    return sendError(event, createError({ statusCode: 502, statusMessage: e?.message || 'Google Fonts API failed' }))
  }
})
