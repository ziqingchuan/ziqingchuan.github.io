/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "博客", link: "/blog/", icon: "/icons/blog.svg" },
  { text: "标签", link: "/blog/tags/", icon: "/icons/tag.svg" },
  { text: "分类", link: "/blog/categories/", icon: "/icons/butterfly.svg" },
  { text: "归档", link: "/blog/archives/", icon: "/icons/guidang.svg" },
  {
    text: "工具",
    icon: "/icons/resource.svg",
    items: [
      { text: "SQM复习网站", link: "https://ziqingchuan.github.io/SQM/", icon: "/icons/SQM.svg" },
      { text: "SSD复习网站", link: "https://ziqingchuan.github.io/SSD/", icon: "/icons/SSD.svg" },
      { text: "mini调色板", link: "http://try-catch.life/colorful-board/", icon: "/icons/color-board.svg" },
      { text: "emoji大全", link: "http://try-catch.life/emoji-display/", icon: "/icons/emoji_loveface.svg" },
    ],
  },
  { text: "关于我", link: "/我的简历/CurriculumVitae.md", icon: "/icons/heart.svg" },
]);
