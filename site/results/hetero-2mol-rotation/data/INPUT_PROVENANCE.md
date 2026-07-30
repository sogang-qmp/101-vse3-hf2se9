# 04-hetero-rotation — VSe₃–(Hf₂Se₉)₂–VSe₃ 회전 스캔 (single-point)

2-분자 stack이 수렴한 직후(Max force **0.0188 eV/Å**) 그 구조로 헤테로 접합을 조립하고,
분자쌍의 계면 배향을 결정하기 위한 rigid single-point 회전 스캔.

## 소스 (둘 다 수렴본)

| 역할 | 경로 | 내용 |
|---|---|---|
| 헤테로 베이스 | `03-calc/10-hetero-h-term-v3-relax/01_relax/rot_060_tight_9uc/struct.fdf` | 1-분자 접합 relaxed, **92 atom**, cell 25×25×**69.8908 Å**. 구성: 좌 VSe₃ 1–39 · H캡 40–42 · 분자 43–53 · H캡 54–56 · 우 VSe₃ 57–92 |
| guest (교체분) | `04-hf2se9-2mol/03-h-term-relax/gap_d3.5/siesta.STRUCT_OUT` | 2-분자 stack relaxed, **25 atom**, cell z 35 Å. 분자A 1–11 · 분자B 12–22 · 브리지 H 23–25(gap 중앙) |
| input 참조 | `03-calc/10-hetero-h-term-v3-relax/cellfix/rot_000/input.fdf` | cellfix 검증본 (VariableCell F, vdW-DF2/LMKLL, MeshCutoff 500, kgrid (1,1,4)) |

## 조립 규칙 (`_scripts/build_hetero_2mol.py`)

- 베이스의 **분자 1개(43–53)를 guest 25원자(분자 2개 + 브리지 H)로 교체**. guest의 relaxed 내부 기하와
  A–B 간격을 그대로 보존.
- **계면 간격 유지**: 베이스 실측 `d_left = 2.172 Å`, `d_right = 2.174 Å`(H캡 ↔ 분자 최근접 z).
  guest를 `d_left`에 맞춰 배치하고, 우측 H캡+VSe₃를 늘어난 길이만큼 +z 이동 → `d_right` 불변.
- **셀 확장**: guest z-extent 16.992 Å − 베이스 분자 6.533 Å = **+10.460 Å** → c 69.8908 → **80.3505 Å**.
  xy(25×25) 불변, VSe₃ 주기 유지.
- **원자수**: 92 + (25 − 11) = **106**.
- 회전 대상은 **guest(분자 2개 + 브리지 H)만**, 회전축 = 셀 xy 중심 (12.5, 12.5), z축 평행(z 불변).
  좌·우 VSe₃와 H캡은 고정.

## 각도 — 독립 5개만 계산

VSe₃ 계면의 3 Se = **C₃(120° 주기) + 반사(θ↔−θ)** → 0–180°의 fundamental domain은
**0 / 15 / 30 / 45 / 60°**. 나머지 8각도는 대칭으로 결정.
(같은 논리를 1-분자 스캔에서 검증: `10-hetero-h-term-v3-relax/cellfix/README.md`.)

| 등가군 | 각도 (0–180°) | 대표(계산) |
|---|---|---|
| A | 0, 120 | **0** |
| B | 15, 105, 135 | **15** |
| C | 30, 90, 150 | **30** |
| D | 45, 75, 165 | **45** |
| E | 60, 180 | **60** |

## 계산 설정 (rigid single-point)

`MD.Steps 0` (이완 없음) · `MD.VariableCell F` · vdW-DF2(LMKLL) · MeshCutoff 500 Ry ·
`SCF.DM.Tolerance 1.0d-8` · kgrid **(1,1,4)** · diagon+ELPA ·
`MD.UseSaveXV F`·`DM.UseSaveDM F`(신규 구조라 이어받을 상태 없음).

- **kgrid 근거**: 1-분자 접합이 c=69.89 Å에 kz=4였고, c가 80.35 Å로 늘어 같은 k-spacing이면 kz≈3.5.
  정수 선택지 3(dk 2π/241) vs 4(2π/321) 중 **더 촘촘한 4를 유지** — 조성이 동일한 5각도 간 상대 비교이므로
  절대 수렴보다 각도 간 일관성이 우선.
- 5각도 조성·셀 동일 → **total energy 직접 비교 가능**.

## 검증 (생성 직후 실측)

| 항목 | 결과 |
|---|---|
| 원자수 / 셀 | 5각도 모두 106 atom, c = 80.351 Å |
| 계면 간격 | `d_left` 2.172 / `d_right` 2.174 Å — 5각도 동일 |
| 회전 적용 | 적도 Se 방위각(mod 120°) 30.0 → 45.0 → 60.0 → 75.0 → 90.0 = 15° 간격 정확 |
| 최단 원자간 거리 | 1.516 Å (Se–H) — Se–H 결합 길이 수준, 원자 겹침 없음 |

미리보기: `hetero_2mol_rot000.xsf` (VESTA).

## 미완 (제출 전 필요)

- pseudo(`H/V/Se/Hf.psml`) + `vdw_kernel.table` 복사 — 제출 디렉토리에 species↔pseudo 1:1 필요.
- HPC 슬롯·NP 미정(사용자 결정). 잡 스크립트 미생성.
