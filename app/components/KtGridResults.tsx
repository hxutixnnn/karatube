import { Alert, Loader, SimpleGrid, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Result } from "../actions/search.action";
import { useVideoId } from "../hooks/useVideoId";
import { VideoCard } from "./card/video";

function EmptyState() {
  const icon = <IconInfoCircle />;
  return (
    <Alert
      variant="light"
      color="gray"
      title="Không tìm thấy kết quả nào."
      icon={icon}
    >
      Hãy thử đổi từ khóa khác hoặc thử lại sau nhé.
    </Alert>
  );
}

export function KtGridResults({
  videos,
  cols = 2,
}: {
  videos: Result[];
  cols?: number;
}) {
  const { pending } = useFormStatus();
  const [videoId, withVideoId] = useVideoId();
  return (
    <Stack align="center">
      {pending ? <Loader /> : !videos.length && <EmptyState />}
      <SimpleGrid cols={cols} spacing={0} mx="-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.id}
            title={video.title}
            image={video.thumbnails[0].url}
            category={video.channelName ?? ""}
            views={video.viewCount ?? 0}
            active={videoId === video.id}
            // @ts-ignore
            component={Link}
            href={withVideoId(video.id)}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
