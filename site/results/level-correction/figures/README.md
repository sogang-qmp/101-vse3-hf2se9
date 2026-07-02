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
| `b3lyp_levels_all.png` | vdW-DF2→B3LYP level alignment (solid occupied, dashed virtual) |
| `b3lyp_delta.png` | per-orbital Δ = B3LYP − vdW-DF2 |
| `dftsigma_te.png` | **corrected $T(E)$ (Section C Fig.6)** — vdW-DF2 vs DFT+Σ (log). $T(E_F)\,0.355\to0.051$ (N25_9uc production; 2026-07-02 k100→9uc 교체). Source: `11-hetero60-transport/N25_9uc/0bias/dft_sigma/figures/te_dH_compare.png` |
| `te_mol_uncorr.png` / `te_mol_corr.png` | **Section C Fig.7** — $T(E)$ (black, log) + Hf₂Se₉ molecular PDOS (orange) twin, N25_9uc. vdW-DF2: PDOS piles on $E_F$; DFT+Σ: pushed off → PDOS($E_F$) 20.1→1.2/eV, $T(E_F)$ 0.355→0.051. Source `N25_9uc/0bias/dft_sigma/figures/` |
| `te_mol_uncorr_zoom.png` / `te_mol_corr_zoom.png` | **Section C Fig.8** — same, zoomed $|E-E_F|\le0.5$ eV; frontier splits off $E_F$ (HOMO −0.095 / LUMO +0.085) |
| `n25_9uc_ec_corr_homo.png` / `_ef.png` / `_lumo.png` | **Section C Fig.9** — corrected ($H+\Delta H$) eigenchannel \|ψ\|² at HOMO −0.095 eV (τ₀=0.373) / E_F (0.124) / LUMO +0.085 eV (0.074), N25_9uc. Axis-legend band-cropped (common height 413 px) from `N25_9uc/0bias/dft_sigma/eigenchannel/figure/EC_0_psi2_{HOMO,EF,LUMO}.png` |
| `n25_9uc_iv_corr.png` | **Section C Fig.10** — zero-bias-approximation I–V, vdW-DF2 vs DFT+Σ (μ_L=0/μ_R=−V, 300 K). ±0.5 V: +5.04/−2.70 → +4.30/−1.04 μA, rectification 1.9→4.1. Source `N25_9uc/0bias/dft_sigma/figures/iv_zerobias_dftsigma.png`, code `N25_9uc/scripts/iv_zerobias_approx_dftsigma.py` |
| `n25_9uc_iv_window_corr.png` | **Section C Fig.11** — bias windows (\|V\|=0.1–0.5 V) over the corrected T(E). Source `.../iv_bias_window_dftsigma.png` |

T(E_F)=0.348 (9 cells) vs 0.354 (3 cells); gap 0.02→0.75 eV; Δ_HOMO −1.01 / Δ_LUMO −0.29 eV (full set in mo_delta_orbital.csv). vdW-DF2(SIESTA)↔B3LYP(VASP) common offset ~−0.65 eV.
