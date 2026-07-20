export type MerchantRelationship = "editorial" | "affiliate";

type MerchantLink = {
  id: string;
  label: string;
  officialUrl: string;
  affiliateUrl?: string;
  relationship: MerchantRelationship;
  lastCheckedAt: string;
};

const configuredAffiliateUrl = import.meta.env.PUBLIC_ISDIN_AFFILIATE_URL?.trim();
const relationship: MerchantRelationship = configuredAffiliateUrl ? "affiliate" : "editorial";

export const ISDIN_LINKS: Record<string, MerchantLink> = {
  "isdin-home": {
    id: "isdin-home",
    label: "Visit ISDIN",
    officialUrl: "https://www.isdin.com/us",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-fusion-water": {
    id: "isdin-fusion-water",
    label: "Explore Fusion Water MAGIC at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/fusion-water-magic/4750",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-actinica": {
    id: "isdin-actinica",
    label: "Explore Actinica at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/eryfotona-actinica-34-fl-oz/2794",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-ageless": {
    id: "isdin-ageless",
    label: "Explore Eryfotona Ageless at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/ageless-34-fl-oz/3431",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-melatonik": {
    id: "isdin-melatonik",
    label: "Explore Melatonik at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/isdinceutics-melatonik/2962",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-retinal-advanced": {
    id: "isdin-retinal-advanced",
    label: "Explore Retinal Advanced at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/isdinceutics-retinal-advanced/4357",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
  "isdin-melaclear": {
    id: "isdin-melaclear",
    label: "Explore Melaclear Advanced at ISDIN",
    officialUrl: "https://www.isdin.com/us/p/melaclear-advanced/3455",
    affiliateUrl: configuredAffiliateUrl,
    relationship,
    lastCheckedAt: "2026-07-20",
  },
};

export function getIsdinLink(id: string) {
  const link = ISDIN_LINKS[id];
  if (!link) throw new Error(`Unknown ISDIN link id: ${id}`);
  return {
    ...link,
    href: link.affiliateUrl || link.officialUrl,
  };
}
