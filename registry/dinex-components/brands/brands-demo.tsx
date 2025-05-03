"use client";
import React from "react";
import Brands from "./brands";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function BrandsDemo({ isPrivate }: Props) {
  const data = {
    variation: "default",
    primary: {
      title: "Our Partners",
    },
    items: [
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
      {
        logo: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          alt: "Brand Logo",
        },
        link: {
          url: "https://images.prismic.io/cafeboulud/ZhOKnxrFxhpPBXEc_image1.png?auto=format%2Ccompress&fit=max&w=128",
          target: "_blank",
        },
        image_width: 100,
      },
    ],
  };
  return (
    <>
      <Brands data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import { Brands } from "@/components/brands";
// Define your brands data
const data = {
    variation: "default",
    primary: {
        title: "Our Partners",
    },
    items: [
        {
            logo: {
                url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
                alt: "Brand Logo",
            },
            link: {
                url: "https://example.com",
                target: "_blank",
            },
            image_width: 100,
        },
        // Add more items as needed
    ],
};
// Use the component
export default function BrandsSection() {
    return (
        <Brands data={data} />
    );
}`}
            </pre>
            <p className="mt-2 text-sm text-gray-500">
              This is a code snippet showing how to use the Brands component.
              You can customize the data object to fit your needs.
            </p>
          </div>

          {/* installation command copy */}
          <ClickToCopy path="dinex-brands" />
        </>
      )}
    </>
  );
}

export default BrandsDemo;
