import { defineConfigWithTheme } from 'vitepress'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { loadEnv } from 'vite'  // 导入 loadEnv 来加载环境变量

// 加载环境变量并解构出 clientID 和 clientSecret
const { VITE_CLIENT_ID, VITE_CLIENT_SECRET } = loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// 打印出 VITE_CLIENT_ID 和 VITE_CLIENT_SECRET 的值用于调试
console.log('VITE_CLIENT_ID:', VITE_CLIENT_ID)
console.log('VITE_CLIENT_SECRET:', VITE_CLIENT_SECRET)

export interface ThemeConfig {
  // navBar
  menuList: { name: string; url: string }[];

  // banner
  videoBanner: boolean;
  name: string;
  welcomeText: string;
  motto: string[];
  social: { icon: string; url: string }[];

  // spine
  spineVoiceLang: 'zh' | 'jp';

  // footer
  footerName: string;
  poweredList: { name: string; url: string }[];

  // gitalk
  clientID: string;
  clientSecret: string;
  repo: 'VP_comments';
  owner: 'oear';
  admin: ['oear'];
}

export default defineConfigWithTheme<ThemeConfig>({
  lang: 'zh-CN',
  head: [
    // 网站图标
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    // 引入外部资源
    ...[
      ['link', { rel: 'stylesheet', href: 'https://unpkg.com/gitalk/dist/gitalk.css' }],
      ['script', { src: 'https://unpkg.com/gitalk/dist/gitalk.min.js' }],
      ['link', { rel: 'stylesheet', href: '/font/Blueaka/Blueaka.css' }],
      ['link', { rel: 'stylesheet', href: '/font/Blueaka_Bold/Blueaka_Bold.css' }],
      ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css' }],
      ['script', { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' }]
    ],
  ],
  ignoreDeadLinks: true,
  title: "Sensei's 部落格",
  description: "Sensei's 部落格",
  themeConfig: {
    // navBar
    menuList: [
      { name: '首页', url: '' },
      { name: '标签', url: 'tags/' },
    ],

    // banner区配置
    videoBanner: false,
    name: "Sensei's 部落格",
    welcomeText: 'Hello, 来访者',
    motto: ['和你的日常，就是奇迹。','Everyday moments spent with you are nothing short of miracles.', '何気ない日常で、ほんの少しの奇跡を見つける物語。'],
    social: [
      { icon: 'github', url: 'https://github.com/' },
      { icon: 'bilibili', url: 'https://www.bilibili.com/' },
      { icon: 'qq', url: 'https://im.qq.com/index/' },
      { icon: 'wechat', url: 'https://weixin.qq.com/' },
    ],

    // spine语音配置，可选 zh/jp
    spineVoiceLang: 'zh',

    // footer配置
    footerName: 'Sensei',
    poweredList: [
      { name: 'VitePress', url: 'https://github.com/vuejs/vitepress' },
      { name: 'GitHub Pages', url: 'https://docs.github.com/zh/pages' },
    ],

    // gitalk配置
    clientID: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
    repo: 'VP_comments',  // 请确保这是正确的 GitHub 仓库名，并且该仓库启用了 Issues 功能
    owner: 'oear',
    admin: ['oear'], // 确保管理员列表的用户名正确
  },
  markdown: {
    theme: 'solarized-dark',
    lineNumbers: true,
    math: true,
    config: (md) => {
      // 使用 markdown-it 插件来为图片添加自定义属性
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery',
      })
    },
  },
})
