"use client";

import {
  AspectRatio,
  Card,
  Center,
  Image,
  Overlay,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";
import useIsDark from "../../hooks/useIsDark";

export interface CardProps {
  videoId: string;
  image: string;
  title: string;
  category: string;
  views: number;
}

export function VideoCard({ videoId, image, title, category, views }: CardProps) {
  const { ref, hovered } = useHover();
  const isDark = useIsDark();
  return (
    <UnstyledButton component={Link} href={`/karaoke/${videoId}`}>
      <Card
        ref={ref}
        radius="10"
        p="6"
        bg="transparent"
        {...(hovered && { bg: isDark ? 'dark.6' : 'gray.1' })}
      >
        <AspectRatio
          ratio={16 / 9}
          style={(theme) => ({
            borderRadius: theme.radius.md,
            overflow: "hidden",
          })}
        >
          <Image src={image} alt="Norway" />
          {/* <Transition
              mounted={true}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <Overlay color="#000" backgroundOpacity={0.25} zIndex={0} />
                  <Center>
                    <Center
                      w="48"
                      h="48"
                      bg="white"
                      c="red"
                      style={{ borderRadius: 1000 }}
                    >
                      <IconPlayerPlayFilled />
                    </Center>
                  </Center>
                </div>
              )}
            </Transition> */}
          {hovered && (
            <>
              <Overlay color="#000" backgroundOpacity={0.25} zIndex={0} />
              <Center>
                <Center
                  w="48"
                  h="48"
                  bg="white"
                  c="red"
                  style={{ borderRadius: 1000 }}
                >
                  <IconPlayerPlayFilled />
                </Center>
              </Center>
            </>
          )}
        </AspectRatio>
        <Text size="xs" fw={500} lineClamp={2} mt="xs" mb="4">
          {title}
        </Text>
        {/* <Group justify="space-between"> */}
        <Text size="xs" c="dimmed">
          {category} · {views.toLocaleString("vi-VN")} lượt xem
        </Text>
      </Card>
    </UnstyledButton>
  );
}
