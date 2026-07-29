# level-correction/figures (source: meetings/2026-06-26/figures/, + b3lyp_hartree from 2026-06-19)
| File | Meaning |
|---|---|
| `n25_9uc_te_dos.png` | 9-unit-cell device T(E) + device DOS |
| `n25_9uc_pdos_mol.png` | 9-unit-cell device molecular Hf₂Se₉ PDOS |
| `n25_9uc_ec_EF.png` | eigenchannel |ψ|² isosurface at E_F (τ₀=0.989), delocalised (on-resonance) |
| `n25_9uc_ec_0.10.png` / `_0.19.png` / `_0.30.png` | eigenchannel at +0.10/0.19/0.30 eV — localising off-resonance |
| `sr_bond_vs_uc.png` | interface structural metrics (Hf–Se, H–Se, Se···VSe₃ gap, RMSD) vs scattering-region length | 10-hetero-h-term-v3-relax/figures |
| `sr_pdos_compare.png` | molecular PDOS overlaid for 3/5/7/9 unit cells (length-independent) | 10-hetero-h-term-v3-relax/figures |
| `n25_9uc_iv.png` | 9-unit-cell zero-bias-approximation I–V |
| `b3lyp_levels_all.png` | vdW-DF2 (SIESTA) → B3LYP (VASP) level alignment (solid occupied, dashed virtual); 1:1 boxed style, dotted connectors. Source `05-hf2se9-mol/figures/all_levels_vac_df2.png`, code `05-hf2se9-mol/_scripts/plot_all_levels_vac.py` (data `tables/mo_delta_orbital.csv`, PBE_minus_Vvac col = DF2 siesta.EIG) |
| `b3lyp_delta.png` | per-orbital Δ = B3LYP − vdW-DF2 |
| `dftsigma_te.png` | **corrected $T(E)$ (Section C Fig.6)** — vdW-DF2 vs DFT+Σ (log). $T(E_F)\,0.355\to0.051$ (N25_9uc production). Source: `11-hetero60-transport/N25_9uc/0bias/dft_sigma/figures/te_dH_compare.png` |
| `te_mol_uncorr.png` / `te_mol_corr.png` | **Section C Fig.7** — $T(E)$ (black, log) + Hf₂Se₉ molecular PDOS (orange) twin, N25_9uc. vdW-DF2: PDOS piles on $E_F$; DFT+Σ: pushed off → PDOS($E_F$) 20.1→1.2/eV, $T(E_F)$ 0.355→0.051. Source `N25_9uc/0bias/dft_sigma/figures/` |
| `te_mol_uncorr_zoom.png` / `te_mol_corr_zoom.png` | **Section C Fig.8** — same, zoomed $|E-E_F|\le0.5$ eV; frontier splits off $E_F$ (HOMO −0.095 / LUMO +0.085) |
| `te_tot_uncorr_zoom.png` / `te_tot_corr_zoom.png` | **Section C Fig.9** — T(E) + 총 device DOS twin (±0.5 eV). DOS(E_F) 85.9→66.5 /eV; lead 연속띠 유지 = molecule-only 보정 확인. Source `N25_9uc/0bias/dft_sigma/figures/` |
| `n25_9uc_ec_corr_homo.png` / `_ef.png` / `_lumo.png` | **Section C Fig.10** — corrected ($H+\Delta H$) eigenchannel \|ψ\|² at HOMO −0.095 eV (τ₀=0.373) / E_F (0.124) / LUMO +0.085 eV (0.074), N25_9uc. Axis-legend band-cropped (common height 413 px) from `N25_9uc/0bias/dft_sigma/eigenchannel/figure/EC_0_psi2_{HOMO,EF,LUMO}.png` |
| `n25_9uc_iv_corr.png` | **Section C Fig.11** — zero-bias-approximation I–V, vdW-DF2 vs DFT+Σ, **대칭 window** (μ_L=+V/2, μ_R=−V/2, 300 K). ±0.5 V: \|I\| 5.94→4.12 μA; 홀함수 I(−V)=−I(V) (정류 없음). Source `N25_9uc/0bias/dft_sigma/figures/iv_zerobias_symmetric.png`, code `N25_9uc/scripts/iv_zerobias_symmetric.py` (2026-07-05, 비대칭 window `iv_zerobias_dftsigma.py` 대체) |
| `n25_9uc_iv_window_corr.png` | **Section C Fig.12** — 보정 T(E) 위 **대칭** bias window (\|V\|=0.1–0.5 V, μ_{L,R}=±V/2). Source `.../iv_window_symmetric_corr.png` |

T(E_F)=0.348 (9 cells) vs 0.354 (3 cells); gap 0.02→0.75 eV; Δ_HOMO −1.01 / Δ_LUMO −0.29 eV (full set in mo_delta_orbital.csv). vdW-DF2(SIESTA)↔B3LYP(VASP) common offset ~−0.65 eV.
| `v2_te_mol_uncorr/corr.png` (+`_zoom`) | T(E)(log,좌) + 분자 PDOS(우) twin, 무보정/v2. 분자 공명 위치=T 피크 위치. zoom [−0.5,0.5]. |
| `v2_alignment_projection.png` | vdW-DF2↔B3LYP 준위 정렬. vdW-DF2 frontier(E_F) 자리에 B3LYP LUMO+3/+4(간격 0.185)가 옴 = v1 device '0.18'의 정체(오정렬, gap 아님). B3LYP HOMO는 −6.59로 한참 아래. |
| `v1_pdos_compare_zoom.png` | (v1, 폐기) 분자 PDOS vdW-DF2 vs v1 DFT+Σ — 보정 peak이 E_F ±0.2 안, "0.18 gap"=오정렬 LUMO+3/+4 |
| `v1_te_dH_compare.png` | (v1, 폐기) T(E) log, vdW-DF2 vs v1 DFT+Σ, T(E_F) 0.355→0.051 |
| `v2_te_beforeafter.png` | T(E) 보정 전(vdW-DF2)/후(DFT+Σ v2)만 — 레전드 우상단, y 1e-6, x −2~2. E_F에서 ~110× 감소 |
