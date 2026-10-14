---
title: LLM agents in daily use at a food plant
cardTitle: LLM agents in production at a food plant
context: Russet House (food processing) · Software Developer, part-time · Jan 2026 – present
summary: >-
  Five LLM agents plant staff use every day: three for sales reporting over ERP
  data, a maintenance-document assistant over SharePoint, and a meetings agent
  over Teams.
metric:
  value: 5 agents
  label: in daily use across sales, maintenance and meetings, built since January 2026
order: 2
confidentiality: >-
  Internal company system, described in general terms. No names, usage numbers,
  screenshots, data or code.
stack: [Copilot Studio, Power Platform AI Hub, Power Automate, SQL Server, SharePoint, Teams, Microsoft Graph]
experience: russet-software-developer
related: [line-speed-advisory]
---

## Problem

Two everyday questions were slow to answer. Finding the right maintenance document meant searching SharePoint by hand among thousands of documents. Sales questions meant reading summaries in Power BI and pulling data from the ERP, with no reliable way to aggregate it exactly as asked.

## Constraints

- **Inside the company's Microsoft stack.** Agents are built in Copilot Studio. Automations in Power Platform's AI Hub prompt the agents alongside Power Automate flows.
- **Company data.** The agents work over the ERP's data in SQL Server and over SharePoint and Teams.
- **Daily use.** Staff rely on the agents every day.

## What I built

- **Sales reporting as a team of agents.** A sales agent orchestrates two query agents: a broad one for overall figures and a narrow one for specifics. Both work through a large set of SQL Server stored procedures over the ERP's data.
- **A maintenance-document assistant** that searches the plant's maintenance documents in SharePoint and answers from them.
- **A meetings agent** that answers questions about meetings and their action items.

<!-- diagram: sales-agents | The sales agent routes each question to a broad or a narrow query agent. Both work through stored procedures over the ERP's data. -->

## Results

All five agents are in daily use. I don't publish usage numbers for internal systems.

## What went wrong and how I fixed it

I root-caused and fixed the agents' production failures myself, from permission errors to a data-corruption bug.

## What I'd do next

- Keep a fixed set of real questions with known answers, and re-run it whenever a stored procedure or prompt changes.
- Log each agent's tool calls, so the next production issue is faster to trace.
