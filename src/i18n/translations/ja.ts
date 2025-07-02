
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
    about: 'について',
    selectLanguage: '言語を選択',
    popularLanguages: '人気の言語',
    otherLanguages: 'その他の言語'
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
    exampleLabel: '例',
    dateTimeConverter: {
      title: '日付時刻変換器',
      description: '日付と時刻を様々な形式に変換',
      visualPicker: 'ビジュアル日付時刻選択器',
      selectDate: '日付を選択',
      selectTime: '時刻を選択',
      pickDate: '日付を選ぶ',
      useSelected: '選択した日付時刻を使用',
      inputDateTime: '日付/時刻を入力',
      inputFormat: '入力形式',
      convertDate: '日付を変換',
      useCurrentTime: '現在時刻を使用',
      clearAll: 'すべてクリア',
      convertedFormats: '変換された形式',
      formatsAvailable: '形式が利用可能',
      tips: 'ヒント:',
      tip1: '簡単な日付選択にはビジュアル選択器を使用してください',
      tip2: 'Unixタイムスタンプは秒（10桁）またはミリ秒（13桁）で表現されます',
      tip3: '自動検出は一般的な日付形式のほとんどで動作します',
      tip4: '現在の日付と時刻を素早く取得するには「現在時刻」を使用してください',
      dateTimeSelected: '日付時刻が選択されました',
      inputUpdated: '選択した日付時刻で入力が更新されました',
      currentTimeSet: '現在時刻が設定されました',
      currentTimeDescription: '現在の日付時刻に入力が設定されました',
      success: '成功',
      successDescription: '日付が正常に変換されました！',
      error: 'エラー',
      errorDescription: '無効な日付形式です。入力を確認してください。',
      copied: 'コピーしました！',
      copiedDescription: '日付形式がクリップボードにコピーされました'
    },
    epochConverter: {
      currentEpochTime: '現在のUnix Epochタイム',
      timestampToHuman: 'タイムスタンプを人間が読める日付に変換',
      humanToTimestamp: '人間が読める日付をタイムスタンプに変換',
      dynamicDateList: '動的日付リスト',
      secondsConverter: '秒を日、時、分に変換',
      startEndDates: '年/月/日の開始と終了のEpoch日付',
      batchConvert: '一括変換（1行に1つ）:',
      now: '今',
      convert: '変換',
      batchConvertButton: '一括変換',
      results: '結果:',
      original: '元の値',
      utcDate: 'UTC日付',
      localDate: 'ローカル日付',
      isoFormat: 'ISO形式',
      unixTimestamp: 'Unixタイムスタンプ',
      milliseconds: 'ミリ秒',
      description: '説明',
      date: '日付',
      inputFormat: '入力形式: RFC 2822, D-M-Y, M/D/Y, Y-M-D など',
      calculate: '計算',
      year: '年:',
      month: '月:',
      day: '日:',
      start: '開始:',
      end: '終了:',
      total: '合計:',
      seconds: '秒',
      days: '日',
      hours: '時間',
      minutes: '分'
    }
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
