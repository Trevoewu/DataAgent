// hooks/useTheme.js
import { ref, watch } from 'vue'

export function useTheme() {
  const actualTheme = ref(localStorage.getItem('theme') || 'light')
  
  const toggleTheme = () => {
    actualTheme.value = actualTheme.value === 'dark' ? 'light' : 'dark'
  }
  
  // 保存主题到 localStorage
  watch(actualTheme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })
  
  return {
    actualTheme,
    toggleTheme
  }
}