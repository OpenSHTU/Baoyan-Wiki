import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import HomeLanding from './components/HomeLanding.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('HomeLanding', HomeLanding)
  }
}
