---
title: Where a video Transformer's training energy goes
cardTitle: Energy profile of V-JEPA2 training
context: Sole author · April 2026 · McGill SOCS teaching cluster
summary: >-
  Per-phase time and GPU energy for V-JEPA2 vit_huge training on one RTX 5000
  Ada: GPU-centric but not GPU-saturating.
metric:
  value: +42.4% / −26.8%
  label: throughput / GPU energy per 1,000 samples, batch size 1 → 2
order: 7
featured: false
stack: [Python, PyTorch, CUDA, NVML, CodeCarbon, psutil, Slurm]
links:
  - label: Code
    href: https://github.com/Otm02/vjepa2-energy-char
  - label: Paper (PDF)
    href: /papers/vjepa2-energy.pdf
paper: vjepa2-energy
related: [alphagateau-breakthrough]
---

## Problem

How much energy does a training step of a large video model use, where does it go, and what can be changed cheaply? The workload is V-JEPA2, a self-supervised video Transformer, in its reference vit_huge configuration: 16-frame clips, 224 × 224 crops, bfloat16.

## Constraints

- **One GPU:** an NVIDIA RTX 5000 Ada with 32 GB, 4 CPU cores and a 4 GB RAM allocation under Slurm.
- **Two batch sizes.** On the 32 GB GPU, only two power-of-two batch sizes fit: 1 and 2 (peak GPU memory 17.7 GB → 27.7 GB). I didn't fake a third point with gradient accumulation, because that changes what a step is.
- **A fixed matrix.** 3 measurement modes × 2 batch sizes × 3 repetitions = 18 runs of 5 minutes each.
- **Coarse sensors.** NVML and CodeCarbon sample every 500 ms, too coarse to measure energy for sub-millisecond phases directly.

## What I built

- **Three measurement modes:** an uninstrumented baseline, CodeCarbon end-to-end GPU energy, and a fine-grained mode with CUDA-synchronized timing of each phase (forward, backward, optimizer step, EMA update) plus 500 ms telemetry of GPU utilization, memory and power.
- **A V-JEPA2 trainer with explicit phase boundaries,** and a FakeVideo data adapter that still runs real video decoding and masking.
- **Scripts that regenerate every figure** from the raw CSVs.
- **A per-phase energy estimate** that splits measured GPU energy in proportion to phase time, labelled as an estimate.

## Results

- **Overhead stayed within 1.5%** of the baseline, and fine-grained energy was within 3.4–5.5% of CodeCarbon.
- **Forward and backward dominate.** At batch size 1: 166 ms forward, 137 ms backward, 139 ms optimizer step, 27 ms EMA update.
- **Busy but not saturated.** Mean GPU utilization was 87.75% at batch size 1 and 88.49% at batch size 2; about 70% of 500 ms samples were below 95%, while power stayed at 190–200 W.
- **Batch size 1 → 2:** throughput from 1.922 to 2.737 samples/s (**+42.4%**), GPU energy per 1,000 samples from 0.0256 to 0.0187 kWh (**−26.8%**).
- An extra 8-run validation sweep reproduced the CodeCarbon wall-clock means within 0.24 s and the fine-grained GPU-energy means within 0.0002 kWh.

## What went wrong and how I fixed it

- **Timing GPU work from the CPU measures kernel launches, not execution.** I synchronize CUDA before and after each phase.
- **Early steps are slow** while the allocator and caches warm up. I excluded exactly one warm-up step from the phase averages.
- **Scope creep.** I started a data-loader worker sweep, then dropped it: it widened the integration surface without changing the conclusions, so the report leaves it out.

## What I'd do next

- Target forward and backward, where the energy goes: activation checkpointing or pruning the predictor.
- Measure larger effective batches with gradient accumulation, reported separately because the step changes.
- Revisit multi-worker data loading to overlap decoding with GPU work.
