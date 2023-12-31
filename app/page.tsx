import {
  Box,
  Container,
  Group,
  Input,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Client } from "youtubei";
import { FeaturedVideosCarousel } from "./components/carousel/featured-video";
import { VideoCard } from "./components/card/video";

const youtube = new Client();

const KaraTubeLogo = () => (
  <Group gap={0} align="center">
    <Paper
      px="sm"
      py="xs"
      bg="red.8"
      mr="xs"
      radius="md"
      c="white"
      display="flex"
    >
      <IconPlayerPlayFilled />
    </Paper>
    <Title c="blue">Kara</Title>
    <Title c="red">Tube</Title>
  </Group>
);

export default async function HomePage() {
  const videos = await youtube.search("karaoke|tone", {
    type: "video",
    ql: "vi",
    regionCode: "VN",
  });

  return (
    <Container component={Stack}>
      <Group wrap="nowrap" p="md">
        <KaraTubeLogo />
        <Input
          variant="filled"
          placeholder="Chỉ là không cùng nhau, Ai chung tình được mãi,..."
          w="50%"
        />
      </Group>

      <Box p="6">
        <FeaturedVideosCarousel
          data={videos.items.map((item) => ({
            title: item.title,
            image: item.thumbnails[0].url,
            category: item.channel?.name ?? "Unknown",
            badge: "MỚI",
          }))}
        />
      </Box>

      <Title>Karaoke Youtube Mới Nhất</Title>

      <SimpleGrid cols={3} spacing={0}>
        {videos.items.map((item) => (
          <VideoCard
            key={item.id}
            title={item.title}
            image={item.thumbnails[0].url}
            category={item.channel?.name ?? ""}
            views={item.viewCount ?? 0}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
