
import { Translations } from '@/types/i18n';

export const zh: Translations = {
  // Common
  common: {
    search: '搜索',
    back: '返回',
    copy: '复制',
    clear: '清除',
    reset: '重置',
    generate: '生成',
    convert: '转换',
    download: '下载',
    upload: '上传',
    analyze: '分析',
    preview: '预览',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    close: '关闭',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    remove: '移除',
    next: '下一个',
    previous: '上一个',
    settings: '设置',
    help: '帮助',
    about: '关于'
  },

  // Navigation
  navigation: {
    home: '首页',
    tools: '工具',
    categories: '分类',
    backToTools: '返回工具'
  },

  // Header & Hero
  header: {
    title: '开发者工具箱',
    subtitle: '开发者必备在线工具',
    badges: {
      free: '免费',
      noSignup: '无需注册'
    }
  },

  hero: {
    title: '一体化开发者工具',
    subtitle: '为开发者提供的全面必备在线工具集合。无需注册，完全免费，完全在浏览器中运行。',
    searchPlaceholder: '搜索工具...'
  },

  // Tool Categories
  categories: {
    text: '文本工具',
    encoding: '编码与解码',
    converters: '转换器',
    generators: '生成器',
    security: '安全工具',
    html: 'HTML工具',
    data: '数据工具',
    graphics: '图形与设计',
    marketing: '营销工具',
    date: '日期与时间',
    ai: 'AI工具'
  },

  // Common Tool Features
  tools: {
    noResults: '未找到工具',
    noResultsSubtext: '尝试调整您的搜索或分类筛选',
    inputLabel: '输入',
    outputLabel: '输出',
    resultLabel: '结果',
    optionsLabel: '选项',
    previewLabel: '预览',
    exampleLabel: '示例'
  },

  // Language Selector
  language: {
    select: '选择语言',
    current: '当前语言',
    change: '更改语言'
  },

  // Error Messages
  errors: {
    generic: '出现错误，请重试。',
    invalidInput: '提供的输入无效',
    processingFailed: '处理失败，请检查您的输入。',
    copyFailed: '复制到剪贴板失败',
    uploadFailed: '文件上传失败',
    networkError: '网络错误，请检查您的连接。'
  },

  // Success Messages
  success: {
    copied: '已复制到剪贴板',
    generated: '生成成功',
    converted: '转换成功',
    uploaded: '文件上传成功',
    saved: '保存成功'
  }
};
