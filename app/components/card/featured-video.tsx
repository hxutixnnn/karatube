import {
  AspectRatio,
  Box,
  Badge,
  Image,
  Overlay,
  Paper,
  Stack,
  Text,
  Title,
  Button,
} from "@mantine/core";

export interface FeaturedCardProps {
  active?: boolean;
  image: string;
  title: string;
  category: string;
  badge: string;
}

export const FeaturedVideoCard = ({
  active,
  image,
  title,
  category,
  badge,
}: FeaturedCardProps) => (
  <Paper
    radius="lg"
    withBorder={false}
    style={{
      overflow: "hidden",
      transform: active ? 'scale(1)' : 'scale(0.9)',
      transition: "transform 0.5s ease-in-out",
    }}
  >
    <AspectRatio ratio={16 / 9}>
      <Image src={image} alt={title} h="100%" fit="contain" />
      <Overlay
        gradient={`
          linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(0, 0, 0, 0.75) 50%,
            rgba(0, 0, 0, 0) 100%
          )
        `}
        // opacity={0.85}
        zIndex={0}
      />
      <Box p="xl">
        <Stack align="flex-start" justify="flex-end" w="100%" h="100%">
          <Badge>{badge}</Badge>
          <Box>
            <Title order={3} c="white" w="70%">
              {title}
            </Title>
            <Text c="white">{category}</Text>
          </Box>
          <Button>Hát Ngay</Button>
        </Stack>
      </Box>
    </AspectRatio>
  </Paper>
);
