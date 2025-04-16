import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',

  title: "知识库",

  description: "前端知识点总结",

  base: '/knowledge-vitepress/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {

    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/docs/hr-exam/behavioural-test' }
    ],

    outline: {
      level: [2, 3],
      label: '目录',
    },


    sidebar: [
      {
        text: '面试准备',
        collapsed: false,
        items: [
          {text: '行为面试技巧', link: '/docs/hr-exam/behavioural-test'}
        ]
      },
      {
        text: '前端知识点',
        collapsed: false,
        items: [
          { text: 'HTML', link: '/docs/front-end/HTML' },
          { text: 'CSS', link: '/docs/front-end/CSS' },
          { text: 'Javascript', link: 'docs/front-end/Javascript' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
