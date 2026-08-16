<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=C8102E&height=220&section=header&text=SHTU%20Baoyan%20Wiki&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=ShanghaiTech%20Postgraduate%20Recommendation%20Resource&descAlignY=55&descSize=18" width="100%" />

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=C8102E&center=true&vCenter=true&width=800&lines=Welcome+to+SHTU+Postgraduate+Wiki!+🎓;For+ShanghaiTech+Students,+By+Students.;Master+your+application+timeline.;Share+knowledge,+Grow+together." alt="Typing SVG" />
</a>

<br/>

<p>
  <b>上海科技大学保研规划指南</b>
</p>
<p>
  🚀 针对上科大培养方案定制 • 📚 通用保研规划全覆盖 • 🤝 经验互助与复盘
</p>

<p>
  <a href="https://github.com/OpenSHTU/AI-Wiki">
    <img src="https://img.shields.io/github/stars/OpenSHTU/AI-Wiki?style=for-the-badge&logo=github&logoColor=white&label=Star+Wiki&color=C8102E&labelColor=101010" alt="Star Wiki">
  </a>
  <a href="https://github.com/OpenSHTU">
    <img src="https://img.shields.io/badge/Org-OpenSHTU-orange?style=for-the-badge&logo=github&logoColor=white&labelColor=101010" alt="OpenSHTU Org">
  </a>
  <a href="mailto:wangzh12023@shanghaitech.edu.cn">
    <img src="https://img.shields.io/badge/Contact-Email-blue?style=for-the-badge&logo=gmail&logoColor=white&labelColor=101010" alt="Email">
  </a>
</p>

</div>

---


> [!NOTE]  
> 该项目处于开发阶段

## 📖 项目简介

**Baoyan Wiki** 是一个由上科大学子自发创建、自发维护、自发贡献的保研指南网站，涵盖了从保研时间线到院校规划到最终夏令营预推免参加的一系列全流程攻略。

本站点致力于服务 **上海科技大学（ShanghaiTech）** 学子，涵盖了从大三下学期预推免到正式投递的全流程引导。同时也欢迎兄弟院校学子参考其中的通用材料准备与复习策略。

## 🛠️ 技术栈

- **静态站点生成器**: [Hugo](https://gohugo.io/) (extended 版)
- **主题**: [hugo-theme-ladder](https://github.com/guangzhengli/hugo-theme-ladder)（以 git submodule 引入）

## 💻 本地开发

> [!NOTE]
> 需要先安装 [Hugo (extended)](https://gohugo.io/installation/)（与 CI 一致，建议使用 `0.165.0` 或更高版本）。

```bash
# 克隆仓库并拉取主题子模块
git clone --recurse-submodules https://github.com/OpenSHTU/Baoyan-Wiki.git
cd Baoyan-Wiki

# 启动开发服务器（默认 http://localhost:1313）
hugo server

# 构建静态站点（输出到 public/）
hugo --minify

# 本地预览构建产物
hugo server --disableFastRender
```
