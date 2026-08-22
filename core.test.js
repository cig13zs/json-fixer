const assert = require('assert');
const JSONFixer = require('./core');

const bad1 = "{'name': 'Alice', 'role': 'Admin',}";
const res1 = JSONFixer.fix(bad1);
assert.strictEqual(res1.success, true);
assert.strictEqual(res1.parsed.name, 'Alice');

const bad2 = `// config object
{
  port: 8080, /* main port */
  host: 'localhost',
  enabled: True,
  meta: None,
}`;
const res2 = JSONFixer.fix(bad2);
assert.strictEqual(res2.success, true);
assert.strictEqual(res2.parsed.port, 8080);
assert.strictEqual(res2.parsed.enabled, true);
assert.strictEqual(res2.parsed.meta, null);

console.log('ok, all JSONFixer assertions passed');
