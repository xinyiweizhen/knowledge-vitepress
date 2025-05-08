import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',

  title: '知识库',

  description: '前端知识点总结',

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
      {
        text: '前端',
        items: [
          {
            text: '面试准备',
            link: '/docs/hr-exam/behavioural-test',
          },
          {
            text: '前端知识点',
            link: '/docs/front-end/HTML',
          },
          {
            text: 'ES 新特性',
            link: '/docs/esnext-book/es2016/es2016',
          },
        ],
      },
      {
        text: '教程',
        items: [
          {
            text: 'Flexbox 布局教程',
            link: '/docs/guides/css-flexbox-guide/css-flexbox-guide',
          },
          {
            text: '网格布局指南(Grid)',
            link: '/docs/guides/css-grid-layout-guide/css-grid-layout-guide'
          },
        ],
      },
      {
        text: '资源',
        items: [
          {
            text: '优秀资源库',
            items: [
                { text: 'es-toolkit', link: 'https://es-toolkit.slash.page/zh_hans/'}
            ]
          }
        ]
      }
    ],

    outline: {
      level: 2,
      label: '目录',
    },

    sidebar: {
      '/docs/hr-exam/': [
        {
          text: '面试准备',
          collapsed: false,
          items: [{ text: '行为面试技巧', link: '/docs/hr-exam/behavioural-test' }],
        },
      ],
      '/docs/front-end/': [
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
            { text: 'Webpack', link: 'docs/front-end/Webpack' },
          ],
        },
      ],
      '/docs/esnext-book/': [
        {
          text: 'ES 新特性',
          collapsed: false,
          items: [
            {
              text: 'ES2016',
              link: '/docs/esnext-book/es2016/es2016',
              collapsed: true,
              items: [
                { text: 'Array.prototype.includes', link: '/docs/esnext-book/es2016/array-prototype-includes' },
                { text: '求幂运算符(**)', link: '/docs/esnext-book/es2016/proposal-exponentiation-operator' },
              ],
            },
            {
              text: 'ES2017',
              link: '/docs/esnext-book/es2017/es2017',
              collapsed: true,
              items: [
                { text: 'Async / Await', link: '/docs/esnext-book/es2017/async-await' },
                { text: 'Shared Memory and Atomics', link: '/docs/esnext-book/es2017/sharedmem' },
                { text: 'Object.values / Object.entries', link: '/docs/esnext-book/es2017/object-values-entries' },
                { text: 'String padding', link: '/docs/esnext-book/es2017/string-pad-start-end' },
                { text: 'Trailing comma', link: '/docs/esnext-book/es2017/trailing-function-commas' },
                {
                  text: 'Object.getOwnPropertyDescriptors',
                  link: '/docs/esnext-book/es2017/object-getownpropertydescriptors',
                },
              ],
            },
            {
              text: 'ES2018',
              link: '/docs/esnext-book/es2018/es2018',
              collapsed: true,
              items: [
                { text: 'Template Literal Revision', link: '/docs/esnext-book/es2018/template-literal-revision' },
                { text: 's/dotAll flag for regular expressions', link: '/docs/esnext-book/es2018/regexp-dotall-flag' },
                { text: 'RegExp Named Capture Groups', link: '/docs/esnext-book/es2018/regexp-named-groups' },
                { text: 'Object Rest/Spread Properties', link: '/docs/esnext-book/es2018/object-rest-spread' },
                { text: 'RegExp Lookbehind Assertions', link: '/docs/esnext-book/es2018/regexp-lookbehind' },
                {
                  text: 'Unicode property escapes in regular expressions',
                  link: '/docs/esnext-book/es2018/regexp-unicode-property-escapes',
                },
                { text: 'Promise.prototype.finally', link: '/docs/esnext-book/es2018/promise-finally' },
                { text: 'Async Iteration', link: '/docs/esnext-book/es2018/async-iteration' },
              ],
            },
            {
              text: 'ES2019',
              link: '/docs/esnext-book/es2019/es2019',
              collapsed: true,
              items: [
                { text: 'Optional catch binding', link: '/docs/esnext-book/es2019/optional-catch-binding' },
                { text: 'JSON superset', link: '/docs/esnext-book/es2019/json-superset' },
                { text: 'Symbol.prototype.description', link: '/docs/esnext-book/es2019/symbol-description' },
                {
                  text: 'Function.prototype.toString',
                  link: '/docs/esnext-book/es2019/function-prototype-toString-revision',
                },
                { text: 'Object.fromEntries', link: '/docs/esnext-book/es2019/object-from-entries' },
                { text: 'Well-formed JSON.stringify', link: '/docs/esnext-book/es2019/well-formed-stringify' },
                {
                  text: 'String.prototype.{trimStart,trimEnd}',
                  link: '/docs/esnext-book/es2019/string-left-right-trim',
                },
                { text: 'Array.prototype.{flat,flatMap}', link: '/docs/esnext-book/es2019/array-prototype-flatMap' },
              ],
            },
            {
              text: 'ES2020',
              link: '/docs/esnext-book/es2020/es2020',
              collapsed: true,
              items: [
                { text: 'String.prototype.matchAll', link: '/docs/esnext-book/es2020/string-matchall' },
                { text: 'Dynamic Import', link: '/docs/esnext-book/es2020/dynamic-import' },
                { text: 'BigInt', link: '/docs/esnext-book/es2020/bigint' },
                { text: 'Promise.allSettled', link: '/docs/esnext-book/es2020/promise-allSettled' },
                { text: 'globalThis', link: '/docs/esnext-book/es2020/global' },
                { text: 'for-in mechanics', link: '/docs/esnext-book/es2020/for-in-order' },
                { text: 'Optional Chaining', link: '/docs/esnext-book/es2020/optional-chaining' },
                { text: 'Nullish coalescing Operator', link: '/docs/esnext-book/es2020/nullish-coalescing' },
                { text: 'import.meta', link: '/docs/esnext-book/es2020/import-meta' },
              ],
            },
            {
              text: 'ES2021',
              link: '/docs/esnext-book/es2021/es2021',
              collapsed: true,
              items: [
                { text: 'String.prototype.replaceAll', link: '/docs/esnext-book/es2021/string-replaceall' },
                { text: 'Promise.any', link: '/docs/esnext-book/es2021/promise-any' },
                { text: 'WeakRefs', link: '/docs/esnext-book/es2021/weakrefs' },
                { text: 'Logical Assignment Operators', link: '/docs/esnext-book/es2021/logical-assignment' },
                { text: 'Numeric Separators', link: '/docs/esnext-book/es2021/numeric-separator' },
              ],
            },
            {
              text: 'ES2022',
              link: '/docs/esnext-book/es2022/es2022',
              collapsed: true,
              items: [
                { text: 'Class Fields', link: '/docs/esnext-book/es2022/class-fields' },
                { text: 'RegExp Match Indices', link: '/docs/esnext-book/es2022/regexp-match-indices' },
                { text: 'Top-level await', link: '/docs/esnext-book/es2022/top-level-await' },
              ],
            },
            {
              text: 'ES2023',
              link: '/docs/esnext-book/es2023/es2023',
              collapsed: true,
              items: [
                { text: 'Array find from last', link: '/docs/esnext-book/es2023/array-find-from-last' },
                { text: 'Hashbang Grammar', link: '/docs/esnext-book/es2023/hashbang-grammar' },
                { text: 'Symbols as WeakMap keys', link: '/docs/esnext-book/es2023/symbols-as-weakmap-keys.md' },
                { text: 'Change Array by copy', link: '/docs/esnext-book/es2023/change-array-by-copy' },
              ],
            }
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xinyiweizhen/knowledge-vitepress' }],
  },
  ignoreDeadLinks: [],
  vite: {
    assetsInclude: [
      '**/*.image', // 处理图片 .image 后缀的图片
      '**/*.webp', // 处理图片 .webp 后缀的图片
    ],
  },
})
