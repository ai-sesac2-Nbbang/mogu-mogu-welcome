# 파일명: mogu_map_final.py (JS 오타 해결 최종본 - 교체본)

import os
import json
import traceback
from pathlib import Path
import pandas as pd
import folium
from folium.plugins import MarkerCluster

# --- 💡 1. 설정 ---
# 프로젝트 루트(myapp) 기준으로 정적 파일 저장 경로 계산
PROJECT_ROOT = Path(__file__).resolve().parents[1]   # .../myapp
OUTPUT = PROJECT_ROOT / "public" / "embeds" / "mogu" / "mogu_map_final.html"

DATA_FOLDER_PATH = 'C:/dev/agent/더미데이터2000명'
POSTS_FILE = 'dummy_data_2000_posts.csv'
USERS_FILE = 'dummy_data_2000_users.csv'
PARTICIPANTS_FILE = 'dummy_data_2000_participations.csv'

COL_POST_ID = 'id'
COL_POST_USER_ID = 'user_id'
COL_TITLE = 'name'
COL_CATEGORY = 'category'
COL_TARGET_COUNT = 'target_count'
COL_CREATED_AT = 'created_at'
COL_LATITUDE = 'latitude'
COL_LONGITUDE = 'longitude'
COL_USER_ID_IN_USERS_FILE = 'id'
COL_NICKNAME = 'nickname'
COL_PARTICIPANTS_POST_ID = 'mogu_post_id'
# --- 설정 끝 ---


def create_final_map():
    """모든 기능이 통합된 최종 지도를 생성합니다."""
    print("🗺️ [JS 오타 해결 최종본] 지도 생성을 시작합니다...")

    # ▸ 동네(중심점) 좌표 사전
    seoul_locations = {
        "강남역": [37.4979, 127.0276], "역삼동": [37.5006, 127.0364], "논현동": [37.5113, 127.0298],
        "삼성동": [37.5143, 127.0601], "대치동": [37.4984, 127.0616], "서초동": [37.4919, 127.0079],
        "반포동": [37.5098, 127.0016], "잠실역": [37.5132, 127.1001], "잠실동": [37.5144, 127.0863],
        "신천동": [37.5169, 127.1044], "방이동": [37.5150, 127.1241], "홍대입구역": [37.5569, 126.9239],
        "합정동": [37.5498, 126.9137], "서교동": [37.5534, 126.9205], "연남동": [37.5623, 126.9245],
        "명동": [37.5639, 126.9834], "을지로": [37.5663, 126.9984], "광화문": [37.5759, 126.9768],
        "여의도": [37.5215, 126.9248], "당산동": [37.5342, 126.9030], "문래동": [37.5178, 126.8906],
        "성수동": [37.5443, 127.0560], "자양동": [37.5376, 127.0844], "화양동": [37.5434, 127.0722],
        "이태원": [37.5345, 126.9941], "한남동": [37.5387, 127.0042], "종로": [37.5729, 126.9793],
        "대학로": [37.5826, 127.0021], "신림동": [37.4844, 126.9297], "사당역": [37.4765, 126.9816]
    }
    dongs_json = json.dumps(seoul_locations, ensure_ascii=False)

    # ▸ 데이터 병합
    try:
        print("⚙️ STEP 1: 3개 CSV 파일 로딩 및 데이터 결합...")
        df_posts = pd.read_csv(f"{DATA_FOLDER_PATH}/{POSTS_FILE}", encoding='utf-8-sig')
        df_users = pd.read_csv(f"{DATA_FOLDER_PATH}/{USERS_FILE}", encoding='utf-8-sig')
        df_participants = pd.read_csv(f"{DATA_FOLDER_PATH}/{PARTICIPANTS_FILE}", encoding='utf-8-sig')

        df_posts.columns = df_posts.columns.str.strip()
        df_users.columns = df_users.columns.str.strip()
        df_participants.columns = df_participants.columns.str.strip()

        df_participant_counts = (
            df_participants[COL_PARTICIPANTS_POST_ID].value_counts()
            .reset_index()
        )
        df_participant_counts.columns = [COL_POST_ID, 'current']

        df_users_simplified = df_users[[COL_USER_ID_IN_USERS_FILE, COL_NICKNAME]].rename(
            columns={COL_USER_ID_IN_USERS_FILE: COL_POST_USER_ID}
        )

        df_merged = pd.merge(df_posts, df_users_simplified, on=COL_POST_USER_ID, how='left')
        df_merged = pd.merge(df_merged, df_participant_counts, on=COL_POST_ID, how='left')

        df_merged['current'] = df_merged['current'].fillna(0).astype(int)
        df_merged[COL_CREATED_AT] = pd.to_datetime(df_merged[COL_CREATED_AT]).dt.strftime('%Y-%m-%d')
        df_merged[COL_NICKNAME] = df_merged[COL_NICKNAME].fillna('알 수 없음')

        final_data = df_merged[[
            COL_POST_ID, COL_TITLE, COL_CATEGORY, COL_TARGET_COUNT, 'current',
            COL_CREATED_AT, COL_LATITUDE, COL_LONGITUDE, COL_NICKNAME
        ]].rename(columns={
            COL_POST_ID: 'id', COL_TITLE: 'name', COL_CATEGORY: 'category',
            COL_TARGET_COUNT: 'target', COL_CREATED_AT: 'date',
            COL_LATITUDE: 'lat', COL_LONGITUDE: 'lon', COL_NICKNAME: 'nickname'
        }).to_dict(orient='records')

        locations_json = json.dumps(final_data, ensure_ascii=False)
        print("✅ 데이터 결합 및 처리 완료!")
    except Exception:
        print("❌ 데이터 처리 중 오류가 발생했습니다.")
        traceback.print_exc()
        return

    # ▸ 지도/클러스터 + UI 주입
    print("🎨 STEP 2: 최종 UI/UX 코드 주입...")
    seoul_map = folium.Map(location=[37.5665, 126.9780], zoom_start=12)
    MarkerCluster().add_to(seoul_map)

    html_template_base = """
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'Noto Sans KR', sans-serif; }
        .search-bar-container { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 500px; max-width: 90%; z-index: 1000; }
        .search-box { background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; padding: 5px; }
        .search-box input { flex-grow: 1; border: none; outline: none; padding: 10px; font-size: 16px; }
        .autocomplete-items { background-color: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-top: 5px; }
        .autocomplete-items div { padding: 10px; cursor: pointer; border-bottom: 1px solid #ddd; }
        .result-panel { position: absolute; top: 10px; right: 10px; width: 350px; height: calc(100vh - 20px); background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; z-index: 1000; }
        .panel-header { padding: 15px; border-bottom: 1px solid #eee; } .panel-header h4 { margin: 0; font-size: 18px; }
        .result-list { overflow-y: auto; flex-grow: 1; counter-reset: post-counter; }
        .post-card { position: relative; padding: 15px 15px 15px 55px; border-bottom: 1px solid #eee; cursor: pointer; transition: background-color 0.2s; }
        .post-card::before {
            counter-increment: post-counter; content: counter(post-counter);
            position: absolute; left: 15px; top: 50%; transform: translateY(-50%);
            width: 28px; height: 28px; background-color: #f0f0f0; color: #555;
            border-radius: 50%; font-weight: 700; display: flex;
            align-items: center; justify-content: center; font-size: 14px; transition: all 0.2s;
        }
        .post-card.active { background-color: #e9f5ff; border-left: 4px solid #007bff; padding-left: 51px; }
        .post-card.active::before { background-color: #007bff; color: white; }
        .post-card h5 { margin: 0 0 8px 0; font-size: 16px; }
        .post-card .meta { font-size: 13px; color: #6c757d; display: flex; justify-content: space-between; }
        .post-card .meta .participants { color: #28a745; font-weight: 500; }
        .post-card .distance { font-size: 14px; color: #007bff; font-weight: 700; margin-top: 8px; }
    </style>
    <div class="search-bar-container">
        <div class="search-box"><input type="text" id="search-input" placeholder="동네 이름(예: 역삼동)을 검색하세요"></div>
        <div id="autocomplete-list" class="autocomplete-items"></div>
    </div>
    <div class="result-panel">
        <div class="panel-header"><h4>게시글 목록</h4></div>
        <div id="result-list" class="result-list"><p style="text-align:center; color:#888; margin-top: 20px;">전체 게시글이 지도에 표시 중입니다. <br> 동네를 검색하여 목록을 확인하세요.</p></div>
    </div>
    <script>
        const allPostData = __LOCATIONS_JSON__;
        const dongCoords = __DONGS_JSON__;
        let map, markers = {}, markerCluster;
        function getDistance(lat1, lon1, lat2, lon2) { const R = 6371; const dLat = (lat2-lat1)*Math.PI/180; const dLon = (lon2-lon1)*Math.PI/180; const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2); const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); return R*c; }
        function renderResults(posts, baseLocation, title) {
            const resultList = document.getElementById('result-list');
            document.querySelector('.panel-header h4').textContent = title;
            resultList.innerHTML = ''; markerCluster.clearLayers();
            if (posts.length === 0) { resultList.innerHTML = '<p style="text-align:center; color:#888; margin-top: 20px;">게시글이 없습니다.</p>'; return; }
            posts.forEach(post => { post.distance = getDistance(baseLocation.lat, baseLocation.lng, post.lat, post.lon); });
            posts.sort((a, b) => a.distance - b.distance);
            posts.forEach(post => {
                const card = document.createElement('div'); card.className = 'post-card';
                card.innerHTML = `<h5>${post.name}</h5><div class="meta"><span>by <b>${post.nickname}</b></span><span class="participants">${post.current} / ${post.target}명</span></div><div class="distance">${post.distance.toFixed(2)} km</div>`;
                resultList.appendChild(card);
                const marker = markers[post.id]; markerCluster.addLayer(marker);
                card.addEventListener('click', () => {
                    map.setView(marker.getLatLng(), 15); marker.openPopup();
                    document.querySelectorAll('.post-card').forEach(c => c.classList.remove('active')); card.classList.add('active');
                });
            });
            map.addLayer(markerCluster);
        }
        function searchByDong(dongName) {
            if (dongCoords[dongName]) {
                const coords = dongCoords[dongName]; const center = { lat: coords[0], lng: coords[1] };
                map.setView(center, 14); const radius = 3;
                const nearbyPosts = allPostData.filter(post => getDistance(center.lat, center.lng, post.lat, post.lon) <= radius);
                renderResults(nearbyPosts, center, `'${dongName}' 3km 내`);
            }
        }
        function initializeApp(mapInstance) {
            map = mapInstance; markerCluster = L.markerClusterGroup();
            allPostData.forEach(post => {
                const popupContent = `<b>${post.name}</b><hr><b>작성자:</b> ${post.nickname}<br><b>참여:</b> ${post.current}/${post.target}명<br><b>카테고리:</b> ${post.category}<br><b>작성일:</b> ${post.date}`;
                markers[post.id] = L.marker([post.lat, post.lon]).bindPopup(popupContent);
                markerCluster.addLayer(markers[post.id]);
            });
            map.addLayer(markerCluster);
            const searchInput = document.getElementById('search-input');
            const autocompleteList = document.getElementById('autocomplete-list');
            searchInput.addEventListener('input', () => {
                const val = searchInput.value; autocompleteList.innerHTML = ''; if (!val) return;
                const matchingDongs = Object.keys(dongCoords).filter(d => d.includes(val));
                matchingDongs.forEach(dong => {
                    const item = document.createElement('div'); item.textContent = dong;
                    item.addEventListener('click', () => {
                        searchInput.value = dong; autocompleteList.innerHTML = ''; searchByDong(dong);
                    });
                    autocompleteList.appendChild(item);
                });
            });
        }
        document.addEventListener("DOMContentLoaded", function() {
            // --- 👇 최종 수정된 부분 (오타 수정 반영) ---
            setTimeout(() => {
                let mapVar;
                for (const key in window) { if (key.startsWith('map_') && window[key] instanceof L.Map) { mapVar = window[key]; break; } }
                if (mapVar) { initializeApp(mapVar); }
            }, 500);
        });
    </script>
    """

    final_html = html_template_base.replace('__LOCATIONS_JSON__', locations_json)
    final_html = final_html.replace('__DONGS_JSON__', dongs_json)
    seoul_map.get_root().html.add_child(folium.Element(final_html))

    # ▸ 저장 (함수 내부에서!)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    seoul_map.save(str(OUTPUT))
    print(f"🎉 완료! '{OUTPUT}' 파일이 생성되었습니다.")


if __name__ == "__main__":
    create_final_map()
