"use strict";

// FEATURE 1: Light/dark mode
const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = theme;

    // aria-pressed reports whether dark mode is active.
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

// Use the saved preference, or start in light mode.
let savedTheme = "light";

try {
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        savedTheme = storedTheme;
    }
} catch {
    // The toggle still works if browser storage is unavailable.
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", function () {
    const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
        // Saving is optional; switching themes still works.
    }
});

// FEATURE 2: ScrollReveal
const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let reveal;

if (
    typeof window.ScrollReveal === "function" &&
    !motionPreference.matches
) {
    reveal = window.ScrollReveal();

    reveal.reveal(".project, .field-note", {
        origin: "bottom",
        distance: "20px",
        duration: 650,
        interval: 100,
        opacity: 0,
        easing: "ease-out",
        reset: false,
        cleanup: true
    });
}

// Stop animations if the visitor enables reduced motion.
motionPreference.addEventListener("change", function (event) {
    if (event.matches && reveal) {
        reveal.destroy();
    }
});
