(function () {
  var storageKey = "ai-tools-docs-theme";
  var root = document.documentElement;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getSavedTheme() {
    var urlTheme = new URLSearchParams(window.location.search).get("theme");
    if (urlTheme === "system" || urlTheme === "light" || urlTheme === "dark") {
      return urlTheme;
    }
    try {
      return localStorage.getItem(storageKey) || "system";
    } catch (error) {
      return "system";
    }
  }

  function getResolvedTheme(choice) {
    if (choice === "system") {
      return prefersDark.matches ? "dark" : "light";
    }
    return choice;
  }

  function updateThemeControls(choice) {
    var controls = document.querySelectorAll("[data-theme-choice]");
    controls.forEach(function (button) {
      var selected = button.getAttribute("data-theme-choice") === choice;
      button.setAttribute("aria-pressed", selected ? "true" : "false");
      button.classList.toggle("is-active", selected);
    });
  }

  function applyTheme(choice) {
    var resolved = getResolvedTheme(choice);
    root.setAttribute("data-theme-choice", choice);
    root.setAttribute("data-theme", resolved);
    updateThemeControls(choice);
  }

  function saveTheme(choice) {
    var params = new URLSearchParams(window.location.search);
    if (params.has("theme")) {
      params.delete("theme");
      var nextUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "") + window.location.hash;
      window.history.replaceState({}, "", nextUrl);
    }
    try {
      localStorage.setItem(storageKey, choice);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function focusSearch() {
    var summary = document.querySelector(".book");
    if (summary && !summary.classList.contains("with-summary")) {
      summary.classList.add("with-summary");
    }

    var searchInput = document.querySelector("#book-search-input input");
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }

  function bindThemeSwitcher() {
    document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        var choice = button.getAttribute("data-theme-choice");
        saveTheme(choice);
        applyTheme(choice);
      });
    });

    prefersDark.addEventListener("change", function () {
      if (getSavedTheme() === "system") {
        applyTheme("system");
      }
    });
  }

  function bindSearchTrigger() {
    document.querySelectorAll("[data-search-trigger]").forEach(function (button) {
      button.addEventListener("click", focusSearch);
    });

    document.addEventListener("keydown", function (event) {
      var isCommandK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      var isSlash = event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey;
      var tag = document.activeElement && document.activeElement.tagName;
      var isTypingContext = tag === "INPUT" || tag === "TEXTAREA";

      if ((isCommandK || isSlash) && !isTypingContext) {
        event.preventDefault();
        focusSearch();
      }
    });
  }

  function decorateHomepage() {
    var page = document.querySelector(".page-wrapper");
    if (!page) return;

    var isHome = window.location.pathname.endsWith("/") || /\/index\.html?$/.test(window.location.pathname);
    document.body.classList.toggle("is-home", isHome);
  }

  function init() {
    applyTheme(getSavedTheme());
    bindThemeSwitcher();
    bindSearchTrigger();
    decorateHomepage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
