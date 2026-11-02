const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new Function(script);
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
 if (!html.includes('id="' + match[1] + '"')) throw new Error('Missing section: ' + match[1]);
}
if (!html.includes('data:image/png;base64,')) throw new Error('Missing embedded portrait');
if (/<(?:img|script)[^>]+src="(?!data:)/.test(html)) throw new Error('External asset dependency');
if (!html.includes('word-break:keep-all')) throw new Error('Missing Korean word wrapping');
console.log('PASS: JavaScript syntax, navigation targets, embedded image, single-file assets, Korean word wrapping');
console.log('HTML size: ' + fs.statSync('index.html').size + ' bytes');