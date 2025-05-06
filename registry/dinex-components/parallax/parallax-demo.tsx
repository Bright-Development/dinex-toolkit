"use client";

import React from "react";
import Parallax from "./parallax";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function ParallaxDemo({ isPrivate }: Props) {
  const data = {
    id: "parallax-demo",
    primary: {
      title: "Parallax Title",
      left_image: {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
        alt: "Left Image",
      },
      right_image: {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
        alt: "Right Image",
      },
      description: [
        {
          text: "Parallax description text",
          type: "paragraph",
        },
        {
          text: "Another description text",
          type: "paragraph",
        },
      ],
      cta: {
        url: "#",
        text: "Call to Action",
        link_type: "Web",
      },
    },
    variation: "default",
  };

  return (
    <>
      <Parallax data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import { Parallax } from "@/components/parallax";
// Define your parallax data
const data = {
  id: "parallax-demo",
  primary: {
    title: "Parallax Title",
    left_image: { 
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
      alt: "Left Image",
    },
    right_image: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
      alt: "Right Image",
    },
    description: [
      { text: "Parallax description text", type: "paragraph" },
      { text: "Another description text", type: "paragraph" },
    ],
    cta: {
      url: "#",
      text: "Call to Action",
      link_type: "Web",
    },
  },
  variation: "default",
};
// Use the component in your page
export default function ParallaxSection() {
  return (
    <Parallax data={data} />
  );
}`}
            </pre>
          </div>
          {/* installation command copy */}
          <ClickToCopy path="dinex-parallax" />
        </>
      )}
    </>
  );
}

export default ParallaxDemo;
