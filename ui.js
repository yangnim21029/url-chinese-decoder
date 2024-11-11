// ui.js
export function addToggleButton(decoder) {
  const toggleButton = document.createElement('button');
  toggleButton.textContent = '顯示/還原 URL';
  Object.assign(toggleButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    zIndex: '1000',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  });

  toggleButton.addEventListener('click', () => {
    decoder.toggleDecode();
    toggleButton.textContent = decoder.isDecoded ? '還原 URL' : '顯示解碼 URL';
  });

  document.body.appendChild(toggleButton);
}

export function showAlertMessage(message) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  Object.assign(alertBox.style, {
    position: 'fixed',
    bottom: '60px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: '1000'
  });

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}
