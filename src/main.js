import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { languages, defaultLocal } from './locales'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocal,
  fallbackLocale: defaultLocal,
  messages: languages
})

createApp(App).use(router).use(i18n).mount('#app')
