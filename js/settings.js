const settingsModal = document.getElementById("settingsModal");

const settingsButton = document.getElementById("settingsButton");

const closeSettings = document.getElementById("closeSettings");

const saveSettingsButton =
document.getElementById("saveSettings");

const apiKeyInput =
document.getElementById("apiKey");

const modelSelect =
document.getElementById("model");

// Open Settings
settingsButton.onclick = () => {

apiKeyInput.value = getApiKey();

modelSelect.value = getModel();

settingsModal.classList.remove("hidden");

};

// Close Settings
closeSettings.onclick = () => {

settingsModal.classList.add("hidden");

};

// Save Settings
saveSettingsButton.onclick = () => {

saveApiKey(apiKeyInput.value.trim());

saveModel(modelSelect.value);

settingsModal.classList.add("hidden");

alert("Settings saved!");

};

// Close when clicking outside
settingsModal.addEventListener("click", function(e){

if(e.target===settingsModal){

    settingsModal.classList.add("hidden");

}

});
