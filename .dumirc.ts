import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'jmi-hooks',
    // nav: [{ title: 'hooks', link: '/hooks' }],
  },
  resolve: {
    atomDirs: [
      { type: 'jmi-hooks', dir: 'src' }, // 默认值
    ]
  }
  // locales: [
  //   { id: 'zh-CN', name: '中文' },
  //   { id: 'en-US', name: 'EN' },
  // ],
});
