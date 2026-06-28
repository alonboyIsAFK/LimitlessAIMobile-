document.addEventListener("DOMContentLoaded", () => {

// Sidebar
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

if (menuButton && sidebar) {

    menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

}

// Auto-grow textarea
const input = document.getElementById("prompt");

if (input) {

    input.addEventListener("input", () => {

        input.style.height = "auto";

        input.style.height = input.scrollHeight + "px";

    });

}

// Apply accent color
const accent = getAccent();

document.documentElement.style.setProperty(
    "--accent",
    accent
);

// Register service worker (if available)
if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("sw.js")
        .catch(() => {});

}

}
