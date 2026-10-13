---
title: 'AlphaGateau for Breakthrough: A piece of cake?'
date: 2026-05
summary: AlphaZero-style self-play in JAX, comparing a graph-attention encoder with a CNN on Breakthrough.
keyResult: >-
  The CNN reaches a 100% greedy-evaluation win rate by iteration 40 while the
  GNN plateaus near 42%. 5×5 pretraining lifts early 8×8 performance from 17%
  to 67% at iteration 5. The CNN beats the best GNN 7–5 head-to-head
  (12-game evaluations).
contribution: >-
  Built the JAX Breakthrough environment, the self-play training pipeline and
  Slurm orchestration; trained the CNN; ran the head-to-head matches.
links:
  pdf: /papers/alphagateau-breakthrough.pdf
  code: https://github.com/Otm02/alphagateau-breakthrough-v2
tags: [RL, ML]
inProjects: true
caseStudy: alphagateau-breakthrough
---

We study whether a board-size-invariant graph encoder improves self-play learning and cross-board transfer in Breakthrough. Using an AlphaZero-style training loop, we compare a graph neural network (GNN) with a convolutional neural network (CNN) on 8×8 play and in 5×5→8×8 transfer. Under our training budget, the CNN reaches a 100% greedy-evaluation win rate by iteration 40, while the GNN plateaus near 42%. Pretraining on 5×5 improves early 8×8 performance from 17% to 67% at iteration 5, but does not remove the CNN's long-run advantage. In a direct 12-game match, the CNN defeats the best GNN 7 games to 5.
