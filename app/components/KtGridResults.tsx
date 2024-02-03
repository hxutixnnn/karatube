import { Alert, Loader, SimpleGrid, Stack } from "@mantine/core";
import { Result } from "../actions/search.action";
import { VideoCard } from "./card/video";
import { useFormStatus } from "react-dom";
import { IconInfoCircle } from "@tabler/icons-react";

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
  onChange,
}: {
  videos: Result[];
  cols?: number;
  onChange?: (videoId: string) => void;
}) {
  const { pending } = useFormStatus();
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
            onClick={() => onChange?.(video.id)}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
