"use client";

import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Container,
  Group,
  Overlay,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const data = [
  {
    image: "https://i.ytimg.com/vi/OeBVIsGkcrA/hq720.jpg",
    title: "Cơn Mơ Băng Giá",
    category: "Bằng Kiều",
  },
  {
    image: "https://i.ytimg.com/vi/9UFjzRO1C-k/hq720.jpg",
    title: "Ai Rồi Cũng Sẽ Khác",
    category: "Hà Nhi",
  },
  {
    image: "https://i.ytimg.com/vi/5nwYi1mxNVI/hq720.jpg",
    title: "Karaoke Chỉ Là Không Cùng Nhau",
    category: "Tăng Phúc",
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      withBorder
      radius="md"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        overflow: "hidden",
      }}
    >
      <AspectRatio ratio={16 / 9}>
        <Box pos="relative">
          <Overlay
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
            blur={15}
            zIndex={0}
          />
          <Group w="100%" p="md" style={{ zIndex: 1 }}>
            <Box>
              <Text c="white" style={{ textTransform: "uppercase" }} size="xs">
                {category}
              </Text>
              <Title order={3} c="white">
                {title}
              </Title>
            </Box>
            <ActionIcon
              radius="xl"
              size="xl"
              color="red"
              ml="auto"
              aria-label="Player Play"
            >
              <IconPlayerPlay fill="white" />
            </ActionIcon>
          </Group>
        </Box>
      </AspectRatio>
    </Paper>
  );
}

export default function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));
  return (
    <Container bg="gray.8" py="md">
      <Carousel
        loop
        // withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        // slideSize={{ base: '100%', sm: '50%' }}
        // slideGap={{ base: 'xl', sm: 2 }}
        // align="start"
        // slidesToScroll={1}
      >
        {slides}
      </Carousel>
    </Container>
  );
}
