const mount = document.querySelector("#search");
const initialQuery = new URLSearchParams(window.location.search).get("q")?.trim().slice(0, 120);

if (mount) {
  if (window.PagefindUI) {
    new window.PagefindUI({ element: "#search", showSubResults: true, showImages: false });

    if (initialQuery) {
      const searchInput = mount.querySelector("input[type='search']");
      if (searchInput instanceof HTMLInputElement) {
        searchInput.value = initialQuery;
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  } else {
    mount.innerHTML =
      '<p>Search is unavailable right now. Browse the <a href="/journal/">journal</a> meanwhile.</p>';
  }
}
