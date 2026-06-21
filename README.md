# mcp-skills - Internet Library of SKILL.md for MCP

> Write once. Load anywhere. The open registry of AI agent skills for Model Context Protocol (MCP) systems.

[![Skills](https://img.shields.io/badge/skills-scaffold-orange)](index.md)
[![Systems](https://img.shields.io/badge/systems-7-purple)](systems/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

## What is a SKILL.md?

A SKILL.md is a structured markdown file that tells an AI agent exactly how to operate a specific tool, domain, or workflow. Instead of re-learning from scratch every session, agents load the right SKILL.md at runtime and operate with expert-level context.

This repository provides the starter registry and system blueprints. Add new skills under `skills/category/skill-name/SKILL.md` and rebuild the index with the included scripts.

Think of it as: man pages, but for AI agents.

Example loads:

- load_skill("stripe-payments") for Stripe workflows
- load_skill("kubernetes-agents") for cluster operations
- load_skill("offensive-osint") for recon workflows

## Quick Start

### Install a skill (npx)

Use npx mcp-skills add stripe-payments, npx mcp-skills add figma-design, or npx mcp-skills add offensive-osint.

### Load from raw URL (any MCP client)

Provide raw URLs such as [stripe-payments](https://raw.githubusercontent.com/meiorz/mcp-skills/main/skills/domains/stripe-payments/SKILL.md) and [kubernetes-agents](https://raw.githubusercontent.com/meiorz/mcp-skills/main/skills/devops/kubernetes-agents/SKILL.md).

### Browse the registry

Fetch [index.json](https://raw.githubusercontent.com/meiorz/mcp-skills/main/index.json) and inspect `.skills[].name`.

## Skill Categories

- domains/ - 0 skills - SaaS platforms (Stripe, Figma, Mintlify, NotebookLM)
- devops/ - 0 skills - Kubernetes, Linux packaging, Runbook execution
- security/ - 0 skills - OSINT, Penetration testing
- databases/ - 0 skills - PostgreSQL + TimescaleDB
- ai-infrastructure/ - 0 skills - Agent memory, Local-only memory
- media/ - 0 skills - AI video generation, Live streaming
- devices/ - 0 skills - Android phone automation
- tools/ - 0 skills - Web browser access, File editing
- workflows/ - 0 skills - Spec-driven development
- languages/ - 0 skills - Java debugger

## Orchestrated Systems

Pre-built multi-skill systems ready to deploy:

- AutoShip - 14 skills - Zero-touch SaaS launch in 30 min
- RedTeamOS - 12 skills - Autonomous security audit platform
- OrbitQA - 10 skills - 10-agent PR quality team
- LiveBrain - 8 skills - Real-time intelligence aggregation
- ProductionLine - 13 skills - Design-to-App-Store factory
- DataMesh - 9 skills - Autonomous data engineering
- ContentFactory - 11 skills - AI media brand builder

## Repository Structure

```text
mcp-skills/
├── README.md
├── CONTRIBUTING.md
├── SCHEMA.md
├── LICENSE
├── index.json              # machine-readable registry
├── index.md                # human-readable catalog
├── template/               # starter SKILL.md template
├── skills/
│   ├── domains/            # SaaS & web platforms
│   ├── devops/             # infrastructure & CI/CD
│   ├── security/           # pentesting & OSINT
│   ├── databases/          # SQL & NoSQL
│   ├── ai-infrastructure/  # memory & agents
│   ├── media/              # video & streaming
│   ├── devices/            # mobile & IoT
│   ├── tools/              # developer tools
│   ├── workflows/          # processes & methodologies
│   └── languages/          # programming languages
├── systems/                # multi-skill orchestration blueprints
├── scripts/                # validation & index build tools
└── .github/                # CI workflows & issue templates
```

## Add a Skill

See [CONTRIBUTING.md](CONTRIBUTING.md). Open a PR with your SKILL.md following the [SCHEMA.md](SCHEMA.md).

- Clone the repo: `git clone https://github.com/meiorz/mcp-skills`
- Create a folder: `mkdir -p skills/category/skill-name`
- Start from the template: `cp template/SKILL.template.md skills/category/skill-name/SKILL.md`
- Validate locally: `node scripts/validate-skill.js skills/category/skill-name/SKILL.md`
- Open a PR

## Skill Quality Tiers

- Bronze: Passes schema validation
- Silver: Tested by 3+ community members
- Gold: Official source or 100+ real-world uses
- Platinum: Published by the tool's own org (Stripe, Figma, OpenAI, etc.)

## Credits & Seed Sources

This library was seeded from the following public repositories:

- openai/skills - linear, notion, vercel-deploy, netlify-deploy, cloudflare-deploy, playwright, sentry, figma suite, security, speech, pdf, jupyter-notebook
- stripe/ai - stripe-best-practices, stripe-directory, stripe-projects, upgrade-stripe
- figma/mcp-server-guide - figma-use, figma-generate-design, figma-code-connect, figma-swiftui, figma-use-figjam
- elementalsouls/Claude-OSINT - offensive-osint, osint-methodology
- timescale/pg-aiguide - postgresql-timescale
- zakirkun/guardian-cli - penetration-testing
- klawsh/klaw.sh - kubernetes-agents
- pexoai/pexo-skills - ai-video-generation (14 skills)
- gavdalf/total-recall - agent-memory
- qualixar/superlocalmemory - local-memory
- mintlify/docs - mintlify-docs
- eze-is/web-access - web-browser-access
- kengerlwl/phoneMcp - android-phone
- M0Rf30/yap - linux-packaging
- d4n-sec/jdb-mcp - java-debugger
- ckanthony/Chisel - file-editing
- mvilrokx/runegard - runbook-executor
- FahrenheitResearch/hermes-weather-plugin - weather-forecasting
- skaggsxyz/moltstream - live-streaming
- 0SxD/notebooklm-mcp-skill - google-notebooklm

## License

MIT - see [LICENSE](LICENSE). Each skill may carry its own upstream license noted in its frontmatter.
