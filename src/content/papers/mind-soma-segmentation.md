---
title: A Platform for the Semi-automatic Segmentation, Characteristic Shape Analysis and Simulation of Neuronal Somas
date: 2024-09
dateLabel: Sep 2024 – present
ongoing: true
summary: A Vaa3D platform to segment, model and simulate neuronal somas in 3D light-sheet brain images.
contribution: >-
  Built the soma segmentation module (segmentation modes, thresholding, median
  filtering, marker constraints) and, since the capstone, a Dice-based
  evaluation against hand-labelled gold standards.
links:
  pdf: /papers/mind-soma-segmentation.pdf
  code: https://github.com/ImagiNeuron
tags: [ML, Systems]
inProjects: true
caseStudy: soma-segmentation
---

Segmenting neuronal somas in 3D brain images through techniques such as tissue clearing and Light Sheet Fluorescence Microscopy promises to advance our understanding of healthy brains and the pathophysiological roots of neurological diseases, but it is costly and time-consuming. Automating the segmentation through deep neural networks shows promise but requires labeled ground-truth data that is labor-intensive and expensive to obtain. This work provides a platform within the open-source 3D medical image analysis software Vaa3D to quickly and precisely label and automatically segment neuronal somas. The binary segmented image is generated using a region-growing algorithm on somas that have been marked and bounded by a sphere around their center of mass, guided by a local Otsu threshold that can be manually overridden. The platform further supports principal component analysis of the segmented somas, allowing them to be rotated about their center of mass and aligned and for their characteristic shape to be captured in a probabilistic model. Finally, the platform supports the simulation of ground truth data, allowing segmented somas to be reoriented and repositioned according to probabilistic data, generating synthetic ground truth data that can be used to train deep neural networks. The platform's source code is released along with this paper, allowing future work to build on its initial architecture: https://github.com/orgs/ImagiNeuron/repositories
