---
title: LLM agents in daily use at a food plant
cardTitle: LLM agents in production at a food plant
context: Russet House (food processing) · Software Developer, part-time · [CONFIRM start date] – present
summary: >-
  Three LLM agents that plant staff use every day, over ERP, SharePoint and
  Teams data: multi-agent sales reporting, a maintenance-document assistant and
  a meeting follow-up agent.
metric:
  value: 3 agents
  label: in daily use over ERP, SharePoint and Teams data [CONFIRM a stronger number]
order: 2
confidentiality: >-
  Internal company system, described in general terms. No names, screenshots,
  data or code.
stack: [Microsoft Graph, SharePoint, Teams, '[CONFIRM LLM provider / framework]']
experience: russet-software-developer
related: [line-speed-advisory]
---

## Problem

A food-processing plant keeps its sales data in an ERP, its maintenance documents in SharePoint and its meetings in Teams. [CONFIRM: what took people time before. For example: who assembled sales reports and how often; how technicians found the right maintenance document; what happened to meeting action items.] Each agent targets one of those jobs.

## Constraints

- **Real permissions.** The agents read company data through Microsoft Graph, so every call runs under scoped permissions. [CONFIRM: delegated or application permissions?]
- **Daily use.** Staff rely on the agents every day, so a failure is noticed the same day.
- [CONFIRM: any constraint on which LLM provider or where data may go.]

## What I built

- **Multi-agent sales reporting** over ERP data. [CONFIRM: how the work is split between agents, e.g. one queries the ERP, one checks numbers, one writes the report; who receives it and when.]
- **A maintenance-document assistant** over SharePoint. [CONFIRM: how it finds documents (search, embeddings/RAG) and what it returns.]
- **A meeting follow-up agent** over Teams. [CONFIRM: what it produces, e.g. action items, emails, tasks.]

## Results

- All three agents are in daily use. [CONFIRM: any number you can share: daily users, reports per week, hours saved, questions answered.]

## What went wrong and how I fixed it

I root-caused and fixed three production failures:

- **Microsoft Graph permission errors.** [CONFIRM: what triggered them and the fix.]
- **An ID-length overflow.** [CONFIRM: which ID overflowed which field, and the fix.]
- **A data-corruption bug.** [CONFIRM: what was corrupted, the cause, and the fix.]

## What I'd do next

[CONFIRM or replace. Proposals: a fixed set of real questions with expected answers, re-run on every change; logging of each agent's tool calls to speed up the next root cause.]
