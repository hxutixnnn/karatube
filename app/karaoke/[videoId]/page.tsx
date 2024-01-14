// "use client";

import { Card, SimpleGrid } from "@mantine/core";
import { KtVideoPlayer } from "./KtVideoPlayer";

async function VideoDetailPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;
  return (
    <SimpleGrid cols={1}>
      <Card withBorder p={0}>
        <KtVideoPlayer videoId={videoId} />
      </Card>
      <Card withBorder>Text</Card>
    </SimpleGrid>
  );
}

export default VideoDetailPage;
