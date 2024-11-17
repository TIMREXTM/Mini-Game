document.getElementById('login-btn').addEventListener('click', () => {
  const key = document.getElementById('key').value;

  if (!key) {
      showNotification("Bitte gib einen Key ein!");
      return;
  }

  authenticateKey(key);
});

function authenticateKey(key) {
  const validKey = "key";

  if (key === validKey) {
      showNotification("Erfolgreiche Anmeldung! Du wirst ins Spiel weitergeleitet.");
      setTimeout(() => {
          window.location.href = "game.html";
      }, 1000);
  } else {
      showNotification("Ungültiger Key. Bitte versuche es erneut.");
  }
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  notificationMessage.textContent = message;
  notification.classList.remove('hidden');
}

function hideNotification() {
  const notification = document.getElementById('notification');
  notification.classList.add('hidden');
}