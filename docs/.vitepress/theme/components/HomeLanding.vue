<template>
  <main class="landing">
    <section class="hero reveal">
      <div class="hero__content">
        <p class="hero__eyebrow">OpenSHTU · 保研知识库</p>

        <pre class="wordmark" aria-hidden="true">
██████╗  █████╗  ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
██████╔╝███████║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║
██╔══██╗██╔══██║██║   ██║  ╚██╔╝  ██╔══██║██║╚██╗██║
██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║██║ ╚████║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝</pre>
        <p class="wordmark__caption" aria-hidden="true">保 · 研 — Bao Yan</p>

        <h1>把保研信息差<br />整理成清晰路线图</h1>
        <p class="hero__subtitle">
          时间线、申请材料、投递策略、面试复盘集中在一处，让准备推免的每一步都有迹可循。
        </p>

        <div class="prompt-box" aria-label="站点快速入口">
          <p class="prompt-box__copy">
            <b>{{ active.title }}</b>
            <span>{{ active.copy }}</span>
          </p>
          <div class="prompt-box__footer">
            <span class="prompt-box__counter">{{ counter }} / 09</span>
            <button
              class="prompt-box__nav"
              type="button"
              aria-label="上一项"
              @click="prev"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6 L9 12 L15 18" /></svg>
            </button>
            <button
              class="prompt-box__nav"
              type="button"
              aria-label="下一项"
              @click="next"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 L15 12 L9 18" /></svg>
            </button>
            <a class="prompt-box__button" :href="active.href">前往 {{ active.title }}</a>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <div
          class="badge-emblem"
          :class="{ 'badge-emblem--intro': showBadgeIntro }"
          aria-hidden="true"
        >
          <img :src="logoRed" alt="" />
        </div>

        <div class="visual-card visual-card--main">
          <div class="visual-card__bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p class="visual-card__label">Application Map</p>
          <strong>保研申请进度</strong>
          <div class="visual-card__progress">
            <span style="--w: 82%"></span>
          </div>
          <ul>
            <li><span>时间线</span><b>已规划</b></li>
            <li><span>材料库</span><b>持续补全</b></li>
            <li><span>面试复盘</span><b>经验共建</b></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="rows" aria-label="核心栏目">
      <a
        v-for="(item, idx) in links"
        :key="item.href"
        :href="item.href"
        class="row reveal"
        :style="{ '--delay': `${idx * 80}ms` }"
      >
        <div class="row__index">{{ item.index }}</div>
        <div class="row__body">
          <strong>{{ item.title }}</strong>
          <small>{{ item.desc }}</small>
        </div>
        <div class="row__visual" aria-hidden="true">
          <!-- 01 timeline: months track + traveling marker, past months light up -->
          <svg v-if="item.anim==='timeline'" viewBox="0 0 320 64" class="anim anim-timeline" preserveAspectRatio="xMidYMid meet">
            <line x1="14" y1="40" x2="306" y2="40" class="t-track" />
            <line x1="14" y1="40" x2="306" y2="40" class="t-fill" />
            <g v-for="(m, i) in ['9','10','11','12','1','2','3']" :key="i" :transform="`translate(${14 + i*48.6},40)`">
              <circle r="5" class="t-dot" :style="{ '--i': i }" />
              <text y="-12" text-anchor="middle" class="t-label">{{ m }}月</text>
            </g>
            <circle r="6" class="t-marker" cy="40" />
          </svg>

          <!-- 02 docs: 3 identical checklists, centered, gently pulsing in sync -->
          <svg v-else-if="item.anim==='docs'" viewBox="0 0 320 80" class="anim anim-docs" preserveAspectRatio="xMidYMid meet">
            <g v-for="i in 3" :key="i" :transform="`translate(${82 + (i-1)*60},16)`">
              <g :class="`d-sheet d-sheet-${i}`">
                <rect width="44" height="48" rx="5" />
                <line x1="8" y1="14" x2="36" y2="14" class="d-line" />
                <line x1="8" y1="22" x2="28" y2="22" class="d-line" />
                <path d="M10 34 L16 40 L28 28" class="d-check" />
              </g>
            </g>
          </svg>

          <!-- 03 flow: source dispatching packets to 3 targets -->
          <svg v-else-if="item.anim==='flow'" viewBox="0 0 320 80" class="anim anim-flow" preserveAspectRatio="xMidYMid meet">
            <path d="M40 40 C 140 40 200 22 280 22" class="f-wire" />
            <path d="M40 40 C 140 40 200 40 280 40" class="f-wire" />
            <path d="M40 40 C 140 40 200 58 280 58" class="f-wire" />
            <circle cx="40" cy="40" r="9" class="f-source" />
            <circle cx="280" cy="22" r="6" class="f-target" />
            <circle cx="280" cy="40" r="6" class="f-target" />
            <circle cx="280" cy="58" r="6" class="f-target" />
            <g class="f-packet f-p1" transform="translate(40 40)">
              <circle r="3.5">
                <animateMotion dur="2.4s" repeatCount="indefinite" path="M0 0 C 100 0 160 -18 240 -18" />
              </circle>
            </g>
            <g class="f-packet f-p2" transform="translate(40 40)">
              <circle r="3.5">
                <animateMotion dur="2.4s" begin="0.6s" repeatCount="indefinite" path="M0 0 C 100 0 160 0 240 0" />
              </circle>
            </g>
            <g class="f-packet f-p3" transform="translate(40 40)">
              <circle r="3.5">
                <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M0 0 C 100 0 160 18 240 18" />
              </circle>
            </g>
            <g transform="translate(40 40)">
              <circle r="3.5" class="f-packet-anchor" />
            </g>
          </svg>

          <!-- 04 chat: Q/A bubbles with typing dots -->
          <svg v-else-if="item.anim==='chat'" viewBox="0 0 320 64" class="anim anim-chat" preserveAspectRatio="xMidYMid meet">
            <g class="c-q">
              <rect x="40" y="8" width="120" height="20" rx="10" />
              <text x="52" y="22" class="c-text">Q · 研究方向？</text>
            </g>
            <g class="c-a">
              <rect x="160" y="36" width="120" height="20" rx="10" />
              <circle cx="180" cy="46" r="2.2" class="c-typ" />
              <circle cx="190" cy="46" r="2.2" class="c-typ c-typ-2" />
              <circle cx="200" cy="46" r="2.2" class="c-typ c-typ-3" />
              <text x="214" y="50" class="c-text c-text-light">作答中</text>
            </g>
          </svg>

          <!-- 05 pulse: hub + radiating ripples + outgoing share dots, kept inside the row -->
          <svg v-else-if="item.anim==='pulse'" viewBox="0 0 320 64" class="anim anim-pulse" preserveAspectRatio="xMidYMid meet">
            <circle cx="160" cy="32" r="9" class="p-ring" />
            <circle cx="160" cy="32" r="9" class="p-ring p-ring-2" />
            <circle cx="160" cy="32" r="8" class="p-core" />
            <g class="p-spokes">
              <line x1="160" y1="32" x2="100" y2="18" />
              <line x1="160" y1="32" x2="90" y2="46" />
              <line x1="160" y1="32" x2="220" y2="18" />
              <line x1="160" y1="32" x2="230" y2="46" />
            </g>
            <circle cx="100" cy="18" r="3.5" class="p-sat" />
            <circle cx="90" cy="46" r="3.5" class="p-sat p-sat-2" />
            <circle cx="220" cy="18" r="3.5" class="p-sat p-sat-3" />
            <circle cx="230" cy="46" r="3.5" class="p-sat p-sat-4" />
          </svg>

          <!-- 06 basics: pyramid of knowledge blocks building up + crowning sparkle -->
          <svg v-else-if="item.anim==='basics'" viewBox="0 0 320 64" class="anim anim-basics" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(160, 32)">
              <rect class="ba-block ba-b-0" x="-30" y="14" width="60" height="12" rx="2" />
              <rect class="ba-block ba-b-1" x="-22" y="0"  width="44" height="12" rx="2" />
              <rect class="ba-block ba-b-2" x="-14" y="-14" width="28" height="12" rx="2" />
              <path class="ba-star" d="M0 -26 L2.4 -21 L8 -20 L3.6 -16 L4.8 -10 L0 -13 L-4.8 -10 L-3.6 -16 L-8 -20 L-2.4 -21 Z" />
            </g>
          </svg>

          <!-- 07 schools: row of campuses with a scanner ring picking each in turn -->
          <svg v-else-if="item.anim==='schools'" viewBox="0 0 320 64" class="anim anim-schools" preserveAspectRatio="xMidYMid meet">
            <g v-for="(t, i) in [80, 140, 200, 260]" :key="i" :transform="`translate(${t}, 50)`" :class="['sc-tower', `sc-t-${i}`]">
              <polygon class="sc-roof" points="-13,-22 0,-30 13,-22" />
              <rect class="sc-base" x="-13" y="-22" width="26" height="22" rx="2" />
              <rect class="sc-window" x="-8" y="-17" width="4" height="4" />
              <rect class="sc-window" x="4" y="-17" width="4" height="4" />
              <rect class="sc-door" x="-3" y="-8" width="6" height="8" rx="1" />
            </g>
            <circle class="sc-pick" r="20" cy="38" cx="80" />
          </svg>

          <!-- 08 mentors: student → mentor envelope sailing along an arc -->
          <svg v-else-if="item.anim==='mentors'" viewBox="0 0 320 64" class="anim anim-mentors" preserveAspectRatio="xMidYMid meet">
            <g class="mt-avatar mt-from" transform="translate(40, 32)">
              <circle r="13" class="mt-bg" />
              <circle cy="-3" r="3.6" class="mt-ink" />
              <path d="M-7 9 Q 0 3 7 9 L 7 12 L -7 12 Z" class="mt-ink" />
            </g>
            <g class="mt-avatar mt-to" transform="translate(280, 32)">
              <circle r="13" class="mt-bg" />
              <path d="M-9 -3 L0 -8 L9 -3 L0 2 Z" class="mt-cap" />
              <line x1="9" y1="-3" x2="9" y2="2" class="mt-cap" />
              <circle cy="3" r="3" class="mt-ink" />
              <path d="M-6 11 Q 0 5 6 11 L 6 13 L -6 13 Z" class="mt-ink" />
            </g>
            <path d="M 56 32 Q 160 4 264 32" class="mt-arc" fill="none" />
            <g class="mt-envelope">
              <rect x="-8" y="-5" width="16" height="11" rx="1.5" />
              <path d="M-8 -5 L 0 1 L 8 -5" class="mt-flap" fill="none" />
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 56 32 Q 160 4 264 32" rotate="auto" />
            </g>
          </svg>

          <!-- 09 resources: book stack with sparkles cycling across spines -->
          <svg v-else-if="item.anim==='resources'" viewBox="0 0 320 64" class="anim anim-resources" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(117, 10)">
              <rect class="rs-book rs-b-0" x="0"  y="6" width="14" height="38" rx="2" />
              <rect class="rs-book rs-b-1" x="18" y="2" width="14" height="42" rx="2" />
              <rect class="rs-book rs-b-2" x="36" y="0" width="14" height="44" rx="2" />
              <rect class="rs-book rs-b-3" x="54" y="3" width="14" height="41" rx="2" />
              <rect class="rs-book rs-b-4" x="72" y="6" width="14" height="38" rx="2" />
              <line x1="0"  y1="14" x2="14" y2="14" class="rs-band" />
              <line x1="18" y1="10" x2="32" y2="10" class="rs-band" />
              <line x1="36" y1="8"  x2="50" y2="8"  class="rs-band" />
              <line x1="54" y1="11" x2="68" y2="11" class="rs-band" />
              <line x1="72" y1="14" x2="86" y2="14" class="rs-band" />
            </g>
            <g transform="translate(126, 30)">
              <path class="rs-sparkle rs-s-0" d="M0 -5 L1.4 -1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4 -1.4 Z" />
            </g>
            <g transform="translate(160, 22)">
              <path class="rs-sparkle rs-s-1" d="M0 -5 L1.4 -1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4 -1.4 Z" />
            </g>
            <g transform="translate(196, 20)">
              <path class="rs-sparkle rs-s-2" d="M0 -5 L1.4 -1.4 L5 0 L1.4 1.4 L0 5 L-1.4 1.4 L-5 0 L-1.4 -1.4 Z" />
            </g>
          </svg>
        </div>
      </a>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import logoRed from '../assets/logo_badge.svg'

const links = [
  {
    index: '01', title: '保研基础', desc: '政策名词与必备常识',
    copy: '从零开始扫盲：保研政策、推免名额、夏令营/预推免/九推的差异，先把规则吃透。',
    href: '/basics/', anim: 'basics'
  },
  {
    index: '02', title: '时间线', desc: '按阶段拆解准备事项',
    copy: '先建立时间锚点：把每个阶段的关键节点、夏令营、预推免和九推串成一条主线。',
    href: '/timeline/', anim: 'timeline'
  },
  {
    index: '03', title: '院校选择', desc: '调研院校与定位夏令营',
    copy: '通过官网、师兄师姐和往年情况，结合自身定位筛出目标院校与可以冲的夏令营学院。',
    href: '/schools/', anim: 'schools'
  },
  {
    index: '04', title: '材料准备', desc: '简历、陈述与证明材料',
    copy: '简历、个人陈述、推荐信、成绩证明：先做出可复用的母版，再按学校做差异化。',
    href: '/materials/', anim: 'docs'
  },
  {
    index: '05', title: '导师套磁', desc: '联系导师与邮件沟通',
    copy: '套磁不是群发邮件：研究方向、成果匹配、邮件结构、回复节奏，每一步都讲究细节。',
    href: '/mentors/', anim: 'mentors'
  },
  {
    index: '06', title: '申请流程', desc: '夏令营与预推免投递',
    copy: '从系统填报到笔面试节奏：把夏令营、预推免、九推的具体操作步骤串成可执行清单。',
    href: '/applications/', anim: 'flow'
  },
  {
    index: '07', title: '面试复习', desc: '专业课与科研表达',
    copy: '面试不是临场发挥：把专业课、项目复盘、英文自我介绍提前练成肌肉记忆。',
    href: '/interviews/', anim: 'chat'
  },
  {
    index: '08', title: '经验分享', desc: '用复盘沉淀真实路径',
    copy: '记录每一段背景、过程、题目和选择，让今天的经验成为下一届的起点。',
    href: '/experiences/', anim: 'pulse'
  },
  {
    index: '09', title: '推荐资源', desc: '工具、网站与参考资料',
    copy: '收藏一份持续更新的资源库：信息源、工具、模板和往年答疑，遇事不再凭感觉。',
    href: '/resources/', anim: 'resources'
  }
]

const step = ref(0)
const showBadgeIntro = ref(false)
const active = computed(() => links[step.value])
const counter = computed(() => String(step.value + 1).padStart(2, '0'))
const prev = () => { step.value = (step.value - 1 + links.length) % links.length }
const next = () => { step.value = (step.value + 1) % links.length }

let observer = null
let badgeIntroTimer = null

onMounted(() => {
  if (typeof window === 'undefined') return

  try {
    const key = 'baoyan-wiki-badge-intro-seen'
    if (!localStorage.getItem(key)) {
      showBadgeIntro.value = true
      localStorage.setItem(key, '1')
      badgeIntroTimer = window.setTimeout(() => {
        showBadgeIntro.value = false
      }, 2300)
    }
  } catch {
    showBadgeIntro.value = true
    badgeIntroTimer = window.setTimeout(() => {
      showBadgeIntro.value = false
    }, 2300)
  }

  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      }
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
  if (badgeIntroTimer) window.clearTimeout(badgeIntroTimer)
})
</script>

<style scoped>
:global(.landing-page .VPDoc) {
  padding: 0;
}

:global(.landing-page .VPDoc .container),
:global(.landing-page .VPDoc .content),
:global(.landing-page .VPDoc .content-container),
:global(.landing-page .vp-doc) {
  max-width: none;
  padding: 0;
}

:global(.landing-page .vp-doc > div) {
  margin: 0;
}

.landing {
  --red-1: #c8102e;
  --red-2: #9d0a12;
  --red-3: #ff3b54;
  --red-soft: rgba(200, 16, 46, 0.12);
  --ink: #1a1014;
  --ink-2: rgba(26, 16, 20, 0.66);
  --ink-3: rgba(26, 16, 20, 0.44);
  --glass: rgba(255, 255, 255, 0.62);
  --glass-strong: rgba(255, 255, 255, 0.82);
  --glass-border: rgba(255, 255, 255, 0.78);
  --field-border: rgba(255, 255, 255, 0.9);
  --nav-fill: rgba(255, 255, 255, 0.7);
  --surface: rgba(255, 255, 255, 0.5);
  --surface-hover: rgba(255, 255, 255, 0.78);
  --card-surface: rgba(255, 255, 255, 0.88);
  --line-soft: rgba(26, 16, 20, 0.08);
  --line-strong: rgba(26, 16, 20, 0.22);
  --track-soft: rgba(26, 16, 20, 0.12);
  --node-fill: #fff;
  --button-text: #fff;
  --progress-start: #ffd6dc;
  --accent-fill: rgba(200, 16, 46, 0.25);
  --shadow-soft: rgba(120, 22, 38, 0.08);
  --shadow-medium: rgba(120, 22, 38, 0.12);
  --shadow-strong: rgba(120, 22, 38, 0.18);
  --glow-soft: rgba(200, 16, 46, 0.18);
  --glow-medium: rgba(200, 16, 46, 0.55);
  --glow-strong: rgba(200, 16, 46, 0.65);
  --container: min(1180px, calc(100% - 144px));

  min-height: calc(100vh - var(--vp-nav-height));
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 18%, rgba(255, 60, 90, 0.18), transparent 32%),
    radial-gradient(circle at 12% 84%, rgba(255, 200, 210, 0.55), transparent 38%),
    linear-gradient(145deg, #f7eaec 0%, #fbf3f4 50%, #fdf8f9 100%);
  color: var(--ink);
}

:global(.dark) .landing {
  --red-1: #ff687a;
  --red-2: #ff8d9a;
  --red-3: #ffd0d6;
  --red-soft: rgba(255, 104, 122, 0.18);
  --ink: #fff4f6;
  --ink-2: rgba(255, 232, 237, 0.72);
  --ink-3: rgba(255, 220, 226, 0.5);
  --glass: rgba(36, 20, 27, 0.6);
  --glass-strong: rgba(42, 24, 32, 0.78);
  --glass-border: rgba(255, 141, 154, 0.22);
  --field-border: rgba(255, 141, 154, 0.24);
  --nav-fill: rgba(255, 255, 255, 0.08);
  --surface: rgba(36, 20, 27, 0.6);
  --surface-hover: rgba(49, 27, 36, 0.82);
  --card-surface: rgba(38, 22, 30, 0.86);
  --line-soft: rgba(255, 213, 220, 0.1);
  --line-strong: rgba(255, 213, 220, 0.26);
  --track-soft: rgba(255, 213, 220, 0.14);
  --node-fill: #1a0e13;
  --button-text: #1a0e13;
  --progress-start: rgba(255, 208, 214, 0.95);
  --accent-fill: rgba(255, 104, 122, 0.32);
  --shadow-soft: rgba(3, 1, 2, 0.28);
  --shadow-medium: rgba(3, 1, 2, 0.42);
  --shadow-strong: rgba(3, 1, 2, 0.58);
  --glow-soft: rgba(255, 104, 122, 0.2);
  --glow-medium: rgba(255, 104, 122, 0.58);
  --glow-strong: rgba(255, 104, 122, 0.72);
  background:
    radial-gradient(circle at 78% 18%, rgba(255, 104, 122, 0.16), transparent 32%),
    radial-gradient(circle at 12% 84%, rgba(104, 35, 48, 0.38), transparent 38%),
    linear-gradient(145deg, #10070b 0%, #160b10 52%, #0d0609 100%);
}

/* --- scroll reveal --- */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 700ms cubic-bezier(.2,.7,.2,1) var(--delay, 0ms),
    transform 700ms cubic-bezier(.2,.7,.2,1) var(--delay, 0ms);
  will-change: transform, opacity;
}
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

.hero {
  width: var(--container);
  min-height: calc(100vh - var(--vp-nav-height) - 230px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  align-items: center;
  gap: 28px;
  padding: 44px 0 14px;
}

.hero__content { position: relative; z-index: 2; }

.hero__eyebrow {
  margin: 0 0 16px;
  color: var(--red-2);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 560px;
  margin: 12px 0 0;
  font-size: clamp(28px, 3vw, 44px);
  line-height: 1.08;
  font-weight: 850;
  letter-spacing: 0;
  color: var(--ink);
}

.hero__subtitle {
  max-width: 560px;
  margin: 14px 0 0;
  color: var(--ink-2);
  font-size: clamp(13px, 0.9vw, 15px);
  line-height: 1.6;
  font-weight: 500;
}

.wordmark {
  width: min(100%, 700px);
  margin: 0 0 8px;
  padding: 0;
  font-family: ui-monospace, "JetBrains Mono", "Fira Code", "Cascadia Code", monospace;
  font-size: clamp(8px, 1vw, 13px);
  line-height: 1.05;
  color: var(--red-1);
  background: linear-gradient(120deg, var(--red-2) 0%, var(--red-1) 45%, var(--red-3) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: pre;
  overflow: hidden;
  user-select: none;
}

.wordmark__caption {
  margin: 0;
  color: var(--red-2);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.36em;
  text-transform: uppercase;
}

.prompt-box {
  width: min(580px, 100%);
  margin-top: 24px;
  padding: 18px 20px 16px;
  border: 1px solid var(--field-border);
  border-radius: 18px;
  background: var(--glass-strong);
  backdrop-filter: blur(18px) saturate(1.2);
  box-shadow: 0 22px 48px var(--shadow-medium);
}

.prompt-box__copy {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 60px;
}
.prompt-box__copy b {
  color: var(--ink);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.prompt-box__copy span {
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.55;
  font-weight: 500;
}

.prompt-box__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.prompt-box__counter {
  margin-right: auto;
  color: var(--ink);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
}

.prompt-box__nav,
.prompt-box__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, border-color 180ms ease;
  cursor: pointer;
}

.prompt-box__nav {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--ink);
  border-radius: 50%;
  color: var(--ink);
  background: var(--nav-fill);
  padding: 0;
}
.prompt-box__nav svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.prompt-box__nav:hover {
  background: var(--red-1);
  color: var(--button-text);
  border-color: var(--red-1);
  transform: translateY(-1px);
}
.prompt-box__nav:active { transform: translateY(0) scale(0.96); }

.prompt-box__button {
  min-height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  color: var(--button-text);
  font-size: 13px;
  background: linear-gradient(120deg, var(--red-2), var(--red-1) 60%, var(--red-3));
  box-shadow: 0 12px 24px color-mix(in srgb, var(--red-1) 32%, transparent);
}
.prompt-box__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px color-mix(in srgb, var(--red-1) 40%, transparent);
}

.hero__visual {
  position: relative;
  min-height: 440px;
  perspective: 1100px;
  isolation: isolate;
}

.hero__visual::before {
  content: "";
  position: absolute;
  right: -8%;
  bottom: 8%;
  width: 80%;
  height: 22%;
  border-radius: 50%;
  background: radial-gradient(ellipse, var(--glow-soft), transparent 66%);
  filter: blur(18px);
}

/* --- badge: shows on hover anywhere over the right half,
       positioned in the top-left corner, behind the card --- */
.badge-emblem {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 200px;
  height: 200px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transform: translate(-48px, -48px) scale(0.9);
  transition:
    opacity 540ms cubic-bezier(.22,.7,.22,1),
    transform 640ms cubic-bezier(.22,.7,.22,1),
    filter 540ms ease;
  filter: drop-shadow(0 0 0 rgba(157, 10, 18, 0));
  will-change: transform, opacity;
}

.badge-emblem img { width: 100%; height: 100%; display: block; }

.hero__visual:hover .badge-emblem,
.badge-emblem--intro {
  opacity: 0.55;
  transform: translate(0, 0) scale(1);
  filter: drop-shadow(0 18px 28px var(--glow-soft));
}

@media (prefers-reduced-motion: reduce) {
  .badge-emblem { transition: opacity 200ms ease; transform: none; }
}

/* --- glass card --- */
.visual-card {
  position: absolute;
  z-index: 2;
  border: 1px solid var(--glass-border);
  background: var(--card-surface);
  box-shadow: 0 30px 70px var(--shadow-strong);
  backdrop-filter: blur(22px) saturate(1.18);
  -webkit-backdrop-filter: blur(22px) saturate(1.18);
}

.visual-card--main {
  top: 38px;
  right: 0;
  width: min(360px, 90%);
  padding: 24px 26px;
  border-radius: 32px;
  transform: rotate(4deg) rotateY(-10deg);
}

.visual-card__bar { display: flex; gap: 7px; margin-bottom: 26px; }
.visual-card__bar span {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--track-soft);
}

.visual-card__label {
  margin: 0 0 6px;
  color: var(--ink-3);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.visual-card strong {
  display: block;
  color: var(--ink);
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.15;
}

.visual-card__progress {
  height: 8px;
  margin: 18px 0 16px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--line-soft);
}

.visual-card__progress span {
  display: block;
  width: var(--w);
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--progress-start), var(--red-1) 70%, var(--red-2));
}

.visual-card ul { display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }

.visual-card li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 11px 0;
  border-top: 1px solid var(--line-soft);
  color: var(--ink-3);
  font-size: 13px;
  font-weight: 600;
}

.visual-card li b { color: var(--ink); font-size: 13px; font-weight: 700; }

/* --- five rows --- */
.rows {
  width: min(1060px, calc(100% - 112px));
  margin: 0 auto;
  display: grid;
  gap: 18px;
  padding: 0 0 80px;
}

.row {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) clamp(270px, 34%, 360px);
  align-items: center;
  gap: 30px;
  min-height: 128px;
  padding: 28px 34px;
  text-decoration: none;
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  background: var(--surface);
  backdrop-filter: blur(14px) saturate(1.15);
  -webkit-backdrop-filter: blur(14px) saturate(1.15);
  color: var(--ink);
  box-shadow: 0 14px 32px var(--shadow-soft);
  transition:
    transform 220ms ease,
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.row:hover {
  transform: translateY(-3px);
  background: var(--surface-hover);
  border-color: color-mix(in srgb, var(--red-1) 32%, transparent);
  box-shadow: 0 22px 44px var(--shadow-medium);
}

.row__index {
  color: var(--red-1);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.row__body strong {
  display: block;
  color: var(--ink);
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 4px;
}

.row__body small {
  display: block;
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.55;
}

.row__visual {
  position: relative;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: stretch;
  overflow: hidden;
}

.row__visual .anim {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* === 01 timeline === */
.anim-timeline .t-track { stroke: var(--track-soft); stroke-width: 2; stroke-linecap: round; }
.anim-timeline .t-fill {
  stroke: var(--red-1); stroke-width: 2; stroke-linecap: round;
  stroke-dasharray: 292; stroke-dashoffset: 292;
  animation: t-progress 4.4s cubic-bezier(.6,.1,.4,1) infinite;
}
.anim-timeline .t-dot {
  fill: var(--node-fill); stroke: var(--line-strong); stroke-width: 1.5;
  animation: t-light 4.4s linear infinite;
  animation-delay: calc(var(--i) * 0.55s);
}
.anim-timeline .t-label {
  font: 700 9px/1 ui-sans-serif, system-ui;
  fill: var(--ink-3);
  letter-spacing: 0.06em;
}
.anim-timeline .t-marker {
  fill: var(--red-1);
  filter: drop-shadow(0 0 6px var(--glow-medium));
  animation: t-marker 4.4s cubic-bezier(.6,.1,.4,1) infinite;
}
@keyframes t-progress {
  0% { stroke-dashoffset: 292; }
  85%, 100% { stroke-dashoffset: 0; }
}
@keyframes t-marker {
  0% { transform: translateX(14px); }
  85%, 100% { transform: translateX(306px); }
}
@keyframes t-light {
  0%, 12% { fill: var(--node-fill); stroke: var(--line-strong); }
  18%, 100% { fill: var(--red-1); stroke: var(--red-1); }
}

/* === 02 docs: 3 identical checklists, centered, soft pulse === */
.anim-docs .d-sheet rect {
  fill: var(--node-fill);
  stroke: color-mix(in srgb, var(--red-1) 24%, transparent);
  stroke-width: 1;
  filter: drop-shadow(0 4px 8px var(--shadow-soft));
}
.anim-docs .d-line { stroke: color-mix(in srgb, var(--red-1) 34%, transparent); stroke-width: 2; stroke-linecap: round; }
.anim-docs .d-check {
  fill: none; stroke: var(--red-1); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 26; stroke-dashoffset: 26;
  animation: d-check 2.6s ease-in-out infinite;
}
.anim-docs .d-sheet {
  transform-box: fill-box;
  transform-origin: center;
  animation: d-bob 2.6s ease-in-out infinite;
}
.anim-docs .d-sheet-1, .anim-docs .d-sheet-1 .d-check { animation-delay: 0s; }
.anim-docs .d-sheet-2, .anim-docs .d-sheet-2 .d-check { animation-delay: 0.2s; }
.anim-docs .d-sheet-3, .anim-docs .d-sheet-3 .d-check { animation-delay: 0.4s; }
@keyframes d-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes d-check {
  0%, 18% { stroke-dashoffset: 26; }
  46%, 78% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 26; }
}

/* === 03 flow: source → 3 targets, packets travel === */
.anim-flow .f-wire { fill: none; stroke: color-mix(in srgb, var(--red-1) 24%, transparent); stroke-width: 1.4; }
.anim-flow .f-source {
  fill: var(--red-1);
  filter: drop-shadow(0 0 8px var(--glow-medium));
}
.anim-flow .f-target {
  fill: var(--node-fill); stroke: var(--red-1); stroke-width: 2;
  animation: f-target-pulse 2.4s ease-in-out infinite;
}
.anim-flow .f-target:nth-of-type(2) { animation-delay: 0.2s; }
.anim-flow .f-target:nth-of-type(3) { animation-delay: 0.4s; }
.anim-flow .f-packet {
  fill: var(--red-2);
  filter: drop-shadow(0 0 4px var(--glow-strong));
}
@keyframes f-target-pulse {
  0%, 100% { fill: var(--node-fill); }
  50% { fill: var(--accent-fill); }
}

/* === 04 chat: Q/A bubbles + typing === */
.anim-chat .c-q rect { fill: var(--line-soft); }
.anim-chat .c-q text { fill: var(--ink); }
.anim-chat .c-a rect { fill: var(--red-1); }
.anim-chat .c-a text { fill: var(--button-text); }
.anim-chat .c-text { font: 700 10px/1 ui-sans-serif, system-ui; }
.anim-chat .c-text-light { fill: color-mix(in srgb, var(--button-text) 82%, transparent); }
.anim-chat .c-q { animation: c-in 3.2s ease-in-out infinite; transform-origin: 100px 18px; }
.anim-chat .c-a { animation: c-in 3.2s ease-in-out infinite; animation-delay: 0.6s; transform-origin: 220px 46px; opacity: 0; }
.anim-chat .c-typ {
  fill: color-mix(in srgb, var(--button-text) 82%, transparent);
  animation: c-typ 1.2s ease-in-out infinite;
}
.anim-chat .c-typ-2 { animation-delay: 0.2s; }
.anim-chat .c-typ-3 { animation-delay: 0.4s; }
@keyframes c-in {
  0% { opacity: 0; transform: translateY(8px) scale(0.96); }
  20%, 88% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-4px) scale(0.98); }
}
@keyframes c-typ {
  0%, 100% { opacity: 0.4; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}

/* === 05 pulse: hub + ripples + spokes === */
.anim-pulse .p-core {
  fill: var(--red-1);
  filter: drop-shadow(0 0 10px var(--glow-strong));
}
.anim-pulse .p-ring {
  fill: none; stroke: var(--red-1); stroke-width: 1.6; opacity: 0.6;
  animation: p-ripple 2.4s ease-out infinite;
  transform-origin: 160px 32px;
}
.anim-pulse .p-ring-2 { animation-delay: 1.2s; }
.anim-pulse .p-spokes line {
  stroke: var(--red-1); stroke-width: 1.2; stroke-dasharray: 4 4; opacity: 0.4;
  animation: p-spoke 1.6s linear infinite;
}
.anim-pulse .p-sat {
  fill: var(--node-fill); stroke: var(--red-1); stroke-width: 1.6;
  animation: p-sat 2.4s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
.anim-pulse .p-sat-2 { animation-delay: 0.5s; }
.anim-pulse .p-sat-3 { animation-delay: 1s; }
.anim-pulse .p-sat-4 { animation-delay: 1.5s; }
@keyframes p-ripple {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes p-spoke {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -16; }
}
@keyframes p-sat {
  0%, 100% { fill: var(--node-fill); transform: scale(1); }
  50% { fill: var(--red-1); transform: scale(1.4); }
}

/* === 06 basics: stacking knowledge blocks + crowning sparkle === */
.anim-basics .ba-block {
  fill: var(--node-fill);
  stroke: color-mix(in srgb, var(--red-1) 32%, transparent);
  stroke-width: 1.2;
  filter: drop-shadow(0 3px 6px var(--shadow-soft));
  transform-box: fill-box;
  transform-origin: center bottom;
  animation: ba-rise 3s ease-in-out infinite;
}
.anim-basics .ba-b-0 { animation-delay: 0s; }
.anim-basics .ba-b-1 { animation-delay: 0.25s; }
.anim-basics .ba-b-2 { animation-delay: 0.5s; }
.anim-basics .ba-star {
  fill: var(--red-1);
  filter: drop-shadow(0 0 6px var(--glow-medium));
  transform-box: fill-box;
  transform-origin: center;
  animation: ba-twinkle 3s ease-in-out infinite;
  animation-delay: 0.85s;
}
@keyframes ba-rise {
  0%, 6% { transform: translateY(8px) scaleY(0.4); opacity: 0; }
  18%, 78% { transform: translateY(0) scaleY(1); opacity: 1; }
  92%, 100% { transform: translateY(0) scaleY(1); opacity: 1; }
}
@keyframes ba-twinkle {
  0%, 32% { opacity: 0; transform: scale(0.6) rotate(-12deg); }
  48%, 78% { opacity: 1; transform: scale(1) rotate(0deg); }
  100% { opacity: 0.4; transform: scale(0.9) rotate(6deg); }
}

/* === 07 schools: row of campuses + scanner ring picking each in turn === */
.anim-schools .sc-tower polygon,
.anim-schools .sc-tower rect {
  fill: var(--node-fill);
  stroke: color-mix(in srgb, var(--red-1) 32%, transparent);
  stroke-width: 1.2;
}
.anim-schools .sc-roof { fill: color-mix(in srgb, var(--red-1) 18%, var(--node-fill)); }
.anim-schools .sc-window {
  fill: color-mix(in srgb, var(--red-1) 22%, transparent);
  stroke: none;
}
.anim-schools .sc-door {
  fill: var(--red-1);
  stroke: none;
  opacity: 0.55;
  animation: sc-door-blink 4s steps(1, end) infinite;
}
.anim-schools .sc-t-0 .sc-door { animation-delay: 0s; }
.anim-schools .sc-t-1 .sc-door { animation-delay: 1s; }
.anim-schools .sc-t-2 .sc-door { animation-delay: 2s; }
.anim-schools .sc-t-3 .sc-door { animation-delay: 3s; }
.anim-schools .sc-pick {
  fill: none;
  stroke: var(--red-1);
  stroke-width: 1.6;
  stroke-dasharray: 4 4;
  filter: drop-shadow(0 0 6px var(--glow-medium));
  animation: sc-pick-move 4s cubic-bezier(.6,.1,.4,1) infinite, sc-pick-spin 6s linear infinite;
}
@keyframes sc-pick-move {
  0%,   18%  { transform: translateX(0); }
  25%,  43%  { transform: translateX(60px); }
  50%,  68%  { transform: translateX(120px); }
  75%,  93%  { transform: translateX(180px); }
  100%       { transform: translateX(0); }
}
@keyframes sc-pick-spin {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -32; }
}
@keyframes sc-door-blink {
  0%, 22% { opacity: 0.55; }
  4%, 18% { opacity: 1; }
  30%, 100% { opacity: 0.55; }
}

/* === 08 mentors: avatar pair + envelope along an arc === */
.anim-mentors .mt-bg {
  fill: var(--node-fill);
  stroke: color-mix(in srgb, var(--red-1) 28%, transparent);
  stroke-width: 1.4;
  filter: drop-shadow(0 4px 8px var(--shadow-soft));
}
.anim-mentors .mt-ink { fill: color-mix(in srgb, var(--red-1) 70%, var(--ink)); }
.anim-mentors .mt-cap {
  fill: var(--red-1);
  stroke: var(--red-1);
  stroke-width: 1;
  stroke-linejoin: round;
}
.anim-mentors .mt-to .mt-bg {
  stroke: var(--red-1);
  animation: mt-recv-glow 2.8s ease-in-out infinite;
}
.anim-mentors .mt-from .mt-bg {
  animation: mt-send-glow 2.8s ease-in-out infinite;
}
.anim-mentors .mt-arc {
  stroke: color-mix(in srgb, var(--red-1) 26%, transparent);
  stroke-width: 1.2;
  stroke-dasharray: 3 4;
  animation: mt-arc-flow 1.6s linear infinite;
}
.anim-mentors .mt-envelope rect {
  fill: var(--red-1);
  stroke: var(--red-2);
  stroke-width: 1;
  filter: drop-shadow(0 0 6px var(--glow-medium));
}
.anim-mentors .mt-flap {
  stroke: var(--button-text);
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@keyframes mt-arc-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -14; }
}
@keyframes mt-send-glow {
  0%, 8% { filter: drop-shadow(0 4px 8px var(--shadow-soft)); }
  16%, 28% { filter: drop-shadow(0 0 10px var(--glow-medium)); }
  40%, 100% { filter: drop-shadow(0 4px 8px var(--shadow-soft)); }
}
@keyframes mt-recv-glow {
  0%, 60% { filter: drop-shadow(0 4px 8px var(--shadow-soft)); }
  78%, 92% { filter: drop-shadow(0 0 10px var(--glow-medium)); }
  100% { filter: drop-shadow(0 4px 8px var(--shadow-soft)); }
}

/* === 09 resources: book stack with sparkles cycling across spines === */
.anim-resources .rs-book {
  fill: var(--node-fill);
  stroke: color-mix(in srgb, var(--red-1) 30%, transparent);
  stroke-width: 1.2;
  filter: drop-shadow(0 3px 6px var(--shadow-soft));
}
.anim-resources .rs-b-0 { fill: color-mix(in srgb, var(--red-1) 12%, var(--node-fill)); }
.anim-resources .rs-b-2 { fill: color-mix(in srgb, var(--red-1) 18%, var(--node-fill)); }
.anim-resources .rs-b-4 { fill: color-mix(in srgb, var(--red-1) 10%, var(--node-fill)); }
.anim-resources .rs-band {
  stroke: color-mix(in srgb, var(--red-1) 38%, transparent);
  stroke-width: 1.4;
  stroke-linecap: round;
}
.anim-resources .rs-sparkle {
  fill: var(--red-1);
  filter: drop-shadow(0 0 4px var(--glow-strong));
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: rs-sparkle 2.4s ease-in-out infinite;
}
.anim-resources .rs-s-0 { animation-delay: 0s; }
.anim-resources .rs-s-1 { animation-delay: 0.5s; }
.anim-resources .rs-s-2 { animation-delay: 1s; }
@keyframes rs-sparkle {
  0%, 6% { opacity: 0; transform: scale(0.4) rotate(-20deg); }
  18%, 38% { opacity: 1; transform: scale(1) rotate(0deg); }
  56%, 100% { opacity: 0; transform: scale(0.6) rotate(14deg); }
}

@media (prefers-reduced-motion: reduce) {
  .row__visual *, .row__visual *::before, .row__visual *::after { animation: none !important; }
}

@media (max-width: 1080px) {
  .landing { --container: min(1080px, calc(100% - 80px)); }
  .rows { width: min(100% - 64px, 960px); }

  .hero {
    grid-template-columns: 1fr;
    gap: 24px;
    min-height: auto;
    padding-top: 36px;
  }

  .hero__visual { min-height: 400px; }
  .wordmark { font-size: clamp(7px, 1.55vw, 12px); }

  .badge-emblem { top: 24px; left: 24px; width: 170px; height: 170px; transform: translate(-40px, -40px) scale(0.9); }
}

@media (max-width: 680px) {
  .landing { --container: min(100% - 32px, 1080px); }
  .rows {
    width: min(100% - 32px, 1080px);
    gap: 14px;
    padding-bottom: 56px;
  }

  .hero { min-height: auto; padding-top: 26px; }
  .hero h1 { font-size: 30px; }
  .hero__subtitle { font-size: 13px; }
  .wordmark { font-size: clamp(5px, 1.8vw, 8px); }
  .wordmark__caption { font-size: 9px; letter-spacing: 0.28em; }
  .prompt-box { border-radius: 16px; }
  .prompt-box__footer { flex-wrap: wrap; }
  .prompt-box__footer span { width: 100%; }
  .hero__visual { min-height: 340px; }
  .visual-card--main { right: 0; width: min(320px, 90%); }
  .badge-emblem { width: 130px; height: 130px; }

  .row {
    grid-template-columns: 48px minmax(0, 1fr);
    grid-template-rows: auto auto;
    gap: 8px 16px;
    min-height: 150px;
    padding: 22px 20px;
  }

  .row__body strong { font-size: 20px; }
  .row__visual { grid-column: 1 / -1; height: 76px; }
}
</style>
