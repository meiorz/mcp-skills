#!/usr/bin/env node

const path = require('path');
const {
    VALID_CATEGORIES,
    extractFrontmatter,
    hasRequiredSections,
    parseFrontmatter,
    readFile,
} = require('./skill-utils');

function fail(messages) {
    for (const message of messages) {
        console.error(message);
    }
    process.exitCode = 1;
}

function isSemver(version) {
    return /^\d+\.\d+\.\d+$/.test(version);
}

function isIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        fail(['Usage: node scripts/validate-skill.js <path-to-SKILL.md>']);
        return;
    }

    const resolvedPath = path.resolve(filePath);
    const text = readFile(resolvedPath);
    const extracted = extractFrontmatter(text);
    if (!extracted) {
        fail([`${filePath}: missing or malformed YAML frontmatter`]);
        return;
    }

    const errors = [];
    const frontmatter = parseFrontmatter(extracted.frontmatter);

    const requiredFields = [
        'name',
        'version',
        'description',
        'author',
        'license',
        'category',
        'tags',
        'triggers',
        'compatibility',
        'context_cost',
        'min_context_window',
        'updated',
    ];

    for (const field of requiredFields) {
        if (!(field in frontmatter)) {
            errors.push(`${filePath}: missing required frontmatter field '${field}'`);
        }
    }

    if (frontmatter.version && !isSemver(frontmatter.version)) {
        errors.push(`${filePath}: version must follow semver`);
    }

    if (frontmatter.category && !VALID_CATEGORIES.has(frontmatter.category)) {
        errors.push(`${filePath}: invalid category '${frontmatter.category}'`);
    }

    if (Array.isArray(frontmatter.tags)) {
        if (frontmatter.tags.length === 0) {
            errors.push(`${filePath}: tags must contain at least one entry`);
        }
    } else {
        errors.push(`${filePath}: tags must be an array`);
    }

    if (Array.isArray(frontmatter.triggers)) {
        if (frontmatter.triggers.length === 0) {
            errors.push(`${filePath}: triggers must contain at least one entry`);
        }
    } else {
        errors.push(`${filePath}: triggers must be an array`);
    }

    if (!isPositiveInteger(Number(frontmatter.context_cost))) {
        errors.push(`${filePath}: context_cost must be a positive integer`);
    }

    if (!isPositiveInteger(Number(frontmatter.min_context_window))) {
        errors.push(`${filePath}: min_context_window must be a positive integer`);
    }

    if (frontmatter.updated && !isIsoDate(frontmatter.updated)) {
        errors.push(`${filePath}: updated must be YYYY-MM-DD`);
    }

    if (frontmatter.name) {
        const folderName = path.basename(path.dirname(resolvedPath));
        if (folderName !== frontmatter.name) {
            errors.push(`${filePath}: name must match the folder name (${folderName})`);
        }
    }

    if (!hasRequiredSections(extracted.body)) {
        errors.push(`${filePath}: missing one or more required H2 sections`);
    }

    if (frontmatter.category === 'security') {
        const securityHeader =
            '> **AUTHORIZED USE ONLY.** This skill is intended exclusively for\n' +
            '> authorized security testing, red-team engagements, and bug bounty programs. Unauthorized use against systems you do not own or have explicit permission to test is illegal.';
        if (!text.includes(securityHeader)) {
            errors.push(`${filePath}: security skills must include the authorized-use-only notice`);
        }
    }

    if (errors.length > 0) {
        fail(errors);
        return;
    }

    console.log(`${filePath}: OK`);
}

main();