"use client";

import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { FeaturedCardProps, FeaturedVideoCard } from "../card/featured-video";

export function FeaturedVideosCarousel({
  data,
}: {
  data: FeaturedCardProps[];
}) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      loop
      align="center"
      slideSize="80%"
      // slideSize={{ base: "100%", sm: 600, md: 300 }}
      slideGap="0"
      withControls
      skipSnaps
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      onSlideChange={setActiveIndex}
    >
      {data.map((item, index) => (
        <Carousel.Slide key={item.title}>
          <FeaturedVideoCard active={activeIndex === index} {...item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
