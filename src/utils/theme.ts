// src/utils/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  // This single watcher handles the initial load AND all future changes
  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', val ? 'dark' : 'light')
  }, { immediate: true })

  function toggle(): void {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
})