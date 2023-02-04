import {
  ForwardIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  RecommendedVideo,
  SearchResult,
  VideoResponse,
} from "../types/invidious";

axios.interceptors.request.use(function (config) {
  /**
   * List of instances
   * https://docs.invidious.io/instances/
   */
  // config.baseURL = "https://invidious.drivet.xyz/";
  config.baseURL = "https://yt.funami.tech/";
  return config;
});

const getVideoInfo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Missing query key!");
  }
  const res = await axios<VideoResponse>("/api/v1/videos/" + videoId);
  return res.data;
};

const getSearchResult = async ({ q, page = 0, region = "VN" }) => {
  if (!q) {
    throw new Error("Missing params `q`!");
  }
  const res = await axios<SearchResult[]>("/api/v1/search", {
    params: { q, page, region },
  });
  return res.data;
};

const getSkeletonItems = (length: number) =>
  Array.from({ length }).map((_, i) => i);

function WatchPage() {
  const [videoId, setVideoId] = useState("4lNAEnqZ7XA");

  function goToVideo(videoId: string) {
    if (videoId) setVideoId(videoId);
  }

  const [searchTerm, setSearchTerm] = useState("");

  const { data: videoInfo, isLoading: infoLoading } = useQuery(
    ["videoInfo", videoId],
    () => getVideoInfo(videoId),
    {
      enabled: !!videoId,
      staleTime: Infinity,
    }
  );

  const { recommendedVideos = [] } = videoInfo || {};

  const { data: searchResults, isFetching: searchLoading } = useQuery(
    ["searchResult", searchTerm],
    () => getSearchResult({ q: searchTerm + ' "karaoke"' }),
    {
      enabled: !!searchTerm,
      staleTime: Infinity,
      select: (results) =>
        results.filter((result: SearchResult | RecommendedVideo) => {
          const title = result.title.toLowerCase();
          return title.includes("karaoke") || title.includes("beat");
        }),
      keepPreviousData: true,
    }
  );

  const isLoading = searchLoading;
  const isEmpty = !searchResults?.length && !recommendedVideos?.length;

  const iframeSrc = useMemo(() => {
    const url = new URL(videoId, "https://www.youtube.com/embed/");
    const params = new URLSearchParams({
      autoplay: "1",
      controls: "0",
      disablekb: "1",
      enablejsapi: "1",
      modestbranding: "1",
      playsinline: "1",
    }).toString();
    url.search = params;
    return url.href;
  }, [videoId]);

  const scrollbarCls =
    "scrollbar scrollbar-w-1 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-base-300 scrollbar-thumb-rounded";

  return (
    <div
      data-theme="light"
      className="text-sm w-full max-h-screen overflow-hidden"
    >
      <main className="bg-base-300">
        <div className="flex flex-row">
          <div className="flex flex-col w-full h-screen">
            <div className="flex flex-row gap-2 p-1 justify-between items-center bg-primary">
              {/* <div className="dropdown flex-1"> */}
              <div className="form-control flex-1">
                <div className="input-group">
                  <span>
                    <MagnifyingGlassIcon className="w-6 h-6" />
                  </span>
                  <input
                    type="search"
                    placeholder="TÌM BÀI HÁT YOUTUBE"
                    className="input w-full"
                    onKeyDown={(e) =>
                      e.key.toLowerCase() === "enter" &&
                      setSearchTerm(e.currentTarget.value)
                    }
                    inputMode="search"
                  />
                </div>
              </div>
              {/* <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div> */}
            </div>
            {/* Recommend Videos List */}
            {isLoading && (
              <progress className="progress progress-success w-full" />
            )}
            <div
              className={`relative grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full overflow-y-auto h-full p-2 ${scrollbarCls}`}
            >
              {/* Video Row Item */}
              {isEmpty && (
                <div className="text-secondary text-center w-full">
                  Không có kết quả cho từ khóa này.
                </div>
              )}
              {(searchResults || recommendedVideos)?.map(
                (rcm: SearchResult | RecommendedVideo) => {
                  return (
                    <Fragment key={rcm.videoId}>
                      {/* The button to open modal */}
                      <label htmlFor={`modal-video-${rcm.videoId}`}>
                        <div
                          className="card bg-white shadow-md cursor-pointer flex-auto"
                          // onClick={() => goToVideo(rcm.videoId)}
                        >
                          <figure className="relative w-full aspect-video">
                            <Image
                              unoptimized
                              src={`/api/image/${rcm.videoId}/mqdefault.jpg`}
                              priority
                              alt={rcm.title}
                              layout="fill"
                              className="bg-base-300"
                              placeholder="blur"
                              blurDataURL={`/api/image/${rcm.videoId}/default.jpg`}
                            />
                          </figure>
                          <div className="card-body p-2">
                            <h2 className="font-semibold text-sm truncate">
                              {rcm.title}
                            </h2>
                            <p className="truncate">{rcm.author}</p>
                          </div>
                        </div>
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`modal-video-${rcm.videoId}`}
                        className="modal-toggle"
                      />
                      <label
                        htmlFor={`modal-video-${rcm.videoId}`}
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative p-2" htmlFor="">
                          <div className="card gap-2">
                            <h2 className="card-title text-sm">{rcm.title}</h2>
                            <figure className="relative w-full aspect-video">
                              <Image
                                unoptimized
                                src={`/api/image/${rcm.videoId}/mqdefault.jpg`}
                                priority
                                alt={rcm.title}
                                layout="fill"
                                className="bg-base-300"
                                placeholder="blur"
                                blurDataURL={`/api/image/${rcm.videoId}/default.jpg`}
                              />
                            </figure>
                            <div className="card-body p-0">
                              <div className="card-actions">
                                <label
                                  htmlFor={`modal-video-${rcm.videoId}`}
                                  className="btn btn-primary flex-1"
                                  onClick={() => goToVideo(rcm.videoId)}
                                >
                                  Chọn
                                </label>
                                <label
                                  htmlFor={`modal-video-${rcm.videoId}`}
                                  className="btn btn-primary flex-1"
                                  onClick={() => goToVideo(rcm.videoId)}
                                >
                                  Ưu tiên
                                </label>
                              </div>
                            </div>
                          </div>
                        </label>
                      </label>
                    </Fragment>
                  );
                }
              )}
              {/* END Video Row Item */}
            </div>
          </div>
          {/* END Recommend Videos List */}
          {/* Video Player */}
          <div className="flex flex-col gap-1 min-w-[400px]">
            <div className="flex flex-col bg-white">
              <iframe
                src={iframeSrc}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={`bg-base-300 w-full aspect-video`}
              />
              <div className="flex flex-row justify-evenly w-full p-1 items-center">
                {[
                  {
                    icon: PauseIcon,
                    label: "Dừng",
                  },
                  {
                    icon: ForwardIcon,
                    label: "Qua bài",
                  },
                  {
                    icon: SpeakerXMarkIcon,
                    label: "Tắt tiếng",
                  },
                  {
                    icon: SpeakerWaveIcon,
                    label: "Giảm âm",
                  },
                  {
                    icon: SpeakerWaveIcon,
                    label: "Tăng âm",
                  },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className={`btn btn-ghost text-primary flex h-16 w-16 overflow-hidden text-[10px] p-0 hover:bg-base-200`}
                  >
                    <btn.icon className="w-10 h-10" />
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col p-2">
              <div className="font-bold text-primary">BÀI KẾ TIẾP (0)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WatchPage;
