import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

const nav = [
  { text: '首页', link: '/' },
  {
    text: '前期准备',
    items: [
      { text: '保研基础', link: '/basics/' },
      { text: '时间线', link: '/timeline/' },
      { text: '院校选择', link: '/schools/' }
    ]
  },
  {
    text: '执行阶段',
    items: [
      { text: '材料准备', link: '/materials/' },
      { text: '导师套磁', link: '/mentors/' },
      { text: '申请流程', link: '/applications/' },
      { text: '面试复习', link: '/interviews/' }
    ]
  },
  {
    text: '复盘沉淀',
    items: [
      { text: '经验分享', link: '/experiences/' },
      { text: '推荐资源', link: '/resources/' }
    ]
  }
]

const allSections = [
  { key: 'basics', text: '保研基础' },
  { key: 'timeline', text: '时间线' },
  { key: 'schools', text: '院校选择' },
  { key: 'materials', text: '材料准备' },
  { key: 'mentors', text: '导师套磁' },
  { key: 'applications', text: '申请流程' },
  { key: 'interviews', text: '面试复习' },
  { key: 'experiences', text: '经验分享' },
  { key: 'resources', text: '推荐资源' }
]

const sectionSidebar = allSections.map((s) => {
  const sectionDir = path.resolve(__dirname, `../${s.key}`)
  let mdFiles: { text: string; link: string }[] = []
  
  try {
    const files = fs.readdirSync(sectionDir)
    mdFiles = files
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => {
        const fileName = file.replace('.md', '')
        const filePath = path.join(sectionDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const title = titleMatch ? titleMatch[1] : fileName
        return {
          text: title,
          link: `/${s.key}/${fileName}`
        }
      })
  } catch (err) {
    console.error(`Error reading directory ${s.key}:`, err)
  }
  
  return {
    text: s.text,
    collapsed: false,
    items: [
      { text: '总览', link: `/${s.key}/` },
      ...mdFiles
    ]
  }
})

const sidebar = Object.fromEntries(
  allSections.map((s) => [`/${s.key}/`, sectionSidebar])
)

export default defineConfig({
  base: process.env.VITEPRESS_BASE ?? '/',
  title: '保研 Wiki',
  description: '面向保研申请的信息整理、材料准备、面试复习与经验分享站点。',
  head: [
    [
      'script',
      {},
      `try {
        const key = 'vitepress-theme-appearance'
        if (!localStorage.getItem(key)) localStorage.setItem(key, 'light')
      } catch {}
      `
    ]
  ],
  vite: {
    optimizeDeps: {
      include: ['mermaid']
    }
  },
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const language = token.info.trim().split(/\s+/)[0]

        if (language === 'mermaid') {
          return `<MermaidDiagram graph="${encodeURIComponent(token.content)}" />`
        }

        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  },
  themeConfig: {
    nav,
    sidebar,
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/OpenSHTU/Baoyan-Wiki' }
    ],
    langMenuLabel: '语言',
    returnToTopLabel: '回到顶部',
    outline: {
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: '沉淀保研信息、申请方法与真实经验。',
      copyright: 'Copyright © 2026'
    }
  }
})
