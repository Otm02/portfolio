---
title: ML pipelines and evaluation over 600K+ materials
cardTitle: ML pipelines over 600K+ materials
context: Chemia Discovery · Machine Learning Intern · Feb – Aug 2026
summary: >-
  Azure ML pipelines that train, evaluate and backfill CGCNN property
  predictions across 600K+ materials, plus the evaluation layer and dashboard
  around them.
metric:
  value: 30+ h → < 1 h
  label: pipeline runtime, after parallel S3 fetching and batched API calls
order: 4
confidentiality: >-
  Internal company system, described in general terms. No data, code or
  screenshots.
stack: [Azure ML, AWS S3, CGCNN, React, NestJS, MongoDB, PostgreSQL]
experience: chemia-2026
---

## Problem

Chemia predicts properties of crystalline materials with CGCNN (crystal graph convolutional neural network) models. Every new or retrained model has to be evaluated and its predictions backfilled across more than 600,000 materials. [CONFIRM: which properties, and who uses the predictions.] A pipeline run took more than 30 hours.

## Constraints

- **Scale.** 600K+ materials per backfill.
- **Data in S3, results through an API.** Inputs are fetched from S3 and predictions are written through an API. [CONFIRM: is that right?]
- **Compute on Azure ML.**
- **Traceability.** Every deployed model needs documented test results and data provenance.

## What I built

- **Azure ML pipelines** for training, evaluation and automated backfill inference of CGCNN property models.
- **Faster I/O.** Parallel S3 fetching and batched API calls.
- **An evaluation layer.** Held-out benchmarks, a model card for every deployed model, and data-provenance scoring.
- **A training dashboard** (React, NestJS, MongoDB, PostgreSQL) with model comparison, space-group filtering and real-time per-step job monitoring.

## Results

- **Pipeline runtime from 30+ hours to under 1 hour.**
- Automated backfill across 600K+ materials.
- A model card for every deployed model. [CONFIRM: how many models or properties.]

## What went wrong and how I fixed it

The 30-hour runtime was the main problem. [CONFIRM: was the bottleneck sequential S3 reads and one API call per material?] Fetching in parallel and batching API calls brought a run under one hour.

[CONFIRM: any other failure worth telling, e.g. a model that looked good on a random split but not on held-out benchmarks.]

## What I'd do next

[CONFIRM or replace. Proposals: add uncertainty estimates to each prediction; track benchmark scores per model version on the dashboard.]
