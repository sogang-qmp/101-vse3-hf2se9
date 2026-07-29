# site/figures — top-page figures

| File | Meaning | Source |
|------|---------|--------|
| `junction-structure.png` | Central region of the relaxed 220-atom transport device (60° staggered, vdW-DF2): Hf₂Se₉ molecule (cyan Hf, orange Se) bridging two H-passivated VSe₃ chains (grey V); transport axis horizontal | rendered from `VSe3-Hf2Se9/03-calc/11-hetero60-transport/N25_k100/0bias/struct.xsf` (z = molecule-center ±13 Å crop, rotated horizontal) |

**2026-07-29** — the home page now shows the structure through the interactive matviz viewer
(`../matviz-viewer_junction.html`, built from the same `N25_k100/0bias/struct.xsf` by
`project-site/scripts/structure_to_matviz_viewer.py`). `junction-structure.png` is kept as an
archived render but is **no longer embedded** (site rule: structure = viewer alone, no duplicate
static PNG of the same structure).
