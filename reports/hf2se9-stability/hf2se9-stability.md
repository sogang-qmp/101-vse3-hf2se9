# Hf₂Se₉ 안정성 체계적 검토 계획

## 목표

Hf₂Se₉ molecule relaxation이 안정적으로 수렴하는 DFT 설정을 찾는다.
네 가지 축(exchange, basis, DFT+U, CNT)을 독립적으로 검토하여 실패 원인을 분리한다.

## 판단 기준

- **Hf-Hf 거리**: 초기 3.62 Å → relaxation 후 3.5~3.8 Å 범위 유지 여부
- **수렴**: force < 0.01 eV/Å 달성 여부
- **구조 유지**: vdW gap 붕괴(Hf-Hf < 3.0) 또는 분해(Hf-Hf > 5.0) 없는지

## 테스트 시스템

**Hf₂Se₉ molecule** (11 atoms, 25 Å cubic, Gamma only) — 가장 가벼움, 빠른 스캔 가능.
molecule에서 안정적인 설정을 찾은 후 chain → 이종접합으로 확장.

---

## Axis 1: Exchange-Correlation Functional + vdW

Basis는 기본값, U=0, CNT 없음으로 고정.

| # | Functional | vdW | 코드 | 목적 |
|---|-----------|-----|------|------|
| A1 | PBE | 없음 | SIESTA | baseline — vdW 없이 구조 유지되는지 |
| A2 | PBE + vdW-DF2 | 내장 | SIESTA | 현재 접근 — 비경험적 vdW |
| A3 | PBE + D3(BJ) | libdftd3 | SIESTA | D2 대안 — CN 의존 C6 |
| A4 | PBE + D3(BJ) | 내장 | VASP | plane-wave 참조값 (SIESTA 비교용) |
| A5 | HSE06 + D3(BJ) | 내장 | VASP | hybrid functional — exchange 효과 분리 |

**핵심 비교**:
- A1 vs A2: vdW 보정이 필요한가?
- A2 vs A3: vdW-DF2와 D3(BJ) 중 어느 쪽이 안정적인가?
- A2 vs A4: SIESTA vs VASP — 같은 PBE+vdW인데 결과가 다르면 basis 문제
- A4 vs A5: PBE vs HSE — exchange가 문제인지 확인

## Axis 2: Basis Set (SIESTA only)

Functional은 Axis 1 최적으로 고정, U=0, CNT 없음.

| # | EnergyShift | Basis 크기 | 목적 |
|---|------------|-----------|------|
| B1 | 10 meV | 매우 큼 | 이전 실패 설정 — 재현 확인 |
| B2 | 30 meV | 큼 | 중간 |
| B3 | 50 meV | 보통 | 이전 "안정" 설정 |
| B4 | 100 meV | 작음 | 빠른 수렴 |
| B5 | 200 meV | 최소 | 극단적 — BSSE 영향 확인 |

**핵심 비교**:
- B1~B5 수렴 트렌드: Hf-Hf 거리가 basis 크기에 따라 단조롭게 변하는지
- B1(팽창), B3(안정) 재현 여부
- 수렴점: 어느 EnergyShift에서 결과가 안정화되는지

## Axis 3: DFT+U (Hubbard correction)

Functional + basis는 Axis 1, 2 최적으로 고정, CNT 없음.

Hf의 5d 전자는 강상관 효과를 가질 수 있으며, PBE가 d-electron localization을 제대로 기술하지 못할 가능성이 있다. 이전에 DFT+U를 시도한 적 있으나(archive `003_Hf2Se9_DFT+U`) 체계적이지 않았음.

| # | U (eV) | 적용 orbital | 목적 |
|---|--------|-------------|------|
| D1 | 0 | — | baseline (= Axis 1,2 최적) |
| D2 | 1 | Hf 5d | 약한 보정 |
| D3 | 3 | Hf 5d | 중간 보정 |
| D4 | 5 | Hf 5d | 강한 보정 (이전 시도값) |
| D5 | 7 | Hf 5d | 과보정 — 경향 확인 |
| D6 | 3 | Se 4p | Se에도 U가 필요한지 |

**핵심 비교**:
- D1~D5: U 증가에 따른 Hf-Hf 거리 트렌드
- U가 vdW gap 안정화에 기여하는지 (d-electron localization → bonding 변화)
- D5 vs D6: Hf-d vs Se-p 중 어디에 U가 더 효과적인지
- 밴드갭 변화: U에 따라 금속/반도체 전이 여부

## Axis 4: CNT 역할

Functional + basis + U는 Axis 1~3 최적으로 고정.

| # | 시스템 | 방법 | 목적 |
|---|--------|------|------|
| C1 | Hf₂Se₉ molecule (isolated) | Relaxation | baseline |
| C2 | Hf₂Se₉ molecule in CNT | Relaxation | CNT가 구조를 안정화하는지 |
| C3 | Hf₂Se₉ molecule in CNT | MD (300K) | 열적 안정성 — local minimum 탈출 |
| C4 | Hf₂Se₉ chain (isolated) | Relaxation | chain 형성 시 안정성 변화 |
| C5 | Hf₂Se₉ chain in CNT | Relaxation | 실험 조건에 가장 가까움 |

**핵심 비교**:
- C1 vs C2: CNT confinement 효과
- C2 vs C3: 0K relaxation vs finite-T MD
- C1 vs C4: molecule → chain 시 안정성 변화

---

## 실행 순서

```
Phase A: Exchange scan (A1~A3 동시, + A4 VASP 비교)
  → 최적 functional 확정
  ↓
Phase B: Basis scan (B1~B5 동시)
  → 최적 EnergyShift 확정
  ↓
Phase D: DFT+U scan (D1~D5 동시)
  → U 필요 여부 + 최적값 확정
  ↓
Phase C: CNT 테스트 (C1~C5)
  → CNT 역할 결론
```

Phase A~D는 molecule(11 atoms, Gamma)이므로 빠르게 스캔 가능.
각 Phase 내 테스트는 독립적이므로 동시 제출 가능.

## 결과 정리 테이블 (계산 후 채울 것)

| Test | Functional | Basis | U (eV) | CNT | Hf-Hf (Å) | 수렴 | 비고 |
|------|-----------|-------|--------|-----|-----------|------|------|
| A1 | PBE | 기본 | 0 | X | — | — | |
| A2 | vdW-DF2 | 기본 | 0 | X | — | — | 현재 제출 |
| A3 | PBE+D3 | 기본 | 0 | X | — | — | |
| A4 | PBE+D3 (VASP) | PAW | 0 | X | — | — | |
| A5 | HSE+D3 (VASP) | PAW | 0 | X | — | — | |
| B1 | (best) | 10meV | 0 | X | — | — | |
| B2 | (best) | 30meV | 0 | X | — | — | |
| B3 | (best) | 50meV | 0 | X | — | — | |
| B4 | (best) | 100meV | 0 | X | — | — | |
| B5 | (best) | 200meV | 0 | X | — | — | |
| D1 | (best) | (best) | 0 | X | — | — | |
| D2 | (best) | (best) | 1 | X | — | — | |
| D3 | (best) | (best) | 3 | X | — | — | |
| D4 | (best) | (best) | 5 | X | — | — | |
| D5 | (best) | (best) | 7 | X | — | — | |
| D6 | (best) | (best) | 3(Se) | X | — | — | |
| C1 | (best) | (best) | (best) | X | — | — | |
| C2 | (best) | (best) | (best) | O | — | — | |
| C3 | (best) | (best) | (best) | O+MD | — | — | |
