#!/usr/bin/env node
/* Static and build-artifact gate for coffee-demos-studio. Node built-ins only. Exits 1 on any failure. */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const NEXT_DIR = join(ROOT, '.next');

const BUDGET_JS_KB = 300;
const BUDGET_CSS_KB = 100;
const ROUTES = ['/', '/demo-1', '/demo-2', '/demo-3'];

/** @type {{ name: string, ok: boolean, details: string[] }[]} */
const results = [];

function record(name, failures) {
  results.push({ name, ok: failures.length === 0, details: failures });
}

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((file) => /\.(ts|tsx)$/.test(file));
const relativeOf = (file) => relative(ROOT, file);

/** Removes comments and string/template contents so pattern checks only see code. */
function stripCommentsAndStrings(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
    .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
    .replace(/"(?:\\.|[^"\\\n])*"/g, '""')
    .replace(/`(?:\\.|[^`\\])*`/g, '``');
}

/* 1. Required route files and leaf components */
{
  const failures = [];
  const requiredRoutes = ['page.tsx', 'demo-1/page.tsx', 'demo-2/page.tsx', 'demo-3/page.tsx'];
  for (const file of requiredRoutes) {
    if (!existsSync(join(SRC, 'app', file))) failures.push(`missing src/app/${file}`);
  }
  const leafComponents = [
    'demo-1/FlavorFilterClient.tsx',
    'demo-1/OriginDrawerClient.tsx',
    'demo-2/ExtractionCalculatorClient.tsx',
    'demo-2/RoastTelemetryClient.tsx',
    'demo-2/SubscriptionFormClient.tsx',
    'demo-3/AmbianceSwitcherClient.tsx',
    'demo-3/ReservationDrawerClient.tsx',
  ];
  for (const file of leafComponents) {
    if (!existsSync(join(SRC, 'components', file))) failures.push(`missing src/components/${file}`);
  }
  record('Required route files and leaf components', failures);
}

/* 2. Static TypeScript & code quality gate */
{
  const failures = [];
  const rules = [
    { name: 'any keyword', pattern: /\bany\b/, stripStrings: true },
    { name: '@ts-ignore / @ts-expect-error', pattern: /@ts-(ignore|expect-error)/, stripStrings: false },
    { name: 'dangerouslySetInnerHTML', pattern: /dangerouslySetInnerHTML/, stripStrings: false },
    { name: 'innerHTML assignment', pattern: /\.innerHTML\s*=/, stripStrings: false },
    { name: 'eval()', pattern: /\beval\(/, stripStrings: false },
    { name: 'new Function()', pattern: /new Function\(/, stripStrings: false },
    { name: 'console.log() left in code', pattern: /console\.log\(/, stripStrings: false },
  ];
  for (const file of sourceFiles) {
    const raw = readFileSync(file, 'utf8');
    const code = stripCommentsAndStrings(raw);
    for (const rule of rules) {
      const haystack = rule.stripStrings ? code : stripCommentsAndStrings(raw);
      if (rule.pattern.test(haystack)) {
        failures.push(`${relativeOf(file)}: ${rule.name}`);
      }
    }
  }
  record('Static TypeScript & code quality', failures);
}

/* 3. Anti-AI aesthetic gate */
{
  const failures = [];
  const bannedClasses = ['from-purple-', 'from-indigo-', 'from-violet-', 'to-purple-', 'to-indigo-'];
  const bannedPhrases = ['Welcome to our coffee shop', 'Where passion meets', 'Crafted with love', 'Elevate your mornings'];
  for (const file of sourceFiles) {
    const raw = readFileSync(file, 'utf8');
    for (const token of [...bannedClasses, ...bannedPhrases]) {
      if (raw.includes(token)) failures.push(`${relativeOf(file)}: "${token}"`);
    }
  }
  record('Anti-AI aesthetic gate', failures);
}

/* 4. Security configuration gate */
{
  const failures = [];
  const config = readFileSync(join(ROOT, 'next.config.ts'), 'utf8');
  const required = [
    'Content-Security-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Strict-Transport-Security',
  ];
  for (const header of required) {
    if (!config.includes(header)) failures.push(`next.config.ts missing ${header}`);
  }
  if (!/productionBrowserSourceMaps:\s*false/.test(config)) {
    failures.push('next.config.ts must set productionBrowserSourceMaps: false');
  }
  record('Security configuration', failures);
}

/* 5. Strict tsconfig gate */
{
  const failures = [];
  const tsconfig = readFileSync(join(ROOT, 'tsconfig.json'), 'utf8');
  for (const flag of ['"strict": true', '"noUncheckedIndexedAccess": true', '"exactOptionalPropertyTypes": true', '"noImplicitOverride": true']) {
    if (!tsconfig.includes(flag)) failures.push(`tsconfig.json missing ${flag}`);
  }
  record('Strict tsconfig', failures);
}

/* 6. Production build artifacts, HTML semantics and performance budgets */
{
  const failures = [];
  const details = [];
  if (!existsSync(join(NEXT_DIR, 'BUILD_ID'))) {
    failures.push('.next/ build artifacts missing: run npm run build first');
  } else {
    for (const route of ROUTES) {
      const htmlPath = join(NEXT_DIR, 'server', 'app', route === '/' ? 'index.html' : `${route.slice(1)}.html`);
      if (!existsSync(htmlPath)) {
        failures.push(`prerendered HTML missing for ${route}`);
        continue;
      }
      const html = readFileSync(htmlPath, 'utf8');
      for (const landmark of ['<header', '<main', '<footer']) {
        if (!html.includes(landmark)) failures.push(`${route}: missing ${landmark} landmark`);
      }
      if (!/<nav/.test(html)) failures.push(`${route}: missing <nav> landmark`);
      for (const imgTag of html.match(/<img\b[^>]*>/g) ?? []) {
        if (!/\bwidth="\d+"/.test(imgTag) || !/\bheight="\d+"/.test(imgTag)) {
          failures.push(`${route}: <img> without explicit width/height`);
        }
      }
      details.push(`${route}: html ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
    }

    const chunksDir = join(NEXT_DIR, 'static', 'chunks');
    const cssDir = join(NEXT_DIR, 'static', 'css');
    const jsFiles = existsSync(chunksDir) ? walk(chunksDir).filter((file) => file.endsWith('.js')) : [];
    const cssFiles = existsSync(cssDir) ? walk(cssDir).filter((file) => file.endsWith('.css')) : [];
    const gzipTotal = (files) => files.reduce((sum, file) => sum + gzipSync(readFileSync(file)).length, 0);
    const jsKb = gzipTotal(jsFiles) / 1024;
    const cssKb = gzipTotal(cssFiles) / 1024;
    details.push(`JS gzip total ${jsKb.toFixed(1)} KB (budget ${BUDGET_JS_KB} KB)`);
    details.push(`CSS gzip total ${cssKb.toFixed(1)} KB (budget ${BUDGET_CSS_KB} KB)`);
    if (jsKb >= BUDGET_JS_KB) failures.push(`JS gzip ${jsKb.toFixed(1)} KB exceeds ${BUDGET_JS_KB} KB`);
    if (cssKb >= BUDGET_CSS_KB) failures.push(`CSS gzip ${cssKb.toFixed(1)} KB exceeds ${BUDGET_CSS_KB} KB`);
  }
  record('Production build & route render', failures);
  results[results.length - 1].details.push(...details);
}

/* Report */
let failed = 0;
for (const result of results) {
  const status = result.ok ? 'PASS' : 'FAIL';
  if (!result.ok) failed += 1;
  console.log(`[${status}] ${result.name}`);
  for (const detail of result.details) {
    console.log(`       - ${detail}`);
  }
}

if (failed > 0) {
  console.log(`\n${failed} check group(s) failed.`);
  process.exit(1);
}

console.log('\nAll verification gates passed.');
