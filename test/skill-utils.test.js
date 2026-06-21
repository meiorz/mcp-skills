const test = require('node:test');
const assert = require('node:assert/strict');
const {
    extractFrontmatter,
    hasRequiredSections,
    normalizeSkillPath,
    parseFrontmatter,
} = require('../scripts/skill-utils');

test('extractFrontmatter splits frontmatter and body', () => {
    const result = extractFrontmatter(`---
name: sample
version: "1.0.0"
---

## Overview

Body text.
`);

    assert.ok(result);
    assert.equal(result.frontmatter, 'name: sample\nversion: "1.0.0"');
    assert.match(result.body, /## Overview/);
});

test('parseFrontmatter handles folded scalars, arrays, and nested objects', () => {
    const frontmatter = parseFrontmatter(`name: sample
description: >
  First line.
  Second line.
tags:
  - one
  - two
compatibility:
  mcp_version: ">=1.0"
  requires:
    - server-a
    - server-b
`);

    assert.equal(frontmatter.name, 'sample');
    assert.equal(frontmatter.description, 'First line. Second line.');
    assert.deepEqual(frontmatter.tags, ['one', 'two']);
    assert.deepEqual(frontmatter.compatibility, {
        mcp_version: '>=1.0',
        requires: ['server-a', 'server-b'],
    });
});

test('hasRequiredSections requires every H2 section', () => {
    const validBody = [
        '## Overview',
        '',
        '## Critical Rules',
        '',
        '## Prerequisites',
        '',
        '## Core Patterns',
        '',
        '## Common Pitfalls',
        '',
        '## References',
    ].join('\n');

    assert.equal(hasRequiredSections(validBody), true);
    assert.equal(hasRequiredSections('## Overview\n\n## References'), false);
});

test('normalizeSkillPath converts backslashes to forward slashes', () => {
    assert.equal(normalizeSkillPath('skills\\domains\\foo\\SKILL.md'), 'skills/domains/foo/SKILL.md');
});
