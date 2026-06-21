import fs from 'fs';

const minimumMajor = 20;
const major = Number(process.versions.node.split('.')[0]);

if (major < minimumMajor) {
    console.error(`Node.js ${minimumMajor}+ is required.`);
    process.exit(1);
}

if (!fs.existsSync('README.md') || !fs.existsSync('SCHEMA.md')) {
    console.error('Expected repository docs are missing.');
    process.exit(1);
}

console.log(`Node.js ${process.versions.node} detected.`);