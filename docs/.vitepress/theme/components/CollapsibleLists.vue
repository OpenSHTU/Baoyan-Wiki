<template></template>

<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

function shouldEnhance(path) {
  return (
    path === '/timeline/' ||
    path.startsWith('/timeline/') ||
    path === '/materials/' ||
    path.startsWith('/materials/') ||
    path === '/applications/' ||
    path.startsWith('/applications/') ||
    path === '/interviews/' ||
    path.startsWith('/interviews/') ||
    path === '/experiences/' ||
    path.startsWith('/experiences/')
  )
}

function directNestedList(li) {
  return Array.from(li.children).find((child) => child.matches('ul, ol'))
}

function leadingContent(li, nestedList) {
  const nodes = []

  for (const node of Array.from(li.childNodes)) {
    if (node === nestedList) break

    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') {
      nodes.push(node)
      continue
    }

    nodes.push(node)
  }

  return nodes
}

function enhanceListItem(li) {
  if (li.dataset.collapsibleListItem === 'true') return

  const nestedList = directNestedList(li)
  if (!nestedList) return

  const nodes = leadingContent(li, nestedList)
  const hasLabel = nodes.some((node) => node.textContent.trim().length > 0)
  if (!hasLabel) return

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'collapsible-list__toggle'
  button.setAttribute('aria-expanded', 'false')

  nestedList.hidden = true
  nestedList.classList.add('collapsible-list__content')
  li.classList.add('collapsible-list__item')
  li.dataset.collapsibleListItem = 'true'

  for (const node of nodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
      while (node.firstChild) {
        button.appendChild(node.firstChild)
      }
      node.remove()
      continue
    }

    button.appendChild(node)
  }

  li.insertBefore(button, nestedList)

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!isExpanded))
    nestedList.hidden = isExpanded
    li.classList.toggle('is-open', !isExpanded)
  })
}

async function enhancePage() {
  if (typeof window === 'undefined') return

  await nextTick()

  const doc = document.querySelector('.vp-doc')
  if (!doc) return

  const enabled = shouldEnhance(route.path)
  doc.classList.toggle('collapsible-lists-enabled', enabled)

  if (!enabled) return

  for (const li of Array.from(doc.querySelectorAll('li'))) {
    enhanceListItem(li)
  }
}

watch(
  () => route.path,
  () => enhancePage(),
  { immediate: true }
)
</script>
