"use client";
import { JSX, useEffect, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import Image from "next/image";

export type CarouselProps = {
  /**
   * The data for the data.
   */
  data: {
    variation?: "default" | "noCarousel";
    id?: string;
    primary: {
      title: string;
      description?: Array<{
        text: string;
        type: string;
      }>;
    };

    items: Array<{
      heading: string;
      subheading: string;
      description: Array<{
        text: string;
        type: string;
      }>;
      image: {
        url: string;
        alt: string;
      };
      cta: string;
    }>;
  };
};

type ChefProfile = {
  heading: string;
  subheading: string;
  description: Array<{
    text: string;
    type: string;
  }>;
  image: {
    url: string;
    alt: string;
  };
  cta: string;
} | null;

const Carousel = ({ data }: CarouselProps): JSX.Element => {
  const options = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
  });

  useEffect(() => {
    let autoplayInterval: NodeJS.Timeout;

    if (emblaApi) {
      const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
          if (!emblaApi.canScrollNext()) {
            emblaApi.scrollTo(0);
          } else {
            emblaApi.scrollNext();
          }
        }, 30000);
      };

      const stopAutoplay = () => {
        clearInterval(autoplayInterval);
      };

      startAutoplay();

      emblaApi.on("pointerDown", stopAutoplay);
      emblaApi.on("pointerUp", () => {
        stopAutoplay();
        setTimeout(startAutoplay, 30000);
      });

      return () => {
        stopAutoplay();
        emblaApi.off("pointerDown", stopAutoplay);
        emblaApi.off("pointerUp", stopAutoplay);
      };
    }
  }, [emblaApi]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChefProfile>(null);

  const openModal = (item: ChefProfile) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    gsap.to("#modal", {
      opacity: 0,
      duration: 0.5,
      ease: "sine",
      onComplete: () => {
        setSelectedItem(null);
        setModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (modalOpen) {
      gsap.from("#modal", {
        opacity: 0,
        duration: 0.5,
        ease: "sine",
      });
    }
  }, [modalOpen]);

  return (
    <section className="carousel-section">
      <div className="my-8 lg:my-12">
        {data.primary.title && (
          <h2 className="sectionHeading mb-10">{data.primary.title}</h2>
        )}
        {data.variation === "noCarousel" ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 sm:gap-x-6 md:flex-row">
            {data.items.slice(0, 4).map((item, index) => (
              <div className="mb-10" key={index}>
                <Image
                  className="w-full max-w-[400px] grayscale filter"
                  src={item.image.url}
                  alt={item.image.alt || ""}
                  width={400}
                  height={400}
                />
                <div className="font-louize text-black dark:text-white">
                  <h3 className="mt-7 text-sm font-thin tracking-wider md:text-base xl:text-lg">
                    {item.heading}
                  </h3>
                  <h4 className="text-sm font-thin tracking-wider md:text-base xl:text-lg">
                    {item.subheading}
                  </h4>
                  {item.cta && (
                    <button
                      onClick={() => openModal(item)}
                      className="link bottom_line_dark text-sm font-thin tracking-wider opacity-30 focus:outline-none md:text-base xl:text-lg"
                    >
                      {item.cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="carousel hidden md:block">
              <div className="overflow-hidden md:px-11" ref={emblaRef}>
                <div
                  className={`ml-[calc(var(--slide-spacing)_*_-1)] flex touch-pan-y md:ml-[calc(var(--slide-spacing-sm)_*_-1)] xl:ml-[calc(var(--slide-spacing-lg)_*_-1)] ${data.items.length <= 3 ? `justify-center` : ``}`}
                >
                  {data.items.map((item, index) => (
                    <div className="w-full !ps-4" key={index}>
                      <Image
                        className="w-full max-w-[400px] grayscale filter"
                        src={item.image.url}
                        alt={item.image.alt || ""}
                        width={400}
                        height={400}
                      />
                      <div className="text-black dark:text-white">
                        <h3 className="mt-7 text-sm font-thin tracking-wider md:text-base xl:text-lg">
                          {item.heading}
                        </h3>
                        <h4 className="text-sm font-thin tracking-wider md:text-base xl:text-lg">
                          {item.subheading}
                        </h4>
                        {item.cta && (
                          <button
                            onClick={() => openModal(item)}
                            className="link bottom_line_dark text-sm font-thin tracking-wider opacity-30 focus:outline-none md:text-base xl:text-lg"
                          >
                            {item.cta}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-6 sm:gap-x-6 md:hidden">
              {data.items.map((item, index) => (
                <div className="mb-10" key={index}>
                  <Image
                    className="w-full max-w-[400px] grayscale filter"
                    src={item.image.url}
                    alt={item.image.alt || ""}
                    width={400}
                    height={400}
                  />
                  <div className="text-black dark:text-white">
                    <h3 className="mt-7 text-sm font-thin tracking-wider md:text-base xl:text-lg">
                      {item.heading}
                    </h3>
                    <h4 className="text-sm font-thin tracking-wider md:text-base xl:text-lg">
                      {item.subheading}
                    </h4>
                    <button
                      onClick={() => openModal(item)}
                      className="link bottom_line_dark text-sm font-thin tracking-wider opacity-30 focus:outline-none md:text-base xl:text-lg"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {modalOpen && selectedItem && (
        <div
          className="dark:bg-dark_primary fixed left-0 top-0 z-[999] flex h-screen w-screen overflow-auto bg-black/90"
          id="modal"
        >
          <div className="flex h-screen w-screen flex-col overflow-auto px-6 lg:items-center lg:justify-center lg:px-12">
            <div className="py-8">
              <button
                onClick={closeModal}
                data-v-62813b70=""
                className="modal__close absolute left-6 top-[2.75rem] z-50 leading-none focus:outline-none lg:left-12 lg:top-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="sectionHeading block lg:hidden">
                {selectedItem.heading}
              </h3>
            </div>
            <div className="flex h-[fit-content] w-full flex-wrap justify-center lg:flex-nowrap lg:gap-[5rem]">
              <div className="lg:w-[35%]">
                <Image
                  className="w-full grayscale filter"
                  src={selectedItem.image.url}
                  alt={selectedItem.image.alt || ""}
                  width={400}
                  height={400}
                />
              </div>

              <div className="w-full text-black dark:text-white lg:w-[65%]">
                <h3 className="sectionHeading hidden lg:block">
                  {selectedItem.heading}
                </h3>
                <h4 className="py-6 text-center text-sm font-thin tracking-wider md:text-base lg:py-0 xl:text-lg">
                  {selectedItem.subheading}
                </h4>
                <div className="pb-10 text-sm font-thin tracking-wider text-black dark:text-white md:text-base lg:py-10 xl:text-lg">
                  {data.primary.description
                    ? data.primary.description.map((item, index) => (
                        <p key={index} className="mb-2">
                          {item.text}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carousel;
