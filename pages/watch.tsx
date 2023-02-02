// import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { VideoResponse } from "../types/invidious";
import { useLocalStorage } from "react-use";
import { useEffect, useState } from "react";

axios.interceptors.request.use(function (config) {
  /**
   * List of instances
   * https://docs.invidious.io/instances/
   */
  config.baseURL = "https://invidious.drivet.xyz/";
  return config;
});

const getVideoInfo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Missing query key!");
  }
  const res = await axios<VideoResponse>("/api/v1/videos/" + videoId);
  return res.data;
};

const skeleton = Array.from({ length: 7 }).map((_, i) => i);

function WatchPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const [cacheVideoId, setCacheVideoId] = useLocalStorage(
    "videoId",
    "4lNAEnqZ7XA"
  );
  const { v: videoId } = router.query as { v: string };

  function goToVideo(videoId: string) {
    setCacheVideoId(videoId);
    return router.push({ pathname: router.pathname, query: { v: videoId } });
  }

  useEffect(() => {
    if (cacheVideoId && !videoId) {
      goToVideo(cacheVideoId);
    }
  }, [cacheVideoId, videoId]);

  const { data, isLoading, isError } = useQuery(
    ["videoInfo", videoId],
    () => getVideoInfo(videoId),
    {
      enabled: !!videoId,
      staleTime: Infinity,
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
    }
  );

  const {
    title,
    author,
    authorThumbnails,
    subCountText,
    recommendedVideos = [],
  } = data || {};

  return (
    <div
      data-theme={!isDark ? "light" : "dark"}
      className="text-sm w-full min-h-screen"
    >
      <header className="flex flex-row justify-between items-center py-4 absolute inset-x-0 z-[100]">
        <div />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="checkbox"
          className="toggle"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
      </header>
      <main className="container mx-auto pt-24">
        <div className="flex flex-row gap-8">
          {/* Video Player */}
          <div className="flex flex-col gap-8">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&disablekb=1&enablejsapi=1&modestbranding=1&playsinline=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="bg-base-300 w-[900px] aspect-video"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-xl">{title}</h1>
              <div className="border-t border-base-300 my-2" />
              <div className="flex flex-row gap-3">
                <Image
                  unoptimized
                  src={authorThumbnails?.[1]?.url}
                  width={48}
                  height={48}
                  className="rounded-full flex-shrink-0"
                />
                <div className="flex flex-col">
                  <div className="font-bold">{author}</div>
                  <div className="text-xs">{subCountText} người đăng ký</div>
                </div>
              </div>
            </div>
          </div>
          {/* Recommend Videos List */}
          <div className="relative flex flex-col gap-2">
            {/* Video Row Item */}
            {isLoading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-base-100" />
                {skeleton.map((s) => (
                  <div key={s} className="flex flex-row gap-2">
                    <div className="bg-base-300 w-[160px] h-[90px]" />
                    <div className="flex-col flex gap-2">
                      <div className="w-56 h-4 bg-base-300" />
                      <div className="w-24 h-4 bg-base-300" />
                      <div className="w-40 h-3 bg-base-300" />
                      <div className="w-40 h-3 bg-base-300" />
                    </div>
                  </div>
                ))}
              </>
            )}
            {recommendedVideos?.map((rcm) => {
              const thumbnail = rcm.videoThumbnails?.[4];
              return (
                <div
                  key={rcm.videoId}
                  className="flex flex-row gap-2 cursor-pointer"
                  onClick={() => goToVideo(rcm.videoId)}
                >
                  <Image
                    unoptimized
                    priority
                    src={thumbnail?.url}
                    alt={thumbnail?.quality}
                    width={160}
                    height={90}
                    layout="fixed"
                    className="bg-base-300"
                  />
                  <div className="flex-col flex gap-1">
                    <div className="w-56 font-bold line-clamp-2">
                      {rcm.title}
                    </div>
                    <div className="truncate w-56 text-xs text-secondary">
                      {rcm.author}
                    </div>
                    <div className="truncate w-56 text-xs text-secondary">
                      {rcm.viewCount?.toLocaleString("vi-VN")} lượt xem
                    </div>
                  </div>
                </div>
              );
            })}
            {/* END Video Row Item */}
          </div>
          {/* END Recommend Videos List */}
        </div>
      </main>
    </div>
  );
}

export default WatchPage;
