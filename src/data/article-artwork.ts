import type { ImageMetadata } from "astro";
import actinicaAgeless from "@/assets/images/bes3-cover-isdin-actinica-ageless.webp";
import brandGuide from "@/assets/images/bes3-cover-isdin-brand-guide.webp";
import claimMethod from "@/assets/images/bes3-cover-journal-claim-method.webp";
import dailyFacialSunscreen from "@/assets/images/bes3-cover-guide-daily-facial-sunscreen.webp";
import dailySun from "@/assets/images/bes3-cover-routine-daily-sun.webp";
import fusionWater from "@/assets/images/bes3-cover-isdin-fusion-water.webp";
import homeBrandFocus from "@/assets/images/bes3-cover-home-brand-focus.webp";
import hyaluronicAcid from "@/assets/images/bes3-cover-ingredient-hyaluronic-acid.webp";
import isdinHub from "@/assets/images/bes3-cover-isdin-hub.webp";
import melaclear from "@/assets/images/bes3-cover-isdin-melaclear.webp";
import melatonik from "@/assets/images/bes3-cover-isdin-melatonik.webp";
import mineralOrganic from "@/assets/images/bes3-cover-guide-mineral-organic.webp";
import minimalSensitive from "@/assets/images/bes3-cover-routine-minimal-sensitive.webp";
import morningUnevenTone from "@/assets/images/bes3-cover-routine-morning-uneven-tone.webp";
import niacinamide from "@/assets/images/bes3-cover-ingredient-niacinamide.webp";
import photoaging from "@/assets/images/bes3-cover-concern-photoaging.webp";
import retinalAdvanced from "@/assets/images/bes3-cover-isdin-retinal-advanced.webp";
import retinalRetinol from "@/assets/images/bes3-cover-ingredient-retinal-retinol.webp";
import retinoidRoutine from "@/assets/images/bes3-cover-routine-introduce-retinoid.webp";
import sunscreenAmount from "@/assets/images/bes3-cover-concern-sunscreen-amount.webp";
import tranexamicAcid from "@/assets/images/bes3-cover-ingredient-tranexamic-acid.webp";
import unevenTone from "@/assets/images/bes3-cover-concern-uneven-tone.webp";
import uvaUvb from "@/assets/images/bes3-cover-concern-uva-uvb.webp";
import vitaminC from "@/assets/images/bes3-cover-ingredient-vitamin-c.webp";
import vitaminCRetinal from "@/assets/images/bes3-cover-routine-vitamin-c-retinal.webp";
import ceramides from "@/assets/images/bes3-cover-ingredient-ceramides.webp";

export const articleArtwork: Record<string, ImageMetadata> = {
  "brand-focus/isdin": isdinHub,
  "brand-focus/isdin/actinica-vs-ageless": actinicaAgeless,
  "brand-focus/isdin/brand-guide": brandGuide,
  "brand-focus/isdin/fusion-water-magic": fusionWater,
  "brand-focus/isdin/melaclear-dark-spot-routine": melaclear,
  "brand-focus/isdin/melatonik-guide": melatonik,
  "brand-focus/isdin/retinal-advanced-guide": retinalAdvanced,
  "concerns/how-much-sunscreen": sunscreenAmount,
  "concerns/photoaging": photoaging,
  "concerns/uneven-tone": unevenTone,
  "concerns/uva-vs-uvb": uvaUvb,
  "home-brand-focus": homeBrandFocus,
  "ingredients/ceramides": ceramides,
  "ingredients/hyaluronic-acid": hyaluronicAcid,
  "ingredients/niacinamide": niacinamide,
  "ingredients/retinal-vs-retinol": retinalRetinol,
  "ingredients/tranexamic-acid": tranexamicAcid,
  "ingredients/vitamin-c": vitaminC,
  "journal/how-bes3-reads-a-skincare-claim": claimMethod,
  "product-guides/choose-daily-facial-sunscreen": dailyFacialSunscreen,
  "product-guides/mineral-vs-organic-sunscreen": mineralOrganic,
  "routines/daily-sun-protection": dailySun,
  "routines/introduce-retinoid": retinoidRoutine,
  "routines/minimal-dry-sensitive": minimalSensitive,
  "routines/morning-uneven-tone": morningUnevenTone,
  "routines/vitamin-c-and-retinal": vitaminCRetinal,
};

export function getArtwork(key: string): ImageMetadata {
  const image = articleArtwork[key];

  if (!image) {
    throw new Error(`No unique editorial artwork is registered for: ${key}`);
  }

  return image;
}
