# level-correction/data

DFT+Σ 보정 eigenchannel |ψ|² 데이터. **현재 페이지에서 미사용** — Section C의 인터랙티브 3Dmol 뷰어는 제거됐고, 렌더된 PNG(HOMO/$E_F$/LUMO)로 교체 예정. 아래 JS는 미참조 상태로 남겨둠.

| 파일 | 의미 |
|---|---|
| `ec_ef_corr_cube.js` | 보정 $H+\Delta H$, $E_F$ 전달 eigenchannel EC₀ \|ψ\|² (τ₀=0.124) |
| `ec_homo_corr_cube.js` | 보정, HOMO(−0.095 eV) EC₀ \|ψ\|² (τ₀=0.373, 전도 최대) |
| `ec_lumo_corr_cube.js` | 보정, LUMO(+0.085 eV) EC₀ \|ψ\|² (τ₀=0.074) |

- **생성**: `~/.claude/skills/project-site/scripts/cube_to_viewer.py <cube> --id <id> --color orange`
  (45 MB 원본 → grid 4× 다운샘플, 685 KB JS, 변수 `window.EC_*_CORR_CUBE`).
- **원본 cube**: `03-calc/11-hetero60-transport/N25_9uc/0bias/dft_sigma/eigenchannel/{EF,HOMO,LUMO}/EC_0_psi2_*.cube`.
- η=1e-6 (eigenchannel) — transport η=0.005과 다름($E_F$ sharp resonance, memory `project_hetero_transport_eta_choice`).
