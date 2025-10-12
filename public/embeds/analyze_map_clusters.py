# 파일명: analyze_map_clusters.py
# 실행위치: C:\dev\agent\
# 필요 파일: 더미데이터2000명/dummy_data_2000_posts.csv

import pandas as pd
import folium
from folium.plugins import MarkerCluster

def make_cluster_map(df, filename, tile_style="OpenStreetMap"):
    """주어진 tile_style로 folium 지도 생성 후 저장"""
    m = folium.Map(
        location=[37.5665, 126.9780],
        zoom_start=11,
        tiles=tile_style
    )
    cluster = MarkerCluster().add_to(m)
    for _, row in df.iterrows():
        folium.CircleMarker(
            location=[row["lat"], row["lon"]],
            radius=5,
            color="blue",
            fill=True,
            fill_color="blue",
            popup=f"<strong>{row['name']}</strong>",
        ).add_to(cluster)
    m.save(filename)
    print(f"✅ 저장: {filename} (타일: {tile_style})")

def analyze_activity_clusters_map():
    print("🗺️ '활동 밀집 지역' 분석 시작")

    # 윈도우 경로는 슬래시(/)로 써도 동작함
    csv_path = "더미데이터2000명/dummy_data_2000_posts.csv"
    try:
        df_posts = pd.read_csv(csv_path)
    except FileNotFoundError:
        print(f"❌ CSV 없음: {csv_path}")
        return

    if "mogu_market" not in df_posts.columns:
        print("❌ 'mogu_market' 컬럼이 없어요")
        return

    # "POINT(lon lat)" → lon/lat 숫자 컬럼 추출
    df_posts[["lon", "lat"]] = df_posts["mogu_market"].str.extract(
        r"POINT\((.*) (.*)\)"
    ).astype(float)

    # 라이트(기본 OSM) + 다크(CartoDB dark_matter) 두 개 저장
    make_cluster_map(df_posts, "activity_map_clusters.html", tile_style="OpenStreetMap")
    make_cluster_map(df_posts, "activity_map_clusters_dark.html", tile_style="CartoDB dark_matter")

if __name__ == "__main__":
    analyze_activity_clusters_map()
