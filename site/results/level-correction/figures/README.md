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

T(E_F)=0.348 (9 cells) vs 0.354 (3 cells); gap 0.02→0.75 eV; Δ_HOMO −1.01 / Δ_LUMO −0.29 eV (full set in mo_delta_orbital.csv). vdW-DF2(SIESTA)↔B3LYP(VASP) common offset ~−0.65 eV.
