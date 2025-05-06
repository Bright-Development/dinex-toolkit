import React from "react";
import RecentPress from "./recentPress";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function RecentPressDemo({ isPrivate }: Props) {
  const data: {
    variation: "withImage" | "default";
    primary: { page_title: string };
    items: {
      image: { url: string; alt: string };
      title: string;
      date: string;
      place: string;
      read_more?: string;
      read_more_text_link?: { url: string; target?: string; title?: string };
    }[];
  } = {
    variation: "withImage",
    primary: {
      page_title: "Recent Press",
    },
    items: [
      {
        image: {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
          alt: "Press Image",
        },
        title: "Press Title",
        date: "Date",
        place: "Place",
      },
      {
        image: {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
          alt: "Press Image",
        },
        title: "Press Title 2",
        date: "Date 2",
        place: "Place 2",
      },
    ],
  };
  return (
    <>
      <RecentPress data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import { RecentPress } from "@/components/recentPress";
// Define your recent press data
const data = {
    variation: "withImage",
    primary: {
        page_title: "Recent Press",
    },
    items: [
        {
            image: {
                url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
                alt: "Press Image",
            },
            title: "Press Title",
            date: "Date",
            place: "Place",
        },
        {
            image: {
                url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
                alt: "Press Image",
            },
            title: "Press Title 2",
            date: "Date 2",
            place: "Place 2",
        },
    ],
};
// Use the component in your page
<RecentPress data={data} />
`}
            </pre>
          </div>

          {/* installation command copy */}
          <ClickToCopy path="dinex-recentPress" />
        </>
      )}
    </>
  );
}

export default RecentPressDemo;
