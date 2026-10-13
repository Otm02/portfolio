---
title: A self-learning line-speed advisory for a potato processing line
cardTitle: Self-learning line-speed advisory
context: Russet House (food processing) · Software Developer, part-time · [CONFIRM dates]
summary: >-
  Recommends a line speed to operators from live SCADA data, learns online with
  recursive least squares, and takes operator feedback through a chat
  interface.
metric:
  value: '[CONFIRM: metric]'
  label: '[CONFIRM a number: e.g. shifts in use, update interval, recommendation acceptance rate]'
order: 3
confidentiality: >-
  Internal company system, described in general terms. No names, screenshots,
  data or code.
stack: [Ignition SCADA (Jython), SQL Server, Recursive least squares, EWMA]
experience: russet-software-developer
related: [llm-agents-food-plant]
---

## Problem

On the potato processing line, operators set the line speed during each shift. [CONFIRM: what the speed trades off, e.g. throughput against product quality, yield or downtime, and how operators chose it before.] The goal was a recommendation that adapts as conditions change, built only from data the SCADA system already records.

## Constraints

- **Inside the existing SCADA.** The advisory runs in Ignition SCADA (Jython scripting) on live data logged to SQL Server. [CONFIRM: Ignition's Jython has no NumPy, so the estimator is plain Python. Is that right?]
- **Operators decide.** The system advises; the operator sets the speed.
- **Conditions drift.** [CONFIRM: what drifts, e.g. raw-potato batches, season, equipment wear.] A model fitted once would go stale, so it learns online.

## What I built

- **An online model.** Recursive least squares updates a linear model of [CONFIRM: inputs → target] with every new reading.
- **Operating bands.** EWMA percentile bands track the recent distribution of [CONFIRM: which signals] and define what normal looks like right now.
- **Operator feedback.** Operators use the advisory during shifts through a chat interface. [CONFIRM: what feedback they give and how it changes the next recommendation.]
- **One aggregated recommendation** for the one speed operators can actually control (see below).

## Results

- Operators use it during shifts. [CONFIRM: any number you can share.]

## What went wrong and how I fixed it

The first version recommended several input speeds. [CONFIRM: how many.] Once we found that only one input speed was controllable, I rebuilt the system around one aggregated recommendation for that speed. [CONFIRM: why the others were not controllable, e.g. set by upstream equipment.]

## What I'd do next

[CONFIRM or replace. Proposals: log each recommendation next to the speed the operator chose and the outcome, to measure whether following the advice helps; alert when the online model's error drifts.]
