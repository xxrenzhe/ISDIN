document.querySelectorAll("[data-affiliate='true']").forEach((link) => {
  link.addEventListener("click", () => {
    const container = link.closest("[data-link-id]");
    if (!container) return;

    document.dispatchEvent(
      new CustomEvent("bes3:affiliate-click", {
        detail: {
          linkId: container.dataset.linkId,
          placement: container.dataset.placement,
          brand: link.dataset.brand,
          article: link.dataset.article,
        },
      }),
    );
  });
});
