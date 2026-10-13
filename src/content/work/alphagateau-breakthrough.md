---
title: Does a graph encoder help self-play? AlphaGateau for Breakthrough
cardTitle: AlphaGateau for Breakthrough
context: McGill, team of 3 · May 2026
summary: >-
  AlphaZero-style agents in JAX on Breakthrough, comparing a graph-attention
  encoder with a CNN and testing whether 5×5 pretraining transfers to 8×8.
metric:
  value: 17% → 67%
  label: GNN win rate at iteration 5 after 5×5 pretraining (12-game greedy evaluation)
order: 6
stack: [Python, JAX, Flax, Optax, Jraph, mctx, Slurm]
links:
  - label: Code
    href: https://github.com/Otm02/alphagateau-breakthrough-v2
  - label: Paper (PDF)
    href: /papers/alphagateau-breakthrough.pdf
paper: alphagateau-breakthrough
related: [vjepa2-energy]
---

## Problem

AlphaGateau replaces AlphaZero's convolutional encoder with a graph neural network. A graph encoder doesn't depend on board size, so in principle an agent could pretrain on a small board and transfer to the full one. We tested both ideas on Breakthrough, a pawn-only 8×8 game with about 1.5 × 10¹⁶ states: does the graph encoder beat a CNN, and does 5×5 pretraining help on 8×8?

## Constraints

- **One GPU per run** on a shared Slurm cluster. The standard budget was 40 training iterations of 64 self-play games, with 32 MCTS simulations per move.
- **Small evaluations.** Each checkpoint plays 12 games against a greedy evaluator, so one game moves the win rate by 8.3 points. The numbers show trends, not precise rates.
- **A fair comparison.** Both encoders use hidden size 64 and 4 residual layers.

## What I built

- **The Breakthrough environment in JAX:** board, observation tensor, legal-action mask, side to move and rewards. Actions are encoded as from-square × 3 + move type, and the board is canonicalized so the side to move always advances upward, which keeps the interfaces independent of board size.
- **The self-play training pipeline** with Gumbel MCTS (mctx), and the Slurm orchestration that ran it.
- **The CNN baseline**, which I trained, and **the head-to-head matches** between final checkpoints.

Teammates ran the transfer experiments, the cosine-decay variants and a TD(λ) baseline.

## Results

- The CNN reached a **100% greedy-evaluation win rate by iteration 40**. The GNN trained from scratch peaked at 67% (iteration 20) and finished near **42%**.
- **5×5 pretraining lifted the GNN's 8×8 win rate at iteration 5 from 17% to 67%.** Applied zero-shot to 8×8, the 5×5 policy won only 17%.
- Head-to-head over 12 games, the CNN beat the scratch GNN 10–2 and **the best GNN 7–5**.

## What went wrong and how I fixed it

The GNN didn't converge under our budget: its policy loss stalled and its win rate oscillated after iteration 15. We didn't fix that. We reported it as a negative result: on a regular grid, convolutions share weights across positions and capture Breakthrough's local, directional patterns cheaply, while attention pooling and edge features add optimization burden. Transfer narrowed the gap without closing it: head-to-head, from 2–10 to 5–7.

## What I'd do next

- Extend the fine-tuning budget, since the transfer benefit was largest early.
- Play more evaluation games per checkpoint to shrink the noise.
- Ablate the GNN: simplify attention pooling and edge features to find what slows training.
