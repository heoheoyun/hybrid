// 전역 데이터 저장소 및 ID 생성 (Local Storage 기반)
const STORAGE_KEY = 'simpleAppStorage';
let products = [];
let memos = [];
let currentDetailProductId = null;

// ===========================================
// 카테고리 정의 (제품 등록/수정 시 사용)
// ===========================================
const CATEGORY = {
    TYPE: {
        REFRIGERATOR: 'REFRIGERATOR', // 냉장고
        TV: 'TV', // TV
        WASHING_MACHINE: 'WASHING_MACHINE', // 세탁기/건조기
        AIR_CONDITIONER: 'AIR_CONDITIONER', // 에어컨/공조
        AIR_PURIFIER: 'AIR_PURIFIER', // 공기청정기
        DISHWASHER: 'DISHWASHER', // 식기세척기
        MICROWAVE: 'MICROWAVE', // 전자레인지/오븐
        CLEANER: 'CLEANER', // 청소기/로봇
        INDUCTION: 'INDUCTION', // 인덕션/레인지
        WATER_PURIFIER: 'WATER_PURIFIER', // 정수기
        SMALL_APPLIANCE: 'SMALL_APPLIANCE', // 소형가전
        OTHER: 'OTHER' // 기타 제품
    }
};

const CATEGORY_LABELS = {
    [CATEGORY.TYPE.REFRIGERATOR]: '냉장고',
    [CATEGORY.TYPE.TV]: 'TV',
    [CATEGORY.TYPE.WASHING_MACHINE]: '세탁기/건조기',
    [CATEGORY.TYPE.AIR_CONDITIONER]: '에어컨/공조',
    [CATEGORY.TYPE.AIR_PURIFIER]: '공기청정기',
    [CATEGORY.TYPE.DISHWASHER]: '식기세척기',
    [CATEGORY.TYPE.MICROWAVE]: '전자레인지/오븐',
    [CATEGORY.TYPE.CLEANER]: '청소기/로봇',
    [CATEGORY.TYPE.INDUCTION]: '인덕션/레인지',
    [CATEGORY.TYPE.WATER_PURIFIER]: '정수기',
    [CATEGORY.TYPE.SMALL_APPLIANCE]: '소형가전',
    [CATEGORY.TYPE.OTHER]: '기타 제품'
};

// Cordova 필수 이벤트 리스너
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('DOMContentLoaded', initializeApp);


function onDeviceReady() {
    // Status Bar 플러그인 초기화
    if (window.StatusBar) {
        window.StatusBar.backgroundColorByHexString('#1A73E8'); 
        window.StatusBar.styleLightContent(); 
    }
    
    // Local Notification 플러그인 초기화 및 권한 요청
    if (window.cordova && cordova.plugins.notification.local) {
        cordova.plugins.notification.local.hasPermission(granted => {
            if (!granted) {
                cordova.plugins.notification.local.requestPermission();
            }
        });
    }

    // 앱 시작 시 자동 삭제 및 만료 메모 카운트 실행
    checkAutoDeleteMemos();
}

function initializeApp() {
    loadData();
    // 제품 목록 필터링/렌더링 전에 카테고리 옵션 렌더링을 먼저 수행
    renderCategoryOptions(); 
    filterProductsList(); 
    updateExpiredMemoCount(); 
}

// --- 데이터 관리 (CRUD) ---
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function loadData() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (data) {
            products = data.products || [];
            memos = data.memos || [];
        }
    } catch (e) {
        console.error("데이터 로딩 오류", e);
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, memos }));
}

// --- 화면 전환 로직 ---
function switchView(targetId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');
    
    const header = document.getElementById('app-header');
    
    // 홈 화면으로 돌아올 때만 필터 보이게 함
    if (targetId === 'home-view') {
        filterProductsList();
        header.classList.remove('modal-active');
    } else {
        // 상세 뷰나 모달 뷰 진입 시 필터/검색 숨기기
        header.classList.add('modal-active');
    }
}

function openModal(modalId, linkedProductId = null) {
    // 모달을 열기 전에 필터/검색 숨김 클래스 추가
    document.getElementById('app-header').classList.add('modal-active'); 
    
    if (modalId === 'product-modal') {
        currentDetailProductId = linkedProductId; // 제품 등록/수정 시 사용
        if (linkedProductId) {
            loadProductDataForEdit(linkedProductId);
        } else {
            resetProductForm();
        }
    } else if (modalId === 'memo-modal') {
        currentDetailProductId = linkedProductId; // 메모와 연결할 제품 ID
        loadMemoProducts(linkedProductId);
        resetMemoForm(linkedProductId);
    }
    
    document.getElementById(modalId).classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal-view').forEach(view => {
        view.classList.remove('active');
    });
    // 홈 뷰로 돌아가면서 필터 보이게 switchView 호출
    switchView('home-view');
}


// --- 카테고리 옵션 렌더링 ---
function renderCategoryOptions() {
    
    // 제품 등록/수정 모달
    const typeSelect = document.getElementById('product-type');
    typeSelect.innerHTML = '<option value="">선택</option>';
    Object.keys(CATEGORY.TYPE).forEach(key => {
        const value = CATEGORY.TYPE[key];
        typeSelect.innerHTML += `<option value="${value}">${CATEGORY_LABELS[value]}</option>`;
    });
    
    // 홈 화면 상단 필터
    const filterTypeSelect = document.getElementById('filter-type-category');
    if (filterTypeSelect) {
        filterTypeSelect.innerHTML = '<option value="">종류 (전체)</option>';
        Object.keys(CATEGORY.TYPE).forEach(key => {
            const value = CATEGORY.TYPE[key];
            filterTypeSelect.innerHTML += `<option value="${value}">${CATEGORY_LABELS[value]}</option>`;
        });
    }
}

// --- 제품 관리 로직 (CRUD) ---
function resetProductForm() {
    document.getElementById('product-modal-title').innerText = '새 제품 등록';
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-type').value = '';
    document.getElementById('purchase-date-value').value = ''; 
    document.getElementById('purchase-date-display').value = ''; 
    document.getElementById('purchase-price').value = '';
    document.getElementById('warranty-period').value = '';
    document.getElementById('alarm-frequency').value = '30'; // 기본값 30일
    document.getElementById('specific-date-value').value = '';
    document.getElementById('specific-date-display').value = '';
    document.getElementById('image-status').innerText = '이미지 첨부 (선택 사항)';
    document.getElementById('image-status').dataset.path = '';
    
    // 알람 설정 초기화
    document.getElementById('periodic-alarm').checked = true; // 주기적 알림 기본 선택
    document.getElementById('specific-alarm').checked = false;
    document.getElementById('no-alarm').checked = false;
    toggleAlarmInput();
    
    // 삭제 버튼 숨김
    document.getElementById('delete-product-btn').style.display = 'none';
}

function loadProductDataForEdit(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('product-modal-title').innerText = '제품 수정';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-type').value = product.type;
    document.getElementById('purchase-date-value').value = product.purchaseDate || ''; 
    document.getElementById('purchase-date-display').value = product.purchaseDate || ''; 
    document.getElementById('purchase-price').value = product.purchasePrice;
    document.getElementById('warranty-period').value = product.warrantyPeriod;
    
    // 알람 설정 로딩
    document.getElementById('alarm-frequency').value = product.alarm.periodic.freq || '30';
    document.getElementById('specific-date-value').value = product.alarm.specific.date || '';
    document.getElementById('specific-date-display').value = product.alarm.specific.date || '';

    // 라디오 버튼 상태 로딩
    if (product.alarm.periodic.enabled) {
        document.getElementById('periodic-alarm').checked = true;
    } else if (product.alarm.specific.enabled) {
        document.getElementById('specific-alarm').checked = true;
    } else {
        document.getElementById('no-alarm').checked = true;
    }
    toggleAlarmInput();

    // 이미지 경로 로딩
    if (product.imagePath) {
        document.getElementById('image-status').innerText = '이미지 첨부 완료 (경로: ' + product.imagePath + ')';
        document.getElementById('image-status').dataset.path = product.imagePath;
    } else {
        document.getElementById('image-status').innerText = '이미지 첨부 (선택 사항)';
        document.getElementById('image-status').dataset.path = '';
    }

    // 삭제 버튼 보이기
    document.getElementById('delete-product-btn').style.display = 'flex';
}

function saveProduct() {
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value.trim();
    const type = document.getElementById('product-type').value;
    const purchaseDate = document.getElementById('purchase-date-value').value; 
    const purchasePrice = document.getElementById('purchase-price').value.trim();
    const warrantyPeriod = document.getElementById('warranty-period').value.trim();
    
    // 알림 설정 값 로딩
    const isPeriodicEnabled = document.getElementById('periodic-alarm').checked;
    const isSpecificEnabled = document.getElementById('specific-alarm').checked;
    
    const alarmFreq = document.getElementById('alarm-frequency').value;
    const specificDate = document.getElementById('specific-date-value').value;
    
    const imagePath = document.getElementById('image-status').dataset.path;
    
    if (!name || !type) {
        alert('제품명, 종류는 필수 입력 항목입니다.');
        return;
    }


    const newProduct = {
        id: id || generateId(),
        name,
        type,
        purchaseDate,
        purchasePrice,
        warrantyPeriod,
        imagePath,
        alarm: {
            periodic: {
                enabled: isPeriodicEnabled,
                freq: isPeriodicEnabled ? parseInt(alarmFreq) : 0
            },
            specific: {
                enabled: isSpecificEnabled,
                date: isSpecificEnabled ? specificDate : ''
            }
        },
        memos: []
    };

    if (id) {
        // 수정 (Update)
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            // 메모 ID 목록 유지
            newProduct.memos = products[index].memos; 
            products[index] = newProduct;
        }
        alert('제품 정보가 수정되었습니다.');
    } else {
        // 등록 (Create)
        products.push(newProduct);
        alert('새 제품이 등록되었습니다.');
    }

    // 알림 재설정
    cancelAllAlarms(newProduct.id);
    if (newProduct.alarm.periodic.enabled || newProduct.alarm.specific.enabled) {
        scheduleAlarm(newProduct);
    }
    
    saveData();
    filterProductsList();
    closeModal();
}

function deleteProduct() {
    if (!confirm('제품을 삭제하시겠습니까? 이 제품과 연결된 모든 메모도 삭제됩니다.')) {
        return;
    }
    
    const id = document.getElementById('product-id').value;
    if (id) {
        // 제품 삭제
        products = products.filter(p => p.id !== id);
        
        // 연결된 메모도 삭제
        memos = memos.filter(m => !m.productIds.includes(id));
        
        // 알림 취소
        cancelAllAlarms(id);
        
        saveData();
        filterProductsList();
        closeModal();
        alert('제품 및 연결된 메모가 삭제되었습니다.');
    }
}

function renderProductList(filteredProducts = null) {
    const listContainer = document.getElementById('product-list');
    listContainer.innerHTML = '';
    
    const listToRender = filteredProducts !== null ? filteredProducts : products;

    if (listToRender.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">등록된 제품이 없습니다.</p>';
        return;
    }
    
    listToRender.sort((a, b) => a.name.localeCompare(b.name)); // 이름 순 정렬

    listToRender.forEach(product => {
        const productMemos = memos.filter(m => m.productIds.includes(product.id));
        const memoCount = productMemos.length;
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductDetail(product.id);
        
        card.innerHTML = `
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="category-info">${CATEGORY_LABELS[product.type]}</p>
                <p class="purchase-info">구매일: ${product.purchaseDate || '미상'}</p>
            </div>
            <div class="product-stats">
                <div class="stat-item">
                    <span class="material-symbols-rounded">edit_note</span>
                    <span>메모 ${memoCount}</span>
                </div>
                <div class="stat-item">
                    <span class="material-symbols-rounded">alarm</span>
                    <span>${product.alarm.periodic.enabled ? product.alarm.periodic.freq + '일 주기' : (product.alarm.specific.enabled ? '특정일' : '없음')}</span>
                </div>
            </div>
            <div class="edit-icon" onclick="event.stopPropagation(); openModal('product-modal', '${product.id}');">
                <span class="material-symbols-rounded">edit</span>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function filterProductsList() {
    const searchText = document.getElementById('search-text') ? document.getElementById('search-text').value.toLowerCase() : '';
    const filterType = document.getElementById('filter-type-category') ? document.getElementById('filter-type-category').value : '';
    
    const filtered = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchText);
        const typeMatch = !filterType || product.type === filterType;
        
        return nameMatch && typeMatch;
    });

    renderProductList(filtered);
}

// --- 메모 관리 로직 (CRUD) ---
function resetMemoForm(linkedProductId) {
    document.getElementById('memo-id').value = '';
    document.getElementById('memo-content').value = '';
    document.getElementById('memo-expiry-date-value').value = '';
    document.getElementById('memo-expiry-date-display').value = '';
    
    document.getElementById('memo-delete-btn').style.display = 'none';

    // 제품 선택 초기화 (단, 상세화면에서 들어왔다면 해당 제품만 체크)
    document.querySelectorAll('#product-select-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = (linkedProductId && checkbox.value === linkedProductId);
    });
}

function loadMemoProducts(initialProductId = null) {
    const selectList = document.getElementById('product-select-list');
    selectList.innerHTML = '';
    
    if (products.length === 0) {
        selectList.innerHTML = '<p style="text-align: center; color: #aaa; margin: 0; padding: 12px;">등록된 제품이 없습니다. 제품을 먼저 등록해주세요.</p>';
        return;
    }
    
    products.sort((a, b) => a.name.localeCompare(b.name)).forEach(product => {
        const isChecked = initialProductId === product.id ? 'checked' : '';
        selectList.innerHTML += `
            <div class="multi-select-item">
                <input type="checkbox" id="memo-product-${product.id}" value="${product.id}" ${isChecked}>
                <label for="memo-product-${product.id}">${product.name} (${CATEGORY_LABELS[product.type]})</label>
            </div>
        `;
    });
}

function saveMemo() {
    const id = document.getElementById('memo-id').value;
    const content = document.getElementById('memo-content').value.trim();
    const expiryDate = document.getElementById('memo-expiry-date-value').value;
    
    const selectedProductIds = Array.from(document.querySelectorAll('#product-select-list input:checked'))
                                   .map(cb => cb.value);

    if (!content) {
        alert('메모 내용을 입력해주세요.');
        return;
    }
    
    if (selectedProductIds.length === 0) {
        alert('이 메모를 연결할 제품을 하나 이상 선택해주세요.');
        return;
    }

    const now = new Date();
    const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const newMemo = {
        id: id || generateId(),
        content,
        date: dateString,
        expiryDate: expiryDate || null,
        productIds: selectedProductIds
    };
    
    if (id) {
        // 수정 (Update)
        const index = memos.findIndex(m => m.id === id);
        if (index !== -1) {
            memos[index] = newMemo;
            // 제품-메모 연결 목록도 업데이트
            updateProductMemoLinks(id, newMemo.productIds, memos[index].productIds);
        }
        alert('메모가 수정되었습니다.');
    } else {
        // 등록 (Create)
        memos.push(newMemo);
        // 제품-메모 연결 목록 업데이트
        updateProductMemoLinks(newMemo.id, newMemo.productIds, []);
        alert('새 메모가 등록되었습니다.');
    }
    
    saveData();
    filterProductsList();
    closeModal();
    // 상세 뷰에서 수정/등록했을 경우, 상세 뷰를 업데이트
    if (document.getElementById('detail-view').classList.contains('active') && selectedProductIds.includes(currentDetailProductId)) {
        openProductDetail(currentDetailProductId);
    }
    updateExpiredMemoCount();
}

function updateProductMemoLinks(memoId, newProductIds, oldProductIds) {
    // 1. 기존 연결에서 메모 ID 제거
    oldProductIds.forEach(productId => {
        if (!newProductIds.includes(productId)) {
            const product = products.find(p => p.id === productId);
            if (product) {
                product.memos = product.memos.filter(id => id !== memoId);
            }
        }
    });

    // 2. 새 연결에 메모 ID 추가
    newProductIds.forEach(productId => {
        if (!oldProductIds.includes(productId)) {
            const product = products.find(p => p.id === productId);
            if (product && !product.memos.includes(memoId)) {
                product.memos.push(memoId);
            }
        }
    });
}

function loadMemoDataForEdit(memoId) {
    const memo = memos.find(m => m.id === memoId);
    if (!memo) return;

    // 메모 모달 열기
    openModal('memo-modal', null); 

    document.getElementById('memo-id').value = memo.id;
    document.getElementById('memo-content').value = memo.content;
    document.getElementById('memo-expiry-date-value').value = memo.expiryDate || '';
    document.getElementById('memo-expiry-date-display').value = memo.expiryDate || '';
    
    document.getElementById('memo-delete-btn').style.display = 'flex';

    // 제품 선택 목록 체크
    document.querySelectorAll('#product-select-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = memo.productIds.includes(checkbox.value);
    });
}

function deleteMemo() {
    if (!confirm('메모를 삭제하시겠습니까?')) {
        return;
    }
    
    const id = document.getElementById('memo-id').value;
    if (id) {
        const memoToDelete = memos.find(m => m.id === id);
        if (memoToDelete) {
            // 제품의 메모 ID 목록에서 해당 메모 ID 제거
            memoToDelete.productIds.forEach(productId => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    product.memos = product.memos.filter(memoId => memoId !== id);
                }
            });
            
            // 메모 목록에서 삭제
            memos = memos.filter(m => m.id !== id);
            
            saveData();
            filterProductsList();
            closeModal();
            alert('메모가 삭제되었습니다.');
            updateExpiredMemoCount();
            
            // 상세 뷰에서 삭제했을 경우, 상세 뷰를 업데이트
            if (document.getElementById('detail-view').classList.contains('active') && currentDetailProductId) {
                openProductDetail(currentDetailProductId);
            }
        }
    }
}

// --- 상세 뷰 로직 ---
function openProductDetail(productId) {
    currentDetailProductId = productId;
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('제품 정보를 찾을 수 없습니다.');
        return;
    }

    document.getElementById('detail-product-name').innerText = product.name;
    document.getElementById('detail-product-type').innerText = CATEGORY_LABELS[product.type] || 'N/A';
    document.getElementById('detail-purchase-date').innerText = product.purchaseDate || '정보 없음';
    document.getElementById('detail-purchase-price').innerText = product.purchasePrice ? product.purchasePrice + '원' : '정보 없음';
    document.getElementById('detail-warranty-period').innerText = product.warrantyPeriod ? product.warrantyPeriod + '년' : '정보 없음';
    document.getElementById('detail-image').src = product.imagePath || 'img/placeholder.jpg'; // 이미지 경로 표시/대체 이미지
    document.getElementById('detail-image').style.display = product.imagePath ? 'block' : 'none';

    // 알림 정보 표시
    let alarmText = '알림 설정 없음';
    if (product.alarm.periodic.enabled) {
        alarmText = `${product.alarm.periodic.freq}일 주기 알림`;
    } else if (product.alarm.specific.enabled) {
        alarmText = `특정일 알림: ${product.alarm.specific.date}`;
    }
    document.getElementById('detail-alarm-info').innerText = alarmText;

    // 메모 목록 렌더링
    const memoListContainer = document.getElementById('detail-memo-list');
    memoListContainer.innerHTML = '';
    
    const productMemos = memos.filter(m => m.productIds.includes(productId));
    
    if (productMemos.length === 0) {
        memoListContainer.innerHTML = '<p class="empty-message">등록된 메모가 없습니다.</p>';
    } else {
        productMemos.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(m => {
            const expiredClass = m.expiryDate && new Date(m.expiryDate) < new Date() ? ' expired-memo-item' : '';
            const expiryText = m.expiryDate ? `(${m.expiryDate} 만료)` : '';
            
            const memoItem = document.createElement('div');
            memoItem.className = 'memo-item' + expiredClass;
            memoItem.onclick = () => loadMemoDataForEdit(m.id);
            
            memoItem.innerHTML = `
                <div class="memo-content-area">
                    <p style="margin: 0; font-size: 14px;">${m.content}</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--color-text-light);">
                        ${m.date} 등록 ${expiryText}
                    </p>
                </div>
                <div class="memo-actions">
                    <span class="material-symbols-rounded memo-action-icon" onclick="event.stopPropagation(); loadMemoDataForEdit('${m.id}');">edit</span>
                </div>
            `;
            memoListContainer.appendChild(memoItem);
        });
    }

    switchView('detail-view');
}

function openMemoModalForDetail() {
    // 상세 화면의 제품 ID를 미리 선택한 상태로 메모 모달 열기
    openModal('memo-modal', currentDetailProductId);
}

function openExpiredMemoView() {
    renderExpiredMemos();
    switchView('expired-memo-view');
}

// --- 알림 및 만료 메모 관리 ---
function checkAutoDeleteMemos() {
    // 만료 날짜가 지난 메모 중 영구 메모가 아닌 것을 확인하여 자동 삭제
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // 만료 메모 목록 (만료 날짜가 있으며 오늘 이전인 메모)
    const expiredMemos = memos.filter(m => m.expiryDate && m.expiryDate < today);
    
    if (expiredMemos.length > 0) {
        console.log(`[AUTO DELETE] 만료 메모 ${expiredMemos.length}개 확인. 다음 저장 시 삭제됨.`);
    }
}

function updateExpiredMemoCount() {
    const today = new Date().toISOString().split('T')[0];
    const expiredMemos = memos.filter(m => m.expiryDate && m.expiryDate < today);
    const count = expiredMemos.length;

    const badge = document.getElementById('expired-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

function renderExpiredMemos() {
    const today = new Date().toISOString().split('T')[0];
    const expiredMemos = memos.filter(m => m.expiryDate && m.expiryDate < today);
    const listContainer = document.getElementById('expired-memo-list');
    listContainer.innerHTML = '';
    
    if (expiredMemos.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">만료된 메모가 없습니다.</p>';
        document.getElementById('expired-memo-edit-btn').style.display = 'none';
        return;
    }
    
    document.getElementById('expired-memo-edit-btn').style.display = 'flex';
    
    expiredMemos.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)).forEach(m => {
        const memoItem = document.createElement('div');
        memoItem.className = 'memo-item expired-memo-item editable-memo-item';
        memoItem.dataset.memoId = m.id;
        memoItem.onclick = () => loadMemoDataForEdit(m.id);
        
        memoItem.innerHTML = `
            <div class="memo-content-area">
                <p style="margin: 0; font-size: 14px;">${m.content}</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--color-expired);">
                    만료일: ${m.expiryDate}
                </p>
            </div>
            <div class="memo-actions">
                <input type="checkbox" class="expired-memo-checkbox" style="display: none;">
                <span class="material-symbols-rounded memo-action-icon" onclick="event.stopPropagation(); loadMemoDataForEdit('${m.id}');">edit</span>
            </div>
        `;
        listContainer.appendChild(memoItem);
    });
    
    // 편집 모드 초기화
    toggleExpiredMemoEditMode(false);
}

function toggleExpiredMemoEditMode(enable) {
    const list = document.getElementById('expired-memo-list');
    const actionArea = document.getElementById('expired-memo-actions');
    const editBtn = document.getElementById('expired-memo-edit-btn');
    const checkboxes = list.querySelectorAll('.expired-memo-checkbox');

    if (enable) {
        list.classList.add('edit-mode');
        actionArea.style.display = 'flex';
        editBtn.style.display = 'none';
        checkboxes.forEach(cb => {
            cb.checked = false;
            cb.style.display = 'block';
        });
    } else {
        list.classList.remove('edit-mode');
        actionArea.style.display = 'none';
        if (list.querySelector('.memo-item')) { // 메모가 있을 때만 편집 버튼 표시
             editBtn.style.display = 'flex';
        }
        checkboxes.forEach(cb => {
            cb.checked = false;
            cb.style.display = 'none';
        });
    }
}

function deleteSelectedExpiredMemos() {
    const selectedIds = Array.from(document.querySelectorAll('#expired-memo-list .expired-memo-checkbox:checked'))
                            .map(cb => cb.closest('.memo-item').dataset.memoId);

    if (selectedIds.length === 0) {
        alert('삭제할 메모를 선택해주세요.');
        return;
    }

    if (!confirm(`${selectedIds.length}개의 만료된 메모를 영구 삭제하시겠습니까?`)) {
        return;
    }

    // 메모 목록에서 삭제 및 제품 연결 해제
    selectedIds.forEach(id => {
        const memoToDelete = memos.find(m => m.id === id);
        if (memoToDelete) {
            memoToDelete.productIds.forEach(productId => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    product.memos = product.memos.filter(memoId => memoId !== id);
                }
            });
        }
    });

    memos = memos.filter(m => !selectedIds.includes(m.id));
    
    saveData();
    renderExpiredMemos();
    updateExpiredMemoCount();
    alert('선택된 만료 메모가 삭제되었습니다.');
}


// --- Utility Functions ---

function toggleAlarmInput() {
    const periodicGroup = document.getElementById('periodic-alarm-group');
    const specificGroup = document.getElementById('specific-alarm-group');
    
    // 라디오 버튼의 checked 상태를 확인하여 그룹 표시를 토글합니다.
    if (document.getElementById('periodic-alarm').checked) {
        periodicGroup.style.display = 'flex';
        specificGroup.style.display = 'none';
    } else if (document.getElementById('specific-alarm').checked) {
        periodicGroup.style.display = 'none';
        specificGroup.style.display = 'flex';
    } else {
        periodicGroup.style.display = 'none';
        specificGroup.style.display = 'none';
    }
}

// --- Cordova Native Function Implementations ---

function getNotificationId(productId, type) {
    // 알림 ID는 제품 ID를 기반으로 하여 고유하게 생성
    // 문자열에서 숫자만 추출하여 고유 ID 생성 (Cordova ID는 정수여야 함)
    const baseId = parseInt(productId.replace(/\D/g, '').substring(0, 5) || '1');
    return type === 'periodic' ? baseId + 1000 : baseId + 2000;
}

function scheduleAlarm(product) {
    const periodicAlarm = product.alarm.periodic;
    const specificAlarm = product.alarm.specific;
    
    // 1. 주기적 알림 설정
    if (periodicAlarm.enabled && periodicAlarm.freq > 0) {
        const options = {
            id: getNotificationId(product.id, 'periodic'),
            title: `[점검 알림] ${product.name}`,
            text: `구매 후 ${periodicAlarm.freq}일 주기로 점검/관리가 필요합니다.`,
            trigger: { every: periodicAlarm.freq, unit: 'day' },
            foreground: true // 앱이 포그라운드에 있어도 알림 표시
        };
        scheduleSingleAlarm(options, product.name, 'periodic');
    }
    
    // 2. 특정 날짜 알림 설정
    if (specificAlarm.enabled && specificAlarm.date) {
        const specificDate = new Date(specificAlarm.date);
        const options = {
            id: getNotificationId(product.id, 'specific'),
            title: `[만료 알림] ${product.name}`,
            text: `보증 기간(${specificAlarm.date}) 만료 또는 중요 점검일입니다.`,
            foreground: true // 앱이 포그라운드에 있어도 알림 표시
        };

        // 날짜가 오늘 이후인 경우에만 설정
        if (specificDate > new Date()) {
            options.trigger = { at: specificDate };
            scheduleSingleAlarm(options, product.name, 'specific');
        } else {
            console.log(`[ALARM SKIP] ${product.name}의 특정 날짜 알림이 과거이므로 건너킵니다.`);
        }
    }
}

function scheduleSingleAlarm(options, productName, alarmType) {
    if (window.cordova && cordova.plugins.notification.local) {
        cordova.plugins.notification.local.schedule(options);
        console.log(`[ALARM SET] ID ${options.id}, 제품: ${productName}, 유형: ${alarmType}`);
    } else {
        console.log(`[WEB MOCK] 알림 설정: ID ${options.id}, 제품: ${productName}, 유형: ${alarmType}`);
    }
}

function cancelAllAlarms(productId) {
    const periodicId = getNotificationId(productId, 'periodic');
    const specificId = getNotificationId(productId, 'specific');

    if (window.cordova && cordova.plugins.notification.local) {
        cordova.plugins.notification.local.cancel([periodicId, specificId]);
        console.log(`[ALARM CANCEL] 제품 ${productId}의 알림 취소 완료: ID ${periodicId}, ${specificId}`);
    } else {
        console.log(`[WEB MOCK] 알림 취소: ID ${periodicId}, ${specificId}`);
    }
}

function captureImage() {
    if (window.cordova && navigator.camera) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
        });

        function onSuccess(imageURI) {
            document.getElementById('image-status').innerText = '이미지 첨부 완료 (경로 저장됨)';
            document.getElementById('image-status').dataset.path = imageURI;
        }

        function onFail(message) {
            alert('카메라 촬영에 실패했습니다: ' + message);
            document.getElementById('image-status').innerText = '이미지 첨부 (실패)';
        }
    } else {
        alert("Cordova Camera Plugin이 필요합니다. 웹 테스트용 Mock 경로를 사용합니다.");
        const mockPath = `img/image_${generateId()}.jpg`;
        document.getElementById('image-status').innerText = '이미지 첨부 완료 (path: ' + mockPath + ')';
        document.getElementById('image-status').dataset.path = mockPath;
    }
}

/**
 * Cordova DatePicker Plugin을 호출하는 함수.
 * @param {string} displayId 날짜가 표시될 Input (readonly) ID
 * @param {string} valueId 날짜 값이 저장될 Input (hidden) ID
 */
function showDatePicker(displayId, valueId) {
     if (window.cordova && window.plugins && window.plugins.datePicker) {
        const currentDate = document.getElementById(valueId).value 
            ? new Date(document.getElementById(valueId).value) 
            : new Date();

        window.plugins.datePicker.show({
            date: currentDate,
            mode: 'date', // 또는 'datetime'
            androidTheme: window.plugins.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }, (returnDate) => {
            if (returnDate) {
                // 반환된 Date 객체를 YYYY-MM-DD 형식으로 변환
                const formattedDate = returnDate.toISOString().split('T')[0];
                document.getElementById(displayId).value = formattedDate;
                document.getElementById(valueId).value = formattedDate;
            }
        }, (error) => {
            console.error('DatePicker 오류:', error);
        });

    } else {
        // Cordova 환경이 아닐 경우 (웹 브라우저)
        console.log("Cordova DatePicker Plugin이 없습니다. 웹 테스트용 Mock을 사용합니다.");
        const dateInput = prompt("날짜를 YYYY-MM-DD 형식으로 입력하세요 (예: 2025-12-31):");
        if (dateInput) {
            document.getElementById(displayId).value = dateInput;
            document.getElementById(valueId).value = dateInput;
        }
    }
}