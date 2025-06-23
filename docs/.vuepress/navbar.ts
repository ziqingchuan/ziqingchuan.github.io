/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "首页", link: "/" },
  { text: "博客", link: "/blog/" },
  { text: "标签", link: "/blog/tags/" },
  { text: "归档", link: "/blog/archives/" },
  {
    text: "资源",
    items: [
      { text: "软件质量管理", link: "https://ziqingchuan.github.io/SQM/" },
      { text: "软件系统设计", link: "https://ziqingchuan.github.io/SSD/" },
      { text: "我的简历", link: "/我的简历/CurriculumVitae.md" },
    ],
  },
]);
