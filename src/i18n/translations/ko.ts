
import { Translations } from '@/types/i18n';

export const ko: Translations = {
  // Common
  common: {
    search: '검색',
    back: '뒤로',
    copy: '복사',
    clear: '지우기',
    reset: '재설정',
    generate: '생성',
    convert: '변환',
    download: '다운로드',
    upload: '업로드',
    analyze: '분석',
    preview: '미리보기',
    loading: '로딩중...',
    error: '오류',
    success: '성공',
    close: '닫기',
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    edit: '편집',
    add: '추가',
    remove: '제거',
    next: '다음',
    previous: '이전',
    settings: '설정',
    help: '도움말',
    about: '정보',
    selectLanguage: '언어 선택',
    popularLanguages: '인기 언어',
    otherLanguages: '기타 언어'
  },

  // Navigation
  navigation: {
    home: '홈',
    tools: '도구',
    categories: '카테고리',
    backToTools: '도구로 돌아가기'
  },

  // Header & Hero
  header: {
    title: '개발자 도구상자',
    subtitle: '개발자를 위한 필수 온라인 도구',
    badges: {
      free: '무료',
      noSignup: '가입 불필요'
    }
  },

  hero: {
    title: '올인원 개발자 도구',
    subtitle: '개발자를 위한 필수 온라인 도구의 포괄적인 컬렉션. 가입이 필요하지 않으며, 완전히 무료이고, 브라우저에서 완전히 작동합니다.',
    searchPlaceholder: '도구 검색...'
  },

  // Tool Categories
  categories: {
    text: '텍스트 도구',
    encoding: '인코딩 및 디코딩',
    converters: '변환기',
    generators: '생성기',
    security: '보안 도구',
    html: 'HTML 도구',
    data: '데이터 도구',
    graphics: '그래픽 및 디자인',
    marketing: '마케팅 도구',
    date: '날짜 및 시간',
    ai: 'AI 도구'
  },

  // Common Tool Features
  tools: {
    noResults: '도구를 찾을 수 없습니다',
    noResultsSubtext: '검색어나 카테고리 필터를 조정해 보세요',
    inputLabel: '입력',
    outputLabel: '출력',
    resultLabel: '결과',
    optionsLabel: '옵션',
    previewLabel: '미리보기',
    exampleLabel: '예시',
    dateTimeConverter: {
      title: '날짜시간 변환기',
      description: '날짜와 시간을 다양한 형식으로 변환',
      visualPicker: '시각적 날짜시간 선택기',
      selectDate: '날짜 선택',
      selectTime: '시간 선택',
      pickDate: '날짜를 선택하세요',
      useSelected: '선택한 날짜시간 사용',
      inputDateTime: '날짜/시간 입력',
      inputFormat: '입력 형식',
      convertDate: '날짜 변환',
      useCurrentTime: '현재 시간 사용',
      clearAll: '모두 지우기',
      convertedFormats: '변환된 형식',
      formatsAvailable: '형식 사용 가능',
      tips: '팁:',
      tip1: '쉬운 날짜 선택을 위해 시각적 선택기를 사용하세요',
      tip2: 'Unix 타임스탬프는 초(10자리) 또는 밀리초(13자리)일 수 있습니다',
      tip3: '자동 감지는 대부분의 일반적인 날짜 형식에서 작동합니다',
      tip4: '현재 날짜와 시간을 빠르게 얻으려면 "현재 시간"을 사용하세요',
      dateTimeSelected: '날짜시간 선택됨',
      inputUpdated: '선택한 날짜시간으로 입력이 업데이트되었습니다',
      currentTimeSet: '현재 시간 설정됨',
      currentTimeDescription: '현재 날짜시간으로 입력이 설정되었습니다',
      success: '성공',
      successDescription: '날짜가 성공적으로 변환되었습니다!',
      error: '오류',
      errorDescription: '잘못된 날짜 형식입니다. 입력을 확인해주세요.',
      copied: '복사됨!',
      copiedDescription: '날짜 형식이 클립보드에 복사되었습니다'
    },
    epochConverter: {
      currentEpochTime: '현재 Unix Epoch 시간',
      timestampToHuman: '타임스탬프를 사람이 읽을 수 있는 날짜로 변환',
      humanToTimestamp: '사람이 읽을 수 있는 날짜를 타임스탬프로 변환',
      dynamicDateList: '동적 날짜 목록',
      secondsConverter: '초를 일, 시간, 분으로 변환',
      startEndDates: '연/월/일의 시작과 끝 Epoch 날짜',
      batchConvert: '일괄 변환 (한 줄에 하나씩):',
      now: '지금',
      convert: '변환',
      batchConvertButton: '일괄 변환',
      results: '결과:',
      original: '원본',
      utcDate: 'UTC 날짜',
      localDate: '로컬 날짜',
      isoFormat: 'ISO 형식',
      unixTimestamp: 'Unix 타임스탬프',
      milliseconds: '밀리초',
      description: '설명',
      date: '날짜',
      inputFormat: '입력 형식: RFC 2822, D-M-Y, M/D/Y, Y-M-D 등',
      calculate: '계산',
      year: '년:',
      month: '월:',
      day: '일:',
      start: '시작:',
      end: '끝:',
      total: '총:',
      seconds: '초',
      days: '일',
      hours: '시간',
      minutes: '분'
    }
  },

  // Language Selector
  language: {
    select: '언어 선택',
    current: '현재 언어',
    change: '언어 변경'
  },

  // Error Messages
  errors: {
    generic: '문제가 발생했습니다. 다시 시도해 주세요.',
    invalidInput: '잘못된 입력이 제공되었습니다',
    processingFailed: '처리에 실패했습니다. 입력을 확인해 주세요.',
    copyFailed: '클립보드에 복사하지 못했습니다',
    uploadFailed: '파일 업로드에 실패했습니다',
    networkError: '네트워크 오류. 연결을 확인해 주세요.'
  },

  // Success Messages
  success: {
    copied: '클립보드에 복사됨',
    generated: '성공적으로 생성됨',
    converted: '성공적으로 변환됨',
    uploaded: '파일이 성공적으로 업로드됨',
    saved: '성공적으로 저장됨'
  }
};
