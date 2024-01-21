import { SimpleGrid } from "@mantine/core";
import { SearchResult } from "youtubei";
import { VideoCard } from "../components/card/video";
import youtube from "../utils/youtube";

export async function GridVideosBySearch({
  searchTerm = "",
}: {
  searchTerm?: string;
}) {
  let videos: SearchResult<"video">;
  try {
    videos = await youtube.search(`${searchTerm} "karaoke" tone nam nữ`, {
      type: "video",
      // ql: "vi",
      // regionCode: "VN",
    });
  } catch (e) {
    console.error(e);

    return <div>Error loading feed.</div>;
  }
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing={0} mx="-6">
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
  );
}
