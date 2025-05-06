import { HeroProps } from "./hero";

/**
 * Generate sample Dinex hero data for demonstration purposes
 *
 * @param count Number of hero to generate
 * @returns Array of HeroItem objects
 */
export function getSampleHero(count: number = 1): HeroProps[] {
  const sampleHero: HeroProps[] = [
    {
      data: {
        heading: "Welcome to Our Restaurant",
        mobile_image: {
          url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          alt: "Mobile Image",
        },
        desktop_image: {
          url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          alt: "Desktop Image",
        },
        video: {
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      },
      variation: "video",
    },
  ];

  // Return requested number of hero
  return sampleHero.slice(0, Math.min(count, sampleHero.length));
}
/**
 * Interface representing the structure of Prismic hero data
 */
interface PrismicHeroData {
  id?: string;
  data?: {
    heading?: { text?: string };
    mobile_image?: {
      url?: string;
      alt?: string;
    };
    desktop_image?: {
      url?: string;
      alt?: string;
    };
    video?: {
      url?: string;
    };
  };
}
/**
 * Format Prismic hero data to match component structure
 *
 * @param prismicData Raw data from Prismic CMS
 * @returns Formatted hero array
 */
export function formatPrismicHero(prismicData: PrismicHeroData[]): HeroProps[] {
  if (!prismicData || !Array.isArray(prismicData)) {
    return [];
  }

  return prismicData.map((item, index) => ({
    data: {
      heading: item.data?.heading?.text || "Welcome to Our Restaurant",
      mobile_image: {
        url: item.data?.mobile_image?.url || "",
        alt: item.data?.mobile_image?.alt || "Mobile Image",
      },
      desktop_image: {
        url: item.data?.desktop_image?.url || "",
        alt: item.data?.desktop_image?.alt || "Desktop Image",
      },
      video: {
        url: item.data?.video?.url || "",
      },
    },
    variation: "video",
  }));
}
