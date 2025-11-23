/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "博客", link: "/blog/", icon: "/icons/blog.svg" },
  { text: "标签", link: "/blog/tags/", icon: "/icons/blog.svg" },
  { text: "分类", link: "/blog/categories/", icon: "/icons/blog.svg" },
  { text: "归档", link: "/blog/archives/", icon: "/icons/blog.svg" },
  {
    text: "工具",
    icon: "/icons/blog.svg",
    items: [
      {text: "素笔 Mark 编辑器", link: "https://marklite.cn/", icon: "/icons/markdown-editor-logo.svg"},
      {text: "DailyUp 日报周报", link: "https://try-catch.life/DailyUp/", icon: "/icons/DailyUp.svg"},
      {text: "AI 伴学平台", link: "https://try-catch.life/AI-partner/", icon: "/icons/ai-partner.svg"},
      {text: "Echarts学习", link: "https://try-catch.life/echarts-demo/", icon: "/icons/chart-logo.svg"},
      {text: "Easy API", link: "https://www.easyapi.top/", icon: "/icons/easy-api.svg"},
      { text: "mini调色板", link: "https://try-catch.life/colorful-board/", icon: "/icons/color-board.svg" },
      { text: "emoji大全", link: "https://try-catch.life/emoji-display/", icon: "/icons/emoji_loveface.svg" },
      {text: "图片处理工具", link: "https://try-catch.life/img-tools/", icon: "/icons/img-tools-logo.svg"},
      {text: "PDF转图片", link: "https://try-catch.life/pdf-to-picture/", icon: "/icons/pdf-logo.svg"},
      {text: "慧眼", link: "https://try-catch.life/MyCharts/", icon: "/icons/monitor.svg"},
    ],
  },
  { text: "关于我", link: "/我的简历/MyCV.md", icon: "/icons/blog.svg" },
]);
