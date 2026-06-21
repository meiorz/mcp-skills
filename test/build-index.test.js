const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { buildSkillRecord, getRepositorySlug } = require('../scripts/build-index');

const fixturePath = path.join(__dirname, 'fixtures', 'valid-skill', 'SKILL.md');

test('getRepositorySlug derives the repo slug from an HTTPS remote', () => {
    assert.equal(getRepositorySlug('https://github.com/meiorz/mcp-skills.git'), 'meiorz/mcp-skills');
});

test('getRepositorySlug derives the repo slug from an SSH remote', () => {
    assert.equal(getRepositorySlug('git@github.com:meiorz/mcp-skills.git'), 'meiorz/mcp-skills');
});

test('buildSkillRecord generates raw_url from the current repo slug', () => {
    const record = buildSkillRecord(fixturePath, 'meiorz/mcp-skills');

    assert.equal(record.name, 'valid-skill');
    assert.equal(record.category, 'tools');
    assert.equal(record.raw_url, 'https://raw.githubusercontent.com/meiorz/mcp-skills/main/test/fixtures/valid-skill/SKILL.md');
    assert.equal(record.path, 'test/fixtures/valid-skill/SKILL.md');
});
