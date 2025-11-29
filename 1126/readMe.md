# 🌊 부산 AI 여행 가이드 (Busan AI Travel Guide)

웹(브라우저)과 안드로이드(Cordova)를 통합 제공하는 하이브리드 AI 여행 추천 애플리케이션입니다.

Claude를 활용한 하이브리드 앱입니다.

**Developed by Team AndRod** 🚀

---

**⚠️ 주의**: 이 프로젝트는 교육 및 학습 목적의 애플리케이션입니다.

## ✨ 주요 기능

이 프로젝트는 웹 기반의 접근성과 AI의 강력한 추천 기능을 모두 제공합니다.

### 🗂️ 실시간 공공데이터 연동
- **다중 API 활용**: 부산광역시 공공데이터포털의 명소, 맛집, 축제 3종 API를 동시에 호출하여 통합 관리
- **대규모 데이터 처리**: 약 100여 개의 최신 관광 데이터를 실시간으로 수집하고, AI가 이해하기 쉬운 JSON 형태로 가공 및 파싱
- **Promise.all 병렬 처리**: 3개 API를 동시에 호출하여 로딩 시간 최소화
- **자동 파싱**: MAIN_TITLE(장소명), GUGUN_NM(위치), ITEMCNTNCN(설명) 등 핵심 정보만 추출

### 🤖 생성형 AI 기반 맞춤 추천
- **Gemini 모델 탑재**: 구글의 최신 Gemini 2.5 Flash 모델을 연동하여 자연어 처리 능력 극대화
- **RAG(검색 증강 생성) 구현**: 단순 대화가 아니라, 수집된 공공데이터를 프롬프트에 주입하여 "데이터에 기반한 근거 있는 추천" 제공
- **맥락 파악**: 사용자의 질문(위치, 취향, 누구와 함께하는지 등)을 분석하여 최적의 장소를 '[카테고리] 장소명' 형식으로 제안
- **페르소나 기반 응답**: "부산 여행 전문 가이드" 페르소나를 부여하여 친절하고 전문적인 답변 제공

### 💬 대화형 채팅 인터페이스
- **직관적인 UI**: 카카오톡과 유사한 말풍선 방식(사용자 우측, AI 좌측)으로 누구나 쉽게 사용 가능
- **반응형 디자인**: 모바일과 데스크톱 환경 모두에 최적화된 뷰포트 및 디자인 적용
  - 웹 브라우저: 최대 너비 800px로 제한하여 가독성 향상
  - 모바일: 전체 화면 활용
- **사용자 편의성**: 로딩 애니메이션(Dots), 종이비행기 전송 버튼, 엔터키 전송 등 디테일한 UX 구현
- **탭 전환 UI**: 채팅 화면과 즐겨찾기 화면을 탭으로 구분하여 직관적인 화면 전환 제공
  - 즐겨찾기 탭 활성화 시 입력창 자동 숨김
  - 채팅 탭 활성화 시 입력창 자동 표시
- **웹 브라우저 최적화**: 
  - 커스텀 스크롤바 스타일링 (회색 계열)
  - 버튼 호버 효과 (색상 변화, 미세한 움직임)
  - 중앙 정렬 레이아웃

### 💾 즐겨찾기 및 저장 기능
- **AI 추천 저장**: 사용자가 만족한 AI 추천 답변을 즐겨찾기 버튼으로 간편하게 저장
- **영구 데이터 보관**: localStorage를 활용하여 즐겨찾기한 추천 코스가 앱을 종료해도 유지되도록 구현
- **질문-답변 쌍 저장**: 사용자의 질문과 AI의 답변을 함께 저장하여 맥락을 유지하고 재활용 가능
- **타임스탬프 기록**: 각 즐겨찾기 항목에 저장 시간을 기록하여 시간순 정렬 및 관리 가능
  - 표시 형식: "11월 29일 14:30"
- **카드형 목록 UI**: 즐겨찾기 탭에서 카드 형태로 시각적으로 구분된 목록을 제공하여 가독성 향상
- **개별 삭제 기능**: 불필요한 즐겨찾기 항목을 개별적으로 삭제할 수 있는 버튼 제공
  - 삭제 전 확인창으로 실수 방지
- **실시간 카운터**: 헤더의 하트 아이콘 옆에 저장된 즐겨찾기 개수를 실시간으로 표시
- **중복 방지**: 동일한 답변을 다시 즐겨찾기하면 해제되도록 토글 기능 구현
  - 즐겨찾기 상태: 노란색(#ffc107) 배경 + "즐겨찾기됨" 텍스트
  - 미저장 상태: 회색 배경 + "즐겨찾기" 텍스트

### 🛡️ 안정성 및 예외 처리
- **상태 피드백**: 데이터 로딩 중, 답변 생성 중, 완료 상태를 시스템 메시지로 실시간 안내
- **오류 방어**: API 키 오류, 네트워크 문제 발생 시 붉은색 알림 메시지를 통해 사용자에게 명확한 원인 전달
- **입력 제어**: 
  - 빈칸 전송 방지
  - 로딩 중 중복 입력 방지 (입력창 및 버튼 비활성화)
  - 엔터키로 전송 가능
- **HTML 이스케이프 처리**: XSS 공격 방지를 위해 사용자 입력 및 저장 데이터에 HTML 특수문자 이스케이프/언이스케이프 함수 적용
- **API 키 관리**: 공백 제거 (.trim()) 및 변수로 분리 관리

### 🔌 Cordova 플러그인 통합 (앱 전용)
- **cordova-plugin-inappbrowser**: AI 추천 결과에 포함된 외부 링크(지도, 상세 정보 등)를 클릭할 경우, 앱을 종료하지 않고 앱 내 웹뷰에서 해당 정보를 띄워 사용자 흐름 유지
- **cordova-plugin-network-information**: 앱 실행 전/API 호출 직전에 네트워크 연결 상태를 정확하게 확인하고, 오프라인 상태일 경우 즉시 오류 피드백을 제공하여 불필요한 요청 및 지연 방지

## 🛠 기술 스택 (Tech Stack)

### 💻 Frontend & Styling
- **마크업**: HTML5 (단일 파일)
- **스타일링**: CSS3 (Inline Styles)
  - Flexbox Layout
  - CSS Variables (색상 테마 관리)
  - Animations (fadeIn, loading dots)
  - Media Queries (반응형)
- **폰트**: Google Fonts - Noto Sans KR
- **아이콘**: SVG Icons (로봇, 하트, 종이비행기)

### 🤖 AI & Data
- **AI 모델**: Google Gemini 2.5 Flash
- **API 방식**: REST API (Fetch)
- **데이터 소스**: 부산광역시 공공데이터포털
  - 관광지 API (AttractionService)
  - 맛집 API (FoodService)
  - 축제 API (FestivalService)
- **RAG 구현**: 프롬프트에 JSON 데이터 주입

### 🌉 Hybrid & Core
- **프레임워크**: Apache Cordova
- **언어**: JavaScript (ES6+)
  - Async/Await
  - Promises
  - Arrow Functions
  - Template Literals
- **저장소**: localStorage (클라이언트 사이드)

### 🔌 핵심 Cordova 플러그인
- `cordova-plugin-inappbrowser`: 인앱 브라우저
- `cordova-plugin-network-information`: 네트워크 상태 확인

**참고**: 플러그인은 `config.xml`과 `package.json`에 정의되어 있으며, 플랫폼 추가 시 자동으로 설치됩니다.

## 📱 지원 플랫폼

- ✅ **웹 브라우저** (Chrome, Safari, Firefox, Edge)
- ✅ **Android** 7.0+ (API Level 24+, Target SDK 35)
- 🔜 **iOS** (향후 지원 예정)

## 🚀 시작하기

### 웹 버전 (브라우저)

1. `index.html` 파일을 웹 서버에 업로드
2. API 키 설정:
   ```javascript
   const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY".trim();
   const DATA_GO_KR_KEY = "YOUR_DATA_GO_KR_KEY".trim();
   ```
3. 웹 브라우저로 접속
4. 즉시 사용 가능 (설치 불필요)

**API 키 발급 방법:**
- **Gemini API**: [Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급
- **공공데이터 API**: [공공데이터포털](https://www.data.go.kr/)에서 부산광역시 관광 API 신청

### Android 앱 설치

```bash
# 1. Cordova 설치
npm install -g cordova

# 2. 프로젝트 생성
cordova create BusanGuide com.androd.busanguide "부산 AI 가이드"
cd BusanGuide

# 3. 프로젝트 파일 복사
# config.xml, package.json, www/index.html 복사

# 4. 안드로이드 플랫폼 추가 (플러그인 자동 설치됨)
cordova platform add android

# 5. 빌드 및 실행
cordova build android
cordova run android
```

**참고**: `config.xml`과 `package.json`에 플러그인이 정의되어 있어 플랫폼 추가 시 자동으로 설치됩니다.

## 📂 프로젝트 구조

### GitHub 레포지토리 파일 구성

```
Repository/
├── etc/                                    # 프로젝트 문서 및 설명
│   ├── Team Role.txt                       # 팀 구성 및 역할
│   ├── Busan Travel Guide Function.txt     # 기능 설명 (5개 섹션)
│   └── Busan Travel Guide Prompt.txt       # 개발 프롬프트 (6단계)
│
├── www/                                    # 웹 리소스 폴더
│   └── index.html                          # 메인 HTML 파일 (단일 파일)
│
├── config.xml                              # Cordova 앱 설정
├── package.json                            # NPM 의존성 및 플러그인
└── README.md                               # 프로젝트 설명서
```

### 앱 내부 구조

```
BusanAIGuide/
├── config.xml              # Cordova 앱 설정 (Widget ID, 플러그인 정의)
├── package.json            # NPM 의존성 및 플러그인 버전 관리
├── www/
│   └── index.html         # 메인 앱 페이지 (단일 HTML 파일, 모든 기능 포함)
├── platforms/
│   └── android/           # Android 빌드 파일
└── plugins/               # Cordova 플러그인
    ├── cordova-plugin-inappbrowser/
    └── cordova-plugin-network-information/
```

## 🎯 주요 코드 특징

### 1. 다중 API 병렬 호출
```javascript
const [attractionRes, foodRes, festivalRes] = await Promise.all([
    fetch(`${baseUrl}/AttractionService/getAttractionKr?${commonParams}`),
    fetch(`${baseUrl}/FoodService/getFoodKr?${commonParams}`),
    fetch(`${baseUrl}/FestivalService/getFestivalKr?${commonParams}`)
]);

const attractions = (attractionJson.getAttractionKr?.item || []).map(item => ({
    category: "관광지",
    name: item.MAIN_TITLE,
    location: item.GUGUN_NM,
    desc: item.ITEMCNTNCN
}));
```

### 2. RAG 기반 AI 프롬프트
```javascript
const prompt = `
    [역할]
    너는 부산 여행 전문 가이드 AI야.
    
    [참고 데이터]
    ${JSON.stringify(allBusanData).slice(0, 15000)} 
    
    [사용자 질문]
    ${message}
    
    [지시사항]
    관광지, 맛집, 축제 데이터를 바탕으로 추천해주고 친절하게 답해줘.
`;
```

### 3. 즐겨찾기 토글 기능
```javascript
function toggleFavorite(msgId, answer) {
    const unescapedAnswer = unescapeHtml(answer);
    const existingIndex = favorites.findIndex(f => f.answer === unescapedAnswer);
    
    if (existingIndex >= 0) {
        // 이미 저장됨 -> 삭제
        favorites.splice(existingIndex, 1);
    } else {
        // 저장되지 않음 -> 추가
        favorites.push({
            id: Date.now(),
            question: currentQuestion,
            answer: unescapedAnswer,
            timestamp: new Date().toISOString()
        });
    }
    
    localStorage.setItem('busanFavorites', JSON.stringify(favorites));
    updateFavoriteCount();
    renderFavorites();
}
```

### 4. 탭 전환 및 입력창 제어
```javascript
function switchTab(tab) {
    const inputArea = document.querySelector('.input-area');
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.chat-view, .favorite-view').forEach(v => v.classList.remove('active'));
    
    if (tab === 'chat') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('chatView').classList.add('active');
        inputArea.classList.remove('hidden'); // 입력창 표시
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('favoriteView').classList.add('active');
        inputArea.classList.add('hidden'); // 입력창 숨김
        renderFavorites();
    }
}
```

### 5. XSS 공격 방지
```javascript
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m];
    });
}

function unescapeHtml(text) {
    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {
        return {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#039;':"'"}[m];
    });
}
```

### 6. 로딩 상태 관리
```javascript
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    if (!message) return;

    appendMessage(message, 'user-message', false);
    inputField.value = '';
    
    // 로딩 메시지 표시
    const loadingId = appendMessage(
        "AI가 여행 코스를 계획 중입니다<span class='loading-dots'></span>", 
        'ai-message', 
        false
    );

    try {
        const response = await fetch(url, { /* ... */ });
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // 로딩 메시지 삭제
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();
        
        // AI 답변 표시
        appendMessage(aiResponse, 'ai-message', true, aiResponse);
    } catch (error) {
        // 오류 메시지로 변경
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerHTML = `<span style="color:red;">❌ 오류</span><br><small>${error.message}</small>`;
        }
    }
}
```

## 📊 데이터 구조

### 공공데이터 통합 형식
```javascript
{
    category: "관광지" | "맛집" | "축제",
    name: "장소명",
    location: "구/군",
    desc: "상세 설명"
}
```

### 즐겨찾기 저장 형식
```javascript
{
    id: 1638345600000,
    question: "해운대 근처 맛집 추천해줘",
    answer: "해운대 근처에는...",
    timestamp: "2024-11-29T14:30:00.000Z"
}
```

### Config.xml (Cordova)
```xml
<widget id="com.androd.busanguide" version="1.0.0">
    <name>부산 AI 가이드</name>
    <platform name="android">
        <preference name="android-targetSdkVersion" value="35" />
        <preference name="android-minSdkVersion" value="24" />
    </platform>
    <plugin name="cordova-plugin-inappbrowser" />
    <plugin name="cordova-plugin-network-information" />
</widget>
```

## 🔒 권한

앱이 요청하는 권한:

- **인터넷**: API 호출 및 외부 링크 연결
- **네트워크 상태**: 온라인/오프라인 감지

## 🎨 디자인 특징

- **색상 테마**: 
  - Primary Blue: #007bff
  - User Bubble: #0062cc
  - AI Bubble: #ffffff
  - Favorite Gold: #ffc107
  - Background: #f4f7fa
- **타이포그래피**: 
  - 본문: Noto Sans KR (400, 500, 700)
  - 크기: 15px (메시지), 16px (입력창)
- **레이아웃**: 
  - 헤더 고정 (상단)
  - 탭 전환 (채팅/즐겨찾기)
  - 채팅창 스크롤
  - 입력창 고정 (하단)
- **애니메이션**: 
  - 로딩 dots (1초 주기)
  - 버튼 호버 효과
  - 즐겨찾기 버튼 transform (translateY)
- **반응형**: 
  - 모바일: 전체 너비
  - 데스크톱 (768px+): 최대 800px, 중앙 정렬
  - 커스텀 스크롤바 (웹 전용)

## 🐛 알려진 이슈

1. **API 키 관리**: 현재 클라이언트 사이드에 노출
   - **개선 예정**: 백엔드 서버 구축 후 서버 사이드 API 호출

2. **데이터 캐싱**: 공공데이터를 매번 새로 호출
   - **개선 예정**: IndexedDB 또는 Cache API 활용한 데이터 캐싱

3. **오프라인 모드**: 네트워크 없이는 AI 추천 불가
   - **개선 예정**: Service Worker 활용한 오프라인 지원

4. **이미지 지원**: 현재 텍스트 기반 추천만 제공
   - **개선 예정**: 장소 이미지 표시 기능 추가

5. **iOS 지원**: 현재 Android만 테스트 완료
   - **개선 예정**: iOS Cordova 앱 개발

## 🔮 향후 계획

- [ ] 지도 연동 (카카오맵/네이버맵)
- [ ] 장소별 이미지 표시
- [ ] 실시간 날씨 정보
- [ ] 사용자 리뷰 시스템
- [ ] 여행 경로 최적화
- [ ] 다국어 지원 (영어, 중국어, 일본어)
- [ ] iOS 앱 출시
- [ ] 음성 인식 기능
- [ ] 백엔드 서버 구축 (API 키 보안)

## 📄 라이선스

Apache-2.0 License

## 👨‍💻 개발팀 (Team AndRod)

### 팀원 및 역할
- **허윤**: Flow 프로젝트 생성 / 코드 추가수정, 기능 및 앱 점검
- **공민승**: 회의록 제작
- **이현규**: PPT 및 발표
- **김성보**: 프롬프트 및 HTML 제작

## 📞 문의

프로젝트 관련 문의사항이 있으시면 아래로 연락주세요:

- 🐙 GitHub Issues: [이슈 페이지](https://github.com/yourusername/busan-ai-guide/issues)

---

🌊 부산의 모든 즐길거리를 AI와 함께 찾아보세요! 🌊

**※ 본 프로젝트는 교육 목적의 애플리케이션입니다.**
