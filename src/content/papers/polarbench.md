---
title: 'PolarBench: Multi-View Graph Construction and Benchmarking for Stance Detection in Decentralized Social Networks'
date: 2026-04
summary: >-
  A stance-detection benchmark over three datasets (PolitiSky24,
  Fediverse-Gaza, Climate-COP28) with typed Endorse, Conflict and Semantic graph
  views, and an audit of LLM annotators against a human gold standard.
keyResult: >-
  GCN on the Endorse view reaches Macro-F1 0.44, against a 0.177
  majority-class baseline and a 0.54 inter-annotator ceiling.
contribution: Labeled and curated the gold-standard data and reviewed the final paper.
links:
  pdf: /papers/polarbench.pdf
  openreview: https://openreview.net/forum?id=ixkYOznS9T
tags: [ML]
inProjects: false
---

Political discourse is migrating from centralized platforms to decentralized protocols whose heterogeneous interaction primitives expose structural gaps that existing stance-detection pipelines were not designed to address. We present PolarBench, a benchmark spanning three datasets (PolitiSky24, Fediverse-Gaza, Climate-COP28) that decomposes user interactions into three semantically typed graph views—Endorse, Conflict, Semantic—paired with a four-class taxonomy isolating Bipartisan Rejection under severe imbalance. On PolitiSky24, GCN on the Endorse view reaches Macro-F1=0.44, well above the majority-class baseline (0.177) and approaching the inter-annotator ceiling (0.54). A polarization audit shows DSP collapsing to a real-to-null ratio of 1.03 while RWC retains 7.69 on the same partition, revealing a PPR saturation regime under imbalance. A gold-standard LLM audit further shows ChatGPT 5.2 emitting zero Bipartisan Rejection predictions (F1=0.00) while Claude Sonnet 4.6 ET reaches BR F1=0.62, with inter-model unanimous agreement at 15.5% against a ∼20.1% random baseline.
