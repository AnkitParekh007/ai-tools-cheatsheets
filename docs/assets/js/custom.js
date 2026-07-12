(function () {
  var storageKey = "ai-tools-docs-theme";
  var root = document.documentElement;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  var paletteState = {
    root: null,
    input: null,
    hiddenInput: null,
    resultList: null
  };

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

  function syncSearchInput(value) {
    if (!paletteState.hiddenInput) return;

    paletteState.hiddenInput.value = value;
    paletteState.hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function moveSearchSelection(step) {
    if (!paletteState.resultList) return;

    var items = Array.prototype.slice.call(
      paletteState.resultList.querySelectorAll(".search-results-item a")
    );

    if (!items.length) return;

    var currentIndex = items.findIndex(function (item) {
      return item === document.activeElement;
    });

    var nextIndex = currentIndex + step;
    if (nextIndex < 0) nextIndex = items.length - 1;
    if (nextIndex >= items.length) nextIndex = 0;
    items[nextIndex].focus();
  }

  function closeSearchPalette(clearQuery) {
    if (!paletteState.root) return;

    paletteState.root.hidden = true;
    document.body.classList.remove("search-palette-open");

    if (clearQuery && paletteState.input) {
      paletteState.input.value = "";
      syncSearchInput("");
    }
  }

  function openSearchPalette() {
    if (!paletteState.root || !paletteState.input) return;

    paletteState.root.hidden = false;
    document.body.classList.add("search-palette-open");
    paletteState.input.focus();
    paletteState.input.select();
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
      button.addEventListener("click", openSearchPalette);
    });

    document.querySelectorAll("[data-search-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeSearchPalette(true);
      });
    });

    if (paletteState.input) {
      paletteState.input.addEventListener("input", function () {
        syncSearchInput(paletteState.input.value);
      });

      paletteState.input.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveSearchSelection(1);
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          moveSearchSelection(-1);
        }

        if (event.key === "Escape") {
          event.preventDefault();
          closeSearchPalette(true);
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      var isCommandK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      var isSlash = event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey;
      var tag = document.activeElement && document.activeElement.tagName;
      var isTypingContext = tag === "INPUT" || tag === "TEXTAREA";

      if ((isCommandK || isSlash) && !isTypingContext) {
        event.preventDefault();
        openSearchPalette();
      }

      if (event.key === "Escape" && document.body.classList.contains("search-palette-open")) {
        event.preventDefault();
        closeSearchPalette(true);
      }
    });

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest(".search-results-item a")) {
        closeSearchPalette(false);
      }
    });
  }

  function bindSearchPalette() {
    paletteState.root = document.querySelector("[data-search-palette]");
    paletteState.input = document.querySelector("[data-search-palette-input]");
    paletteState.hiddenInput = document.querySelector("#book-search-input input");
    paletteState.resultList = document.querySelector("#book-search-results .search-results-list");
  }

  function decorateHomepage() {
    var page = document.querySelector(".page-wrapper");
    if (!page) return;

    var isHome = window.location.pathname.endsWith("/") || /\/index\.html?$/.test(window.location.pathname);
    document.body.classList.toggle("is-home", isHome);
  }

  function init() {
    applyTheme(getSavedTheme());
    bindSearchPalette();
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
