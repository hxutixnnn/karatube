"use client";

import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Overlay,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { VideoCompact } from "youtubei";

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function VideoCard({ image, title, category }: CardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder={false}>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={image}
            // height={160}
            alt="Norway"
          />
        </AspectRatio>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text c="dimmed" truncate>
          {category}
        </Text>
      </Group>

      <Title order={4} lineClamp={2}>
        {title}
      </Title>

      <Button color="red.8" fullWidth mt="md" radius="md">
        Karaoke
      </Button>
    </Card>
  );
}

export function HeaderCarousel({ data }: { data: CardProps[] }) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <VideoCard {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      loop
      align="start"
      slideSize={{ base: "100%", sm: 600, md: 300 }}
      slideGap="md"
      withControls={false}
      // withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      // styles={{ container: { padding: 16 } }}
    >
      {slides}
    </Carousel>
  );
}
