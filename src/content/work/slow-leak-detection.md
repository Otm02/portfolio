---
title: Slow-leak detection for high-voltage circuit breakers
cardTitle: Slow-leak detection for high-voltage breakers
context: Hydro-Québec Research Institute (IREQ) · Machine Learning Research Intern · May – Sep 2026
summary: >-
  A detector for slow SF₆ loss in 145–315 kV circuit breakers, with an
  evaluation protocol built for overlapping time-series windows. Not certified
  for operational use.
metric:
  value: 0.867 vs 0.733
  label: sensitivity vs the physical baseline on synthetic leaks, at an equal false-event budget; the gain is conditional
order: 1
confidentiality: >-
  Industrial research project. No code, data or report figures appear here;
  the diagrams are schematic.
stack: [Python, scikit-learn, PyTorch, NumPy, pandas, SciPy, Git]
experience: ireq-2026
---

## Problem

Circuit breakers rated 145–315 kV are filled with SF₆, a gas that insulates the contacts and quenches the arc when the breaker interrupts a fault. A slow leak has to be inferred from quarter-hourly pressure and temperature records.

The difficulty is scale. Pressure moves about 40 mbar per °C, while a 1%/year leak removes only about 0.27 mbar per day. Could a learned detector find that signal better than physical rules: a temperature-corrected pressure baseline and temperature-slice methods?

<!-- diagram: signal-scale | Schematic, not measured data: thermal swings of ~40 mbar/°C next to the ~0.27 mbar/day slope of a 1%/year leak. -->

## Constraints

- **One known leaking device.** Positive examples are synthetic: known declines injected into healthy records, with physically unvalidated fidelity.
- **Overlapping windows.** Consecutive 30-day windows share 29 days, so a random split puts near-copies on both sides and makes false alarms look rarer than they are.
- **Alarms cost dispatches.** What matters is false events per device-year at a fixed budget, not accuracy.

## What I built

An evaluation protocol designed for overlapping windows, and a detector selected under it:

- **Segment-grouped splits:** windows are grouped by continuous measurement segment, so no test window shares days with a training window.
- **An invariance screen** keeping 34 of 93 features stable across healthy time blocks.
- **Thresholds from healthy data only,** with exact Poisson upper bounds and a multiplicity correction.
- **A 7-day persistence rule** before an alarm is confirmed.
- **Dispatches, not episodes:** an alarm that never clears is one episode but keeps sending crews.

I compared an L1-regularized logistic regression (scikit-learn) with the physical baseline, temperature-slice methods and a temporal convolutional network (PyTorch), over multiple seeds on a cluster scheduler. The selected model was delivered as a frozen, integrity-checked package with reproducible configurations.

<!-- diagram: overlapping-windows | Consecutive 30-day windows share 29 days. A random split puts near-copies on both sides; grouping by continuous measurement segment keeps each segment's windows on one side. -->

<!-- diagram: detector-pipeline | The selected detector, from features to a dispatch. Every threshold comes from healthy data only. -->

## Results

- **Sensitivity 0.867 vs 0.733** for the physical baseline, at an equal synthetic false-event budget.
- **The gain is conditional:** below 1% loss per year, the physical baseline was stronger.
- **3.41 false events per device-year** over 429 healthy device-days (exact 95% upper bound: 11.35).
- **All 4 segments** of the one known leaking device confirmed, after 6, 16, 6 and 6 days.

The model is not certified for operational use.

## What went wrong and how I fixed it

- **Features that recognized the device, not the leak.** 44 of 93 features shifted by more than one standard deviation between two healthy devices. I excluded device-identity features, and the invariance screen keeps only features that stay stable across healthy time blocks.
- **A sequence model that looked blind.** At a frozen threshold, the TCN seemed to miss the leaking device; a threshold sweep showed it confirmed all 4 segments at the common budget. That was a calibration problem, not a transfer problem, so I compare models at an equal false-event budget.
- **Too much capacity.** The TCN had 224,642 parameters for 1,477 training sequences and lost 0.063 AUC from simulation to field. I selected the regularized linear model.

## What I'd do next

- Have specialists validate the leak-injection physics; every sensitivity number depends on it.
- Add devices: with one leaking device, a leak and a device's identity are hard to separate.
- Collect more healthy device-days to tighten the 11.35 upper bound, then run a prospective evaluation before any operational use.
