<template>
  <section class="tech-showcase">
    <div class="tech-showcase__head">
      <p>Resource Blocks</p>
      <h2>保研申请的关键资源入口</h2>
      <span>把高频问题收束到清晰栏目，方便按阶段查找。</span>
    </div>

    <div class="tech-showcase__grid">
      <a
        v-for="(item, index) in items"
        :key="item.title"
        :href="item.link"
        class="tech-showcase__card"
        :style="{ '--d': `${index * 100}ms` }"
      >
        <div class="tech-showcase__icon">{{ item.icon }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <strong>{{ item.tag }}</strong>
      </a>
    </div>
  </section>
</template>

<script setup>
const items = [
  {
    icon: 'TL',
    title: '时间线',
    desc: '按学年和申请季拆解准备重点，避免关键节点遗漏。',
    tag: 'Plan',
    link: '/timeline/'
  },
  {
    icon: 'CV',
    title: '简历材料',
    desc: '整理简历、个人陈述、证明材料和推荐信的写法。',
    tag: 'Docs',
    link: '/materials/'
  },
  {
    icon: 'AP',
    title: '申请流程',
    desc: '管理信息搜集、导师联系、投递批次和结果记录。',
    tag: 'Apply',
    link: '/applications/'
  },
  {
    icon: 'IN',
    title: '面试复习',
    desc: '覆盖专业课、英语问答、科研表达和项目追问。',
    tag: 'Interview',
    link: '/interviews/'
  },
  {
    icon: 'EX',
    title: '经验分享',
    desc: '沉淀背景、过程、面试题、选择逻辑和踩坑提醒。',
    tag: 'Share',
    link: '/experiences/'
  },
  {
    icon: 'CK',
    title: '检查清单',
    desc: '用清单确认材料完整度、命名规范和提交状态。',
    tag: 'Check',
    link: '/materials/recommendation-and-proof'
  }
]
</script>

<style scoped>
.tech-showcase {
  width: min(1160px, calc(100% - 40px));
  margin: 1rem auto 4.6rem;
}

.tech-showcase__head {
  margin-bottom: 1rem;
  padding: 1.1rem 1.2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 86%, transparent);
}

.tech-showcase__head p {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.tech-showcase__head h2 {
  margin: 0.38rem 0;
  color: var(--vp-c-text-1);
  font-size: clamp(1.3rem, 2.2vw, 1.9rem);
}

.tech-showcase__head span {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.tech-showcase__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.tech-showcase__card {
  text-decoration: none;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 0.95rem;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 88%, transparent);
  box-shadow: 0 10px 22px color-mix(in srgb, var(--akg-shadow) 60%, transparent);
  animation: enter 460ms ease both;
  animation-delay: var(--d);
  transition: transform 170ms ease, box-shadow 170ms ease;
}

.tech-showcase__card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 28px color-mix(in srgb, var(--akg-shadow) 78%, transparent);
}

.tech-showcase__icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 70%, transparent);
  color: var(--vp-c-brand-1);
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.tech-showcase__card h3 {
  margin: 0.65rem 0 0.3rem;
  color: var(--vp-c-text-1);
  font-size: 1.02rem;
}

.tech-showcase__card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.88rem;
}

.tech-showcase__card strong {
  display: inline-block;
  margin-top: 0.58rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-size: 0.74rem;
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-soft) 78%, transparent);
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .tech-showcase__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .tech-showcase {
    width: min(100% - 24px, 1160px);
  }

  .tech-showcase__grid {
    grid-template-columns: 1fr;
  }
}
</style>
