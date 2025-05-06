import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

/**
 * Props for `Brands`.
 */
export type BrandsProps = {
  data: {
    variation: string;
    primary: {
      title: string;
    };
    items: {
      logo: {
        url: string;
        alt: string;
      };
      link: {
        url: string;
        target?: string;
      };
      image_width?: number;
    }[];
  };
};

/**
 * Component for "Brands" datas.
 */
const Brands = ({ data }: BrandsProps): JSX.Element => {
  return (
    <section className="bg-light_primary dark:bg-dark_primary">
      <div className="mx-auto px-6 py-12 text-center text-current lg:w-10/12 lg:px-12 lg:py-28 2xl:w-8/12">
        <div className="mb-10 text-sm uppercase tracking-wider md:text-base lg:mb-20 xl:text-lg">
          <h2 className="text-2xl font-bold leading-[120%] text-light_secondary dark:text-dark_secondary lg:text-4xl">
            {data.primary.title}
          </h2>
        </div>
        <div className="-mx-2 flex flex-wrap items-center justify-around lg:mx-0">
          {data.items.map((item, index) => {
            return (
              <div
                className="flex h-[auto] w-1/3 justify-center px-4 py-7 lg:w-1/4 lg:px-8"
                key={index}
              >
                <Link href={item.link.url} target={item.link.target}>
                  <Image
                    width={item.image_width ?? 100}
                    height={item.image_width ?? 100}
                    src={item.logo.url}
                    alt={item.logo.alt || ""}
                    className="inline-block"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Brands;
