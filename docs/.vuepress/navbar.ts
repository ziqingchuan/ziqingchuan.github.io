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
      { text: "mini调色板", link: "https://try-catch.life/colorful-board/", icon: "/icons/color-board.svg" },
      { text: "emoji大全", link: "https://try-catch.life/emoji-display/", icon: "/icons/emoji_loveface.svg" },
      {text: "Echarts学习", link: "https://try-catch.life/echarts-demo/", icon: "/icons/chart-logo.svg"},
      {text: "图片处理工具", link: "https://try-catch.life/img-tools/", icon: "/icons/img-tools-logo.svg"},
      {text: "素笔 Mark 编辑器", link: "https://try-catch.life/markdown-editor/", icon: "/icons/markdown-editor-logo.svg"},
      {text: "PDF转图片", link: "https://try-catch.life/pdf-to-picture/", icon: "/icons/pdf-logo.svg"},
      {text: "Easy API", link: "https://www.easyapi.top/", icon: "/icons/easy-api.svg"},
    ],
  },
  { text: "关于我", link: "/我的简历/CurriculumVitae.md", icon: "/icons/heart.svg" },
]);
