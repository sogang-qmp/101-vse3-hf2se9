# figures — 10. CNT binding

| file | meaning |
|---|---|
| `binding_energy.png` | Encapsulation binding energy bar chart — VSe₃@CNT −1.21 eV per f.u. (Hf₂Se₉@CNT bar added on convergence). |
| `vse3_at_cnt_axial.png` | Relaxed VSe₃@CNT, view along the tube axis (C brown, Se orange, V grey). |
| `vse3_at_cnt_side.png` | Relaxed VSe₃@CNT, side view, two periods along z. |

- Data: `VSe3-Hf2Se9/03-calc/phase-c/01_binding/*/siesta.stdout` (vdW-DF2, identical cell for the three terms).
- Code: `phase-c/01_binding/_scripts/plot_binding.py` (bar chart), `phase-c/_scripts/struct_out_to_xsf.py` + `render_structure.py` (renders from `siesta.STRUCT_OUT`).
