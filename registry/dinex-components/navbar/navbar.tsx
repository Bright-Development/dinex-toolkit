"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";

type ImageProps = {
  url: string;
  alt: string;
};

type NavbarDocument = {
  data: {
    logo_link: {
      link_type: string;
      url: string;
    };
    nav_links: NavbarDocumentDataNavLinksItem[];
    right_cta?: {
      link_type: string;
      url: string;
      text: string;
    };
    miscellaneous?: {
      address?: { text: string }[];
      instagram?: {
        link_type: string;
        url: string;
      };
      phone?: { text: string }[];
    };
  };
};
type NavbarDocumentDataNavLinksItem = {
  link: {
    link_type: string;
    url: string;
    text: string;
    uid: string;
  };
  options?: {
    link_type: string;
    url: string;
    text: string;
    uid: string;
  }[];
};

interface NavbarProps {
  navbar: NavbarDocument;
  desktopImage?: ImageProps;
  mobileImage?: ImageProps;
  darkNavbar?: boolean;
}

type Props = {
  data: NavbarProps;
};

const DinexNavbar: React.FC<Props> = ({
  data: { navbar, desktopImage, mobileImage, darkNavbar },
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [options, setOptions] = useState<string | null>(null);
  const [showBgImage, setShowBgImage] = useState<boolean>(false);
  const [menuColor, setMenuColor] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollingUp, setScrollingUp] = useState<boolean>(true);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const fullPath = usePathname();

  const parts = fullPath.split("/");
  const path = parts[parts.length - 1];
  const toggleMenu = () => {
    if (options === null) {
      setIsOpen(!isOpen);
      setShowBgImage(!showBgImage);
      setIsDropDownOpen(false);
    }
    if (options !== null) {
      setOptions(null);
    }
  };

  useEffect(() => {
    const SCROLL_UP_THRESHOLD = 3;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolling(scrollPosition >= 100);
      setIsInitial(scrollPosition < 50);
      if (path !== "") {
        if (
          scrollPosition > 50 &&
          scrollPosition > lastScrollY + SCROLL_UP_THRESHOLD
        ) {
          setScrollingUp(false);
        } else if (scrollPosition < lastScrollY) {
          setScrollingUp(true);
        }
        setLastScrollY(scrollPosition);
      }
      setMenuColor(scrollPosition >= 850);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, path]);

  useEffect(() => {
    if (path === "") {
      if (!isOpen) {
        gsap.to("#logo,#btn", {
          opacity: scrolling ? 0 : 1,
          duration: 0.5,
          display: scrolling ? "none" : "block",
          onComplete: () => {
            gsap.set("#nav", {
              width: scrolling ? "auto" : "",
            });
          },
        });
        gsap.set("#nav", {
          width: scrolling ? "" : "100%",
        });
      } else {
        gsap.to("#logo", {
          opacity: 1,
          display: "block",
          duration: 0.4,
        });
        gsap.set("#nav", {
          width: "100%",
        });
      }
    } else if (!isOpen && path !== "") {
      if (scrollingUp) {
        gsap.to("#nav", {
          translateY: 0,
          duration: 0.2,
        });
      } else {
        gsap.to("#nav", {
          translateY: -150,
          duration: 0.4,
          onComplete: () => {
            gsap.set("#nav", {
              background: "rgb(255, 252, 245)",
            });
          },
        });
      }
      if (isInitial) {
        gsap.to("#nav", {
          background: "rgba(254, 249, 236, 0)",
        });
      }
    }
  }, [isOpen, scrolling, scrollingUp, isInitial, path]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      //  if (isOpen) {
      tl.from(".nav_link", {
        opacity: 0,
        y: 10,
        stagger: 0.15,
        ease: "none",
      });
      // it's causing issues in mobile browsers
      if (!isMobile) {
        tl.from(
          "#bg_image",
          {
            opacity: 0,
            duration: 0.4,
            ease: "sine",
          },
          "<"
        );
      }
      //  } else {
      //    tl.to("#bg_image", {
      //      opacity: 0,
      //      duration: 0.4,
      //      ease: "sine",
      //    });
      //  }
      return () => {
        tl.kill();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    gsap.from("#reservation, #contact, .nav_link", {
      opacity: 0,
      duration: 1,
    });
  }, [options]);

  const pathname = usePathname();
  const isPrivateDining = pathname.includes("private-dining");

  return (
    <header>
      <nav
        className={`fixed left-0 top-0 z-[100] w-full px-6 py-3 text-sm text-white transition-opacity md:px-[48px] md:py-[18px] md:text-base lg:py-8 ${
          isOpen ? "h-dvh !bg-black/50" : "bg-transparent"
        }`}
        id="nav"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div
          className={`flex ${path !== "" && "items-center"} justify-between ${
            isOpen ? "fixed left-6 right-6 md:left-[48px] md:right-[48px]" : ""
          }`}
        >
          {navbar.data.nav_links?.length > 0 ? (
            <button
              className="relative flex h-6 w-6 cursor-pointer flex-col items-center justify-between py-2 md:w-8 md:py-1"
              id="menu-icon"
              name="menu-icon"
              aria-label="Menu Icon"
              onClick={toggleMenu}
            >
              <div
                className={`absolute !h-[1px] w-full rounded-md transition-all ${
                  menuColor &&
                  !isOpen &&
                  path === "" &&
                  "bg-black dark:bg-white"
                } ${
                  !isOpen
                    ? darkNavbar
                      ? !isInitial
                        ? "!bg-black"
                        : "!bg-white"
                      : "!bg-black"
                    : "!bg-white"
                } transition-all duration-300 ${
                  isOpen && options == null
                    ? "translate-y-[7px] rotate-45 md:translate-y-[7px]"
                    : options !== null
                    ? "!w-[70%] translate-y-0 -rotate-45 md:translate-y-0"
                    : "translate-y-1/2"
                }`}
              ></div>
              <div
                className={`absolute top-[65%] !h-px w-full rounded-md transition-all md:top-[54%] md:!h-[2px] md:opacity-55 ${
                  menuColor &&
                  !isOpen &&
                  path === "" &&
                  "bg-black dark:bg-white"
                } ${
                  !isOpen
                    ? darkNavbar
                      ? !isInitial
                        ? "!bg-black"
                        : "!bg-white"
                      : "!bg-black"
                    : "!bg-white"
                } transition-all duration-300 ${isOpen ? "hidden" : "block"}`}
              ></div>
              <div
                className={`absolute bottom-0 !h-[1px] w-full rounded-md transition-all ${
                  menuColor &&
                  !isOpen &&
                  path === "" &&
                  "bg-black dark:bg-white"
                } ${
                  !isOpen
                    ? darkNavbar
                      ? !isInitial
                        ? "!bg-black"
                        : "!bg-white"
                      : "!bg-black"
                    : "!bg-white"
                } transition-all duration-300 ${
                  isOpen && options == null
                    ? "-translate-y-[8px] -rotate-45 md:-translate-y-[12px]"
                    : options !== null
                    ? "!w-[70%] -translate-y-1 rotate-45 md:-translate-y-1"
                    : "-translate-y-1/2"
                }`}
              ></div>
            </button>
          ) : (
            <div className={`p-4 ${isOpen && "h-[17px] w-[31px]"}`}></div>
          )}
          <div
            id="logo"
            aria-label="Go to Home"
            className={`flex cursor-pointer items-center justify-center`}
          >
            <Link
              href={navbar.data.logo_link.url}
              aria-label="Go to Home"
              className="flex h-full cursor-pointer items-center justify-center"
            >
              {path === "" ? (
                <PrimaryLogo className="h-20 w-20 fill-white md:h-40 md:w-60" />
              ) : (
                <PrimaryLogo
                  className={`h-20 ${
                    isOpen
                      ? "fill-white"
                      : isInitial
                      ? "fill-white"
                      : "fill-black"
                  }`}
                />
              )}
            </Link>
          </div>
          <div className={`p-4 ${isOpen && "h-[17px] w-[31px]"}`}></div>
        </div>

        {!isOpen && !isPrivateDining && (
          <div id="btn">
            <div
              className={`absolute right-6 top-5 md:right-12 ${
                path === "" ? "md:top-7 lg:top-10" : "top-9 lg:top-[52px]"
              }`}
            >
              <div className="md:hidden">
                <Button
                  isDarkMode={!darkNavbar ? false : isInitial ? true : false}
                  nextLink={navbar.data.right_cta?.url || ""}
                  label={navbar.data.right_cta?.text || ""}
                />
              </div>
              <div className="hidden md:block">
                <Button
                  isDarkMode={!darkNavbar ? false : isInitial ? true : false}
                  nextLink={navbar.data.right_cta?.url || ""}
                  label={navbar.data.right_cta?.text || ""}
                />
              </div>
            </div>
          </div>
        )}
        {isOpen && options === null && (
          <div className="flex h-dvh w-full items-center justify-center">
            <div className="opacity-1 flex w-full flex-col items-center text-center font-radio">
              <ul className="z-10 flex flex-col gap-2 xl:gap-3 h-lg:gap-[1vh] h-lg:xl:gap-[2vh]">
                {navbar.data.nav_links.map((item, index) => (
                  <CollpaseAble
                    item={item}
                    key={index}
                    index={index}
                    path={path}
                    isDropDownOpen={isDropDownOpen}
                    setIsDropDownOpen={setIsDropDownOpen}
                  />
                ))}
              </ul>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 transition-all md:bottom-2 md:row-end-13 md:px-[48px] lg:py-6">
              <div className="flex flex-col items-center justify-around gap-2 text-center text-sm lg:flex-row lg:text-start">
                <div className="order-2 flex justify-center lg:order-1 lg:w-1/3">
                  {navbar.data.miscellaneous?.address &&
                    navbar.data.miscellaneous?.address.map((text, index) => (
                      <p
                        key={index}
                        className={`box ${
                          index === 0 ? "!opacity-100" : "opacity-0"
                        } transition-opacity duration-500`}
                      >
                        {text.text}
                      </p>
                    ))}
                </div>
                {navbar.data.miscellaneous?.instagram && (
                  <div className="order-1 flex justify-center lg:order-2 lg:w-1/3">
                    <Link
                      href={navbar.data.miscellaneous.instagram.url}
                      className="rounded-full bg-light_primary p-1"
                    >
                      <Instagram className="h-6 w-6 fill-white transition-all duration-300 hover:scale-110 lg:h-8 lg:w-8" />
                    </Link>
                  </div>
                )}
                <div className="order-3 flex justify-center lg:w-1/3 lg:text-right">
                  {navbar.data.miscellaneous?.phone &&
                    navbar.data.miscellaneous?.phone.map((text, index) => (
                      <p
                        key={index}
                        className={`box ${
                          index === 0 ? "!opacity-100" : "opacity-0"
                        } transition-opacity duration-500`}
                      >
                        {text.text}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {showBgImage && (
        <div className="fixed left-0 right-0 top-0 z-[90] h-dvh" id="bg_image">
          {desktopImage ? (
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={mobileImage?.url || ""}
                width={900}
                height={1200}
              />
              <Image
                src={desktopImage?.url || ""}
                alt={desktopImage?.alt || ""}
                className="absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-500"
                loading="eager"
                width={1200}
                height={900}
              />
            </picture>
          ) : (
            <div className="absolute inset-0 h-full w-full select-none bg-dark_secondary object-cover transition-opacity duration-500"></div>
          )}
        </div>
      )}
    </header>
  );
};

export default DinexNavbar;

type CollpaseAbleProps = {
  item: NavbarDocumentDataNavLinksItem;
  index: number;
  path: string;
  isDropDownOpen: boolean;
  setIsDropDownOpen: (isOpen: boolean) => void;
};

const CollpaseAble = ({
  item,
  index,
  path,
  isDropDownOpen,
  setIsDropDownOpen,
}: CollpaseAbleProps) => {
  const handleClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <>
      {!item.options ? (
        <li className={`nav_link cursor-pointer font-rom`} key={index}>
          <Link
            href={item.link.url}
            className={`${
              path === item.link.uid?.toLowerCase()
                ? "bottom_line"
                : "nav_hover"
            } nav_links_text text-2xl font-[450] uppercase tracking-widest md:text-3xl xl:text-4xl max-h-md:!text-2xl`}
            aria-current={
              path === item.link.uid?.toLowerCase() ? "page" : undefined
            }
          ></Link>
        </li>
      ) : (
        <div className="relative flex flex-col justify-center font-rom">
          <button
            className={`nav_link flex cursor-pointer items-center justify-center gap-1`}
            key={index}
            onClick={handleClick}
          >
            <p
              className={`nav_links_text text-2xl font-[450] uppercase tracking-widest md:text-3xl xl:text-4xl max-h-md:!text-2xl`}
            >
              {item.link.text}
            </p>
            <Chevron
              className={`h-10 w-10 stroke-white transition-all ${
                !isDropDownOpen ? "rotate-180 transform " : ""
              }`}
            />
          </button>

          <div
            className={`w-full flex-col items-center justify-center pt-[1vh] text-center font-radio xl:pt-[2vh] ${
              isDropDownOpen ? "flex" : "hidden"
            }`}
          >
            <ul className="z-10 flex flex-col justify-center gap-2 xl:gap-3 h-lg:gap-[1vh] h-lg:xl:gap-[2vh]">
              {item.options.map((option: any, index: number) => (
                <li className={`nav_link`} key={index} onClick={handleClick}>
                  <Link
                    href={option.url}
                    className={`${
                      path === option.uid?.toLowerCase()
                        ? "bottom_line"
                        : "nav_hover"
                    } nav_links_text_small text-base font-[450] uppercase tracking-widest md:text-xl xl:text-2xl`}
                    aria-current={
                      path === option.uid?.toLowerCase() ? "page" : undefined
                    }
                  ></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

interface ChevronProps extends React.SVGProps<SVGSVGElement> {}

function Chevron(props: ChevronProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <path
        d="M30 25L20 15L10 25"
        stroke="inherit"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
    </svg>
  );
}

interface ButtonProps {
  label: string;
  nextLink: string;
  disabled?: boolean;
  isLoading?: boolean;
  target_blank?: boolean;
  isDarkMode?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  nextLink,
  target_blank,
  isDarkMode,
}) => {
  return (
    <Link
      href={nextLink}
      target={target_blank ? "_blank" : "_self"}
      className={`cursor-pointer hover:opacity-85 border p-2 px-12 text-sm font-thin uppercase tracking-[0.04em] transition-all focus:outline-none disabled:opacity-70 md:text-base xl:text-lg ${
        isDarkMode ? "border-white text-white" : "border-black text-black"
      }`}
    >
      {label}
    </Link>
  );
};

function PrimaryLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 158 157" {...props} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_221_1046)">
        <path
          d="M0.851074 133.77H7.89629L12.751 143.731V133.77H17.8943V155.979H13.2616L6.09058 141.637V155.979H0.851074V133.77Z"
          fill="inherit"
        ></path>
        <path
          d="M22.5195 133.77H36.6692V138.181H28.9283V141.992H34.7006V146.307H28.9283V151.635H37.2094V155.979H22.5195V133.77Z"
          fill="inherit"
        ></path>
        <path
          d="M39.5626 133.77H45.5939L47.4958 147.069L49.5902 133.77H54.9851L57.6492 147.35L58.9147 133.77H64.8795L61.3864 155.979H54.5633L52.4393 143.161L50.567 155.979H43.7734L39.5552 133.77H39.5626Z"
          fill="inherit"
        ></path>
        <path
          d="M82.4854 146.714L76.269 133.77H82.7444L85.6972 141.356L88.5834 133.77H94.7109L88.9016 146.714V155.979H82.4928V146.714H82.4854Z"
          fill="inherit"
        ></path>
        <path
          d="M95.7471 144.841C95.7471 138.018 99.4251 133.289 104.79 133.289C110.156 133.289 113.863 138.018 113.863 144.841C113.863 151.665 110.148 156.453 104.79 156.453C99.4325 156.453 95.7471 151.753 95.7471 144.841ZM104.79 151.694C106.189 151.694 106.951 149.378 106.951 144.841C106.951 140.305 106.189 138.048 104.79 138.048C103.392 138.048 102.666 140.364 102.666 144.841C102.666 149.319 103.362 151.694 104.79 151.694Z"
          fill="inherit"
        ></path>
        <path
          d="M117.733 133.77H126.621C132.297 133.77 134.902 136.212 134.902 139.676C134.902 141.963 133.57 143.961 131.187 144.908L135.058 155.979H128.457L125.445 146.018H124.142V155.979H117.733V133.77ZM125.607 141.889C127.546 141.889 128.464 141.03 128.464 139.824C128.464 138.743 127.731 137.885 125.733 137.885H124.15V141.881H125.607V141.889Z"
          fill="inherit"
        ></path>
        <path
          d="M138.869 133.77H145.278V141.955L150.133 133.77H156.29L151.309 141.674L156.897 155.986H150.014L146.588 145.9L145.285 147.964V155.994H138.877V133.785L138.869 133.77Z"
          fill="inherit"
        ></path>
        <path
          d="M0.84375 67.1663H12.5216C17.6945 67.1663 20.5215 69.5122 20.5215 73.0052C20.5215 75.5435 18.4272 77.6083 15.7926 77.8895C19.6631 78.4297 21.4096 80.3982 21.4096 83.0624C21.4096 86.9328 18.3976 89.375 11.7002 89.375H0.84375V67.1663ZM10.8713 75.921C12.9361 75.921 13.7279 74.9367 13.7279 73.797C13.7279 72.6574 12.9065 71.7989 11.0933 71.7989H7.85936V75.921H10.8713ZM10.6493 84.7423C12.8991 84.7423 13.9499 83.7876 13.9499 82.3963C13.9499 80.9089 12.9361 80.2058 10.9009 80.1762L7.85196 80.1466V84.7497H10.6419L10.6493 84.7423Z"
          fill="inherit"
        ></path>
        <path
          d="M27.6553 78.267C27.6553 71.318 32.2583 66.5891 38.9187 66.5891C45.5791 66.5891 50.2784 71.318 50.2784 78.267C50.2784 85.216 45.6457 89.9449 38.9187 89.9449C32.1917 89.9449 27.6849 85.216 27.6553 78.267ZM38.9483 84.5204C41.2943 84.5204 42.6263 82.204 42.6263 78.267C42.6263 74.33 41.2943 71.9544 38.9483 71.9544C36.6024 71.9544 35.2703 74.2708 35.2703 78.267C35.2703 82.2632 36.6024 84.5204 38.9483 84.5204Z"
          fill="inherit"
        ></path>
        <path
          d="M57.4126 81.3456V67.1589H64.4282V80.7091C64.4282 83.2771 65.8269 84.3871 67.6326 84.3871C69.3495 84.3871 70.6816 83.2771 70.6816 80.7091V67.1589H77.2162V81.3456C77.2162 86.7405 73.0571 89.9449 67.4772 89.9449C61.8973 89.9449 57.42 86.7405 57.42 81.3456H57.4126Z"
          fill="inherit"
        ></path>
        <path
          d="M85.7783 67.1663H92.7939V84.017H102.977V89.3824H85.7783V67.1737V67.1663Z"
          fill="inherit"
        ></path>
        <path
          d="M108.143 81.3456V67.1589H115.158V80.7091C115.158 83.2771 116.557 84.3871 118.363 84.3871C120.079 84.3871 121.412 83.2771 121.412 80.7091V67.1589H127.946V81.3456C127.946 86.7405 123.787 89.9449 118.207 89.9449C112.627 89.9449 108.15 86.7405 108.15 81.3456H108.143Z"
          fill="inherit"
        ></path>
        <path
          d="M136.508 67.1663H146.506C153.137 67.1663 157.17 71.5473 157.2 78.1115C157.2 84.7719 153.137 89.375 146.351 89.375H136.516V67.1663H136.508ZM145.33 84.2021C148.282 84.2021 149.711 81.9153 149.711 78.0745C149.711 74.2337 148.186 72.3318 145.648 72.3318H143.524V84.2021H145.33Z"
          fill="inherit"
        ></path>
        <path
          d="M0 11.8333C0 4.63267 4.75848 0 11.2931 0C15.7999 0 19.6407 2.66416 21.3206 6.97861C21.4761 7.35603 21.6981 8.05907 21.8313 8.78431L14.7269 9.54656C14.6603 9.03593 14.5715 8.5623 14.4382 8.11827C13.8388 6.31257 12.7213 5.35791 11.3893 5.35791C8.97673 5.35791 7.61505 7.60764 7.61505 11.7667C7.61505 15.9257 8.97673 17.9831 11.3893 17.9831C12.7213 17.9831 13.898 16.9396 14.4382 14.9711C14.5641 14.527 14.6603 14.0164 14.7269 13.4762L21.5797 14.2976C21.4835 15.0599 21.291 15.7259 21.1652 16.1699C19.6111 20.6102 15.8369 23.341 11.3005 23.341C4.75848 23.3558 0 18.8489 0 11.8333Z"
          fill="inherit"
        ></path>
        <path
          d="M27.6626 14.7565V0.569824H34.6782V14.12C34.6782 16.688 36.0769 17.798 37.8826 17.798C39.5995 17.798 40.9316 16.688 40.9316 14.12V0.569824H47.4662V14.7565C47.4662 20.1514 43.3071 23.3558 37.7272 23.3558C32.1473 23.3558 27.67 20.1514 27.67 14.7565H27.6626Z"
          fill="inherit"
        ></path>
        <path
          d="M54.6372 0.569824H61.6528V22.7785H54.6372V0.569824Z"
          fill="inherit"
        ></path>
        <path
          d="M67.9584 17.4205C67.8325 17.1319 67.7363 16.7841 67.6401 16.4659L73.8269 15.23C73.8935 15.452 73.9823 15.674 74.0785 15.8961C74.8408 17.3539 76.269 18.3086 78.7408 18.3086C80.4577 18.3086 81.7232 17.6426 81.7232 16.4067C81.7232 15.5482 81.1533 15.0746 79.3402 14.7564L75.9434 14.2162C70.8371 13.4243 68.617 10.886 68.617 7.55577C68.617 2.9897 72.4282 0.00732422 78.356 0.00732422C82.7666 0.00732422 86.4816 2.03504 88.0357 5.27643C88.1615 5.52805 88.2873 5.78706 88.3835 6.06828L82.3522 7.30415C82.256 7.11174 82.1598 6.92673 82.034 6.73432C81.3975 5.75006 80.1321 5.05442 78.4152 5.05442C76.417 5.05442 75.4328 5.81666 75.4328 6.70472C75.4328 7.43736 75.751 7.97759 77.8749 8.1996L80.7907 8.54742C86.156 9.14686 88.9164 11.3374 88.9164 15.4298C88.9164 20.3511 84.9793 23.3631 78.6002 23.3631C73.4939 23.3631 69.5272 21.143 67.9362 17.4279L67.9584 17.4205Z"
          fill="inherit"
        ></path>
        <path
          d="M95.3101 0.569824H102.326V22.7785H95.3101V0.569824Z"
          fill="inherit"
        ></path>
        <path
          d="M109.845 0.569824H118.348L124.727 11.6409V0.569824H130.692V22.7785H124.919L115.809 7.96286V22.7785H109.845V0.569824Z"
          fill="inherit"
        ></path>
        <path
          d="M137.952 0.569824H155.883V5.64652H144.841V8.85091H151.857V13.7056H144.841V17.6722H156.268V22.7785H137.959V0.569824H137.952Z"
          fill="inherit"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_221_1046">
          <rect width="157.2" height="156.453" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
