---
title: 3D neuron soma segmentation for light-sheet microscopy
cardTitle: 3D neuron soma segmentation platform
context: McGill capstone, team of 4 · Sep 2024 – present (research ongoing)
summary: >-
  An open-source Vaa3D plugin that turns one marker per soma into a 3D
  segmentation, a shape model and synthetic training data. I built the
  segmentation module and its evaluation.
metric:
  value: 1 marker
  label: per soma (center and radius) to get its full 3D binary mask
order: 5
stack: [C++, Vaa3D, TeraFly]
links:
  - label: Code
    href: https://github.com/ImagiNeuron
  - label: Paper (PDF)
    href: /papers/mind-soma-segmentation.pdf
paper: mind-soma-segmentation
---

## Problem

Deep networks can segment neuronal somas in 3D brain images, but they need voxel-level ground truth: slow to label, and rarely released, especially for light-sheet (LSFM) images of cleared rat brains. Our capstone team built MIND, an open-source plugin for the Vaa3D image-analysis platform, to label somas quickly, analyse their shape and simulate extra training data.

## Constraints

- **Terabyte-scale images.** The plugin works with Vaa3D's TeraFly viewer, which streams whole-brain volumes.
- **Anisotropic voxels.** 1.8 × 1.8 × 4.0 µm at 3.6× magnification and 0.71 × 0.71 × 1.0 µm at 9×.
- **Isolated somas only.** A soma must fit in a sphere around its center without overlapping its neighbours. Dense regions are out of scope.
- **No labelled LSFM data** to score against during the capstone, so its evaluation was qualitative.

## What I built

My part was the segmentation module:

- **Three thresholding modes:** iterative thresholding from the reference plugin, global Otsu, and local Otsu computed inside each marker's sphere, which is the default.
- **3D region growing** from each marker's center, constrained to the marker's sphere by default (the marker constraint), with an option to turn it off.
- **A histogram-based 3D median filter** (default window 3) that removes salt-and-pepper noise before segmentation without blurring soma edges.
- **Per-soma override.** Each soma's threshold is saved in its marker; editing it and re-running re-segments only that soma.

Since the capstone, I built a Dice-based evaluation against hand-labelled gold standards. The rest of the platform (PCA shape analysis, the probabilistic shape model and the simulation pipeline) was built by teammates.

## Results

- Local Otsu followed the visible soma boundaries in qualitative inspection.
- Global Otsu under-flooded dim somas and over-flooded bright ones. Iterative thresholding under- or over-flooded depending on its parameters and the soma's shape.
- The platform built a probabilistic shape model from 10 segmented somas and generated synthetic image–label pairs from 10 labelled somas.

## What went wrong and how I fixed it

- **Over-flooding that a heuristic can't see.** Iterative thresholding stops when the segmentation's center of mass drifts. A soma that floods evenly in every direction keeps its center of mass, so the error goes undetected, and odd-shaped somas trip the rule too early. I made local Otsu inside each marker's sphere the default and constrained growth to that sphere.
- **One threshold can't fit every soma.** A global threshold is too generic for somas of different brightness. Per-marker thresholds, with a manual override, handle that.
- **No numbers in the capstone.** Without labelled LSFM data, the capstone could only inspect results visually. I followed up with the Dice-based evaluation against hand-labelled gold standards.

## What I'd do next

- Extend segmentation to dense regions, where somas can't be isolated in a sphere.
- Train deep networks with and without the simulated data, and measure the difference with the Dice evaluation.
