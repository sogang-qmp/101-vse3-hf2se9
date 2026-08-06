# figures — 13. Two-molecule junction transport

Source: `04-hf2se9-2mol/07-transport/N25_9uc/0bias` (TranSIESTA SCF + TBtrans, uncorrected —
no `TBT.dH`). T(E) from sisl `transmission()`, PDOS from `DOS(atoms=...)` projected on the
molecular region (atoms 104–134). All panels span E − E_F = −0.5 to 0.5 eV, T(E) floor 1e-8.

| file | meaning | key result |
|---|---|---|
| `te_pdos_2mol.png` | T(E) (left, log) with the molecular PDOS (right, linear) | T(E_F) = **0.184**; largest PDOS peak at **+0.005 eV**, i.e. on E_F |
| `te_1mol_vs_2mol_zoom.png` | one- vs two-molecule T(E) | plateau splits into resonances at −0.34 / +0.01 / +0.20 eV; mean T over the window falls **4.9×** (0.100 → 0.020) |
| `pdos_mol_1vs2.png` | PDOS of the molecular region, one vs two molecules | 20.2 → 125.6 (1/eV) at E_F — six times more weight, less transmission |

Data: `.../0bias/tables/{te_pdos_2mol,te_1mol_vs_2mol}.csv`.
Code: `04-hf2se9-2mol/_scripts/{plot_transport_2mol,plot_te_1mol_vs_2mol}.py`.
One-molecule reference: `03-calc/11-hetero60-transport/N25_9uc/0bias/dft_sigma_v2/{te,pdos}_dH_compare.csv`
(uncorrected column), same functional / electrode / η = 0.005 eV / energy grid.
