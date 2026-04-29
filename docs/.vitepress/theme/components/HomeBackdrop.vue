<template>
  <div ref="root" class="home-backdrop" @pointermove="onPointerMove" @pointerleave="onPointerLeave">
    <canvas ref="canvas" class="home-backdrop__canvas" aria-hidden="true" />
    <div class="home-backdrop__beam" :style="beamStyle" aria-hidden="true" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const root = ref(null)
const canvas = ref(null)
const pointer = ref({ x: 50, y: 34, active: false })

const beamStyle = computed(() => ({
  '--x': `${pointer.value.x}%`,
  '--y': `${pointer.value.y}%`,
  opacity: pointer.value.active ? 1 : 0.72
}))

let frame = 0
let particles = []
let removeResize = null

function onPointerMove(event) {
  const rect = root.value?.getBoundingClientRect()
  if (!rect) return
  pointer.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
    active: true
  }
}

function onPointerLeave() {
  pointer.value = { ...pointer.value, active: false }
}

function setupCanvas() {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const resize = () => {
    const width = window.innerWidth
    const height = Math.min(Math.max(window.innerHeight * 0.86, 560), 820)
    const dpr = window.devicePixelRatio || 1
    el.width = width * dpr
    el.height = height * dpr
    el.style.width = `${width}px`
    el.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    particles = Array.from({ length: Math.floor(width / 30) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 1 + Math.random() * 1.6,
      hue: 348 + Math.random() * 18
    }))
  }

  const draw = () => {
    const dpr = window.devicePixelRatio || 1
    const width = el.width / dpr
    const height = el.height / dpr
    ctx.clearRect(0, 0, width, height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < -20) p.x = width + 20
      if (p.x > width + 20) p.x = -20
      if (p.y < -20) p.y = height + 20
      if (p.y > height + 20) p.y = -20

      const px = (pointer.value.x / 100) * width
      const py = (pointer.value.y / 100) * height
      const dx = px - p.x
      const dy = py - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (pointer.value.active && dist < 150) {
        const force = (150 - dist) / 150
        p.x -= dx * force * 0.005
        p.y -= dy * force * 0.005
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue}, 82%, 66%, 0.45)`
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 118) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(200, 16, 46, ${(1 - dist / 118) * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    frame = requestAnimationFrame(draw)
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
  removeResize = () => window.removeEventListener('resize', resize)
}

onMounted(setupCanvas)
onUnmounted(() => {
  cancelAnimationFrame(frame)
  removeResize?.()
})
</script>

<style scoped>
.home-backdrop {
  position: absolute;
  inset: 0 0 auto;
  z-index: 0;
  height: min(86vh, 820px);
  min-height: 560px;
  overflow: hidden;
  pointer-events: auto;
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

.home-backdrop::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(125deg, color-mix(in srgb, var(--akg-blue) 16%, transparent), transparent 34%),
    linear-gradient(245deg, color-mix(in srgb, var(--akg-pink) 13%, transparent), transparent 38%),
    linear-gradient(180deg, var(--vp-c-bg-alt), transparent 72%);
  content: "";
}

.home-backdrop__canvas,
.home-backdrop__beam {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home-backdrop__canvas {
  opacity: 0.48;
}

.home-backdrop__beam {
  background: radial-gradient(circle at var(--x) var(--y), color-mix(in srgb, var(--akg-teal) 18%, transparent), transparent 20rem);
  transition: opacity 180ms ease;
}

.home-backdrop__badge {
  position: absolute;
  right: clamp(18px, 3vw, 48px);
  top: 88px;
  z-index: 2;
  display: grid;
  gap: 10px;
  padding: 16px 18px 14px;
  border: 1px solid color-mix(in srgb, var(--akg-blue) 20%, var(--vp-c-border));
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(248, 251, 255, 0.82)),
    radial-gradient(circle at 18% 18%, rgba(255, 205, 228, 0.24), transparent 42%),
    radial-gradient(circle at 82% 18%, rgba(255, 139, 154, 0.2), transparent 44%);
  box-shadow: 0 18px 40px color-mix(in srgb, var(--akg-shadow) 75%, transparent);
  backdrop-filter: blur(10px) saturate(1.1);
}

.home-backdrop__badge-kicker {
  color: color-mix(in srgb, var(--akg-brand) 72%, var(--vp-c-text-2));
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.22em;
}

.home-backdrop__badge-title {
  color: color-mix(in srgb, var(--akg-brand) 80%, var(--vp-c-text-1));
  font-size: clamp(1.9rem, 4vw, 3.2rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: 'Courier New', 'IBM Plex Mono', monospace;
  text-shadow:
    2px 0 0 rgba(200, 16, 46, 0.18),
    4px 0 0 rgba(255, 139, 154, 0.15),
    0 0 0.5px currentColor;
}

.home-backdrop__badge-sub {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: lowercase;
}

@media (max-width: 640px) {
  .home-backdrop {
    min-height: 500px;
  }

  .home-backdrop__badge {
    right: 14px;
    top: 72px;
    padding: 12px 14px 10px;
  }

  .home-backdrop__badge-title {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-backdrop__canvas {
    display: none;
  }
}
</style>
