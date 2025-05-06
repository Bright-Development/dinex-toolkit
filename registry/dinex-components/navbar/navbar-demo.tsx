"use client";

import React from "react";

import DinexNavbar from "./navbar";
import ClickToCopy from "@/components/click-to-copy";

type Props = {
  isPrivate?: boolean;
};

function DinexHeroDemo({ isPrivate }: Props) {
  const data = {
    navbar: {
      data: {
        logo_link: {
          link_type: "Web",
          url: "https://dinex.com",
        },
        nav_links: [
          {
            link: {
              link_type: "Web",
              url: "/home",
              text: "Home",
              uid: "home",
            },
          },
          {
            link: {
              link_type: "Web",
              url: "/about",
              text: "About",
              uid: "about",
            },
          },
        ],
        right_cta: {
          link_type: "Web",
          url: "/contact",
          text: "Contact",
        },
      },
    },
    desktopImage: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
      alt: "Desktop Image",
    },
    mobileImage: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
      alt: "Mobile Image",
    },
    darkNavbar: true,
  };

  return (
    <>
      <DinexNavbar data={data} />

      {/* Component usage example code */}
      {isPrivate && (
        <>
          {" "}
          <div className="mx-auto mt-8 max-w-4xl border-t px-4 pt-8">
            <h3 className="mb-2 text-lg font-medium">
              Component Usage Example
            </h3>
            <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
              {`// Import the component
import DinexNavbar from "dinex-components/navbar";
// Use the component
<DinexNavbar
  data={{
    logo_link: {
      link_type: "Web",
      url: "https://dinex.com",
    },
    nav_links: [
      {
        link: {
          link_type: "Web",
          url: "/home",
          text: "Home",
          uid: "home",
        },
      },
      {
        link: {
          link_type: "Web",
          url: "/about",
          text: "About",
          uid: "about", 
          },
          },
          ],
          right_cta: {
            link_type: "Web",
            url: "/contact",
            },
            }}
            desktopImage={{
              url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
              alt: "Desktop Image",
              }}
              mobileImage={{
                url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop",
                alt: "Mobile Image",
                }}
                darkNavbar={true}
                />
                
                `}
            </pre>
          </div>
          {/* installation command copy */}
          <ClickToCopy path="dinex-navbar" />
        </>
      )}
    </>
  );
}

export default DinexHeroDemo;
