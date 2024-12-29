const browserAPI = (typeof browser !== 'undefined' ? browser : chrome);

function loadCustomHtml() {
  browserAPI.storage.sync.get(["customHtml", "animationsEnabled", "animationType"]).then((result) => {
    const content = document.getElementById("content");
    
    if (result.animationsEnabled !== false) {
      content.classList.add(result.animationType || "animate-fade-zoom");
    }
    
    if (result.customHtml) {
      content.innerHTML = result.customHtml;
    }
  }).catch(error => {
    console.error("Error loading HTML:", error);
  });
}

document.addEventListener("DOMContentLoaded", loadCustomHtml);
