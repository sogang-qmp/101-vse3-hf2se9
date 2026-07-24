# figures — mol-stacking

Hf₂Se₉ molecular stacking (dimer/trimer) distance + H-termination scans.

| file | meaning | source |
|---|---|---|
| `E_vs_distance_2mol.png` | Bare (unterminated) dimer: total energy vs Se–Se stacking gap d (2.5–4.5 Å), ΔE vs min | `04-hf2se9-2mol/01-distance-scan/`, plotted by `04-hf2se9-2mol/_scripts/plot_E_vs_distance.py` |
| `E_vs_distance_3mol.png` | Bare (unterminated) trimer: energy vs d | `04-hf2se9-3mol/01-distance-scan/`, same script |
| `hterm_modes_2mol.png` | H-terminated dimer: energy vs d for bond/gap/tilt capping modes (markers o/s/^) | `04-hf2se9-2mol/02-h-term/{bond,gap,tilt}/`, `_scripts/plot_hterm_modes.py` |
| `hterm_modes_3mol.png` | H-terminated trimer: energy vs d, three modes | `04-hf2se9-3mol/02-mol-h-term/{bond,gap,tilt}/`, same script |
| `../matviz-viewer_molstack.html` | interactive matviz viewer (dimer/trimer switch), current relaxation geometry | `03-h-term-relax/gap_d3.5/siesta_current.xsf` (both trees), via project-site `structure_to_matviz_viewer.py` |

**Experimental TEM (Dr. Yangjin Lee, KIST)** — not our data, shown as motivation:
| file | meaning |
|---|---|
| `tem_chain_overlay.png` | TEM of the Hf₂Se₉ chain + ball-stick structure overlay |
| `tem_distances.png` | TEM + schematic with measured distances: molecule–molecule ≈ **0.36 nm (3.6 Å)**, intra-molecule width ~0.72 nm |

**Key result**: bare scan minimum at d = 2.5 Å (collapse); H-terminated **gap mode at d = 3.5 Å** is the global minimum for both dimer and trimer (consistent with the ~3.6 Å TEM spacing). Energies are vdW-DF2 (LMKLL), MeshCutoff 500 Ry, Γ, single-point.
