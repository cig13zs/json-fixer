const sample = "{\n  // User record with Python types and single quotes\n  id: 101,\n  username: 'lorence_dev',\n  active: True,\n  tags: ['developer', 'agent',],\n  details: {\n    joined: '2026-08-22',\n    backup_email: None,\n  },\n}";

const inputEl = document.getElementById('input');
const outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');

function process() {
  const txt = inputEl.value;
  if (!txt.trim()) { outputEl.value = ''; if (statsEl) statsEl.textContent = 'Empty input'; return; }
  const res = JSONFixer.fix(txt);
  if (res.success) {
    outputEl.value = res.fixed;
    if (statsEl) statsEl.textContent = '✅ Valid JSON repaired and formatted cleanly';
  } else {
    outputEl.value = res.fixed;
    if (statsEl) statsEl.textContent = '⚠️ ' + res.error;
  }
}

document.getElementById('btn-run').addEventListener('click', process);
inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', () => { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', () => { navigator.clipboard.writeText(outputEl.value); alert('Copied JSON!'); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', () => { inputEl.value = ''; outputEl.value = ''; });
