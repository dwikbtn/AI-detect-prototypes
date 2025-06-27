document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  chrome.storage.sync.get(
    ["userName", "userEmail"],
    ({ userName, userEmail }) => {
      nameInput.value = userName || "";
      emailInput.value = userEmail || "";
    }
  );

  document.getElementById("save").onclick = () => {
    chrome.storage.sync.set({
      userName: nameInput.value,
      userEmail: emailInput.value,
    });
    alert("Saved!");
  };
});
