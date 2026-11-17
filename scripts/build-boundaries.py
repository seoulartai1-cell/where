#!/usr/bin/env python3
"""자카르타 전체 행정구역 경계 생성 → js/data/kelurahan.js

입력(내려받아 한 폴더에 둔다):
  gadm41_IDN_3.json, gadm41_IDN_4.json  https://geodata.ucdavis.edu/gadm/gadm4.1/json/ (구·동 경계)
  villages.csv  https://github.com/edwardsamuel/Wilayah-Administratif-Indonesia (BPS 코드 → 정식 동 이름)
사용: python3 scripts/build-boundaries.py <입력 폴더>

GADM 4.1은 이름이 붙어 있어(KebayoranBaru) BPS 코드(CC_3·CC_4)로 정식 이름을 찾는다.
같은 코드 조각(오타 중복)은 합치고, 호수 조각(DanauSunterDll)은 뺀다.
"""
import json, re, sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else '.'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOL = 0.00025   # 단순화 허용 오차(도), 약 28m
KOTA = {'3171': 'Jakarta Selatan', '3172': 'Jakarta Timur', '3173': 'Jakarta Pusat', '3174': 'Jakarta Barat', '3175': 'Jakarta Utara', '3101': 'Kepulauan Seribu'}
KEC = {
 '3171010': 'Jagakarsa', '3171020': 'Pasar Minggu', '3171030': 'Cilandak', '3171040': 'Pesanggrahan', '3171050': 'Kebayoran Lama',
 '3171060': 'Kebayoran Baru', '3171070': 'Mampang Prapatan', '3171080': 'Pancoran', '3171090': 'Tebet', '3171100': 'Setia Budi',
 '3172010': 'Pasar Rebo', '3172020': 'Ciracas', '3172030': 'Cipayung', '3172040': 'Makasar', '3172050': 'Kramat Jati',
 '3172060': 'Jatinegara', '3172070': 'Duren Sawit', '3172080': 'Cakung', '3172090': 'Pulo Gadung', '3172100': 'Matraman',
 '3173010': 'Tanah Abang', '3173020': 'Menteng', '3173030': 'Senen', '3173040': 'Johar Baru', '3173050': 'Cempaka Putih',
 '3173060': 'Kemayoran', '3173070': 'Sawah Besar', '3173080': 'Gambir',
 '3174010': 'Kembangan', '3174020': 'Kebon Jeruk', '3174030': 'Palmerah', '3174040': 'Grogol Petamburan', '3174050': 'Tambora',
 '3174060': 'Taman Sari', '3174070': 'Cengkareng', '3174080': 'Kalideres',
 '3175010': 'Penjaringan', '3175020': 'Pademangan', '3175030': 'Tanjung Priok', '3175040': 'Koja', '3175050': 'Kelapa Gading', '3175060': 'Cilincing',
 '3101010': 'Kepulauan Seribu Selatan', '3101020': 'Kepulauan Seribu Utara'}
# 기존 앱 데이터(KR·KNOTE·KCAT)가 쓰는 표기를 우선한다
KEEP = {'Halim Perdana Kusumah', 'Setia Budi', 'Pela Mampang', 'Kebayoran Lama Utara', 'Kebayoran Lama Selatan'}
SMALL = {'Dan', 'Di'}
FIX = {'Papango': 'Papanggo', 'Tanjung Priuk': 'Tanjung Priok', 'Rawabadak Selatan': 'Rawa Badak Selatan', 'Rawabadak Utara': 'Rawa Badak Utara'}

norm = lambda s: re.sub(r'[^a-z]', '', s.lower())

def title(s):
    w = ' '.join(x.capitalize() for x in s.strip().split())
    return w.replace('Ii', 'II').replace("'", '')

def camel(s):
    return re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', s)

def dp(pts, tol):
    """Douglas-Peucker"""
    if len(pts) < 4:
        return pts
    a, b = pts[0], pts[-1]
    dmax, idx = 0, 0
    ax, ay = a; bx, by = b
    dx, dy = bx - ax, by - ay
    L2 = dx * dx + dy * dy
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        if L2 == 0:
            d = ((px - ax) ** 2 + (py - ay) ** 2) ** .5
        else:
            t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / L2))
            d = ((px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2) ** .5
        if d > dmax:
            dmax, idx = d, i
    if dmax > tol:
        return dp(pts[:idx + 1], tol)[:-1] + dp(pts[idx:], tol)
    return [a, b]

def area(r):
    return abs(sum(r[i][0] * r[i - 1][1] - r[i - 1][0] * r[i][1] for i in range(len(r)))) / 2

def rings(geom, tol, min_area):
    polys = geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]
    out = []
    for p in polys:
        outer = p[0]                       # 바깥 고리만(구멍은 무시)
        s = dp(outer, tol)
        if len(s) < 4 or area(outer) < min_area:
            continue
        out.append([[round(y, 5), round(x, 5)] for x, y in s])   # [lat,lng]
    return out

def centroid(rs):
    big = max(rs, key=lambda r: area([[p[1], p[0]] for p in r]))
    n = len(big) - 1
    return [round(sum(p[0] for p in big[:n]) / n, 5), round(sum(p[1] for p in big[:n]) / n, 5)]

def main():
    vil = {}
    for line in open(os.path.join(SRC, 'villages.csv'), encoding='utf-8'):
        p = line.strip().split(',', 2)
        if len(p) == 3 and p[0].startswith('31'):
            vil[p[0]] = title(p[2])
    old = set()
    try:
        old = set(re.findall(r'"k":"([^"]+)"', open(os.path.join(ROOT, 'js/data/kelurahan.js'), encoding='utf-8').read()))
    except FileNotFoundError:
        pass
    oldn = {norm(x): x for x in old | KEEP}

    d4 = json.load(open(os.path.join(SRC, 'gadm41_IDN_4.json'), encoding='utf-8'))
    kel = {}
    for f in d4['features']:
        p = f['properties']
        if p['NAME_1'] != 'JakartaRaya' or p['NAME_2'] == 'DanauSunterDll' or p['NAME_3'] == 'DanauSunterDll':
            continue
        cc = p['CC_4']; kc = KEC.get(cc[:7]); kt = KOTA.get(cc[:4])
        if not kc:
            print('구 코드 없음', p['NAME_3'], cc); continue
        g = camel(p['NAME_4'])
        cand = vil.get(cc)
        name = oldn.get(norm(g)) or (cand if cand and norm(cand) == norm(g) else None)
        if not name:   # 코드가 어긋나면 같은 구 안에서 이름으로 찾는다
            same = [v for k, v in vil.items() if k[:7] == cc[:7] and norm(v) == norm(g)]
            name = same[0] if same else title(g)
        name = ' '.join(w if w not in SMALL else w.lower() for w in name.split())
        name = FIX.get(name, name)
        seri = kt == 'Kepulauan Seribu'
        rs = rings(f['geometry'], TOL, 2e-7 if seri else 2e-6)
        if not rs:
            continue
        key = (name, kc)
        if key in kel:
            kel[key]['g'] += rs
        else:
            kel[key] = {'k': name, 'kc': kc, 'kt': kt, 'g': rs}
    for k in kel.values():
        k['c'] = centroid(k['g'])

    d3 = json.load(open(os.path.join(SRC, 'gadm41_IDN_3.json'), encoding='utf-8'))
    kcg = {}
    for f in d3['features']:
        p = f['properties']
        kc = KEC.get(p['CC_3'])
        if p['NAME_1'] != 'JakartaRaya' or not kc:
            continue
        seri = p['CC_3'].startswith('3101')
        rs = rings(f['geometry'], TOL * 1.6, 2e-7 if seri else 2e-6)
        if kc in kcg:
            kcg[kc]['g'] += rs
        else:
            kcg[kc] = {'kc': kc, 'kt': KOTA[p['CC_3'][:4]], 'g': rs}
    for k in kcg.values():
        k['c'] = centroid(k['g'])

    order = list(KOTA.values())
    K = sorted(kel.values(), key=lambda k: (order.index(k['kt']), k['kc'], k['k']))
    G = sorted(kcg.values(), key=lambda k: (order.index(k['kt']), k['kc']))
    dup = {}
    for k in K:
        dup.setdefault(k['k'], []).append(k['kc'])
    for n, v in dup.items():
        if len(v) > 1:
            print('이름 중복', n, v)
    js = ('// 행정구역 경계: GADM 4.1(2022) 동(Kelurahan)·구(Kecamatan), BPS 코드로 정식 이름 대조. scripts/build-boundaries.py로 생성\n'
          '// 자카르타 전체(5개 시 + 천 개의 섬) 구 ' + str(len(G)) + '개, 동 ' + str(len(K)) + '개. 약식 단순화(약 30m)\n'
          'const KEL=' + json.dumps([{'k': k['k'], 'kc': k['kc'], 'kt': k['kt'], 'c': k['c'], 'g': k['g']} for k in K], ensure_ascii=False, separators=(',', ':')) + ';\n'
          'const KCG=' + json.dumps([{'kc': k['kc'], 'kt': k['kt'], 'c': k['c'], 'g': k['g']} for k in G], ensure_ascii=False, separators=(',', ':')) + ';\n')
    open(os.path.join(ROOT, 'js/data/kelurahan.js'), 'w', encoding='utf-8').write(js)
    print('구', len(G), '동', len(K), '크기', len(js))

main()
