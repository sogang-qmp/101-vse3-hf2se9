# figures — 11. 2분자 접합 계면 회전 스캔

| 파일 | 의미 |
|---|---|
| `rot-scan-dE.png` | 계면 회전각 θ에 대한 상대 총에너지 ΔE (meV, 기준 = 60°). 채운 마커 = 실제 계산한 5각도(0/15/30/45/60°), 빈 마커 = C₃(120° 주기) + 반사 대칭으로 결정된 각도 |

- 데이터: `VSe3-Hf2Se9/04-hf2se9-2mol/04-hetero-rotation/rot_*/siesta.stdout` (rigid single-point, vdW-DF2/LMKLL, MeshCutoff 500 Ry, kgrid (1,1,4), 106 atom, c = 80.3505 Å)
- 생성 코드: `VSe3-Hf2Se9/04-hf2se9-2mol/04-hetero-rotation/_scripts/plot_rotation_scan.py`
- 핵심 결과: 60°가 최안정, 45°와 92 meV 차이. 같은 디렉토리의 `rot-scan-force.png`(강체 잔류 힘)는 같은 형태를 반복해 페이지에는 넣지 않았다.
