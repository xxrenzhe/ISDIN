# Search, analytics and measurement

## What is built in

- A Google Search Console HTML verification tag is emitted only when `PUBLIC_GOOGLE_SITE_VERIFICATION` is configured.
- The generated sitemap remains available at `/sitemap-index.xml`; `robots.txt` already declares it. Reader search remains available at `/search/`, but is `noindex,follow` and excluded from the sitemap so query URLs never compete with editorial pages.
- Every article now has an article-specific social image, an `Article` image in JSON-LD, related editorial reading, three contextual internal links and clearly classified source links.
- Google Tag Manager is the preferred analytics delivery path. Direct GA4 loading is a fallback only when no GTM container is configured, preventing duplicate page views.
- Google scripts load only after an explicit reader choice. The tracker respects Do Not Track, does not capture search text and provides a persistent privacy-settings control after a choice. It also records consented reading-depth milestones without collecting identifiers beyond those used by Google Analytics.

## Configure production

Add the following **GitHub Actions repository variables** under Settings → Secrets and variables → Actions → Variables. These values are public identifiers, so they must not be added as secrets or committed in `.env.local`.

| Variable                          | Purpose                                                                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | The token from Search Console's HTML tag method, without the surrounding `<meta>` tag.                                             |
| `PUBLIC_GTM_ID`                   | The GTM container ID, for example `GTM-ABC1234`. Preferred production path.                                                        |
| `PUBLIC_GA4_MEASUREMENT_ID`       | The GA4 ID, for example `G-ABC123456`. Use only as a direct fallback; when GTM is configured, place the Google tag in GTM instead. |

The deploy workflow passes these variables into the static build. Local development can use the same names in `.env.local`; that file is ignored by Git.

## Connect Google Search Console

1. In Search Console, add `https://bes3.com/` as a URL-prefix property, or verify the domain property through DNS.
2. For the HTML-tag route, copy only the `content` value from Google's verification meta tag into `PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Push or rerun the Deploy Pages workflow, then select **Verify** in Search Console.
4. Submit `https://bes3.com/sitemap-index.xml` in Search Console's Sitemaps report.

## Configure GTM and GA4 events

1. Create a Google tag for the GA4 measurement ID in the configured GTM container. Do not also use direct GA4 loading when GTM is present.
2. Create GA4 Event tags triggered by these custom-event names, using `{{Event}}` as the event name:

   - `bes3_internal_link_click`
   - `bes3_cta_click`
   - `bes3_outbound_link_click`
   - `bes3_affiliate_link_click`
   - `bes3_merchant_link_click`
   - `bes3_search`
   - `bes3_search_result_click`
   - `bes3_scroll_depth`

3. Pass the provided event parameters where useful: `link_type`, `link_label`, `link_destination`, `page_path`, `brand`, `article`, `placement`, `query_length` and `percent_scrolled`.
4. Use navigation classifications (`site-logo`, `primary-navigation`, `mobile-navigation`, `footer-*`, `breadcrumb`), content classifications (`article-card`, `article-topic-path`, `source-reference`) and commercial classifications (`merchant` and `affiliate`) to build useful GTM reports without sending page content or personal data.
5. Use GTM Preview and GA4 DebugView with a consenting test browser to confirm events. Search terms are deliberately never sent—only query length and the search surface are measured. Scroll depth fires once at each 25%, 50%, 75% and 100% milestone.

## Ongoing checks

`npm run check` includes `npm run check:seo`, which verifies canonical metadata, structured data, article social images and contextual internal links. The production deployment also verifies the live sitemap and robots file.
