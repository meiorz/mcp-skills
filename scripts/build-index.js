#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
    extractFrontmatter,
    normalizeSkillPath,
    parseFrontmatter,
    readFile,
} = require('./skill-utils');

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const INDEX_JSON = path.join(ROOT, 'index.json');
const INDEX_MD = path.join(ROOT, 'index.md');

function walkSkillFiles(dirPath, results = []) {
    if (!fs.existsSync(dirPath)) {
        return results;
    }

    for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            walkSkillFiles(fullPath, results);
            continue;
        }

        if (entry.isFile() && entry.name === 'SKILL.md') {
            results.push(fullPath);
        }
    }

    return results;
}

function buildSkillRecord(filePath) {
    const text = readFile(filePath);
    const extracted = extractFrontmatter(text);
    if (!extracted) {
        throw new Error(`Malformed frontmatter in ${filePath}`);
    }

    const frontmatter = parseFrontmatter(extracted.frontmatter);
    const relativePath = normalizeSkillPath(path.relative(ROOT, filePath));

    return {
        id: frontmatter.name,
        name: frontmatter.name,
        category: frontmatter.category,
        path: relativePath,
        raw_url: `https://raw.githubusercontent.com/your-org/mcp-skills/main/${relativePath}`,
        version: frontmatter.version,
        tags: frontmatter.tags || [],
        triggers: frontmatter.triggers || [],
        context_cost: Number(frontmatter.context_cost) || 0,
        tier: 'starter',
        upstream: frontmatter.upstream && frontmatter.upstream.repo ? frontmatter.upstream.repo : undefined,
        author: frontmatter.author,
    };
}

function buildIndex() {
    const files = walkSkillFiles(SKILLS_DIR);
    const skills = files.map(buildSkillRecord).sort((left, right) => {
        if (left.category === right.category) {
            return left.name.localeCompare(right.name);
        }
        return left.category.localeCompare(right.category);
    });

    const payload = {
        version: '0.1.0',
        updated: '2026-06-20',
        total_skills: skills.length,
        skills,
    };

    fs.writeFileSync(INDEX_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

    const lines = [
        '# mcp-skills Index',
        '',
        `Skills published: ${skills.length}`,
        '',
    ];

    if (skills.length === 0) {
        lines.push('- No skills published yet', '- Category: starter', '- Version: 0.1.0', '- Path: skills/');
    } else {
        for (const skill of skills) {
            lines.push(`- ${skill.name}`);
            lines.push(`  - Category: ${skill.category}`);
            lines.push(`  - Version: ${skill.version}`);
            lines.push(`  - Path: ${skill.path}`);
        }
    }

    fs.writeFileSync(INDEX_MD, `${lines.join('\n')}\n`, 'utf8');
}

try {
    buildIndex();
    console.log('Index rebuilt successfully.');
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
}