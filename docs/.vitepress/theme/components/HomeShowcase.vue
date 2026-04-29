<template>
  <section class="home-showcase">
    <header class="home-showcase__hero">
      <p class="home-showcase__kicker">Application Blueprint</p>
      <h2>从准备到确认，把保研拆成可执行阶段。</h2>
      <p>
        先抓节奏，再补材料。把信息搜集、材料准备、投递面试和经验复盘放在同一套导航里。
      </p>
      <div class="home-showcase__chips">
        <a v-for="chip in chips" :key="chip.title" :href="chip.link">{{ chip.title }}</a>
      </div>
    </header>

    <div class="home-showcase__grid">
      <a v-for="card in pathways" :key="card.title" :href="card.link" class="home-showcase__pathway">
        <span>{{ card.step }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.desc }}</p>
      </a>

      <aside class="home-showcase__panel">
        <h3>申请节奏</h3>
        <ol>
          <li v-for="stage in stages" :key="stage.title">
            <strong>{{ stage.title }}</strong>
            <span>{{ stage.desc }}</span>
          </li>
        </ol>
        <div class="home-showcase__stats">
          <div>
            <strong>5</strong>
            <span>主题栏目</span>
          </div>
          <div>
            <strong>18+</strong>
            <span>准备清单</span>
          </div>
          <div>
            <strong>开放</strong>
            <span>经验共建</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
const chips = [
  { title: '时间线', link: '/timeline/' },
  { title: '材料准备', link: '/materials/' },
  { title: '申请流程', link: '/applications/' },
  { title: '经验分享', link: '/experiences/' }
]

const pathways = [
  {
    step: '01',
    title: '前期积累',
    desc: '围绕绩点、排名、英语、科研和竞赛建立长期竞争力。',
    link: '/timeline/undergraduate-plan'
  },
  {
    step: '02',
    title: '材料打磨',
    desc: '把简历、陈述、证明材料和推荐信整理成可复用版本。',
    link: '/materials/'
  },
  {
    step: '03',
    title: '投递面试',
    desc: '管理院校信息、导师沟通、申请批次和面试复习。',
    link: '/applications/'
  },
  {
    step: '04',
    title: '复盘共建',
    desc: '记录背景、过程、题目、选择和遗憾，让经验可传递。',
    link: '/experiences/'
  }
]

const stages = [
  { title: '查', desc: '同步官方通知、学院公告和往年经验，建立信息表。' },
  { title: '备', desc: '提前准备材料版本，减少申请季的临时返工。' },
  { title: '复', desc: '面试后沉淀题目、反馈和选择依据，持续更新站点。' }
]
</script>

<style scoped>
.home-showcase {
  width: min(1180px, calc(100% - 40px));
  margin: 2rem auto 4rem;
  position: relative;
  z-index: 2;
}

.home-showcase__hero {
  padding: 1.6rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  background:
    linear-gradient(130deg, color-mix(in srgb, var(--akg-blue) 8%, transparent), transparent 55%),
    color-mix(in srgb, var(--vp-c-bg-elv) 86%, transparent);
}

.home-showcase__kicker {
  margin: 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 800;
  color: var(--akg-sapphire);
}

.home-showcase__hero h2 {
  margin: 0.4rem 0 0.55rem;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.home-showcase__hero > p {
  margin: 0;
  color: var(--vp-c-text-2);
  max-width: 760px;
  line-height: 1.72;
}

.home-showcase__chips {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.home-showcase__chips a {
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  padding: 0.38rem 0.8rem;
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 80%, transparent);
  transition: border-color 180ms ease, transform 180ms ease;
}

.home-showcase__chips a:hover {
  border-color: color-mix(in srgb, var(--akg-sapphire) 56%, var(--vp-c-border));
  transform: translateY(-2px);
}

.home-showcase__grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 14px;
}

.home-showcase__pathway {
  grid-column: span 4;
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1rem;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 82%, transparent);
  transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.home-showcase__pathway:hover {
  border-color: color-mix(in srgb, var(--akg-teal) 52%, var(--vp-c-border));
  transform: translateY(-2px);
  box-shadow: 0 14px 28px color-mix(in srgb, var(--akg-crust) 26%, transparent);
}

.home-showcase__pathway span {
  display: block;
  color: var(--akg-sapphire);
  font-weight: 800;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
}

.home-showcase__pathway h3 {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.home-showcase__pathway p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.65;
  font-size: 0.92rem;
}

.home-showcase__panel {
  grid-column: span 12;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1rem;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--akg-teal) 7%, transparent), transparent 65%),
    color-mix(in srgb, var(--vp-c-bg-elv) 84%, transparent);
}

.home-showcase__panel h3 {
  margin: 0 0 0.7rem;
  color: var(--vp-c-text-1);
  font-size: 1.02rem;
}

.home-showcase__panel ol {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.55rem;
}

.home-showcase__panel li {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.home-showcase__panel strong {
  margin-right: 0.38rem;
  color: var(--vp-c-text-1);
}

.home-showcase__stats {
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.home-showcase__stats div {
  border: 1px solid color-mix(in srgb, var(--akg-sapphire) 24%, var(--vp-c-border));
  border-radius: 10px;
  padding: 0.7rem;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 82%, transparent);
}

.home-showcase__stats strong {
  display: block;
  color: var(--akg-sapphire);
  font-size: 1.05rem;
}

.home-showcase__stats span {
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
}

@media (max-width: 960px) {
  .home-showcase__pathway {
    grid-column: span 6;
  }
}

@media (max-width: 680px) {
  .home-showcase {
    width: min(100% - 24px, 1180px);
  }

  .home-showcase__hero {
    padding: 1.1rem;
  }

  .home-showcase__pathway,
  .home-showcase__panel {
    grid-column: span 12;
  }

  .home-showcase__stats {
    grid-template-columns: 1fr;
  }
}
</style>
