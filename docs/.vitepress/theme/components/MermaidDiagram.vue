<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import mermaid from 'mermaid'

const props = defineProps<{
  graph: string
}>()

const { isDark } = useData()
const svg = ref('')
const error = ref('')
const diagramId = `mermaid-${Math.random().toString(36).slice(2)}`
let renderCount = 0

function getGraph() {
  try {
    return decodeURIComponent(props.graph)
  } catch {
    return props.graph
  }
}

async function renderDiagram() {
  if (import.meta.env.SSR) return

  await nextTick()

  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: isDark.value ? 'dark' : 'default'
    })

    const result = await mermaid.render(
      `${diagramId}-${renderCount++}`,
      getGraph()
    )

    svg.value = result.svg
    error.value = ''
  } catch (err) {
    svg.value = ''
    error.value = err instanceof Error ? err.message : String(err)
  }
}

onMounted(renderDiagram)
watch([() => props.graph, isDark], renderDiagram)
</script>

<template>
  <figure class="mermaid-diagram">
    <div v-if="svg" class="mermaid-diagram__canvas" v-html="svg" />
    <pre v-else class="mermaid-diagram__fallback"><code>{{ getGraph() }}</code></pre>
    <figcaption v-if="error" class="mermaid-diagram__error">
      Mermaid 渲染失败：{{ error }}
    </figcaption>
  </figure>
</template>
