---
title: A self-learning line-speed advisory for a potato processing line
cardTitle: Self-learning line-speed advisory
context: Russet House (food processing) · Software Developer, part-time · Jun 2026 – present
summary: >-
  Proposes a line speed to operators from live SCADA data, learns online with
  recursive least squares, and takes their feedback through a chat interface.
metric:
  value: 1 recommendation
  label: for the one input speed operators control; they accept, modify or refuse it
order: 3
confidentiality: >-
  Internal company system, described in general terms. No names, numbers,
  screenshots, data or code.
stack: [Ignition SCADA (Jython), SQL Server, Recursive least squares, EWMA]
experience: russet-software-developer
related: [llm-agents-food-plant]
---

## Problem

Operators set the speed of the potato processing line during each shift. The goal was a speed proposal that adapts as conditions change, built only from data the SCADA system already records.

## Constraints

- **Inside the existing SCADA.** The advisory runs in Ignition SCADA on live data logged to SQL Server. Ignition scripts run on Jython, which has no NumPy, so the estimator is written in plain Python.
- **Operators decide.** The system proposes; the operator sets the speed.
- **Conditions change,** so a model fitted once would go stale. It learns online instead.

## What I built

- **Online learning.** Recursive least squares updates the model with every new reading.
- **Operating bands.** EWMA percentile bands track what recent normal operation looks like.
- **Operator feedback** through a chat interface: operators accept, modify or refuse each proposal, and that feedback flows back into the system.
- **One aggregated recommendation** for the one input speed operators can control.

## Results

Operators use it during shifts. I don't publish operating numbers for internal systems.

## What went wrong and how I fixed it

The first design recommended several input speeds. Once we found that only one of them was controllable, I rebuilt the system around one aggregated recommendation for that speed.

## What I'd do next

- Log each proposal next to the operator's response and the outcome, to measure whether following the advice helps.
- Alert when the online model's error drifts, before operators notice worse proposals.
