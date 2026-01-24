const { contextBridge } = require("electron");
const Store = require("electron-store");

// Demo-only "secure-ish" token storage.
// For production: replace with OS keychain (keytar) or similar.
const store = new Store({
  name: "gradpulse",
  encryptionKey: "gradpulse-demo-encryption-key-change-me"
});

contextBridge.exposeInMainWorld("gradpulse", {
  getToken: async () => store.get("access_token") || null,
  setToken: async (token) => store.set("access_token", token),
  clearToken: async () => store.delete("access_token")
});
