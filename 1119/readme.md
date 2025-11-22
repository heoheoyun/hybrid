# 💍 스마트 청첩장 (Smart Wedding Invitation)

웹(PWA)과 안드로이드(Cordova)를 통합 제공하는 하이브리드 모바일 초대장 애플리케이션입니다.

Claude, ChatGPT, Gemini를 활용한 하이브리드 앱입니다.

**Developed by Team AndRod** 🚀

---

**⚠️ 주의**: 이 프로젝트는 실제 결혼식이 아닌 교육 및 학습 목적의 샘플 애플리케이션입니다.

## ✨ 주요 기능

이 프로젝트는 웹 기반의 접근성과 네이티브 앱의 편의 기능을 모두 제공합니다.

### 📅 날짜 계산 및 표시
- **D-Day 카운터**: 결혼식 날짜(2025-12-25) 기준으로 남은 일수, 당일 여부, 또는 경과 일수를 자동으로 계산하여 표시
- **실시간 업데이트**: JavaScript의 `Date` 객체를 사용하여 1시간마다 자동 업데이트
- **직관적 표시**: "D-30", "D-Day", "결혼 5일째 행복 중!" 형식으로 명확한 날짜 정보 제공

### 🗺️ 내비게이션 앱 연동 (지도 연결)
- **다중 지도 지원**: 네이버 지도, 카카오 지도, 구글 지도 버튼 제공
- **스마트 실행**:
  - 웹 환경: 새 브라우저 탭(`_blank`)에서 지도 열기
  - 앱 환경: `window.open(url, '_system')` 통해 시스템의 지도 앱 강제 호출
- **정확한 위치**: 예시 장소 (부산광역시 부산진구 양지로 54)

### 🔔 결혼식 알림 설정 (앱 전용)
- **네이티브 알림**: Cordova 앱에서만 활성화되는 로컬 알림 기능
- **맞춤 시간 설정**: `cordova-plugin-datepicker` 사용하여 원하는 날짜와 시간 지정
- **알림 관리**: 예약, 취소 기능 제공
- **상태 피드백**: 예약된 알림 시간 및 상태 실시간 표시 (🔔 아이콘과 함께)
- **플러그인**: `cordova-plugin-local-notification` 사용
- **권한 관리**: Android 13+ 알림 권한 자동 요청

### 📸 식권 QR 스캔 (앱 전용)
- **참석 확인**: 카메라를 통한 QR 코드 스캔 시뮬레이션
- **네이티브 카메라**: `cordova-plugin-camera` 플러그인 활용
- **즉시 촬영**: Camera.PictureSourceType.CAMERA로 카메라 직접 실행
- **앱 전용**: Cordova 앱에서만 사용 가능

### 🌐 PWA 및 웹 접근성
- **앱 정보 정의**: `manifest.json`으로 앱 이름, 아이콘, 테마 색상 등 PWA 메타데이터 설정
- **오프라인 지원**: `service-worker.js`의 Cache First 전략으로 정적 파일 캐싱
- **설치 유도**: `beforeinstallprompt` 이벤트 감지하여 PWA 설치 배너 표시
- **스마트 배너**: 
  - Cordova 환경에서는 설치 배너 자동 숨김
  - 웹 환경에서는 무조건 배너 표시 (beforeinstallprompt 이벤트 여부와 관계없이)
- **풀 스크린 모드**: PWA 설치 후 주소창 없이 실행되어 네이티브 앱 경험 제공
- **Standalone 디스플레이**: 독립 실행형 앱으로 동작

### ⬇️ Android 풀 기능 앱 다운로드
- **직접 다운로드**: PWA 웹 버전에서 APK 설치 파일 다운로드 버튼 제공
- **Google Drive 연동**: 다이렉트 다운로드 링크 제공
- **스마트 전환**: PWA 설치 거부 시 자동으로 APK 다운로드 유도
- **기능 안내**: 네이티브 앱 설치 시 알림 설정, QR 스캔 등 전체 기능 사용 가능
- **원클릭 설치**: APK 다운로드 후 간편 설치

### 📸 갤러리
- **사진 전시**: 4장의 사진 갤러리
- **그리드 레이아웃**: 2x2 그리드로 깔끔하게 정리된 사진 표시

### 📞 연락처
- **빠른 전화**: 전화번호 원터치 연결
- **전화 아이콘**: FontAwesome 아이콘으로 직관적인 UI 제공

## 🛠 기술 스택 (Tech Stack)

### 💻 Frontend & Styling
- **마크업**: HTML5
- **스타일링**: Tailwind CSS (CDN)
- **아이콘**: FontAwesome 6.4.0
- **폰트**: Noto Sans KR, Noto Serif KR (한글 최적화)
- **반응형**: 모바일 우선 디자인 (max-width: 28rem)
- **애니메이션**: CSS fadeIn, smooth scroll, 버튼 액티브 효과

### 🌉 Hybrid & Core
- **프레임워크**: Apache Cordova
- **환경 감지**: `!!window.cordova` 변수(`isCordova`)로 웹/앱 환경 분기 처리
- **PWA**: Progressive Web App 지원
- **Service Worker**: 오프라인 캐싱 및 백그라운드 동기화

### 🔌 핵심 Cordova 플러그인
- `cordova-plugin-local-notification`: 로컬 알림 기능
- `cordova-plugin-camera`: 카메라 및 QR 스캔
- `cordova-plugin-inappbrowser`: 외부 링크 인앱 브라우저 열기
- `cordova-plugin-datepicker`: 날짜/시간 선택 UI
- `cordova-plugin-device`: 디바이스 정보

**참고**: 플러그인은 `config.xml`과 `package.json`에 정의되어 있으며, 플랫폼 추가 시 자동으로 설치됩니다.

## 📱 지원 플랫폼

- ✅ **웹 브라우저** (Chrome, Safari, Firefox, Edge)
- ✅ **PWA** (Progressive Web App) - Standalone 모드
- ✅ **Android** 7.0+ (API Level 24+, Target SDK 35)
- 🔜 **iOS** (향후 지원 예정)

## 🚀 시작하기

### 웹 버전 (PWA)

1. 웹 브라우저로 접속
2. 설치 배너의 "앱 설치" 버튼 클릭
3. PWA 설치 거부 시 APK 다운로드 자동 유도
4. 오프라인에서도 실행 가능

### Android 앱 설치

```bash
# 1. Cordova 설치
npm install -g cordova

# 2. 프로젝트 생성
cordova create SmartWedding com.androad.wedding "스마트 청첩장"
cd SmartWedding

# 3. 프로젝트 파일 복사
# config.xml, package.json, manifest.json, service-worker.js, www/index.html 복사

# 4. 안드로이드 플랫폼 추가 (플러그인 자동 설치됨)
cordova platform add android

# 5. 빌드 및 실행
cordova build android
cordova run android
```

**참고**: `config.xml`과 `package.json`에 플러그인이 정의되어 있어 플랫폼 추가 시 자동으로 설치됩니다.

### APK 직접 다운로드

1. 웹 페이지에서 "앱 설치" 버튼 클릭
2. APK 다운로드
3. "알 수 없는 출처" 설치 허용
4. APK 파일 실행하여 설치
5. 카메라, 알림 권한 허용

## 📂 프로젝트 구조

### GitHub 레포지토리 파일 구성

```
Repository/
├── etc.zip                              # 프로젝트 문서 및 설명
│   └── etc/
│       ├── Team Role.txt                # 팀 구성 및 역할 (1KB)
│       ├── Wedding Invitation Function.txt  # 기능 설명 (3KB)
│       ├── Wedding Invitation Prompt.txt    # 프롬프트 (8KB)
│       └── 안드로드 팀 회의록 조안.txt          # 회의록 (1KB)
│
├── Wedding Invitation.zip               # 실제 코드 및 리소스
│   ├── config                           # Cordova 설정 파일 (2KB)
│   ├── package                          # NPM 패키지 정보 (2KB)
│   └── www/                             # 웹 리소스 폴더
│       ├── img1.jpg                     # 갤러리 이미지 1
│       ├── img2.jpg                     # 갤러리 이미지 2
│       ├── img3.jpg                     # 갤러리 이미지 3
│       ├── img4.jpg                     # 갤러리 이미지 4
│       ├── index                        # 메인 HTML 파일
│       ├── manifest                     # PWA 매니페스트
│       ├── map.png                      # 지도 이미지
│       └── service-worker               # 서비스 워커
│
└── Apk.zip                              # Android 설치 파일
    └── app-debug                        # APK 파일 (35,394KB)
```

### 앱 내부 구조

```
SmartWeddingInvitation/
├── config.xml              # Cordova 앱 설정 (Widget ID, 플러그인 정의)
├── package.json            # NPM 의존성 및 플러그인 버전 관리
├── www/
│   ├── index.html         # 메인 청첩장 페이지 (단일 HTML 파일)
│   ├── manifest.json      # PWA 매니페스트
│   ├── service-worker.js  # 오프라인 캐싱 (Cache First 전략)
│   ├── img1.jpg           # 갤러리 이미지 1
│   ├── img2.jpg           # 갤러리 이미지 2
│   ├── img3.jpg           # 갤러리 이미지 3
│   ├── img4.jpg           # 갤러리 이미지 4
│   └── map.png            # 지도 이미지
├── platforms/
│   └── android/           # Android 빌드 파일
└── plugins/               # Cordova 플러그인
```

## 🎯 주요 코드 특징

### 1. 환경 감지 및 분기 처리
```javascript
// Cordova 환경 확인
const isCordova = !!window.cordova;

// 지도 열기 - 환경별 처리
function openMap(type) {
    let url = '...';
    window.open(url, isCordova ? '_system' : '_blank');
}
```

### 2. D-Day 계산 로직
```javascript
const WEDDING_DATE = new Date('2025-12-25T14:00:00');

function updateDDay() {
    const now = new Date();
    const timeDiff = WEDDING_DATE.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
        dDayElement.textContent = `D-${days}`;
    } else if (days === 0) {
        dDayElement.textContent = `D-Day`;
    } else {
        dDayElement.textContent = `결혼 ${Math.abs(days)}일째 행복 중!`;
    }
}

// 1시간마다 업데이트
setInterval(updateDDay, 1000 * 60 * 60);
```

### 3. 로컬 알림 설정 (Date Picker 통합)
```javascript
function toggleNotification() {
    const localNotification = window.cordova.plugins.notification.local;
    
    // 예약된 알림 확인 후 취소 처리
    localNotification.isScheduled(NOTIFICATION_ID, function(isScheduled) {
        if (isScheduled) {
            localNotification.cancel(NOTIFICATION_ID);
            updateNotificationButton(false);
            return;
        }
        
        // Date Picker로 시간 설정
        window.datePicker.show({
            date: WEDDING_DATE,
            mode: 'datetime',
            androidTheme: window.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }, function(selectedTime) {
            // 알림 예약
            localNotification.schedule({
                id: NOTIFICATION_ID,
                title: "🤵🏻👰🏻 지훈 & 수진 결혼식 리마인더",
                text: "곧 결혼식이 시작됩니다! 잊지 마세요!",
                trigger: { at: selectedTime },
                foreground: true
            });
        });
    });
}
```

### 4. PWA/APK 통합 설치 로직
```javascript
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
            } else {
                // PWA 거부 시 APK 다운로드 유도
                alert("PWA 설치를 건너뛰셨습니다. 풀 기능을 위해 APK를 다운로드합니다.");
                window.open(APK_URL, '_system');
            }
        });
    } else {
        // PWA 미지원 시 APK 다운로드
        window.open(APK_URL, '_system');
    }
}

// 웹 환경에서는 무조건 배너 표시
if (!isCordova) {
    installBanner.classList.remove('hidden');
}
```

### 5. Service Worker 캐싱 전략
```javascript
const CACHE_NAME = 'wedding-pwa-v1';

// Cache First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 캐시 히트 시 반환
                if (response) return response;
                // 캐시 미스 시 네트워크 요청
                return fetch(event.request);
            })
    );
});
```

### 6. 알림 버튼 상태 관리
```javascript
function updateNotificationButton(isScheduled, scheduledTime = null) {
    const btn = document.getElementById('noti-btn');
    
    if (isScheduled) {
        btn.setAttribute('data-state', 'set');
        btn.style.backgroundColor = '#fce7f3'; // pink-100
        statusText.textContent = `🔔 ${timeStr}에 알림 예약됨`;
    } else {
        btn.setAttribute('data-state', 'unset');
        statusText.textContent = isCordova 
            ? '원하는 시간으로 알림 예약' 
            : '앱 설치 후 사용 가능';
    }
}
```

## 📊 데이터 구조

### Manifest (PWA)
```json
{
    "name": "지훈&수진 결혼식",
    "short_name": "결혼초대",
    "display": "standalone",
    "theme_color": "#ec4899",
    "background_color": "#fafaf9",
    "orientation": "portrait"
}
```

### Config.xml (Cordova)
```xml
<widget id="com.androad.wedding" version="1.0.0">
    <name>스마트 청첩장</name>
    <platform name="android">
        <preference name="android-targetSdkVersion" value="35" />
        <preference name="android-minSdkVersion" value="24" />
    </platform>
</widget>
```

### 알림 설정 객체
```javascript
{
    id: 1,
    title: "🤵🏻👰🏻 지훈 & 수진 결혼식 리마인더",
    text: "곧 결혼식이 시작됩니다! 잊지 마세요!",
    trigger: { at: new Date('2025-12-25T13:00:00') },
    foreground: true
}
```

## 🔒 권한

앱이 요청하는 권한:

- **카메라**: QR 코드 스캔 및 사진 촬영
- **알림** (Android 13+): 결혼식 알림 발송 (`POST_NOTIFICATIONS`)
- **부팅 완료 수신**: 알림 재설정 (`RECEIVE_BOOT_COMPLETED`)
- **인터넷**: 지도 및 외부 링크 연결

## 🎨 디자인 특징

- **색상 테마**: Pink (#ec4899) & Stone (자연스러운 베이지 톤)
- **타이포그래피**: 
  - 본문: Noto Sans KR
  - 제목/강조: Noto Serif KR (serif 클래스)
- **애니메이션**: 
  - 페이드인 효과 (1.5초)
  - 버튼 액티브 스케일 효과 (0.95배)
  - 부드러운 스크롤 (smooth scroll)
- **반응형**: 최대 너비 28rem (448px) 모바일 최적화
- **하단 네비게이션**: 고정 메뉴 (초대글, 편의 기능, 갤러리, 오시는 길)

## 🐛 알려진 이슈

1. **iOS Safari PWA 제한**: iOS에서 일부 PWA 기능 제한
   - **해결책**: 향후 iOS Cordova 앱 개발 예정

2. **인코딩 이슈**: HTML 파일의 한글이 깨져 보일 수 있음
   - **현재 대응**: `<meta charset="UTF-8">` 필수 포함
   - **개선 예정**: UTF-8 BOM 없이 저장 권장

3. **오프라인 지도**: 캐시된 페이지에서 지도 링크 동작하나 실제 지도는 온라인 필요
   - **개선 예정**: 정적 지도 이미지 추가 캐싱

4. **갤러리 이미지**: 현재 img1.jpg~img4.jpg 파일이 필요
   - **해결책**: 실제 이미지 파일을 www/ 폴더에 추가하거나 외부 URL로 대체

## 📄 라이선스

Apache-2.0 License

## 👨‍💻 개발팀 (Team AndRod)

### 팀원
- **공민승**: 회의록 및 문서화
- **김성보**: 프롬프트, API 및 앱 제작
- **이현규**: PPT 및 발표
- **허윤**: 코드 추가 수정, 플러그인 추가, 기능 점검

---

💕 소중한 날을 함께 해주셔서 감사합니다 💕

**※ 본 프로젝트는 교육 목적의 샘플 애플리케이션입니다.**
