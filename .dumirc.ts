import { defineConfig } from 'dumi';

export default defineConfig({
  publicPath:
    process.env.NODE_ENV === 'development'
      ? ''
      : 'https://jmi-hooks.oss-cn-shanghai.aliyuncs.com/',
  base: process.env.NODE_ENV === 'development' ? '/' : '/jmi-hooks',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'jmi-hooks',
    // nav: [{ title: 'hooks', link: '/hooks' }],
  },
  resolve: {
    atomDirs: [
      { type: 'hooks', dir: 'src' }, // 默认值
    ],
  },
  // locales: [
  //   { id: 'zh-CN', name: '中文' },
  //   { id: 'en-US', name: 'EN' },
  // ],
});
