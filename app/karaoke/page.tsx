import { Stack, Title } from "@mantine/core";
import { GridVideosBySearch } from "./GridVideosBySearch";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q ?? "";

  return (
    <Stack>
      {/* <Box p="0">
        <FeaturedVideosCarousel
          data={videos.items.map((item) => ({
            title: item.title,
            image: item.thumbnails[0].url,
            category: item.channel?.name ?? "Unknown",
            badge: "MỚI",
          }))}
        />
      </Box> */}

      <Title order={3}>{query || "Karaoke Youtube Mới Nhất"}</Title>

      {/* <Input
        variant="filled"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        radius="xl"
        rightSection={<IconSearch size={16} />}
      /> */}
      <Suspense key="GridVideosBySearch" fallback={<div>Loading...</div>}>
        <GridVideosBySearch searchTerm={query} />
      </Suspense>
    </Stack>
  );
}
