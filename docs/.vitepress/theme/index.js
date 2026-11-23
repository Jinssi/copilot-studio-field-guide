import DefaultTheme from 'vitepress/theme'
import Shot from './Shot.vue'
import './field.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) { app.component('Shot', Shot) }
}
