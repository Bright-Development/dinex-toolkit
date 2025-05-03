import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export interface RecentPressProps {
  data: {
    variation: "default" | "withImage";
    primary: {
      page_title: string;
    };
    items: {
      title: string;
      date: string;
      place: string;
      read_more?: string;
      read_more_text_link?: {
        url: string;
        target?: string;
        title?: string;
      };
      image: {
        url: string;
        alt: string;
      };
    }[];
  };
}

const RecentPress = ({ data }: RecentPressProps): JSX.Element => {
  return (
    <section>
      <div className="px-6 py-10 lg:my-20">
        <div className="bg-light_primary pb-12 text-center font-rom text-2xl font-bold uppercase tracking-widest text-light_secondary dark:bg-dark_primary dark:text-dark_secondary md:text-3xl lg:pb-32 xl:text-4xl">
          <h1>{data.primary.page_title}</h1>
        </div>
        {data.variation === "default" ? (
          <div className="mx-auto border-t border-black dark:border-white lg:w-3/5">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-black py-10 text-center dark:border-white lg:text-left"
              >
                <div className="text-black dark:text-white lg:flex">
                  <div className="mb-2 bg-light_primary text-center font-radio text-2xl tracking-widest dark:bg-dark_primary md:text-3xl lg:mb-0 lg:w-1/2 xl:text-4xl">
                    <div className="text-light_secondary dark:text-dark_secondary lg:text-left">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="text-sm uppercase tracking-wider md:text-base xl:text-lg">
                      <div className="mb-5 lg:mb-6">{item.date}</div>
                      <div className="mb-5 lg:mb-6">
                        <p>{item.place}</p>
                      </div>

                      {item.read_more && (
                        <Link
                          className="bottom_line_dark"
                          href={item.read_more_text_link?.url || ""}
                        >
                          {item.read_more}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto w-full border-t border-black dark:border-white md:w-4/5 lg:w-3/5">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-black py-8 text-center dark:border-white sm:py-10 lg:text-left"
              >
                <div className="grid grid-cols-1 items-center gap-6 text-black dark:text-white lg:grid-cols-2 lg:gap-16">
                  <div className="flex items-center justify-center bg-cream px-[50px] py-5 dark:bg-dark_secondary">
                    <div className=" max-h-[300px] max-w-[250px] lg:h-[300px] lg:w-[250px]">
                      <Image
                        src={item.image?.url}
                        alt={item.image?.alt || ""}
                        className="h-full w-full object-cover"
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col gap-6">
                      <div className="font-cormorant mb-2 bg-light_primary text-center text-2xl tracking-widest dark:bg-dark_primary md:text-3xl lg:mb-0 xl:text-[36px]">
                        <div className="text-light_secondary dark:text-dark_secondary lg:text-left">
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                      <div className="font-interTight flex w-full flex-col gap-6 text-sm tracking-wider md:text-base xl:text-[18px]">
                        <div>{item.date}</div>
                        <div>
                          <p>{item.place}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-center lg:text-left">
                      {item.read_more && (
                        <Link
                          className="font-interTight w-fit text-[18px] uppercase leading-4 underline underline-offset-4 max-lg:mx-auto"
                          href={item.read_more_text_link?.url || ""}
                        >
                          {item.read_more}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPress;
