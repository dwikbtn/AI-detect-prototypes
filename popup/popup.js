document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("matchedRule", ({ matchedRule }) => {
    if (matchedRule) {
      document.getElementById("alert").textContent = matchedRule.alert;
      document.getElementById("optOut").onclick = () => {
        chrome.storage.sync.get(
          ["userName", "userEmail"],
          ({ userName, userEmail }) => {
            if (matchedRule.action === "mailto") {
              const mailto = `mailto:${
                matchedRule.target
              }?subject=AI+Data+Opt-Out&body=I, ${
                userName || ""
              }, would like to opt-out.`;
              chrome.tabs.create({ url: mailto });
            } else if (matchedRule.action === "url") {
              chrome.tabs.create({ url: matchedRule.target });
            }
          }
        );
      };
    } else {
      document.getElementById("alert").textContent =
        "No issues detected on this site.";
      document.getElementById("optOut").style.display = "none";
    }
  });
});
