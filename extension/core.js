;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.JSONFixer = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function fix(input, options) {
    options = options || {};
    const indent = options.indent != null ? options.indent : 2;
    if (!input || typeof input !== 'string') return { fixed: '', success: false, error: 'Empty input' };

    let text = input.trim();
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    text = text.replace(/(^|[^:])\/\/.*$/gm, '$1');
    text = text.replace(/\bTrue\b/g, 'true');
    text = text.replace(/\bFalse\b/g, 'false');
    text = text.replace(/\bNone\b/g, 'null');
    text = text.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
    text = text.replace(/'((?:\\.|[^'\\])*)'/g, function (m, inner) {
      return '"' + inner.replace(/"/g, '\\"').replace(/\\'/g, "'") + '"';
    });
    text = text.replace(/,\s*([}\]])/g, '$1');
    text = text.replace(/;\s*$/g, '');

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
