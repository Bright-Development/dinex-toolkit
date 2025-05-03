"use client";
import { ArrowRight, Volume, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

export type HeroProps = {
  /**
   * The data for the slice.
   */
  data: {
    variation?: "default" | "video" | "carousel";
    id?: string;
    primary: {
      heading: string;
      description?: Array<{
        text: string;
        type: string;
      }>;
      mobile_image: {
        url: string;
        alt: string;
      };
      desktop_image: {
        url: string;
        alt: string;
      };
      video?: {
        url?: string;
      };
      images?: Array<{
        url: string;
        alt: string;
      }>;
      cta?: {
        url: string;
        text: string;
        link_type: string;
      };
      overlay?: boolean;
      isBrand?: boolean;
      brands?: Array<{
        logo: {
          url: string;
          alt: string;
        };
        link: {
          url: string;
          link_type: string;
        };
      }>;
      // height?: string;
      height?: string | number;
    };
  };
};

export const Hero = ({ data }: HeroProps): JSX.Element => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const interval = 3000; // Interval in milliseconds

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % (data.primary.images?.length ?? 1)
        );
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [data.primary.images?.length ?? 0, interval, isPlaying, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (data.primary.images?.length ?? 1)) %
        (data.primary.images?.length ?? 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (data.primary.images?.length ?? 1)
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      className={`section hero app-h overlay relative overflow-hidden text-white`}
      style={{
        height:
          data.variation === "carousel" || data.variation === "default"
            ? `${Math.max(Number(data.primary.height) || 100, 50)}vh`
            : "100vh",
      }}
    >
      {data.variation === "video" ? (
        <>
          {data.primary.video?.url && (
            <div className="relative h-screen w-screen">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              >
                <source src={data.primary.video.url} type="video/mp4" />
              </video>
              <button
                className="absolute bottom-[13%] right-6 h-12 w-12 rounded-full bg-light_secondary p-2 dark:bg-light_secondary lg:bottom-4"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <Volume2 className="h-full w-full fill-dark_primary dark:fill-light_primary" />
                ) : (
                  <Volume className="h-full w-full fill-dark_primary dark:fill-light_primary" />
                )}
              </button>
            </div>
          )}
        </>
      ) : data.variation === "default" ? (
        <>
          <div className="hero__container absolute inset-0 flex flex-col justify-end bg-cover bg-center bg-no-repeat p-6 opacity-100 md:p-8 lg:p-16">
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={data.primary.mobile_image.url || ""}
                width={400}
                height={300}
              />
              <Image
                src={data.primary.desktop_image.url}
                className="absolute inset-0 h-full w-full select-none object-cover"
                loading="eager"
                width={1920}
                height={1080}
                alt={data.primary.desktop_image.alt || ""}
              />
            </picture>
          </div>
        </>
      ) : (
        data.variation === "carousel" && (
          <div className="relative h-full w-full overflow-hidden">
            {data.primary.images &&
              data.primary.images.map((item, index) => (
                <Image
                  key={index}
                  src={item.url}
                  className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                  loading="eager"
                  width={1920}
                  height={1080}
                  alt={item.alt || ""}
                />
              ))}
            <button
              onClick={handlePrevious}
              className="absolute left-6 top-1/2 z-30 w-6 -translate-y-1/2 rotate-180 transform"
            >
              <ArrowRight />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 z-30 w-6 -translate-y-1/2 transform"
            >
              <ArrowRight />
            </button>
          </div>
        )
      )}
      {/* heading and description */}
      <div
        className={`absolute flex flex-col z-20
              ${
                !data.primary.isBrand
                  ? "bottom-6 left-6"
                  : "text-center justify-center items-center inset-0"
              }`}
      >
        <h1 className="font-radio max-w-5xl font-interTight text-4xl uppercase !leading-[120%] tracking-widest opacity-100 md:text-5xl xl:text-[64px]">
          {data.primary.heading}
        </h1>
        <div className="mt-4 max-w-2xl font-interTight text-lg !leading-[155%] text-light opacity-100">
          {data.primary.description
            ? data.primary.description.map((item, index) => (
                <p key={index} className="mb-2">
                  {item.text}
                </p>
              ))
            : null}
        </div>
      </div>
      {/* brands */}
      {data.primary.isBrand && (
        <div className="absolute bottom-6 left-6 z-10 flex flex-col pe-6 md:bottom-10 md:left-10 justify-center items-center right-6 md:right-10">
          <div className="z-20 mt-16 hidden items-center justify-between gap-9 xl:flex">
            {data.primary.brands &&
              data.primary.brands.map((brand, index) => (
                <Link
                  href={brand.link.url}
                  className="max-h-20 mx-w-20 overflow-hidden"
                  key={index}
                >
                  <Image
                    src={brand.logo.url}
                    className="h-full w-full object-contain brightness-200 grayscale filter"
                    alt={brand.logo.alt || ""}
                    width={100}
                    height={100}
                  />
                </Link>
              ))}
          </div>
          <Marquee className="z-20 mt-8 items-center justify-between gap-9 xl:!hidden">
            {data.primary.brands &&
              data.primary.brands.map((brand, index) => (
                <Link
                  href={brand.link.url}
                  className="max-h-11 md:max-h-14"
                  key={index}
                >
                  <Image
                    src={brand.logo.url}
                    className="h-full w-full object-contain brightness-200 grayscale filter"
                    alt={brand.logo.alt || ""}
                    width={100}
                    height={100}
                  />
                </Link>
              ))}
          </Marquee>
        </div>
      )}
      {/* overlay */}
      {data.primary.overlay && (
        <div className="hero__overlay absolute inset-0 flex flex-col items-center justify-center bg-black/20" />
      )}
    </section>
  );
};
