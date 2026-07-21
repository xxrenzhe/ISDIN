const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenu instanceof HTMLDetailsElement) {
  const menuTrigger = mobileMenu.querySelector("summary");
  const closeMenu = () => {
    mobileMenu.open = false;
  };
  const syncMenuState = () => {
    document.body.classList.toggle("mobile-menu-open", mobileMenu.open);
  };

  mobileMenu.addEventListener("toggle", syncMenuState);
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) {
      closeMenu();
      menuTrigger?.focus();
    }
  });
}
