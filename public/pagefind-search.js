const mount = document.querySelector("#search");

if (mount) {
  if (window.PagefindUI) {
    new window.PagefindUI({ element: "#search", showSubResults: true, showImages: false });
  } else {
    mount.innerHTML =
      '<p>Search is unavailable right now. Browse the <a href="/journal/">journal</a> meanwhile.</p>';
  }
}
