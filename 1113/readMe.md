
# 👶 우리 아기 성장일지

소중한 아기의 성장 순간을 기록하고 관리하는 하이브리드 모바일 앱입니다.

Claude, ChatGPT, Gemini 를 활용한 하이브리드 앱입니다.

**Developed by Team AndRod** 🚀

## ✨ 주요 기능

### 📸 성장 앨범
- **사진 촬영**: 카메라로 직접 아기 사진 촬영
- **갤러리 선택**: 기존 사진 가져오기
- **메모 작성**: 각 사진에 상황과 감정 기록
- **카테고리**: 웃음, 수면, 식사, 놀이 등 분류

### 📊 성장 데이터
- **키/몸무게 기록**: 정기적인 성장 측정 데이터 입력
- **시각화**: Chart.js 기반 성장 그래프
- **이중 축 차트**: 키와 몸무게를 동시에 비교
- **기록 관리**: 입력 내역 확인 및 삭제

### 📅 일정 관리
- **예방접종 일정**: 중요한 접종 날짜 등록
- **병원 방문**: 정기 검진 일정 관리
- **알림 설정**: 일정 알림 ON/OFF
- **상세 보기**: 일정별 세부 정보 확인

### 🎲 오늘의 추억
- 저장된 사진 중 랜덤으로 추억 표시
- 홈 화면에서 바로 확인 가능

### ⚙️ 아기 정보 설정
- 이름, 생일, 성별 등록
- 개인화된 환영 메시지

## 🛠 기술 스택

### Frontend
- **HTML5 + CSS3**: 기본 구조 및 스타일링
- **JavaScript (ES6+)**: 앱 로직 구현
- **jQuery**: DOM 조작
- **jQuery Mobile**: 모바일 UI 프레임워크
- **Chart.js**: 데이터 시각화

### Mobile Framework
- **Apache Cordova**: 하이브리드 앱 프레임워크
- **Android Platform**: 안드로이드 네이티브 브릿지

### Cordova Plugins
- `cordova-plugin-camera`: 카메라 및 갤러리 접근
- `cordova-plugin-android-permissions`: 런타임 권한 관리
- `cordova-plugin-ionic-webview`: 파일 URI 변환
- `cordova-plugin-file`: 파일 시스템 접근
- `cordova-plugin-whitelist`: 네트워크 보안
- `cordova-plugin-device`: 디바이스 정보
- `cordova-plugin-local-notification`: 로컬 알림
- `cordova-plugin-androidx-adapter`: AndroidX 호환성
- `cordova-plugin-splashscreen`: 스플래시 화면
- `cordova-plugin-statusbar`: 상태바 관리

### Storage
- **localStorage**: 클라이언트 사이드 데이터 저장
- **File System**: 사진 파일 영구 저장

## 📱 지원 플랫폼

- ✅ Android 7.0+ (API Level 24+)
- 🔜 iOS (향후 지원 예정)

## 🚀 시작하기

자세한 설치 및 빌드 방법은 [INSTALL.md](INSTALL.md)를 참고하세요.

### 빠른 시작

```bash
# 1. Cordova 설치
npm install -g cordova

# 2. 프로젝트 생성
cordova create BabyGrowthDiary com.androd.babygrowth "우리아기성장일지"
cd BabyGrowthDiary

# 3. 플랫폼 및 플러그인 추가
cordova platform add android
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-android-permissions
cordova plugin add cordova-plugin-ionic-webview
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-local-notification
cordova plugin add cordova-plugin-androidx-adapter

# 4. 파일 복사 (config.xml, www/index.html, package.json)

# 5. 빌드 및 실행
cordova run android
```

## 📂 프로젝트 구조

```
BabyGrowthDiary/
├── config.xml              # Cordova 앱 설정
├── package.json            # NPM 의존성
├── www/
│   └── index.html         # 메인 앱 파일
├── platforms/
│   └── android/           # Android 빌드 파일
└── plugins/               # Cordova 플러그인
```

## 🎯 주요 코드 특징

### 1. 파일 영구 저장
```javascript
// 임시 파일을 앱 데이터 디렉토리로 복사
copyToDataDirectory(imageURI, function(permanentURI) {
    // 영구 경로 사용
});
```

### 2. 웹뷰 호환 경로 변환
```javascript
// 안드로이드 파일 URI를 웹뷰에서 표시 가능하도록 변환
const displaySrc = convertFileSrc(fileURI);
```

### 3. 런타임 권한 관리
```javascript
// Android 6.0+ 권한 동적 요청
cordova.plugins.permissions.requestPermissions(
    [permissions.CAMERA, permissions.WRITE_EXTERNAL_STORAGE],
    successCallback,
    errorCallback
);
```

### 4. 로컬 스토리지 API
```javascript
const BabyApi = {
    saveAlbumRecord: function(record) { /*...*/ },
    getAlbumRecords: function() { /*...*/ },
    // ...
};
```

## 📊 데이터 구조

### 앨범 레코드
```json
{
    "type": "smile",
    "memo": "처음으로 웃었어요!",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "imageSrc": "file:///data/user/0/.../baby_photo_123456789.jpg"
}
```

### 성장 데이터
```json
{
    "date": "2024-01-15",
    "height": "65.5",
    "weight": "7.2"
}
```

### 일정
```json
{
    "title": "B형 간염 2차",
    "date": "2024-02-20T14:00",
    "alert": "on"
}
```

## 🔒 권한

앱이 요청하는 권한:

- **카메라**: 사진 촬영
- **저장소 읽기/쓰기**: 사진 저장 및 불러오기
- **미디어 읽기** (Android 13+): 갤러리 접근
- **알림** (Android 13+): 일정 알림

## 🐛 알려진 이슈

1. **localStorage 용량 제한**: 많은 데이터 저장 시 용량 초과 가능
   - **해결책**: 향후 SQLite 데이터베이스 도입 예정

2. **대용량 이미지**: 큰 이미지 파일로 인한 메모리 부족
   - **현재 대응**: 이미지 리사이징 (1024x1024)

3. **웹 Notification API**: 모바일에서 제한적
   - **개선 예정**: cordova-plugin-local-notification 통합 강화

## 📄 라이선스

Apache-2.0 License

## 👨‍💻 개발팀

**Team AndRod** 

### 팀원
- 공민승 : 회의록
- 김성보 : 프롬프트, api 및 앱 제작
- 이현규 : PPT 및 발표
- 허윤 : 코드 추가수정, 플러그인 추가, 기능 점검
