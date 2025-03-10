import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginNode from 'eslint-plugin-node'
import configPrettier from 'eslint-config-prettier'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    name: 'node-globals',
    rules: {
      ...pluginNode.configs.globals,
    },
  },
  {
    name: 'node-env',
    languageOptions: {
      globals: {
        process: true,
        ElMessage: true,
        "__BACKEND_URL__": "readonly"  // 声明为只读全局变量
      },
    },
  },

  // 关闭可能与 Prettier 冲突的 ESLint 规则
  configPrettier, // 等价于 "extends": ["prettier"]
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
]
