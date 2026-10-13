---
title: Optimizing Global River Flood Forecasting via Meta-Modeling
date: 2025-12
summary: >-
  A meta-model that predicts when fine-tuning a global LSTM flood model pays off
  for a river basin: Caravan dataset, 217 features, 159 fine-tuned basins, and
  region-based splits to avoid spatial leakage.
keyResult: >-
  Basin attributes were weak predictors of fine-tuning gain: the global model's
  own performance was the first feature selected on every split, and test R²
  was negative on 3 of 5 splits.
contribution: Equal contributor in a team of three, across every part of the project.
abstractLabel: Summary
links:
  pdf: /papers/flood-meta-modeling.pdf
  code: https://github.com/Farooq-azam-khan/comp-685-final-project
tags: [ML]
inProjects: true
---

A global LSTM flood-forecasting model can be fine-tuned on local data, but fine-tuning is expensive and mostly helps a tail of poorly served basins. We trained a linear-regression meta-model that predicts the fine-tuning gain for a basin from its Caravan attributes (217 features from HydroATLAS and ERA5-Land) across the 159 basins that had been fine-tuned. To avoid spatial leakage we split train and test by region, and with more features than basins we used forward feature selection. The global model's own performance was the first feature selected on every split. Test R² ranged from 0.76 (South America vs. the rest of the world) to −1.37 (UK vs. the rest of the world) and was negative on 3 of 5 splits. With this data, basin attributes are weak predictors of when fine-tuning pays off; a larger set of fine-tuned basins is the main requirement for a useful meta-model.
