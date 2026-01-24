// Registers the service worker for PWA installability.
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Silent fail: PWA is optional in QA.
    });
  });
}
