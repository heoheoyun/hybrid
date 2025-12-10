
# 💡 간편 가전제품 메모 (Simple Home Appliance Memo App)

**Hybrid App Development Project**

본 프로젝트는 Cordova 프레임워크를 기반으로 개발된 하이브리드 모바일 애플리케이션으로, 사용자가 가전제품의 정보(구입일, 보증 기간)와 유지보수/만료 관련 메모를 효율적으로 관리하고 알림을 받을 수 있도록 돕는 솔루션입니다.

## 🔗 프로젝트 정보

| 항목 | 내용 |
| :--- | :--- |
| **프로젝트명** | 간편 가전제품 메모 |
| **개발 언어** | HTML5, CSS3, Vanilla JavaScript |
| **프레임워크** | Apache Cordova (하이브리드 앱) |
| **GitHub** | [https://github.com/heoheoyun/hybrid](https://github.com/heoheoyun/hybrid) |

## ✨ 주요 기능 (Features)

### 1. 제품 및 알림 통합 관리
* **제품 등록/수정:** 제품명, 구입가, 구입일, 보증 기간 등 상세 정보 등록.
* **맞춤형 알림 설정:**
    * **주기적 알림:** 필터 교체, 청소 주기 등 반복적인 유지보수 알림 설정 기능.
    * **특정 날짜 알림:** 보증 기간 만료일 등 중요한 날짜에 대한 알림 설정 기능.

### 2. 효율적인 메모 및 문서 관리
* **기간 만료 메모 뷰:** 만료 날짜가 지난 메모를 자동으로 분류하여 별도의 목록으로 제공 (`expired-memo-view`).
    * 편집 모드 (`edit-mode`)를 통해 **선택 삭제** 기능 지원 (`deleteSelectedExpiredMemos`).
* **문서 디지털화 (계획):** 보증서, 설명서 등을 **이미지로 첨부**하여 관리하는 기능.
    * (Cordova **Camera Plugin** 연동 예정 - `captureImage` 함수).

### 3. 직관적인 UI/UX
* **검색 및 필터링:** 제품명 검색 (`search-input`) 및 **종류별** (`filter-type-category`) 카테고리 필터링 제공.
* **빠른 액션:** 화면 우측 하단의 **FAB** (Floating Action Button)를 통해 제품 추가/메모 추가 기능을 빠르게 실행.
* **Material Design:** Material Symbols Rounded 아이콘을 사용하여 시각적인 일관성 및 높은 접근성 제공.

## 🛠️ 기술 스택 및 아키텍처

| 구분 | 기술 / 특징 | 설명 |
| :--- | :--- | :--- |
| **아키텍처** | **Apache Cordova** | 단일 코드베이스로 iOS/Android 크로스 플랫폼 빌드를 가능하게 하는 하이브리드 앱 구조. |
| **프론트엔드** | **Vanilla JavaScript** | 외부 라이브러리 의존성을 최소화하여 경량화 및 빠른 성능을 확보. |
| **데이터 관리** | **Local Storage** | `STORAGE_KEY`를 사용하여 데이터를 영구적으로 저장하고, 오프라인 환경에서도 빠른 접근성을 보장. |
| **플러그인** | **Cordova Plugins** | 날짜 선택 (DatePicker) 및 이미지 첨부 (Camera) 등 네이티브 기능을 활용하기 위해 Cordova 플러그인 연동을 목표로 설계됨. |

## 📐 디자인 및 스타일링 (index.css 분석 기반)

* **색상 체계:** Google Material Design 계열의 색상 변수 (`--color-primary: #4285F4`, `--color-expired: #D93025` 등)를 사용하여 명확한 시각적 계층 제공.
* **반응형 레이아웃:** 모바일 환경에 최적화된 뷰(`viewport-fit=cover`) 및 CSS 변수(`--spacing-unit: 8px`) 기반의 일관된 디자인.

## 📌 실행 및 설치 방법 (Cordova 환경)

1.  **Cordova 설치:** `npm install -g cordova`
2.  **프로젝트 복제:** `git clone [본인의 깃허브 주소]`
3.  **플랫폼 추가:** `cordova platform add android` 또는 `cordova platform add ios`
4.  **실행:** `cordova run android` 또는 `cordova run browser` (웹 테스트용)
