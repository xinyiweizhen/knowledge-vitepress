import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',

  title: "知识库",

  description: "前端知识点总结",

  // GitHub Pages repositoryname
  base: '/knowledge-vitepress/', // https://<owner>.github.io/<repositoryname>

  head: [
    ['link', { rel: 'icon', href: '/knowledge-vitepress/favicon.ico' }], // add base
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
          { text: 'Vue', link: 'docs/front-end/Vue' },
          { text: 'React', link: 'docs/front-end/React' },
          { text: '浏览器', link: 'docs/front-end/Browser' },
          { text: '网络', link: 'docs/front-end/Http' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xinyiweizhen/knowledge-vitepress' }
    ]
  }
})
