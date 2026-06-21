---
name: xquik
version: "1.0.0"
description: >
  Use Xquik for X data and automation workflows through its REST API, MCP
  server, webhooks, and public agent skill package.
author: Xquik-dev
license: MIT
category: domains
tags:
  - x-api
  - social-media
  - mcp
  - automation
  - webhooks
triggers:
  - "xquik"
  - "x-twitter-scraper"
  - "x data"
  - "tweet search"
  - "twitter scraper"
compatibility:
  mcp_version: ">=1.0"
  requires:
    - xquik-mcp
context_cost: 950
min_context_window: 8000
upstream:
  repo: Xquik-dev/x-twitter-scraper
  file: skills/x-twitter-scraper/SKILL.md
  license: MIT
updated: "2026-06-21"
---

## Overview

Load this skill when an agent needs X data, X automation, webhooks, or MCP access through Xquik. It helps the agent choose the public REST API, MCP server, or official Xquik agent skill package without guessing endpoint names or auth rules.

## Critical Rules

1. Use only public Xquik docs, public package metadata, and the upstream Xquik skill as source truth.
2. Keep API keys in approved secret stores or client configuration. Never place real keys in prompts, docs, logs, or committed files.
3. Authenticate REST calls with the `x-api-key` header unless the current public docs specify a different flow.
4. Treat write and publish actions as confirmation-gated. Ask the operator before creating or sending public content.
5. Do not invent endpoints, response fields, pricing details, or platform guarantees.

## Prerequisites

- Xquik account with an API key from the Xquik dashboard.
- MCP client or HTTP client, depending on the integration path.
- Optional official agent skill package for richer endpoint guidance.

## Core Patterns

Install the official Xquik agent skill package when the agent needs the full upstream workflow guide.

```bash
npx skills@1.5.3 add Xquik-dev/x-twitter-scraper
```

Search recent X posts with the REST API.

```bash
curl "https://xquik.com/api/v1/x/tweets/search?q=ai%20agents&limit=20" \
  -H "x-api-key: YOUR_XQUIK_API_KEY"
```

Configure a remote MCP client with a placeholder API key.

```json
{
  "mcpServers": {
    "xquik": {
      "url": "https://xquik.com/mcp",
      "headers": {
        "x-api-key": "YOUR_XQUIK_API_KEY"
      }
    }
  }
}
```

Use the MCP `xquik` tool for endpoint-backed requests after discovering the path.

```js
await xquik.request('/api/v1/x/tweets/search', {
  q: 'ai agents',
  limit: 20
});
```

## Common Pitfalls

**Wrong**: Hard-coding real API keys in a project file.
**Right**: Store the key in the MCP client secret store or runtime environment.

**Wrong**: Calling undocumented Xquik endpoints because a similar route exists elsewhere.
**Right**: Discover the endpoint in Xquik docs or the upstream skill before calling it.

**Wrong**: Running publish or write actions without operator review.
**Right**: Prepare the action and request confirmation before public posting.

## References

- [Xquik docs](https://docs.xquik.com)
- [Xquik MCP guide](https://docs.xquik.com/mcp/overview)
- [Xquik agent skill package](https://github.com/Xquik-dev/x-twitter-scraper)
- [x-developer package](https://www.npmjs.com/package/x-developer)
