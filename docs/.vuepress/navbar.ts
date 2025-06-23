/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "首页", link: "/", icon: "/icons/home.svg" },
  { text: "博客", link: "/blog/", icon: "/icons/blog.svg" },
  { text: "标签", link: "/blog/tags/", icon: "/icons/tag.svg" },
  { text: "归档", link: "/blog/archives/", icon: "/icons/guidang.svg" },
  {
    text: "资源",
    icon: "/icons/resource.svg",
    items: [
      { text: "软件质量管理", link: "https://ziqingchuan.github.io/SQM/", icon: "/icons/SQM.svg" },
      { text: "软件系统设计", link: "https://ziqingchuan.github.io/SSD/", icon: "/icons/SSD.svg" },
      { text: "我的简历", link: "/我的简历/CurriculumVitae.md", icon: "/icons/heart.svg" },
    ],
  },
]);
