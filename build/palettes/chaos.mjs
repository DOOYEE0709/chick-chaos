// Chick Chaos — 원본 팔레트
// 이 파일의 색만 바꾸면 테마 전체가 갱신된다.
export default {
  name: 'Chick Chaos',
  type: 'dark',
  uiTheme: 'vs-dark',
  slug: 'chick-chaos',

  // ── 배경 (화면에서 제일 눈에 띄는 면들) ──
  bg:            '#000000',  // 에디터
  bgSidebar:     '#5a5620',  // 사이드바 (올리브)
  bgActivityBar: '#2c2a0d',  // 액티비티바
  bgPanel:       '#00343d',  // 패널 · 터미널 (청록)
  bgTabs:        '#565000',  // 탭 바
  bgTabActive:   '#113f47',  // 활성 탭
  bgTitleBar:    '#4b848e',  // 타이틀바
  bgStatusBar:   '#0099ff',  // 상태바

  // ── 전경 · 강조 ──
  fg:      '#d9d9d9',  // 기본 글자
  white:   '#ffffff',
  accent:  '#ffef00',  // 시그니처 옐로
  accent2: '#00daff',  // 시안

  // ── 상태 ──
  error:   '#ff2b00',
  warning: '#ffd100',
  info:    '#0087ff',

  // ── 문법 ──
  synFg:      '#d9d9d9',  // 변수 · 일반 식별자
  synWhite:   '#ffffff',
  synRed:     '#e06c75',  // 태그 · 삭제 · 특수 변수
  synViolet:  '#928eff',  // 키워드
  synGold:    '#ffca67',  // 내장 심볼 (defaultLibrary)
  synOrange:  '#ffa067',  // 숫자 · 상수
  synCyan:    '#3de9ff',  // enum 멤버
  synBlue:    '#30a2ff',  // 함수
  synGreen:   '#95ff48',  // 문자열
  synComment: '#9aa9c2',  // 주석
  synInvalid: '#f44747',  // 잘못된 토큰
};
