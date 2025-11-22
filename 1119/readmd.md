💍 스마트 청첩장 (Smart Wedding Invitation)
웹(PWA)과 안드로이드(Cordova)를 통합 제공하는 하이브리드 모바일 초대장 애플리케이션입니다.

🌟 주요 기능 및 특징
이 프로젝트는 웹 기반의 접근성과 네이티브 앱의 편의 기능을 모두 제공합니다.

1. 📅 날짜 계산 및 표시

D-Day 카운터: 결혼식 날짜(2025-12-25)를 기준으로 남은 일수, 당일, 또는 경과 일수를 자동으로 계산하여 표시합니다.


구현 기술: JavaScript의 Date 객체를 사용하여 계산 및 화면을 업데이트합니다.

2. 🗺️ 내비게이션 앱 연동 (지도 연결)

지도 버튼: 네이버 지도, 카카오 지도, 구글 지도 버튼을 제공합니다.

실행 방식:


웹 실행 시: 새 브라우저 탭에서 지도를 엽니다.


앱 실행 시: window.open(url, '_system') 코드를 통해 시스템의 지도 앱을 강제 호출합니다.

3. 🔔 결혼식 알림 설정 (앱 전용)

활성화: Cordova 앱에서만 활성화되는 네이티브 기능입니다.


플러그인 사용: cordova-plugin-local-notification 플러그인을 사용하여 알림 기능을 구현합니다.


시간 예약: cordova-plugin-datepicker 플러그인을 사용하여 사용자 지정 날짜와 시간을 선택하고 알림을 예약 및 취소할 수 있습니다.


상태 표시: 예약된 알림 시간 및 상태가 화면에 표시되어 사용자에게 피드백을 제공합니다.

4. 📸 식권 QR 스캔 (앱 전용)

활성화: Cordova 앱에서만 사용 가능한 네이티브 기능입니다.


기능: cordova-plugin-camera 플러그인을 사용하여 카메라 기능을 호출하며, 이는 참석 확인을 위한 QR 스캔을 시뮬레이션합니다.

5. 🌐 PWA 및 웹 접근성

앱 정보 정의: manifest.json 파일을 통해 앱 정보(이름, 아이콘, 테마 색상)를 정의합니다.


오프라인 지원: service-worker.js 파일을 사용하여 Cache First 전략으로 정적 파일을 캐싱하는 오프라인 캐싱 기능이 구현되어 있습니다.


설치 유도: beforeinstallprompt 이벤트를 감지하여 PWA 설치 유도 배너를 표시하며, Cordova 환경에서는 자동 숨김 처리됩니다.


풀 스크린: 설치 후 인터넷 주소창 없는 풀 스크린으로 실행됩니다.

6. ⬇️ Android 풀 기능 앱 다운로드

APK 제공: PWA 웹 버전에서 APK 설치 파일 직접 다운로드 버튼을 제공합니다.


다운로드 링크: Google Drive 다이렉트 다운로드 링크 (https://drive.google.com/uc?export=download&id=...)로 연결됩니다.


기능 안내: 이 앱을 설치해야 알림 설정, QR 스캔 등 모든 네이티브 기능을 사용할 수 있습니다.

🛠 기술 스택 (Tech Stack)
💻 Frontend & Styling 

기술 스택: HTML5, Tailwind CSS, FontAwesome

폰트: Noto Sans KR, Noto Serif KR

🌉 Hybrid & Core
프레임워크: Apache Cordova


환경 감지: !!window.cordova 변수(isCordova)를 사용하여 웹 환경과 앱 환경을 분기 처리합니다.

🔌 핵심 Cordova 플러그인 

cordova-plugin-local-notification

cordova-plugin-camera

cordova-plugin-inappbrowser

cordova-plugin-datepicker

📂 프로젝트 구조 및 파일 구성
GitHub 레포지토리 내 주요 파일 및 압축 파일 구성은 다음과 같습니다.

👨‍💻 개발팀 (Team AndRod)
📄 라이선스 (License)
이 프로젝트는 Apache-2.0 License에 따라 배포됩니다.
