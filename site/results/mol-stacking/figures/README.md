# figures — mol-stacking

Hf₂Se₉ 분자 stacking(dimer/trimer) 거리 + H-종단 스캔.

| 파일 | 의미 | 출처 |
|---|---|---|
| `E_vs_distance_2mol.png` | Bare(종단 없음) dimer: Se–Se stacking gap d(2.5–4.5 Å) vs 총에너지, ΔE 대비 최소 | `04-hf2se9-2mol/01-distance-scan/`, `_scripts/plot_E_vs_distance.py` |
| `E_vs_distance_3mol.png` | Bare(종단 없음) trimer: 에너지 vs d | `04-hf2se9-3mol/01-distance-scan/`, 동일 스크립트 |
| `hterm_modes_2mol.png` | H-종단 dimer: bond/gap/tilt mode별 에너지 vs d (marker o/s/^) | `04-hf2se9-2mol/02-h-term/{bond,gap,tilt}/`, `_scripts/plot_hterm_modes.py` |
| `hterm_modes_3mol.png` | H-종단 trimer: 에너지 vs d, 세 mode | `04-hf2se9-3mol/02-mol-h-term/{bond,gap,tilt}/`, 동일 스크립트 |
| `../matviz-viewer_molstack.html` | 인터랙티브 matviz 뷰어(dimer/trimer 전환), 현재 relaxation 기하 | `03-h-term-relax/gap_d3.5/siesta_current.xsf`(양 트리), project-site `structure_to_matviz_viewer.py` |

**실험 TEM (Dr. Yangjin Lee, KIST)** — 우리 데이터 아님, motivation용:
| 파일 | 의미 |
|---|---|
| `tem_chain_overlay.png` | Hf₂Se₉ chain TEM + ball-stick 구조 overlay |
| `tem_distances.png` | TEM + 거리 표기 개요도: 분자–분자 ≈ **0.36 nm (3.6 Å)**, 분자 내 폭 ~0.72 nm |

**핵심 결과**: 종단하지 않은 스캔의 최소는 하한 d = 2.5 Å에 있으며, 수소 종단
프로젝트 명칭 **gap** 구조는 이량체·삼량체 모두 d = 3.5 Å에서 최소이다. 실험 간격은
~3.6 Å이다. 에너지는 vdW-DF2(LMKLL), 실공간 격자 cutoff 500 Ry, Γ점의 고정 기하
단일점 계산이다.
