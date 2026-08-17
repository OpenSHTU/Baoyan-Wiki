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
> 该项目目前处于开发完善阶段、欢迎贡献！

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

## 🤝 参与贡献

欢迎修正错别字、补充申请信息、分享经验，或改进网站的样式与功能。提交内容前，请确保不包含个人隐私、未经公开的考核材料，以及没有转载授权的大段内容。院校政策和时间安排可能变化，涉及此类信息时请注明适用年份，并尽量附上官方来源。

### 直接在网页上修改

如果只需要修改某一篇文档，可以点击页面正文底部的「在 GitHub 上编辑此页」：

1. 登录 GitHub，进入对应 Markdown 文件的编辑页面。
2. 点击右上角编辑按钮，修改并预览内容。
3. 在页面底部填写简短的修改说明，选择创建新分支并发起 Pull Request。
4. 在 Pull Request 中说明修改原因，等待维护者审核。

没有仓库写入权限时，GitHub 会引导你 Fork 仓库并从个人 Fork 发起 Pull Request，无需预先在本地配置开发环境。

### Fork &  Pull Request

修改多篇文档、增加页面或调整网站代码时，推荐采用标准的 Fork 与 Pull Request 流程：

1. 在 GitHub 上 [Fork 本仓库](https://github.com/OpenSHTU/Baoyan-Wiki/fork)，并将个人 Fork 克隆到本地。
2. 从最新的 `main` 创建一个独立分支。分支名简要说明用途即可，例如 `docs/update-camp-guide` 或 `fix/broken-link`。
3. 在该分支中完成修改并进行本地预览。正文位于 `content/`；新增、移动或删除栏目时，还需同步检查 `hugo.yaml` 和 `data/wiki/nav.toml` 中的导航配置。
4. 将修改提交并推送到个人 Fork，然后向 `OpenSHTU/Baoyan-Wiki:main` 发起 Pull Request。
5. 在 PR 中说明修改内容、修改原因和验证方式；涉及界面调整时，建议附上截图。
6. 根据审核意见继续更新同一分支。PR 合并后，GitHub Pages 会自动构建并发布最新站点。

贡献内容时，请尽量保持原文的语言风格，区分官方规则、个人经验和推测，并为容易变化的信息注明年份或官方来源。请勿提交个人隐私、未公开题目、内部材料、无转载授权的内容，以及 Hugo 生成的 `public/` 目录。若计划大规模调整目录结构、主题或构建流程，建议先创建 Issue 讨论方案。
