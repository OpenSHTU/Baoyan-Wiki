# 保研资源 Wiki

保研资源 Wiki 是一个基于 [VitePress](https://vitepress.dev/) 构建的保研信息整理与经验分享站点。站点保留原仓库的文档框架与主题结构，将内容调整为推免申请相关的时间线、材料准备、申请流程、面试复习和经验复盘。

## 内容模块

- `docs/timeline/`：保研时间线与阶段规划
- `docs/materials/`：简历、个人陈述、推荐信和证明材料
- `docs/applications/`：信息搜集、导师联系和院校投递策略
- `docs/interviews/`：专业课、英语面试和科研经历表达
- `docs/experiences/`：经验稿模板与复盘方法
- `docs/.vitepress/`：VitePress 配置、主题与组件

## 技术栈

- [VitePress](https://vitepress.dev/)
- `pnpm` 作为包管理器
- `markdown-it-mathjax3` 用于公式渲染
- `mermaid` 用于流程图渲染

## 本地开发

安装依赖：

```bash
pnpm install
```

启动本地开发服务：

```bash
pnpm docs:dev
```

构建静态站点：

```bash
pnpm docs:build
```

预览构建结果：

```bash
pnpm docs:preview
```

## 贡献说明

欢迎补充真实、可复核、对后来者有帮助的保研经验。新增内容建议尽量标明申请年份、学科方向、背景概况、关键节点、面试形式和个人取舍，避免只给结论而缺少上下文。
