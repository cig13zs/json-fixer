;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.JSONFixer = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function fix(input, options) {
    options = options || {};
    const indent = options.indent != null ? options.indent : 2;
    if (!input || typeof input !== 'string') return { fixed: '', success: false, error: 'Empty input' };

    let text = input.trim();

    // 1. Remove comments: single-line // ... and multi-line /* ... */
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    text = text.replace(/(^|[^:])\/\/.*$/gm, '$1');

    // 2. Fix Python booleans and None
    text = text.replace(/\bTrue\b/g, 'true');
    text = text.replace(/\bFalse\b/g, 'false');
    text = text.replace(/\bNone\b/g, 'null');

    // 3. Fix unquoted keys: { key: "val" } or { key_name: 123 }
    text = text.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

    // 4. Fix single quoted strings and keys
    // Convert 'val' to "val" while respecting escaped quotes
    text = text.replace(/'((?:\\.|[^'\\])*)'/g, function (m, inner) {
      return '"' + inner.replace(/"/g, '\\"').replace(/\\'/g, "'") + '"';
    });

    // 5. Remove trailing commas before } or ]
    text = text.replace(/,\s*([}\]])/g, '$1');

    // 6. Fix trailing semicolons
    text = text.replace(/;\s*$/g, '');

    // 7. Parse and format
    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, indent);
      return { fixed: formatted, parsed: parsed, success: true, changes: 'Repaired syntax & formatted' };
    } catch (err) {
      return { fixed: text, success: false, error: err.message };
    }
  }

  return { fix: fix };
});
