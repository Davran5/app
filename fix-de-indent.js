const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Split into lines
const lines = content.split('\n');

// Find the start of the de section
let deStart = -1;
let deEnd = -1;
let inDe = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === 'de: {') {
        deStart = i;
        inDe = true;
        braceCount = 1;
        continue;
    }

    if (inDe) {
        // Count braces
        for (const char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
        }

        // If we're back to 0, we've closed the de object
        if (braceCount === 0) {
            deEnd = i;
            break;
        }
    }
}

console.log(`German section: lines ${deStart} to ${deEnd}`);

// Now normalize indentation in the de section
if (deStart >= 0 && deEnd >= 0) {
    // Track nesting level
    let level = 1; // Start at 1 because de: { is already open

    for (let i = deStart + 1; i < deEnd; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith('//')) {
            lines[i] = line; // Keep comments and empty lines as-is
            continue;
        }

        // Count opening and closing braces BEFORE this line's content
        const openBefore = (trimmed.match(/^}/g) || []).length;
        if (openBefore > 0) {
            level -= openBefore;
        }

        // Apply correct indentation
        const indent = '  '.repeat(level);
        lines[i] = indent + trimmed;

        // Count braces for NEXT line
        const openCount = (trimmed.match(/{/g) || []).length;
        const closeCount = (trimmed.match(/}/g) || []).length;
        level += (openCount - closeCount);

        // Safeguard
        if (level < 0) level = 0;
    }
}

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed indentation in German section');
