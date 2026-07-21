const analyticsConfig = document.querySelector("#bes3-analytics-config");

if (analyticsConfig) {
  const gtmId = analyticsConfig.dataset.gtmId;
  const ga4Id = analyticsConfig.dataset.ga4Id;
  const storageKey = "bes3-analytics-consent";
  const consentBanner = document.querySelector("[data-analytics-consent]");
  const preferencesButton = document.querySelector("[data-analytics-preferences]");
  const prefersDoNotTrack = navigator.doNotTrack === "1";
  let analyticsInitialized = false;
  let searchTimer;

  const getDataLayer = () => {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  };

  const getStoredConsent = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "granted" || value === "denied" ? value : undefined;
    } catch {
      return undefined;
    }
  };

  const storeConsent = (value) => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // A private browsing mode may block storage. The current-page choice still applies.
    }
  };

  const gtag = (...args) => getDataLayer().push(args);

  const loadScript = (src, attribute) => {
    if (document.querySelector(`script[${attribute}]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.setAttribute(attribute, "true");
    document.head.append(script);
  };

  const initializeAnalytics = () => {
    if (analyticsInitialized) return;

    analyticsInitialized = true;
    gtag("consent", "update", { analytics_storage: "granted" });

    if (gtmId) {
      getDataLayer().push({ "gtm.start": Date.now(), event: "gtm.js" });
      loadScript(
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
        "data-bes3-gtm",
      );
      return;
    }

    if (ga4Id) {
      loadScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`,
        "data-bes3-ga4",
      );
      gtag("js", new Date());
      gtag("config", ga4Id);
    }
  };

  const disableAnalytics = () => {
    if (!analyticsInitialized) return;
    gtag("consent", "update", { analytics_storage: "denied" });
  };

  const track = (eventName, parameters = {}) => {
    if (getStoredConsent() !== "granted" || !analyticsInitialized) return;
    gtag("event", eventName, parameters);
  };

  const readableLabel = (element) =>
    (element.dataset.analyticsLabel || element.textContent || "link")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120);

  const linkParameters = (link, destination) => ({
    link_type: link.dataset.analyticsLinkType || "editorial_link",
    link_label: readableLabel(link),
    link_destination:
      destination.origin === window.location.origin ? destination.pathname : destination.hostname,
    page_path: window.location.pathname,
  });

  const showChoices = () => {
    if (prefersDoNotTrack || !consentBanner || !preferencesButton) return;
    consentBanner.hidden = false;
    preferencesButton.hidden = true;
  };

  const closeChoices = () => {
    if (consentBanner) consentBanner.hidden = true;
    if (preferencesButton && !prefersDoNotTrack) preferencesButton.hidden = false;
  };

  document.querySelectorAll("[data-analytics-choice]").forEach((choice) => {
    choice.addEventListener("click", () => {
      const consent = choice.dataset.analyticsChoice;
      if (consent !== "granted" && consent !== "denied") return;

      storeConsent(consent);
      closeChoices();
      if (consent === "granted") {
        initializeAnalytics();
      } else {
        disableAnalytics();
      }
    });
  });

  preferencesButton?.addEventListener("click", showChoices);

  const storedConsent = getStoredConsent();
  if (storedConsent === "granted" && !prefersDoNotTrack) {
    initializeAnalytics();
    closeChoices();
  } else if (storedConsent === "denied" || prefersDoNotTrack) {
    closeChoices();
  } else {
    showChoices();
  }

  document.addEventListener("bes3:affiliate-click", (event) => {
    const detail = event instanceof CustomEvent ? event.detail || {} : {};
    track("bes3_affiliate_link_click", {
      affiliate_id: detail.linkId || "unknown",
      article: detail.article || "unknown",
      brand: detail.brand || "unknown",
      placement: detail.placement || "unknown",
    });
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement) || link.dataset.affiliate === "true") return;

    const destination = new URL(link.href, window.location.href);
    const parameters = linkParameters(link, destination);

    if (link.closest("#search")) {
      track("bes3_search_result_click", parameters);
    } else if (link.dataset.merchantLink === "true") {
      track("bes3_merchant_link_click", { ...parameters, brand: link.dataset.brand || "unknown" });
    } else if (destination.origin !== window.location.origin) {
      track("bes3_outbound_link_click", parameters);
    } else if (link.classList.contains("button")) {
      track("bes3_cta_click", parameters);
    } else if (link.dataset.analyticsLinkType) {
      track("bes3_internal_link_click", parameters);
    }
  });

  document.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) || !field.closest("#search")) return;

    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      const queryLength = field.value.trim().length;
      if (queryLength > 1) {
        track("bes3_search", {
          page_path: window.location.pathname,
          query_length: queryLength,
          search_surface: "pagefind",
        });
      }
    }, 700);
  });
}
