import { Box, SimpleGrid, Stack, Title } from "@mantine/core";
import { SearchResult } from "youtubei";
import { VideoCard } from "../components/card/video";
import { FeaturedVideosCarousel } from "../components/carousel/featured-video";
import youtube from "../utils/youtube";

export default async function MainContent() {
  let videos: SearchResult<"video">;
  try {
    videos = await youtube.search("karaoke|tone", {
      type: "video",
      ql: "vi",
      regionCode: "VN",
    });
  } catch (e) {
    console.error(e);

    return (
      <p>Error loading feed.</p>
    );
  }

  // const searchPlaceholder =
  //   videos.items[0].title
  //     .split(/\||\-/g)[0]
  //     .replace(/karaoke/gi, "")
  //     .trim() + ",...";

  return (
    <Stack>
      <Box p="0">
        <FeaturedVideosCarousel
          data={videos.items.map((item) => ({
            title: item.title,
            image: item.thumbnails[0].url,
            category: item.channel?.name ?? "Unknown",
            badge: "MỚI",
          }))}
        />
      </Box>

      <Title order={3}>Karaoke Youtube Mới Nhất</Title>

      <SimpleGrid cols={{ base: 2, md: 3 }} spacing={0} mx="-6">
        {videos.items.map((item) => (
          <VideoCard
            key={item.id}
            videoId={item.id}
            title={item.title}
            image={item.thumbnails[0].url}
            category={item.channel?.name ?? ""}
            views={item.viewCount ?? 0}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
