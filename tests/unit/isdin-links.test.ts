import { describe, expect, it } from "vitest";
import { getIsdinLink, ISDIN_LINKS } from "../../src/data/affiliate-links/isdin";

describe("ISDIN merchant links", () => {
  it("uses verified HTTPS destinations on the official ISDIN domain", () => {
    for (const link of Object.values(ISDIN_LINKS)) {
      const destination = new URL(link.officialUrl);

      expect(destination.protocol).toBe("https:");
      expect(destination.hostname).toBe("www.isdin.com");
      expect(link.lastCheckedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("uses the ordinary official URL until an affiliate URL is configured", () => {
    const link = getIsdinLink("isdin-fusion-water");

    expect(link.href).toBe(link.officialUrl);
    expect(link.relationship).toBe("editorial");
  });

  it("rejects unknown link ids", () => {
    expect(() => getIsdinLink("not-a-link")).toThrow("Unknown ISDIN link id");
  });
});
