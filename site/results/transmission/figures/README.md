# transmission/figures

Zero-bias TranSIESTA/TBtrans, vdW-DF2, electrode k=100, η=0.005 eV.
Source = 2026-06-12 group-meeting PPT (slides 9 / 11 / 17 / 12 / 18 / 19) + `03-calc/11-hetero60-transport`.

| File | Meaning | Source |
|---|---|---|
| `pristine-eta-length.png` | Pristine VSe₃ T(E): η=0.05 (length-dependent) vs η=0.001 (length-independent) → the length dependence is a broadening artifact | PPT `03_pristineVse/compare_eta_length_log.png` (slide 9) |
| `te-3way.png` | T(E) overlay: pristine (`vseonly_20`, η=0.001, T(E_F)=1.61) / hetero 0.348 / disconnected 0.000 (hetero·disc: k100, η=0.005). Disconnected T≈0 (off scale) → molecule is the sole bridge. Single T(E) panel, legend lower left. Unified-η pristine (`vseonly_25_k100`, η=0.005) is 0.704 — the number used in the page tables | `11-hetero60-transport/figures/3way/3way_transmission_9uc.png` (production 9uc, `scripts/plot_3way_transmission_9uc.py`; copy in `N25_9uc/figures/05_3way/`) |
| `te-dos-hetero.png` | Hetero T(E) + total DOS + molecular Hf₂Se₉ PDOS twin; molecular frontier (HOMO/LUMO) pinned at $E_F$ (−0.020/+0.003 eV), device PDOS peaks −0.065 / 0 eV. The +0.175 eV peak is a higher molecular resonance (MO87/88), well above the $E_F$-pinned frontier, not the LUMO | `N25_9uc/figures/02_pdos/pdos_mol_0.0bias.png` (production 9uc) |
| `eigenchannel-EF.png` | EC₀ (τ≈1) \|ψ\|² at E_F; bottom axis indicator cropped | PPT `05_..._eigenchannel/EF/EC_0_psi2_EF.png` (slide 12) |
| `eigenchannel-homo.png` | HOMO (−0.065 eV) eigenchannel; cropped | PPT `05_..._eigenchannel/homo.png` (slide 18) |
| `eigenchannel-lumo.png` | +0.175 eV eigenchannel (higher molecular resonance MO87/88, **not** the LUMO — true LUMO is at $E_F$); cropped | PPT `05_..._eigenchannel/LUMO.png` (slide 18) |
| `iv-zerobias.png` | Zero-bias-approximation I–V (Landauer, **symmetric window** μ_{L,R}=±V/2); odd, ≈ ±5.9 μA at ±0.5 V. Regenerated 2026-07-05 (`N25_9uc/scripts/iv_zerobias_symmetric.py`) | PPT slide 19 (`20260612` pptx, embedded image57) |
| `iv-biaswindow.png` | **Symmetric** bias windows (\|V\|=0.1–0.5 V, μ_{L,R}=±V/2) over T(E) — the integration ranges that give each current | PPT slide 19 (`20260612` pptx, embedded image58) |

Crop: eigenchannel originals are 6000–7600 px wide with a bottom axis indicator; cropped to the top structure band (`scratchpad/prep_transmission_figs.py`).

## eigenchannel (real-space |ψ|² isosurface, from cubes)
| File | Meaning | Source |
|---|---|---|
| `eigenchannel-EF.png` | EC₀ |ψ|² isosurface at E_F — channel threads through the molecule | rendered from `EC_0_psi2_EF.cube` (PPT/05_…/EF) |
| `eigenchannel-homo.png` | channel at −0.065 eV (HOMO-like) | PPT/05_…/homo.png |
| `eigenchannel-lumo.png` | channel at +0.175 eV (higher molecular resonance MO87/88, **not** the LUMO; true HOMO/LUMO pinned at $E_F$) | PPT/05_…/LUMO.png |

Raw cubes ~45 MB each in `N25_k100/0bias/eigenchannel/{EF,HOMO,LUMO}/` — rendered to PNG, not embedded.
