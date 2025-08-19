# NOSMOK - 금연 홍보 웹앱

건강한 삶을 위한 첫걸음, 금연의 중요성을 알리고 효과적인 금연 방법을 제공하는 현대적인 웹 애플리케이션입니다.

## 🚀 주요 기능

### ✨ 인터랙티브 요소
- **타이핑 애니메이션**: Hero 섹션의 슬로건이 타이핑 효과로 표시
- **스크롤 애니메이션**: AOS.js를 활용한 부드러운 fade-in 효과
- **통계 카운터**: 숫자가 증가하는 애니메이션 효과
- **30초 후 팝업**: 사용자 참여를 위한 모달 창

### 🎨 디자인 특징
- **색상 팔레트**: 접근성을 고려한 최적화된 색상 대비
  - 메인: #E63946 (레드 - 경고 및 CTA)
  - 보조: #1D3557 (딥블루 - 배경)
  - 강조: #A8DADC (민트톤 - 버튼, 하이라이트)
  - 텍스트: #F1FAEE (밝은 흰색), #000000 (기본 본문)

- **타이포그래피**: Google Fonts
  - 제목: 'Bebas Neue'
  - 본문: 'Noto Sans KR'

### 📱 반응형 디자인
- **Flexbox 기반**: 현대적인 CSS 레이아웃
- **브레이크포인트**: 
  - 모바일: iPhone SE (375px)
  - 태블릿: iPad (768px)
  - 데스크탑: 1920px

### ♿ 접근성
- **WCAG 2.1 AA 수준**: 웹 접근성 가이드라인 준수
- **키보드 네비게이션**: 모든 기능을 키보드로 사용 가능
- **스크린 리더 지원**: 시맨틱 HTML 구조
- **고대비 모드**: 시스템 설정에 따른 자동 적용

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS 변수, Flexbox, Grid, 애니메이션
- **JavaScript (ES6+)**: 모듈화된 코드, 이벤트 처리
- **외부 라이브러리**:
  - AOS.js: 스크롤 애니메이션
  - Font Awesome: 아이콘
  - Google Fonts: 웹 폰트

## 📁 파일 구조

```
nosmok/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 기능
├── assets/
│   └── img/           # 이미지 파일들
│       ├── hero-image.jpg
│       ├── method-1.jpg
│       ├── method-2.jpg
│       ├── method-3.jpg
│       ├── og-image.jpg
│       └── favicon.ico
├── fonts/              # 웹 폰트 (선택사항)
├── libs/               # 외부 라이브러리 (선택사항)
└── README.md           # 프로젝트 문서
```

## 🚀 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd nosmok
```

### 2. 로컬 서버 실행
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### 3. 브라우저에서 확인
```
http://localhost:8000
```

## 📸 이미지 준비

다음 이미지들을 `assets/img/` 폴더에 추가해주세요:

- `hero-image.jpg`: Hero 섹션 메인 이미지 (건강한 삶을 상징)
- `method-1.jpg`: 점진적 금연법 이미지
- `method-2.jpg`: 행동치료 이미지  
- `method-3.jpg`: 전문의 상담 이미지
- `og-image.jpg`: 소셜미디어 공유용 이미지 (1200x630px)
- `favicon.ico`: 웹사이트 아이콘 (32x32px)

## 🎯 주요 섹션

### 1. Hero Section
- 타이핑 애니메이션 슬로건
- CTA 버튼 (금연효과 보기, 금연방법 알아보기)

### 2. 금연효과 (Benefits)
- 시간별 건강상 변화
- 20분, 8시간, 24시간, 1년 후 효과

### 3. 금연방법 (Methods)
- 점진적 금연법
- 행동치료
- 전문의 상담

### 4. 통계 (Statistics)
- 흡연 관련 통계 수치
- 애니메이션 카운터

### 5. 커뮤니티 (Community)
- 동료 지원
- 진행 상황 추적
- 성과 인증

### 6. 문의 (Contact)
- 연락처 정보
- 문의 폼

## 🔧 커스터마이징

### 색상 변경
`style.css`의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
    --main-color: #E63946;      /* 메인 색상 */
    --secondary-color: #1D3557; /* 보조 색상 */
    --accent-color: #A8DADC;    /* 강조 색상 */
    --text-light: #F1FAEE;      /* 밝은 텍스트 */
    --text-dark: #000000;       /* 어두운 텍스트 */
}
```

### 애니메이션 속도 조절
`script.js`에서 애니메이션 속도를 조절할 수 있습니다:

```javascript
// 타이핑 속도
let typeSpeed = isDeleting ? 100 : 150; // 밀리초

// AOS 애니메이션 설정
AOS.init({
    duration: 800,        // 애니메이션 지속시간
    delay: 0,            // 지연시간
    offset: 100          // 트리거 오프셋
});
```

## 📱 PWA 지원

- Service Worker 등록
- 오프라인 지원 가능
- 모바일 앱과 유사한 경험

## 🔍 SEO 최적화

- 메타 태그 최적화
- Open Graph 및 Twitter Card 지원
- 시맨틱 HTML 구조
- 이미지 lazy loading

## 🌐 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**건강한 미래를 위한 첫걸음, NOSMOK와 함께 시작하세요! 🚭💪**
