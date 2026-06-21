# Contributing to mcp-skills

Thank you for helping build the internet library of SKILL.md files for MCP.

## How to Add a Skill

### 1. Fork and clone
```bash
git clone https://github.com/meiorz/mcp-skills
cd mcp-skills
```

### 2. Create your skill folder
```bash
mkdir -p skills/<category>/<skill-name>
# Example:
mkdir -p skills/domains/linear-app
```

### 3. Write your SKILL.md

Follow [SCHEMA.md](SCHEMA.md) exactly. Your file must:
- Start with valid YAML frontmatter
- Include all 6 required sections
- Be under 500 KB
- Contain no secrets or credentials

### 4. Validate locally
```bash
node scripts/validate-skill.js skills/<category>/<skill-name>/SKILL.md
```

### 5. Open a Pull Request

Use the PR template — select "New Skill" when opening. Your PR must:
- Add exactly one new `SKILL.md` file (or update one existing file)
- Pass all CI checks
- Include a brief description of what the skill enables

## Updating an Existing Skill

1. Bump the `version` field in frontmatter
2. Copy the old version to `skills/<category>/<name>/versions/<old-version>.md`
3. Open a PR with title: `update(<skill-name>): <what changed>`

## Skill Quality Tiers

| Tier | Badge | Criteria |
|---|---|---|
| Bronze | (none) | Passes schema validation |
| Silver | `silver` label | Tested by 3+ community members in production |
| Gold | `gold` label | Official upstream source or 100+ documented real-world uses |
| Platinum | `platinum` label | Published directly by the tool's own organization |

Tier is assigned by maintainers after review.

## Domain Maintainers

Domain maintainers are required reviewers for PRs in their category.
To become a domain maintainer, open an issue titled `maintainer: <category>`.

| Category | Maintainer(s) |
|---|---|
| `security/` | TBD |
| `devops/` | TBD |
| `domains/` | TBD |
| `ai-infrastructure/` | TBD |
| `media/` | TBD |

## PR Title Conventions

```
skill(<name>): add <short description>       # new skill
update(<name>): <what changed>               # update existing skill
fix(<name>): <what was fixed>                # bug fix
docs: <what changed>                         # docs only
ci: <what changed>                           # CI/scripts only
```

## What Makes a Great SKILL.md

- **Specific**: Covers one tool or domain, not a vague topic
- **Actionable**: Every rule and pattern is immediately usable
- **Tested**: Validated against real agent sessions
- **Concise**: Dense with signal, no padding
- **Current**: Reflects the current version of the tool

## What We Do NOT Accept

- Skills that contain secrets, tokens, or credentials
- Skills for tools that require illegal access
- Duplicate skills (check existing before submitting)
- Skills with no `triggers` (agents need to know when to load it)
- Files over 500 KB

## Code of Conduct

Be respectful and constructive. All contributors are expected to follow
the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## License

By contributing, you agree that your contributions will be licensed
under the MIT License, unless your frontmatter specifies a different
compatible open-source license.
