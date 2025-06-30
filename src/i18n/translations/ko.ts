
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
    about: '정보'
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
    exampleLabel: '예시'
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
