// import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { VideoResponse } from "../types/invidious";

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
  const router = useRouter();
  const { v: videoId } = router.query as { v: string };

  const { data, isLoading, isError } = useQuery(
    ["videoInfo", videoId],
    () => getVideoInfo(videoId),
    { enabled: !!videoId }
  );

  const { recommendedVideos = [] } = data || {};

  return (
    <div
      data-theme={true ? "light" : "dark"}
      className="text-sm w-full min-h-screen"
    >
      <header className="flex flex-col items-center py-4 absolute inset-x-0 z-[100]">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </header>
      <main className="container mx-auto pt-24">
        <div className="flex flex-row gap-8">
          {/* Video Player */}
          <div className="flex flex-col">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&disablekb=1&enablejsapi=1&modestbranding=1&playsinline=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="bg-base-300 w-[900px] aspect-video"
            />
          </div>
          {/* Recommend Videos List */}
          <div className="relative flex flex-col gap-2">
            {/* Video Row Item */}
            {isLoading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-white" />
                {skeleton.map((s) => (
                  <div key={s} className="flex flex-row gap-2">
                    <div className="bg-base-300 w-[120px] h-[90px]" />
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
              const thumbnail = rcm.videoThumbnails?.[5];
              return (
                <div
                  key={rcm.videoId}
                  className="flex flex-row gap-2 cursor-pointer"
                  onClick={() =>
                    history.pushState(
                      {},
                      "",
                      location.pathname + "?v=" + rcm.videoId
                    )
                  }
                >
                  <Image
                    unoptimized
                    priority
                    src={thumbnail?.url}
                    alt={thumbnail?.quality}
                    width={thumbnail?.width}
                    height={thumbnail.height}
                    layout="fixed"
                    className="bg-base-300"
                  />
                  <div className="flex-col flex gap-1">
                    <div className="w-56 font-bold line-clamp-2">
                      {rcm.title}
                    </div>
                    <div className="truncate w-56 text-base-300">
                      {rcm.author}
                    </div>
                    <div className="truncate w-56">
                      {rcm.viewCount?.toLocaleString()} lượt xem
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
