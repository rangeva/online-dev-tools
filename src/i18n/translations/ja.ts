
import { Translations } from '@/types/i18n';

export const ja: Translations = {
  // Common
  common: {
    search: '検索',
    back: '戻る',
    copy: 'コピー',
    clear: 'クリア',
    reset: 'リセット',
    generate: '生成',
    convert: '変換',
    download: 'ダウンロード',
    upload: 'アップロード',
    analyze: '分析',
    preview: 'プレビュー',
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    close: '閉じる',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    add: '追加',
    remove: '削除',
    next: '次へ',
    previous: '前へ',
    settings: '設定',
    help: 'ヘルプ',
    about: 'について'
  },

  // Navigation
  navigation: {
    home: 'ホーム',
    tools: 'ツール',
    categories: 'カテゴリー',
    backToTools: 'ツールに戻る'
  },

  // Header & Hero
  header: {
    title: '開発者ツールボックス',
    subtitle: '開発者向け必須オンラインツール',
    badges: {
      free: '無料',
      noSignup: '登録不要'
    }
  },

  hero: {
    title: 'オールインワン開発者ツール',
    subtitle: '開発者向け必須オンラインツールの包括的なコレクション。登録不要、完全無料、ブラウザで完全に動作します。',
    searchPlaceholder: 'ツールを検索...'
  },

  // Tool Categories
  categories: {
    text: 'テキストツール',
    encoding: 'エンコード・デコード',
    converters: 'コンバーター',
    generators: 'ジェネレーター',
    security: 'セキュリティツール',
    html: 'HTMLツール',
    data: 'データツール',
    graphics: 'グラフィック・デザイン',
    marketing: 'マーケティングツール',
    date: '日付・時刻',
    ai: 'AIツール'
  },

  // Common Tool Features
  tools: {
    noResults: 'ツールが見つかりません',
    noResultsSubtext: '検索条件やカテゴリーフィルターを調整してください',
    inputLabel: '入力',
    outputLabel: '出力',
    resultLabel: '結果',
    optionsLabel: 'オプション',
    previewLabel: 'プレビュー',
    exampleLabel: '例'
  },

  // Language Selector
  language: {
    select: '言語を選択',
    current: '現在の言語',
    change: '言語を変更'
  },

  // Error Messages
  errors: {
    generic: '何かが間違っています。もう一度お試しください。',
    invalidInput: '無効な入力が提供されました',
    processingFailed: '処理に失敗しました。入力を確認してください。',
    copyFailed: 'クリップボードへのコピーに失敗しました',
    uploadFailed: 'ファイルのアップロードに失敗しました',
    networkError: 'ネットワークエラー。接続を確認してください。'
  },

  // Success Messages
  success: {
    copied: 'クリップボードにコピーしました',
    generated: '正常に生成されました',
    converted: '正常に変換されました',
    uploaded: 'ファイルが正常にアップロードされました',
    saved: '正常に保存されました'
  }
};
