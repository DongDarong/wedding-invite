import { computed, ref } from 'vue'

const LANGUAGE_KEY = 'invite_language'
const language = ref(localStorage.getItem(LANGUAGE_KEY) || 'kh')

const isKh = computed(() => language.value === 'kh')

function setLanguage(next) {
  language.value = next === 'en' ? 'en' : 'kh'
  localStorage.setItem(LANGUAGE_KEY, language.value)
}

function toggleLanguage() {
  setLanguage(language.value === 'kh' ? 'en' : 'kh')
}

export function useLanguage() {
  return {
    language,
    isKh,
    setLanguage,
    toggleLanguage
  }
}
