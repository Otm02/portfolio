---
title: ML pipelines and evaluation over 600K+ materials
cardTitle: ML pipelines over 600K+ materials
context: Chemia Discovery · Machine Learning Intern · Feb – Aug 2026
summary: >-
  Azure ML pipelines that train, evaluate and backfill CGCNN property
  predictions across 600K+ materials, with an evaluation layer and a training
  dashboard.
metric:
  value: 30+ h → < 1 h
  label: pipeline runtime, after parallel S3 fetching and batched API calls
order: 4
confidentiality: >-
  Work under NDA, described at the level of my CV: tools, scale and outcomes.
  No data, code or internal details.
stack: [Azure ML, CGCNN, AWS S3, MongoDB, PostgreSQL, NestJS, React]
experience: chemia-2026
---

## Problem

Chemia predicts a range of materials properties with CGCNN (crystal graph convolutional neural network) models. Models have to be trained and evaluated, and their predictions backfilled across more than 600,000 materials. A full pipeline run took more than 30 hours.

## Constraints

- **Scale:** 600K+ materials.
- **Stack:** crystal structure files in AWS S3, metadata and properties in MongoDB, compute on Azure ML.

## What I built

- **Azure ML pipelines** for training, evaluation and automated backfill inference of CGCNN property models.
- **Faster I/O:** parallel S3 fetching and batched API calls.
- **An evaluation layer:** held-out benchmarks, a model card for every deployed model, and data-provenance scoring.
- **A training dashboard** (React, NestJS, MongoDB, PostgreSQL) with model comparison, space-group filtering and real-time per-step job monitoring.

## Results

- **Pipeline runtime from 30+ hours to under 1 hour.**
- Automated backfill inference across 600K+ materials.
- A model card for every deployed model.

## What went wrong and how I fixed it

A full run took more than 30 hours. Parallel S3 fetching and batched API calls brought it under 1 hour.

## What I'd do next

- Track held-out benchmark scores per model version, so regressions show up before deployment.
- Report an uncertainty estimate with each prediction.
