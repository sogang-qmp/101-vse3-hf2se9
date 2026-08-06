# figures — 12. Two-molecule bridge levels

| file | meaning | source |
|---|---|---|
| `hartree_vz_2mol.png` | $xy$-averaged Hartree potential $\bar{V}_\mathrm{H}(z)$ of the isolated H-bridged Hf₂Se₉ dimer (25 atoms), PBE vs B3LYP, both VASP. Dashed lines = $V_\text{vac}$, the mean over the outer 15 % of the cell at each end. Key result: $V_\text{vac}$ = +0.183 (PBE) vs +0.192 eV (B3LYP), a 9 meV difference, so the vacuum alignment used for the level table is valid. | data `VSe3-Hf2Se9/04-hf2se9-2mol/tables/vz_{pbe_vasp,b3lyp}_2mol.csv` (extracted from LOCPOT by `_scripts/extract_vz_2mol.py`; the B3LYP LOCPOT, 548 MB, stayed on Stampede3); plot `_scripts/plot_levels_2mol.py` |

Pending — both need the vdW-DF2 single point (`02-relax/mol_DF2`), which has not converged yet:
`all_levels_vac_2mol.png` (vdW-DF2 → B3LYP level ladder) and `levels_v2_poster_2mol.png`
(vdW-DF2 → DFT+Σ). Both are produced by the same `plot_levels_2mol.py` run.

The relaxed structure is shown on the page as an interactive matviz viewer
(`matviz-block_dimer25.html`, embedded via `srcdoc`), not as a static render.
