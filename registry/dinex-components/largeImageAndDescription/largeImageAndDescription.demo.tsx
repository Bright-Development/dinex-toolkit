import React from "react";
import LargeImageAndDescription from "./largeImageAndDescription";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function LargeImageAndDescriptionDemo({ isPrivate }: Props) {
  const data: {
    variation: "rightText" | "leftText";
    primary: {
      image: { url: string; alt: string };
      image_text: string;
      heading: string;
      description: { text: string; type: string }[];
    };
  } = {
    variation: "rightText",
    primary: {
      image: {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
        alt: "Left Image",
      },
      image_text: "Image Text",
      heading: "Large Image and Description",
      description: [
        { text: "Description text", type: "paragraph" },
        {
          text: "Another description text",
          type: "paragraph",
        },
      ],
    },
  };
  return (
    <>
      <LargeImageAndDescription data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import { LargeImageAndDescription } from "@/components/largeImageAndDescription";
// Define your large image and description data
const data = {
    variation: "rightText",
    primary: {
        image: {
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
            alt: "Left Image",
        },
        image_text: "Image Text",
        heading: "Large Image and Description",
        description: [
            { text: "Description text", type: "paragraph" },
            {
                text: "Another description text",
                type: "paragraph",
            },
        ],
    },
};
// Render the component
<LargeImageAndDescription data={data} />
`}
            </pre>
          </div>

          {/* installation command copy */}
          <ClickToCopy path="dinex-largeImageAndDescription" />
        </>
      )}
    </>
  );
}

export default LargeImageAndDescriptionDemo;
