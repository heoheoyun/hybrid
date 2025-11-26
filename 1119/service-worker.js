const CACHE_NAME = 'wedding-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  // 캐시할 아이콘 링크 수정
  'https://cdn-icons-png.flaticon.com/512/2448/2448528.png'
];

// 1. 설치 (Install) - 정적 파일 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 활성화 (Activate) - 이전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. 요청 가로채기 (Fetch) - 오프라인 우선 전략 (Cache First, falling back to Network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시 히트 시 캐시된 응답 반환
        if (response) {
          return response;
        }
        // 캐시 미스 시 네트워크 요청
        return fetch(event.request).catch(() => {
          // 네트워크 실패 시 대체 페이지나 폴백 응답을 제공할 수 있음
          // 현재는 단순 오프라인 우선 전략
          console.log('[Service Worker] Fetch failed and no cache found for:', event.request.url);
        });
      })
  );
});