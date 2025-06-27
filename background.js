chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    fetch(chrome.runtime.getURL("rules.json"))
      .then((res) => res.json())
      .then((rules) => {
        const domain = new URL(tab.url).hostname;
        const match = rules.find((rule) => domain.includes(rule.domain));
        if (match) {
          chrome.storage.local.set({ matchedRule: match });
          chrome.action.setBadgeText({ text: "!", tabId });
        } else {
          chrome.storage.local.remove("matchedRule");
          chrome.action.setBadgeText({ text: "", tabId });
        }
      });
  }
});
