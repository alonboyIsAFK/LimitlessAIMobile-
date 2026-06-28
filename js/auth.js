// ===============================
// LimitlessAIMobile Authentication
// ===============================

const PASSWORD = "LimitlessPassword";

function showApp() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("app").classList.add("hidden");
}

function login() {

    const input = document.getElementById("passwordInput");
    const error = document.getElementById("loginError");

    if (input.value === PASSWORD) {

        setLoggedIn(true);

        error.textContent = "";

        input.value = "";

        showApp();

    } else {

        error.textContent = "Incorrect password.";

        input.animate([
            { transform: "translateX(0px)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(0px)" }
        ], {
            duration: 350
        });

        input.select();
    }

}

function logout() {

    setLoggedIn(false);

    showLogin();

}

window.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.getElementById("loginButton");
    const passwordInput = document.getElementById("passwordInput");
    const logoutButton = document.getElementById("logoutButton");

    loginButton.addEventListener("click", login);

    passwordInput.addEventListener("keydown", e => {

        if (e.key === "Enter") {

            e.preventDefault();

            login();

        }

    });

    logoutButton.addEventListener("click", logout);

    if (isLoggedIn()) {

        showApp();

    } else {

        showLogin();

    }

});
