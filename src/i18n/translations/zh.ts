
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

  // Tool Names
  toolNames: {
    'word-counter': '字数统计器',
    'text-diff': '文本差异对比',
    'case-converter': '大小写转换器',
    'regex-tester': '正则表达式测试器',
    'add-prefix-suffix': '添加前缀后缀',
    'line-break-manager': '换行管理器',
    'find-replace': '查找替换',
    'remove-duplicate-lines': '删除重复行',
    'remove-empty-lines': '删除空行',
    'remove-extra-spaces': '删除多余空格',
    'html-minifier': 'HTML压缩器',
    'html-beautifier': 'HTML格式化器',
    'html-to-markdown': 'HTML转Markdown',
    'html-to-jsx': 'HTML转JSX',
    'html-previewer': 'HTML预览器',
    'html-to-plain-text': 'HTML转纯文本',
    'html-entity-coder': 'HTML实体编码器',
    'html-wysiwyg-editor': 'HTML所见即所得编辑器',
    'url-encoder': 'URL编码器',
    'base64-encoder': 'Base64编码器',
    'jwt-decoder': 'JWT解码器',
    'base64-string-encoder': 'Base64字符串编码器',
    'date-time-converter': '日期时间转换器',
    'epoch-converter': 'Unix时间戳转换器',
    'integer-base-converter': '进制转换器',
    'roman-numeral-converter': '罗马数字转换器',
    'color-converter': '颜色转换器',
    'text-to-nato-alphabet': '文本转北约音标字母',
    'text-to-ascii-binary': '文本转ASCII/二进制',
    'text-to-unicode': '文本转Unicode',
    'yaml-to-json-converter': 'YAML转JSON',
    'yaml-to-toml': 'YAML转TOML',
    'json-to-yaml-converter': 'JSON转YAML',
    'json-to-toml-converter': 'JSON转TOML',
    'toml-to-json-converter': 'TOML转JSON',
    'toml-to-yaml-converter': 'TOML转YAML',
    'xml-to-json-converter': 'XML转JSON',
    'json-to-xml-converter': 'JSON转XML',
    'markdown-to-html-converter': 'Markdown转HTML',
    'list-converter': '列表转换器',
    'temperature-converter': '温度转换器',
    'iso-generator': 'ISO生成器',
    'cron-editor': 'Cron表达式编辑器',
    'timezone-lookup': '时区查询',
    'json-formatter': 'JSON格式化器',
    'xml-formatter': 'XML格式化器',
    'yaml-converter': 'YAML转换器',
    'hash-generator': '哈希生成器',
    'htpasswd-generator': 'Htpasswd生成器',
    'strong-password-generator': '强密码生成器',
    'uuid-generator': 'UUID生成器',
    'lorem-generator': 'Lorem Ipsum生成器',
    'fake-data-generator': '虚假数据生成器',
    'random-phone-generator': '随机电话号码生成器',
    'random-email-generator': '随机邮箱生成器',
    'color-palette-generator': '调色板生成器',
    'html-color-codes': 'HTML颜色代码',
    'qr-code-generator': '二维码生成器',
    'wifi-qr-generator': 'WiFi二维码生成器',
    'camera-recorder': '摄像头录制器',
    'painting-drawing-tool': '绘图工具',
    'image-format-converter': '图片格式转换器',
    'credential-format-detector': '凭证格式检测器',
    'tokenizer': '分词器',
    'website-rank-tracker': '网站排名追踪器'
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
