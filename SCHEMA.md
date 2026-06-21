# SKILL.md Schema v1.0

> Formal specification for all `SKILL.md` files in the `mcp-skills` library.
> CI validation enforces this schema on every PR.

## Required Frontmatter

Every `SKILL.md` MUST begin with a YAML frontmatter block:

```yaml
---
name: kebab-case-skill-name
version: "1.0.0"
description: >
  One to three sentences. What does this skill enable?
  When should an agent load it?
author: github-username
license: MIT
category: domains
tags:
  - tag1
  - tag2
triggers:
  - "keyword that should auto-load this skill"
compatibility:
  mcp_version: ">=1.0"
  requires:
    - optional-mcp-server-name
context_cost: 800
min_context_window: 8000
upstream:
  repo: owner/repo
  file: path/to/original/SKILL.md
  license: MIT
updated: "2026-06-20"
---
```

### Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | YES | Must match folder name exactly. kebab-case only. |
| `version` | string | YES | Semver: MAJOR.MINOR.PATCH |
| `description` | string | YES | 1–3 sentences |
| `author` | string | YES | GitHub username or org name |
| `license` | string | YES | SPDX identifier (MIT, Apache-2.0, CC-BY-4.0) |
| `category` | enum | YES | See valid categories below |
| `tags` | string[] | YES | Min 1, all lowercase |
| `triggers` | string[] | YES | Min 1. Phrases that should load this skill |
| `context_cost` | integer | YES | Estimated token count |
| `min_context_window` | integer | YES | Minimum context window required |
| `upstream` | object | NO | Credit original source |
| `updated` | date | YES | ISO 8601: YYYY-MM-DD |

### Valid Categories

```
domains          SaaS & web platforms
devops           Infrastructure, CI/CD, containers
security         Pentesting, OSINT, threat modeling
databases        SQL, NoSQL, vector stores
ai-infrastructure Agent memory, orchestration, LLM tooling
media            Video, audio, streaming, images
devices          Mobile, IoT, hardware
tools            Developer tools, CLIs, editors
workflows        Processes, methodologies, patterns
languages        Programming languages & runtimes
```

## Required Sections

Every `SKILL.md` MUST contain all 6 of these H2 sections:

### 1. `## Overview`
2–3 sentences. What does the agent gain by loading this skill?

### 2. `## Critical Rules`
Numbered list. Non-negotiable constraints. Failures the agent MUST avoid.
Minimum 3 rules required.

### 3. `## Prerequisites`
What must exist before this skill can be used?
- MCP servers required
- CLI tools required
- Auth/credentials required

### 4. `## Core Patterns`
The most common operations with exact syntax, flags, and examples.
Every command or API call MUST be in a code block.

### 5. `## Common Pitfalls`
What NOT to do. Real failure modes with fixes.
Format: `**Wrong**: X` / `**Right**: Y`

### 6. `## References`
Links to official docs. Versioned links preferred.

## Optional Sections

- `## Authentication` — auth flows, token patterns
- `## Rate Limits` — API throttle rules  
- `## Error Codes` — common error → fix mapping
- `## UI Navigation` — menus, shortcuts, URL patterns
- `## Efficiency Tips` — power-user workflows
- `## Subskills` — links to related skills in this library

## Security Requirements

For any skill in the `security/` category, the file MUST include
this header immediately after the frontmatter:

```
> **AUTHORIZED USE ONLY.** This skill is intended exclusively for
> authorized security testing, red-team engagements, and bug bounty
> programs. Unauthorized use against systems you do not own or have
> explicit permission to test is illegal.
```

## File Constraints

- Maximum file size: **500 KB**
- No secrets, tokens, API keys, or credentials anywhere in the file
- No personally identifiable information (PII)
- All code examples must use placeholder values (e.g., `YOUR_API_KEY`)

## Versioning

- Bump `MINOR` for new sections or capabilities
- Bump `PATCH` for corrections, clarifications, typo fixes
- Bump `MAJOR` for breaking changes to skill interface
- Old versions preserved at `skills/<category>/<name>/versions/<old-version>.md`

## CI Validation Rules

The `scripts/validate-skill.js` script enforces:

1. Frontmatter parses as valid YAML
2. `name` matches the folder name exactly
3. `version` follows semver
4. `context_cost` is a positive integer
5. `triggers` has ≥1 entry
6. `tags` has ≥1 entry
7. All 6 required sections present (H2 headers)
8. File ≤500 KB
9. No patterns matching secret/token/credential formats
10. `category` is a valid enum value
11. `updated` is valid ISO 8601 date
12. `license` is a valid SPDX identifier

Run locally:
```bash
node scripts/validate-skill.js skills/<category>/<name>/SKILL.md
```
