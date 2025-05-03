"use client";
import React, { useState } from "react";
import { Hero } from "./hero";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function DanielHeroDemo({ isPrivate }: Props) {
  const [variation, setVariation] = useState<"default" | "video" | "carousel">(
    "default",
  );
  const [overlay, setOverlay] = useState(true);
  const [height, setHeight] = useState("100");
  const [isBrand, setIsBrand] = useState(false);

  const data = {
    variation: variation,
    id: "hero",
    primary: {
      heading: "Welcome to Our Restaurant",
      description: [
        {
          text: "The best place for delicious food",
          type: "text",
        },
      ],
      mobile_image: {
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        alt: "Mobile Image",
      },
      desktop_image: {
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        alt: "Desktop Image",
      },
      video: {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      images: [
        {
          url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          alt: "Image 1",
        },
        {
          url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
          alt: "Image 2",
        },
      ],
      cta: {
        url: "https://example.com",
        text: "Learn More",
        link_type: "web",
      },
      overlay: overlay,
      isBrand: isBrand,
      brands: [
        {
          logo: {
            url: "https://images.prismic.io/cafeboulud/ZhOKpBrFxhpPBXEh_image6.png?auto=format%2Ccompress&fit=max&w=96",
            alt: "Brand 1",
          },
          link: {
            url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            link_type: "web",
          },
        },
        {
          logo: {
            url: "https://images.prismic.io/cafeboulud/ZhOKpRrFxhpPBXEi_image7.png?auto=format%2Ccompress&fit=max&w=128",
            alt: "Brand 2",
          },
          link: {
            url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            link_type: "web",
          },
        },
      ],
      height: height,
    },
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };
  const handleOverlayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverlay(e.target.checked);
  };
  const handleVariationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVariation(e.target.value as "video" | "default" | "carousel");
  };
  const handleIsBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBrand(e.target.checked);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Hero Component Demo</h1>
      <div className="flex items-center gap-4">
        <div className="mb-4">
          <select
            className="rounded border-r-8 border-primary bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={variation}
            onChange={handleVariationChange}
          >
            <option value="default">Default</option>
            <option value="video">Video</option>
            <option value="carousel">Carousel</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="mr-2">
            Height:
            <input
              type="number"
              value={height}
              min="50"
              max="100"
              onChange={handleHeightChange}
              className="ml-2 rounded border px-2 py-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="mr-2">
            Overlay:
            <input
              type="checkbox"
              checked={overlay}
              onChange={handleOverlayChange}
              className="ml-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="mr-2">
            Is Brand:
            <input
              type="checkbox"
              checked={isBrand}
              onChange={handleIsBrandChange}
              className="ml-2"
            />
          </label>
        </div>
      </div>

      <Hero data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import { Hero } from "@/components/hero";
// Define your hero data
const data = {
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
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
};
// Use the component in your page
export default function HeroSection() {
  return (
    <Hero data={data} variation="video" />
  );
}`}
            </pre>
          </div>

          {/* installation command copy */}
          <ClickToCopy path="dinex-hero" />
        </>
      )}
    </div>
  );
}

export default DanielHeroDemo;
