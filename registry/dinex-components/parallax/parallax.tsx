"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type JSX } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * Props for `Parallax`.
 */
type ImageProps = {
  url: string;
  alt: string;
};

export type ParallaxProps = {
  /**
   * The data for the slice.
   */
  data: {
    id: string;
    variation: string;
    primary: {
      title: string;
      left_image: ImageProps;
      right_image: ImageProps;
      description: {
        type: string;
        text: string;
      }[];

      cta: {
        link_type: string;
        url: string;
        text: string;
      };
    };
  };
};

/**
 * Component for "Parallax" Slices.
 */
const Parallax = ({ data }: ParallaxProps): JSX.Element => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
      gsap.to(box, {
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: box,
        onEnter: () => {
          gsap.to(box, {
            opacity: 1,
            duration: 0.5,
            ease: "none",
          });
        },
        start: "-50% center",
        end: "center center",
        scrub: true,
      });
    });
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const leftImage = document.getElementById(`leftImage-${data.id}`);
    const rightImage = document.getElementById(`rightImage-${data.id}`);

    if (leftImage && rightImage) {
      gsap.fromTo(
        leftImage,
        {
          y: 100,
        },
        {
          y: isMobile ? 0 : -60,
          ease: "none",
          scrollTrigger: {
            trigger: leftImage,
            scrub: true,
            start: "-350 bottom",
            end: "+1080 center",
          },
        }
      );

      gsap.fromTo(
        rightImage,
        {
          y: -70,
          x: isMobile ? 0 : -50,
        },
        {
          y: isMobile ? 50 : 40,
          ease: "none",
          scrollTrigger: {
            trigger: rightImage,
            scrub: true,
            start: "-350 bottom",
            end: "+1080 center",
          },
        }
      );
    }
  }, [data.id, isMobile]);

  const prevIsMobileRef = useRef<boolean>(undefined);
  useEffect(() => {
    if (
      prevIsMobileRef.current !== undefined &&
      prevIsMobileRef.current !== isMobile
    ) {
      window.location.reload();
    }
    prevIsMobileRef.current = isMobile;
  }, [isMobile]);

  return (
    <section
      data-slice-variation={data.variation}
      className="section w-full bg-light_primary px-6 py-12 text-current dark:bg-dark_primary lg:px-12 lg:py-28"
    >
      <div className="text-center font-bodoni text-2xl tracking-widest text-black !contrast-[10.78] dark:text-white md:text-3xl xl:text-4xl">
        <div className="mb-8">
          <h2 className="!text-new_primary">{data.primary.title}</h2>
        </div>
      </div>
      <div className="relative grid w-full grid-cols-12">
        <div className={`col-span-7 col-start-1 max-lg:col-span-8 `}>
          <Image
            src={data.primary.left_image.url}
            alt={data.primary.left_image.alt || ""}
            className="box w-full object-cover"
            id={`leftImage-${data.id}`}
            width={1920}
            height={1080}
          />
        </div>

        <div className={`col-span-12 col-start-8  max-lg:-mt-[100%] `}>
          <Image
            src={data.primary.right_image.url}
            alt={data.primary.right_image.alt || ""}
            className="box w-full object-cover"
            id={`rightImage-${data.id}`}
            width={1920}
            height={1080}
          />
        </div>
      </div>
      <div className="mx-auto max-w-[50rem] px-4 pt-10 text-center text-sm font-thin uppercase !leading-[141%] tracking-wider text-black dark:text-white md:text-base lg:px-0 lg:pt-[54px] xl:text-lg">
        {data.primary.description.map((text, index) => (
          <p
            key={index}
            className={`box ${
              index === 0 ? "!opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          >
            {text.text}
          </p>
        ))}
        {data.variation == "default" && (
          <div className="bottom_line_dark mt-6  !leading-[100%]">
            <Link className="" href={data.primary.cta.url} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Parallax;
