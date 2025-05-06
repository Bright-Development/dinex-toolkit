import Image from "next/image";
import { JSX } from "react";

/**
 * Props for `LargeImageAndDescription`.
 */

export interface LargeImageAndDescriptionProps {
  data: {
    // variation: string | "leftText" | "rightText"; restrict the variation to only two options
    variation: "leftText" | "rightText";
    primary: {
      background_color?: boolean;
      image_text?: string;
      image_text_color?: string;
      heading?: string;
      description: {
        type: string;
        text: string;
      }[];
      image: any;
    };
  };
}

/**
 * Component for "LargeImageAndDescription" Slices.
 */
const LargeImageAndDescription = ({
  data,
}: LargeImageAndDescriptionProps): JSX.Element => {
  return (
    <section className={`px-4 py-8 md:px-11 md:py-16`}>
      <div
        className={`flex flex-col justify-between lg:flex-row  ${
          data.primary.background_color
            ? "bg-light_secondary text-white dark:bg-dark_primary"
            : "gap-4"
        }`}
      >
        <div
          className={`mb-4 flex w-full flex-1 items-center justify-center md:mb-0 lg:w-1/2 ${
            data.variation === "leftText" && "lg:order-2"
          }`}
        >
          <div className="relative h-full">
            <Image
              src={data.primary.image.url}
              alt={data.primary.image.alt}
              width={1000}
              height={1000}
              className="h-full min-h-[400px] w-full object-cover"
            />
            {data.primary.image_text && (
              <div
                className="absolute left-7 top-4 w-[70%] text-xl uppercase md:w-[50%] md:text-2xl lg:text-3xl"
                style={{
                  color: data.primary.image_text_color
                    ? data.primary.image_text_color
                    : "white",
                }}
              >
                {data.primary.image_text}
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex w-full flex-col px-7 py-4 text-sm leading-6 tracking-wider md:text-base lg:w-1/2 lg:justify-center xl:text-lg`}
        >
          {data.primary.heading && (
            <h2
              className={`max-w-[557px] text-2xl font-bold uppercase !leading-[120%] text-light_secondary md:text-3xl lg:text-[40px] ${
                data.primary.background_color &&
                "text-dark_primary dark:text-light_primary"
              }`}
            >
              {data.primary.heading}
            </h2>
          )}
          <div
            className={`largeImageAndDescription ${
              data.primary.heading && "mt-2"
            }`}
          >
            {data.primary.description.map((text, index) => (
              <p key={index}>{text.text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LargeImageAndDescription;
