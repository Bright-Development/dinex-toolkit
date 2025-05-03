import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";

// Dinex components
import DanielHeroDemo from "@/registry/dinex-components/hero/hero-demo";
import ParallaxDemo from "@/registry/dinex-components/parallax/parallax-demo";
import DinexHeroDemo from "@/registry/dinex-components/navbar/navbar-demo";
import BrandsDemo from "@/registry/dinex-components/brands/brands-demo";
import RecentPressDemo from "@/registry/dinex-components/recentPress/recentPress-demo";
import LargeImageAndDescriptionDemo from "@/registry/dinex-components/largeImageAndDescription/largeImageAndDescription.demo";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-7xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dinex Components</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-1 flex-col gap-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Dinex Hero Component */}
          <div className="flex flex-col gap-4 overflow-hidden rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dinex Hero</h2>
                <p className="text-sm text-muted-foreground">
                  Hero section with video background and overlay for restaurant
                  sites
                </p>
              </div>
              <OpenInV0Button name="dinex-hero" className="w-fit" />
            </div>
            <div className="relative overflow-hidden rounded-md">
              <DanielHeroDemo isPrivate={true} />
            </div>
          </div>
          {/* Dinex parallax Component */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dinex Parallax</h2>
                <p className="text-sm text-muted-foreground">
                  Parallax scrolling effect with images and text overlay
                </p>
              </div>
              <OpenInV0Button name="dinex-parallax" className="w-fit" />
            </div>
            <div className="relative">
              <ParallaxDemo isPrivate={true} />
            </div>
          </div>
          {/* Dinex parallax Navbar */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dinex Navbar</h2>
                <p className="text-sm text-muted-foreground">
                  Responsive navigation bar with dropdowns and mobile support
                </p>
              </div>
              <OpenInV0Button name="dinex-navbar" className="w-fit" />
            </div>
            <div className="relative">
              {/* Add your navbar component here */}
              <DinexHeroDemo isPrivate={true} />
            </div>
          </div>
          {/* Dinex LargeImageAndDescription */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Dinex Large Image and Description
                </h2>
                <p className="text-sm text-muted-foreground">
                  Large image with description and optional text overlay
                </p>
              </div>
              <OpenInV0Button name="dinex-large-image" className="w-fit" />
            </div>

            <div className="relative">
              <LargeImageAndDescriptionDemo isPrivate={true} />
            </div>
          </div>

          {/* Dinex Recent Press */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dinex Recent Press</h2>
                <p className="text-sm text-muted-foreground">
                  Recent press section with title, date, and read more link
                </p>
              </div>
              <OpenInV0Button name="dinex-large-image" className="w-fit" />
            </div>

            <div className="relative">
              <RecentPressDemo isPrivate={true} />
            </div>
          </div>
          {/* Dinex Recent Press */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Dinex Recent Press</h2>
                <p className="text-sm text-muted-foreground">
                  Recent press section with title, date, and read more link
                </p>
              </div>
              <OpenInV0Button name="dinex-large-image" className="w-fit" />
            </div>

            <div className="relative">
              <BrandsDemo isPrivate={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
