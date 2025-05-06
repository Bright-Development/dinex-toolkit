import React from "react";
import Carousel from "./carousel";

type Props = {};

function CarouselDemo({}: Props) {
  return (
    <>
      <Carousel
        data={{
          variation: "default",
          primary: {
            title: "Our Chefs",
            description: [
              {
                text: "Meet our talented chefs who create culinary masterpieces.",
                type: "text",
              },
            ],
          },
          items: [
            {
              heading: "Chef Alex Johnson",
              subheading: "Sushi Chef",
              description: [
                {
                  text: "Alex is an expert in sushi and Japanese cuisine, crafting beautiful rolls.",
                  type: "text",
                },
              ],
              image: {
                url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
                alt: "Chef Alex Johnson",
              },
              cta: "Learn More",
            },
            {
              heading: "Chef Maria Garcia",
              subheading: "Grill Master",
              description: [
                {
                  text: "Maria is known for her grilling skills, creating mouthwatering BBQ dishes.",
                  type: "text",
                },
              ],
              image: {
                url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
                alt: "Chef Maria Garcia",
              },
              cta: "Learn More",
            },
            {
              heading: "Chef David Lee",
              subheading: "Vegetarian Chef",
              description: [
                {
                  text: "David specializes in vegetarian and vegan cuisine, creating healthy dishes.",
                  type: "text",
                },
              ],
              image: {
                url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
                alt: "Chef David Lee",
              },
              cta: "Learn More",
            },
            {
              heading: "Chef Emily Brown",
              subheading: "Baker",
              description: [
                {
                  text: "Emily is a talented baker, known for her artisanal bread and pastries.",
                  type: "text",
                },
              ],
              image: {
                url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
                alt: "Chef Emily Brown",
              },
              cta: "Learn More",
            },
          ],
        }}
      />
    </>
  );
}

export default CarouselDemo;
