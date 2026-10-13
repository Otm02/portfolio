---
title: "Quantifying Temporal Change in Sentiment Analysis: A Study on the Amazon Reviews'23 Dataset"
date: 2025-03
summary: How the age of training data affects sentiment-model performance on Amazon reviews.
contribution: Implemented data extraction, training and fine-tuning.
links:
  paper: https://github.com/Otm02/temporal-sentiment-amazon23/blob/main/sentiment-analysis-temporal-paper.pdf
  code: https://github.com/Otm02/temporal-sentiment-amazon23
tags: [ML]
inProjects: true
---

This paper investigates the impact of the temporality of data on the performance and generalization of sentiment analysis models trained on review data from different time periods. Using a large dataset of movie and TV show reviews labeled as positive or negative, we partition the data into 3 distinct scales: individual months, individual years and multi-year groups. We fine-tune separate DistilBERT models for each time period using a binary sentiment classification task and evaluate their performance through cross-period testing, examining how temporal gaps between training and testing data affect model accuracy. Performance is measured using accuracy. Our experiment aims to pinpoint the specific duration of the gap that leads to noticeable performance degradation. Our results show how model performance degrades when applied to out-of-period data, highlighting the evolving nature of sentiment language and the importance of temporal alignment in training and testing data for robust sentiment analysis models. This study offers a more nuanced understanding of how linguistic and contextual changes impact model generalizability over time.
