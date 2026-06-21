const fs = require('fs');

const REQUIRED_SECTIONS = [
    'Overview',
    'Critical Rules',
    'Prerequisites',
    'Core Patterns',
    'Common Pitfalls',
    'References',
];

const VALID_CATEGORIES = new Set([
    'domains',
    'devops',
    'security',
    'databases',
    'ai-infrastructure',
    'media',
    'devices',
    'tools',
    'workflows',
    'languages',
]);

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function extractFrontmatter(text) {
    const lines = text.split(/\r?\n/);
    if (lines[0] !== '---') {
        return null;
    }

    let endIndex = -1;
    for (let index = 1; index < lines.length; index += 1) {
        if (lines[index] === '---') {
            endIndex = index;
            break;
        }
    }

    if (endIndex === -1) {
        return null;
    }

    return {
        frontmatter: lines.slice(1, endIndex).join('\n'),
        body: lines.slice(endIndex + 1).join('\n'),
    };
}

function parseScalar(value) {
    const trimmed = value.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }

    return trimmed;
}

function parseFrontmatter(frontmatterText) {
    const lines = frontmatterText.split(/\r?\n/);
    const data = {};
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];
        if (!line.trim()) {
            index += 1;
            continue;
        }

        const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!keyMatch) {
            index += 1;
            continue;
        }

        const key = keyMatch[1];
        const value = keyMatch[2];

        if (value === '>') {
            const folded = [];
            index += 1;
            while (index < lines.length) {
                const nextLine = lines[index];
                if (!nextLine.startsWith('  ') || /^\s*[A-Za-z0-9_-]+:\s*/.test(nextLine)) {
                    break;
                }
                folded.push(nextLine.trim());
                index += 1;
            }
            data[key] = folded.join(' ');
            continue;
        }

        if (!value) {
            const nextLine = lines[index + 1] || '';
            if (nextLine.startsWith('  - ')) {
                const items = [];
                index += 1;
                while (index < lines.length) {
                    const itemLine = lines[index];
                    if (!itemLine.startsWith('  - ')) {
                        break;
                    }
                    items.push(parseScalar(itemLine.slice(4)));
                    index += 1;
                }
                data[key] = items;
                continue;
            }

            const nested = {};
            index += 1;
            while (index < lines.length) {
                const nestedLine = lines[index];
                if (!nestedLine.startsWith('  ')) {
                    break;
                }

                const nestedTrimmed = nestedLine.trim();
                if (!nestedTrimmed) {
                    index += 1;
                    continue;
                }

                const nestedMatch = nestedTrimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
                if (!nestedMatch) {
                    index += 1;
                    continue;
                }

                const nestedKey = nestedMatch[1];
                const nestedValue = nestedMatch[2];
                if (nestedValue === '') {
                    const nestedItems = [];
                    index += 1;
                    while (index < lines.length) {
                        const nestedItemLine = lines[index];
                        if (!nestedItemLine.startsWith('    - ')) {
                            break;
                        }
                        nestedItems.push(parseScalar(nestedItemLine.slice(6)));
                        index += 1;
                    }
                    nested[nestedKey] = nestedItems;
                    continue;
                }

                nested[nestedKey] = parseScalar(nestedValue);
                index += 1;
            }

            data[key] = nested;
            continue;
        }

        if (value === '') {
            data[key] = '';
        } else {
            data[key] = parseScalar(value);
        }

        index += 1;
    }

    return data;
}

function hasRequiredSections(body) {
    return REQUIRED_SECTIONS.every((section) => body.includes(`## ${section}`));
}

function normalizeSkillPath(filePath) {
    return filePath.replace(/\\/g, '/');
}

module.exports = {
    VALID_CATEGORIES,
    REQUIRED_SECTIONS,
    extractFrontmatter,
    hasRequiredSections,
    normalizeSkillPath,
    parseFrontmatter,
    readFile,
};