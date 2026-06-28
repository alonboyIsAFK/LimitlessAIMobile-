// ===============================
// LimitlessAIMobile Storage System
// ===============================

// ---------- LOGIN ----------

function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

function setLoggedIn(value) {
    localStorage.setItem("loggedIn", value ? "true" : "false");
}

// ---------- API KEY ----------

function saveApiKey(key) {
    localStorage.setItem("openrouter_api_key", key);
}

function getApiKey() {
    return localStorage.getItem("openrouter_api_key") || "";
}

// ---------- MODEL ----------

function saveModel(model) {
    localStorage.setItem("selected_model", model);
}

function getModel() {
    return (
        localStorage.getItem("selected_model") ||
        "openai/gpt-5.5"
    );
}

// ---------- CHAT HISTORY ----------

function saveChats(chats) {
    localStorage.setItem(
        "chat_history",
        JSON.stringify(chats)
    );
}

function loadChats() {
    const saved = localStorage.getItem("chat_history");

    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
}

// ---------- CURRENT CHAT ----------

function saveCurrentChat(chat) {
    localStorage.setItem(
        "current_chat",
        JSON.stringify(chat)
    );
}

function loadCurrentChat() {

    const saved =
        localStorage.getItem("current_chat");

    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
}

// ---------- SETTINGS ----------

function saveAccent(color) {
    localStorage.setItem(
        "accent_color",
        color
    );
}

function getAccent() {
    return (
        localStorage.getItem("accent_color") ||
        "#2563eb"
    );
}

function saveCompact(enabled) {
    localStorage.setItem(
        "compact_mode",
        enabled
    );
}

function getCompact() {
    return (
        localStorage.getItem("compact_mode") ===
        "true"
    );
}

function saveAnimations(enabled) {
    localStorage.setItem(
        "animations",
        enabled
    );
}

function getAnimations() {

    const value =
        localStorage.getItem("animations");

    return value === null
        ? true
        : value === "true";
}

// ---------- RESET ----------

function resetEverything() {

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("openrouter_api_key");

    localStorage.removeItem("selected_model");

    localStorage.removeItem("chat_history");

    localStorage.removeItem("current_chat");

    localStorage.removeItem("accent_color");

    localStorage.removeItem("compact_mode");

    localStorage.removeItem("animations");

}
