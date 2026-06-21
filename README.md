# mcp-skills — Internet Library of SKILL.md for MCP

> Write once. Load anywhere. The open registry of AI agent skills for
> Model Context Protocol (MCP) systems.

[![Skills](https://img.shields.io/badge/skills-26-blue)](index.md)
[![Systems](https://img.shields.io/badge/systems-7-purple)](systems/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

## What is a SKILL.md?

A `SKILL.md` is a structured markdown file that tells an AI agent **exactly how to operate** a specific tool, domain, or workflow. Instead of re-learning from scratch every session, agents load the right `SKILL.md` at runtime and operate with expert-level context.

Think of it as: **man pages, but for AI agents.**

```bash
load_skill("stripe-payments")   # agent now knows Stripe cold
load_skill("kubernetes-agents") # agent now knows kubectl patterns
load_skill("offensive-osint")   # agent now knows 90+ recon modules
```

## Quick Start

### Install a skill (npx)
```bash
npx mcp-skills add stripe-payments
npx mcp-skills add figma-design
npx mcp-skills add offensive-osint
```

### Load from raw URL (any MCP client)
```json
{
  "skills": [
    "https://raw.githubusercontent.com/meiorz/mcp-skills/main/skills/domains/stripe-payments/SKILL.md",
    "https://raw.githubusercontent.com/meiorz/mcp-skills/main/skills/devops/kubernetes-agents/SKILL.md"
  ]
}
```

### Browse the registry
```bash
curl https://raw.githubusercontent.com/meiorz/mcp-skills/main/index.json | jq '.skills[].name'
```

## Skill Categories

| Category | Skills | Description |
|---|---|---|
| `domains/` | 4 | SaaS platforms (Stripe, Figma, Mintlify, NotebookLM) |
| `devops/` | 3 | Kubernetes, Linux packaging, Runbook execution |
| `security/` | 2 | OSINT, Penetration testing |
| `databases/` | 1 | PostgreSQL + TimescaleDB |
| `ai-infrastructure/` | 2 | Agent memory, Local-only memory |
| `media/` | 2 | AI video generation, Live streaming |
| `devices/` | 1 | Android phone automation |
| `tools/` | 2 | Web browser access, File editing |
| `workflows/` | 1 | Spec-driven development |
| `languages/` | 1 | Java debugger |

## Orchestrated Systems

Pre-built multi-skill systems ready to deploy:

| System | Skills Used | Description |
|---|---|---|
| [AutoShip](systems/autoship/) | 14 skills | Zero-touch SaaS launch in 30 min |
| [RedTeamOS](systems/redteamos/) | 12 skills | Autonomous security audit platform |
| [OrbitQA](systems/orbitqa/) | 10 skills | 10-agent PR quality team |
| [LiveBrain](systems/livebrain/) | 8 skills | Real-time intelligence aggregation |
| [ProductionLine](systems/productionline/) | 13 skills | Design-to-App-Store factory |
| [DataMesh](systems/datamesh/) | 9 skills | Autonomous data engineering |
| [ContentFactory](systems/contentfactory/) | 11 skills | AI media brand builder |

## Repository Structure

```
mcp-skills/
├── README.md
├── CONTRIBUTING.md
├── SCHEMA.md
├── LICENSE
├── index.json              # machine-readable registry
├── index.md                # human-readable catalog
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

See [CONTRIBUTING.md](CONTRIBUTING.md). Open a PR with your `SKILL.md` following the [SCHEMA.md](SCHEMA.md).

```bash
# Clone, create, validate, submit
git clone https://github.com/meiorz/mcp-skills
cd mcp-skills
mkdir -p skills/<category>/<skill-name>
cp template/SKILL.template.md skills/<category>/<skill-name>/SKILL.md
# Edit SKILL.md ...
node scripts/validate-skill.js skills/<category>/<skill-name>/SKILL.md
# Open PR
```

## Skill Quality Tiers

| Tier | Criteria |
|---|---|
| Bronze | Passes schema validation |
| Silver | Tested by 3+ community members |
| Gold | Official source or 100+ real-world uses |
| Platinum | Published by the tool's own org (Stripe, Figma, OpenAI, etc.) |

## Credits & Seed Sources

This library was seeded from the following public repositories:

| Repo | Stars | Skills Contributed |
|---|---|---|
| [openai/skills](https://github.com/openai/skills) | 22.6k | linear, notion, vercel-deploy, netlify-deploy, cloudflare-deploy, playwright, sentry, figma suite, security, speech, pdf, jupyter-notebook |
| [stripe/ai](https://github.com/stripe/ai) | — | stripe-best-practices, stripe-directory, stripe-projects, upgrade-stripe |
| [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) | — | figma-use, figma-generate-design, figma-code-connect, figma-swiftui, figma-use-figjam |
| [elementalsouls/Claude-OSINT](https://github.com/elementalsouls/Claude-OSINT) | 1.8k | offensive-osint, osint-methodology |
| [timescale/pg-aiguide](https://github.com/timescale/pg-aiguide) | 1.8k | postgresql-timescale |
| [zakirkun/guardian-cli](https://github.com/zakirkun/guardian-cli) | 1.5k | penetration-testing |
| [klawsh/klaw.sh](https://github.com/klawsh/klaw.sh) | 632 | kubernetes-agents |
| [pexoai/pexo-skills](https://github.com/pexoai/pexo-skills) | 736 | ai-video-generation (14 skills) |
| [gavdalf/total-recall](https://github.com/gavdalf/total-recall) | 264 | agent-memory |
| [qualixar/superlocalmemory](https://github.com/qualixar/superlocalmemory) | 186 | local-memory |
| [mintlify/docs](https://github.com/mintlify/docs) | — | mintlify-docs |
| [eze-is/web-access](https://github.com/eze-is/web-access) | — | web-browser-access |
| [kengerlwl/phoneMcp](https://github.com/kengerlwl/phoneMcp) | — | android-phone |
| [M0Rf30/yap](https://github.com/M0Rf30/yap) | — | linux-packaging |
| [d4n-sec/jdb-mcp](https://github.com/d4n-sec/jdb-mcp) | 31 | java-debugger |
| [ckanthony/Chisel](https://github.com/ckanthony/Chisel) | — | file-editing |
| [mvilrokx/runegard](https://github.com/mvilrokx/runegard) | — | runbook-executor |
| [FahrenheitResearch/hermes-weather-plugin](https://github.com/FahrenheitResearch/hermes-weather-plugin) | 34 | weather-forecasting |
| [skaggsxyz/moltstream](https://github.com/skaggsxyz/moltstream) | — | live-streaming |
| [0SxD/notebooklm-mcp-skill](https://github.com/0SxD/notebooklm-mcp-skill) | — | google-notebooklm |

## License

MIT — see [LICENSE](LICENSE). Each skill may carry its own upstream license noted in its frontmatter.
