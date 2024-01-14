// "use client";

import { Card, SimpleGrid } from "@mantine/core";
import { KtVideoPlayer } from "./KtVideoPlayer";

async function VideoDetailPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;
  return (
    <SimpleGrid cols={2}>
      <KtVideoPlayer videoId={videoId} />
      <Card>
        Text
      </Card>
    </SimpleGrid>
  );
}

export default VideoDetailPage;
