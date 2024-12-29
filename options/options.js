const browserAPI = (typeof browser !== 'undefined' ? browser : chrome);

function saveOptions(e) {
  e.preventDefault();
  const htmlContent = document.querySelector("#customHtml").value;
  const animationsEnabled = document.querySelector("#animationsEnabled").checked;
  const animationType = document.querySelector("#animationType").value;
  
  browserAPI.storage.sync.set({
    customHtml: htmlContent,
    animationsEnabled: animationsEnabled,
    animationType: animationType
  }).then(() => {
    const status = document.querySelector("#status");
    status.textContent = "Changes saved successfully!";
    status.className = "success";
    setTimeout(() => {
      status.textContent = "";
      status.className = "";
    }, 2000);
  });
}

function restoreOptions() {
  browserAPI.storage.sync.get(["customHtml", "animationsEnabled", "animationType"]).then((result) => {
    document.querySelector("#customHtml").value = result.customHtml || "";
    document.querySelector("#animationsEnabled").checked = result.animationsEnabled !== false;
    document.querySelector("#animationType").value = result.animationType || "animate-fade-zoom";
    updateAnimationControls();
  });
}

function updateAnimationControls() {
  const animationsEnabled = document.querySelector("#animationsEnabled").checked;
  const typeContainer = document.querySelector("#animationTypeContainer");
  typeContainer.classList.toggle("disabled", !animationsEnabled);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
document.querySelector("#animationsEnabled").addEventListener("change", updateAnimationControls);
