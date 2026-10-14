---
title: LLM agents in daily use at a food plant
cardTitle: LLM agents in production at a food plant
context: Russet House (food processing) · Software Developer, part-time · Jan 2026 – present
summary: >-
  LLM agents that plant staff use every day to get answers from the company's
  ERP data, SharePoint documents and Teams meetings, built on Copilot Studio.
metric:
  value: Daily use
  label: by plant staff, in production since January 2026
order: 2
confidentiality: >-
  Internal company system, described in general terms. No names, usage numbers,
  screenshots, data or code.
stack: [Copilot Studio, Power Platform AI Hub, Power Automate, SQL Server, SharePoint, Teams, Microsoft Graph]
experience: russet-software-developer
related: [line-speed-advisory]
---

## Problem

Everyday questions were slow to answer. Finding the right document meant searching SharePoint by hand, and questions about sales meant combining Power BI summaries with ERP data, with no reliable way to aggregate it exactly as asked.

## Constraints

- **Inside the company's Microsoft stack.** Agents are built in Copilot Studio. Automations in Power Platform's AI Hub prompt the agents alongside Power Automate flows.
- **Company data.** The agents work over the ERP's data in SQL Server and over SharePoint and Teams.
- **Daily use.** Staff rely on the agents every day.

## What I built

I deployed LLM agents in Copilot Studio that staff question in plain language. The agents connect to:

- **ERP data in SQL Server,** through stored procedures.
- **Documents in SharePoint.**
- **Meetings in Teams.**

Automations built with AI Hub and Power Automate also prompt the agents.

<!-- diagram: agent-integrations | Staff ask in plain language; the agents answer from company data through stored procedures and Microsoft 365. -->

## Results

The agents are in daily use. I don't publish usage numbers for internal systems.

## What went wrong and how I fixed it

I root-caused and fixed the agents' production failures, from Microsoft Graph permission errors to a data-corruption bug.

## What I'd do next

- Keep a fixed set of real questions with known answers, and re-run it whenever a stored procedure or prompt changes.
- Log each agent's tool calls, so the next production issue is faster to trace.
