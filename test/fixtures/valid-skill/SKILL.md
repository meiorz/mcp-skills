---
name: valid-skill
version: "1.0.0"
description: >
  A valid starter skill for testing.
author: test-org
license: MIT
category: tools
tags:
  - test
triggers:
  - "valid skill"
compatibility:
  mcp_version: ">=1.0"
  requires: []
context_cost: 100
min_context_window: 8000
updated: "2026-06-20"
---

## Overview

A valid skill used by the test suite.

## Critical Rules

1. Keep the scope narrow.
2. Use concrete examples.
3. Avoid unsupported assumptions.

## Prerequisites

- None.

## Core Patterns

```bash
node --version
```

## Common Pitfalls

**Wrong**: Skipping validation.
**Right**: Running the validator first.

## References

- [Node.js](https://nodejs.org/)