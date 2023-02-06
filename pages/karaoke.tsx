import {
  ArrowUturnLeftIcon,
  ForwardIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import YouTube from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";
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
  // const [videoId, setVideoId] = useState("gkkw1oXSV4M"); // 4lNAEnqZ7XA
  const router = useRouter();
  const { v: videoId = "gkkw1oXSV4M" } = router.query as { v: string };

  function goToVideo(videoId: string) {
    if (!videoId) return;
    return router.push({ pathname: router.pathname, query: { v: videoId } });
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [isKaraoke, setIsKaraoke] = useState(true);

  const titleIncludesKaraoke = ({ title }) => {
    const lcTitle = title.toLowerCase();
    return lcTitle.includes("karaoke") || lcTitle.includes("beat");
  };

  const { data: recommendedVideos, isLoading: infoLoading } = useQuery(
    ["videoInfo", videoId],
    () => getVideoInfo(videoId),
    {
      enabled: !!videoId,
      staleTime: Infinity,
      select: ({ recommendedVideos }) => {
        if (isKaraoke) {
          return recommendedVideos.filter(titleIncludesKaraoke);
        }

        return recommendedVideos;
      },
    }
  );

  const suffix = isKaraoke ? ' "karaoke"' : "";
  const { data: searchResults, isFetching: searchLoading } = useQuery(
    ["searchResult", searchTerm],
    () => getSearchResult({ q: searchTerm + suffix }),
    {
      enabled: !!searchTerm,
      staleTime: Infinity,
      select: (results: (SearchResult | RecommendedVideo)[]) => {
        if (isKaraoke) {
          return results.filter(titleIncludesKaraoke);
        }

        return results;
      },
      keepPreviousData: true,
    }
  );

  const isLoading = searchTerm ? searchLoading : infoLoading;
  const isEmptySearch = searchTerm && !searchResults?.length;
  const isEmptyRecommend = !searchTerm && !recommendedVideos?.length;

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
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={isKaraoke}
                    onChange={(e) => setIsKaraoke(e.target.checked)}
                  />
                  <span className="label-text text-primary-content ml-2">
                    Karaoke
                  </span>
                </label>
              </div>
            </div>
            {/* Recommend Videos List */}
            {/* {isLoading && (
              <progress className="progress progress-success w-full" />
            )} */}
            {(isEmptySearch || isEmptyRecommend) && (
              <div className="text-secondary text-center w-full py-2">
                {isEmptySearch && "Không có kết quả cho từ khóa này."}
                {isEmptyRecommend && "Không có video liên quan nào."}
              </div>
            )}
            <div
              className={`relative grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full overflow-y-auto h-full p-2 ${scrollbarCls}`}
            >
              {/* Video Row Item */}
              {isLoading && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100" />
                  {getSkeletonItems(12).map((s) => (
                    <div key={s} className="card bg-gray-300 w-full h-52" />
                  ))}
                </>
              )}
              {(searchTerm ? searchResults : recommendedVideos)?.map(
                (rcm: SearchResult | RecommendedVideo) => {
                  return (
                    <Fragment key={rcm.videoId}>
                      {/* The button to open modal */}
                      <label htmlFor={`modal-video-${rcm.videoId}`}>
                        <div
                          className="card bg-white shadow hover:shadow-md cursor-pointer flex-auto"
                          // onClick={() => goToVideo(rcm.videoId)}
                        >
                          <figure className="relative w-full aspect-video">
                            <Image
                              unoptimized
                              src={`https://yt.funami.tech/vi/${rcm.videoId}/mqdefault.jpg`}
                              priority
                              alt={rcm.title}
                              layout="fill"
                              className="bg-gray-400"
                              placeholder="blur"
                              blurDataURL={`https://yt.funami.tech/vi/${rcm.videoId}/default.jpg`}
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
          <YoutubePlayer videoId={videoId} />
        </div>
      </main>
    </div>
  );
}

function YoutubePlayer({ videoId }) {
  const youtubePlayer = useRef<YouTube>();
  const [playerState, setPlayerState] = useState<PlayerStates>();

  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  const playPauseBtn = useMemo(
    () => [
      playerState === PlayerStates.PLAYING
        ? {
            icon: PauseIcon,
            label: "Dừng",
            onClick: async () => {
              try {
                const player = youtubePlayer.current?.getInternalPlayer();
                await player.pauseVideo();
              } catch (error) {
                console.log(error);
              }
            },
          }
        : {
            icon: PlayIcon,
            label: "Phát",
            onClick: async () => {
              try {
                const player = youtubePlayer.current?.getInternalPlayer();
                await player.playVideo();
              } catch (error) {
                console.log(error);
              }
            },
          },
    ],
    [playerState]
  );
  const playerBtns = useMemo(
    () => [
      {
        icon: ForwardIcon,
        label: "Qua bài",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.nextVideo();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        icon: ArrowUturnLeftIcon,
        label: "Hát lại",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.seekTo(0, true);
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        icon: SpeakerXMarkIcon,
        label: "Tắt tiếng",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.mute();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        icon: SpeakerWaveIcon,
        label: "Mở tiếng",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.unMute();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-1 min-w-[400px]">
      <div id="youtubePlayer" className="flex flex-col bg-white">
        <div
          className="flex flex-row items-center justify-center flex-1 bg-black"
          onClick={async () => {
            if (!document.fullscreenElement) {
              const playerElement = document.getElementById("youtubePlayer");
              const requestFullScreen = playerElement.requestFullscreen;
              // || playerElement.mozRequestFullscreen
              // || playerElement.webkitRequestFullscreen;
              if (requestFullScreen) {
                await requestFullScreen.bind(playerElement)();
              }
            } else {
              await document.exitFullscreen();
            }
          }}
        >
          <YouTube
            ref={youtubePlayer}
            videoId={videoId}
            //id="youtubePlayer"
            className={`bg-base-300 w-full aspect-video ${
              !isFullscreen ? "cursor-zoom-in" : "cursor-zoom-out"
            }`}
            iframeClassName="w-full h-full pointer-events-none"
            loading="lazy"
            opts={{
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                modestbranding: 1,
                playsinline: 1,
              },
            }}
            onStateChange={async (ev) =>
              setPlayerState(await ev.target.getPlayerState())
            }
          />
        </div>
        <div className="flex flex-row justify-evenly w-full p-1 items-center">
          {playPauseBtn.concat(playerBtns).map((btn) => (
            <button
              key={btn.label}
              className={`btn btn-ghost text-primary flex h-16 w-16 overflow-hidden text-[10px] p-0 hover:bg-base-200`}
              onClick={btn.onClick}
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
  );
}

export default WatchPage;
