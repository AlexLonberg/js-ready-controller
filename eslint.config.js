import { defineConfig } from 'eslint/config'
import tsEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { rules, rulesTest } from './eslint.rules.js'

// DOC eslint    https://eslint.org/docs/latest/use/configure/configuration-files
//     ts        https://typescript-eslint.io/getting-started/
//     stylistic https://eslint.style/rules
export default defineConfig([
  {
    // Глобальное игнорирование - применяются ко всему проекту.
    // Во Flat Config есть нюанс: если в объекте конфигурации есть только ключ ignores, эти ignores становятся
    // глобальными (как .eslintignore). Если же ignores идет вместе с files, то они работают только внутри этого блока.
    ignores: [
      '.*/**',
      'node_modules/**',
      'dist/**'
    ]
  },
  {
    name: 'js-ready-controller',
    files: [
      'src/**/*.ts'
    ],
    // Исключаем файлы тестов и временные _file.ts
    ignores: [
      'src/**/*.d.ts',
      'src/**/*.{test,bench}.ts',
      'src/**/_*',
      'src/dts/**'
    ],
    languageOptions: {
      // Для проектов DOM скопировать сюда версию из tsconfig.json lib. Скорее всего самая безопасная "ES2022" и здесь
      // она должна быть прописана числом - `2022`
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      '@stylistic': stylistic
    },
    rules
  },
  {
    name: 'js-ready-controller-tests',
    files: [
      'src/**/*.{test,bench}.ts',
      'src/**/_*',
      'scripts/**/*.{ts,js}',
      'eslint.rules.js',
      'eslint.config.js',
      'vitest.config.ts'
    ],
    // Дублируем конфигурацию languageOptions + plugins - эти файлы игнорируются в name:'js-ready-controller' и конфиги не унаследуются.
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      '@stylistic': stylistic
    },
    // Расширяем менее строгими правилами для тестовых и вспомогательных файлов.
    rules: rulesTest // rulesTest уже расширяет rules
  }
])
