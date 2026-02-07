const input = document.getElementById('ipInput');
const button = document.getElementById('lookupBtn');
const messageBox = document.getElementById('message');
const resultBox = document.getElementById('result');

button.addEventListener('click', () => {
  const ip = input.value.trim();
  messageBox.textContent = '';
  resultBox.classList.add('hidden');

  const validation = validateIP(ip);

  if (!validation.valid) {
    messageBox.textContent = validation.message;
    return;
  }

  messageBox.textContent = 'IP is valid. Ready for lookup.';
});
