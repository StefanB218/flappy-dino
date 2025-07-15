import StartGame from './game';

document.addEventListener('DOMContentLoaded', () => {
  StartGame('game-container');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./src/service-worker.js').catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}
