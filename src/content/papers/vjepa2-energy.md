---
title: Energy Characterization of V-JEPA2 on the SOCS Teaching Cluster
date: 2026-04
summary: Where the training energy of a ViT-Huge video Transformer goes on one GPU, phase by phase.
keyResult: >-
  GPU-centric but not GPU-saturating. Batch size 1 → 2 gives +42.4% throughput
  and −26.8% GPU energy per 1,000 samples.
contribution: >-
  Sole author: designed the 18-run measurement matrix, built the
  CUDA-synchronized phase profiler and 500 ms telemetry, and ran the analysis.
links:
  pdf: /papers/vjepa2-energy.pdf
  code: https://github.com/Otm02/vjepa2-energy-char
tags: [ML, Systems]
inProjects: true
caseStudy: vjepa2-energy
---

This report studies the energy behavior of the V-JEPA2 training workload on the SOCS teaching cluster. The required experiment matrix contains 18 runs: three measurement modes, two physically feasible batch sizes, and three repetitions per configuration, each capped at five minutes. The measurements combine a true baseline, coarse end-to-end GPU energy via CodeCarbon, and fine-grained per-phase timing with 500 ms system timelines. The main result is that V-JEPA2 is strongly GPU-centric but not fully GPU-saturating: forward and backward phases dominate step time, the GPU repeatedly operates below 95% utilization while still drawing high power, and increasing the physical batch size from 1 to 2 improves processed-sample throughput by 42.4% while reducing GPU energy per 1000 processed samples by 26.8%.
