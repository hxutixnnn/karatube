import { useSearchParams } from "next/navigation";

export function useVideoId(defaultVideoId = "Vv2mtx5ZWwE") {
  const searchParams = useSearchParams();
  return [
    searchParams.get('v') || defaultVideoId,
    (videoId: string) => `?v=${videoId}`,
  ] as const;
}