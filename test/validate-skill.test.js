const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

const validatorScript = path.join(__dirname, '..', 'scripts', 'validate-skill.js');
const validFixture = path.join(__dirname, 'fixtures', 'valid-skill', 'SKILL.md');

function buildSkillMarkdown({ name, category, includeSecurityNotice = true }) {
    const bodySections = [
        '## Overview',
        '',
        `${name} used by the test suite.`,
        '',
        '## Critical Rules',
        '',
        '1. Keep the scope narrow.',
        '2. Use concrete examples.',
        '3. Avoid unsupported assumptions.',
        '',
        '## Prerequisites',
        '',
        '- None.',
        '',
        '## Core Patterns',
        '',
        '```bash',
        'node --version',
        '```',
        '',
        '## Common Pitfalls',
        '',
        '**Wrong**: Skipping validation.',
        '**Right**: Running the validator first.',
        '',
        '## References',
        '',
        '- [Node.js](https://nodejs.org/)',
    ];

    const securityNotice = includeSecurityNotice
        ? [
            '',
            '> **AUTHORIZED USE ONLY.** This skill is intended exclusively for',
            '> authorized security testing, red-team engagements, and bug bounty programs. Unauthorized use against systems you do not own or have explicit permission to test is illegal.',
        ]
        : [];

    return [
        '---',
        `name: ${name}`,
        'version: "1.0.0"',
        'description: >',
        `  ${name} sample skill.`,
        'author: test-org',
        'license: MIT',
        `category: ${category}`,
        'tags:',
        '  - test',
        'triggers:',
        `  - "${name.replace(/-/g, ' ')}"`,
        'compatibility:',
        '  mcp_version: ">=1.0"',
        '  requires: []',
        'context_cost: 100',
        'min_context_window: 8000',
        'updated: "2026-06-20"',
        '---',
        '',
        ...bodySections,
        ...securityNotice,
        '',
    ].join('\n');
}

function writeSkillFixture({ folderName, fileContents }) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-skills-'));
    const skillDir = path.join(tempDir, folderName);
    fs.mkdirSync(skillDir, { recursive: true });
    const skillFile = path.join(skillDir, 'SKILL.md');
    fs.writeFileSync(skillFile, fileContents, 'utf8');
    return { tempDir, skillFile };
}

test('validate-skill accepts a valid skill fixture', () => {
    const result = spawnSync(process.execPath, [validatorScript, validFixture], {
        encoding: 'utf8',
    });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /valid-skill[\\/]SKILL\.md: OK/);
});

test('validate-skill rejects a security skill missing the authorized-use notice', () => {
    const { tempDir, skillFile } = writeSkillFixture({
        folderName: 'security-sample',
        fileContents: buildSkillMarkdown({
            name: 'security-sample',
            category: 'security',
            includeSecurityNotice: false,
        }),
    });

    try {
        const result = spawnSync(process.execPath, [validatorScript, skillFile], {
            encoding: 'utf8',
        });

        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /security skills must include the authorized-use-only notice/);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});

test('validate-skill rejects a skill with an invalid category', () => {
    const { tempDir, skillFile } = writeSkillFixture({
        folderName: 'bad-category',
        fileContents: buildSkillMarkdown({
            name: 'bad-category',
            category: 'not-a-real-category',
        }),
    });

    try {
        const result = spawnSync(process.execPath, [validatorScript, skillFile], {
            encoding: 'utf8',
        });

        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /invalid category 'not-a-real-category'/);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
});
