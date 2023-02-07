import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import DebouncedInput from "../components/DebouncedInput";
import YoutubePlayer from "../components/YoutubePlayer";
import { RecommendedVideo, SearchResult } from "../types/invidious";
import { getSearchResult, getSkeletonItems, getVideoInfo } from "../utils/api";

function HomePage() {
  const [playlist, setPlaylist] = useState([]);
  const [curVideoId, setCurVideoId] = useState(""); // gkkw1oXSV4M, 4lNAEnqZ7XA

  useEffect(() => {
    if (playlist.length && !curVideoId) {
      const [videoId, ...newPlaylist] = playlist;
      setCurVideoId(videoId);
      setPlaylist(newPlaylist);
    }
  }, [playlist, curVideoId]);

  function addVideoToPlaylist(videoId: string) {
    setPlaylist((playlist) => playlist.concat(videoId));
  }

  function priorityVideo(videoId: string) {
    setCurVideoId(videoId);
  }

  const [searchTerm, setSearchTerm] = useState("nhạc trẻ");
  const [isKaraoke, setIsKaraoke] = useState(true);

  const titleIncludesKaraoke = ({ title }) => {
    const lcTitle = title.toLowerCase();
    return lcTitle.includes("karaoke") || lcTitle.includes("beat");
  };

  const { data: recommendedVideos, isLoading: infoLoading } = useQuery(
    ["videoInfo", curVideoId],
    () => getVideoInfo(curVideoId),
    {
      enabled: !!curVideoId,
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
    ["searchResult", searchTerm + suffix],
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
    }
  );

  const isLoading = searchTerm ? searchLoading : infoLoading;
  const isEmptySearch = searchTerm && !isLoading && !searchResults?.length;
  const isEmptyRecommend =
    !searchTerm && !isLoading && !recommendedVideos?.length;

  const scrollbarCls =
    "scrollbar scrollbar-w-1 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-base-300 scrollbar-thumb-rounded";

  function handleSearch(q: string) {
    setSearchTerm(q);
  }
  return (
    <div
      data-theme="light"
      className="text-sm w-full max-h-screen overflow-hidden"
    >
      <main className="bg-base-300 h-full">
        <div className="flex flex-col md:flex-row h-screen">
          {/* START Recommend Videos List */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex flex-row gap-2 p-1 justify-between items-center bg-primary">
              {/* START Search Bar */}
              <div className="form-control flex-1">
                <div className="input-group">
                  <span>
                    <MagnifyingGlassIcon className="w-6 h-6" />
                  </span>
                  <DebouncedInput
                    type="search"
                    placeholder="TÌM BÀI HÁT YOUTUBE"
                    className="input w-full"
                    value={searchTerm}
                    debounceTime={1000}
                    onDebouncedChange={handleSearch}
                    inputMode="search"
                  />
                </div>
              </div>
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
              {/* END Search Bar */}
            </div>
            {/* Recommend Videos List */}
            {(isEmptySearch || isEmptyRecommend) && (
              <div className="text-secondary text-center w-full py-2">
                {isEmptySearch && "Không có kết quả cho từ khóa này."}
                {isEmptyRecommend && "Không có video liên quan nào."}
              </div>
            )}
            <div
              className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full overflow-y-auto h-full p-2 ${scrollbarCls}`}
            >
              {/* Video Row Item */}
              {isLoading && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-base-300 z-50" />
                  {getSkeletonItems(16).map((s) => (
                    <div
                      key={s}
                      className="card bg-gray-300 animate-pulse w-full min-h-[180px] aspect-[4/3]"
                    />
                  ))}
                </>
              )}
              {(searchTerm ? searchResults : recommendedVideos)?.map(
                (rcm: SearchResult | RecommendedVideo) => {
                  return (
                    <Fragment key={rcm?.videoId}>
                      {/* The button to open modal */}
                      <label htmlFor={`modal-video-${rcm?.videoId}`}>
                        <div className="card overflow-hidden bg-white shadow hover:shadow-md cursor-pointer flex-auto">
                          <figure className="relative w-full aspect-video min-h-[150px]">
                            <Image
                              unoptimized
                              src={`https://yt.funami.tech/vi/${rcm?.videoId}/mqdefault.jpg`}
                              priority
                              alt={rcm?.title}
                              layout="fill"
                              className="bg-gray-400"
                              // placeholder="blur"
                              // blurDataURL={`https://yt.funami.tech/vi/${rcm?.videoId}/default.jpg`}
                            />
                          </figure>
                          <div className="card-body p-2">
                            <h2 className="font-semibold text-sm line-clamp-2">
                              {rcm?.title}
                            </h2>
                            <p className="text-xs truncate">{rcm?.author}</p>
                          </div>
                        </div>
                      </label>

                      <input
                        type="checkbox"
                        id={`modal-video-${rcm?.videoId}`}
                        className="modal-toggle"
                      />
                      <label
                        htmlFor={`modal-video-${rcm?.videoId}`}
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative p-2" htmlFor="">
                          <div className="card gap-2">
                            <h2 className="card-title text-sm">{rcm?.title}</h2>
                            <figure className="relative w-full aspect-video min-h-[250px]">
                              <Image
                                unoptimized
                                src={`https://yt.funami.tech/vi/${rcm?.videoId}/mqdefault.jpg`}
                                priority
                                alt={rcm?.title}
                                layout="fill"
                                className="bg-gray-400"
                              />
                            </figure>
                            <div className="card-body p-0">
                              <div className="card-actions">
                                <label
                                  htmlFor={`modal-video-${rcm?.videoId}`}
                                  className="btn btn-primary flex-1"
                                  onClick={() =>
                                    addVideoToPlaylist(rcm?.videoId)
                                  }
                                >
                                  Chọn
                                </label>
                                <label
                                  htmlFor={`modal-video-${rcm?.videoId}`}
                                  className="btn btn-primary flex-1"
                                  onClick={() => priorityVideo(rcm?.videoId)}
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
          <div className="flex flex-col flex-shrink-0 w-full max-w-[400px] h-1/2 md:h-screen overflow-hidden">
            <YoutubePlayer
              videoId={curVideoId || "gkkw1oXSV4M"} // TODO: make a video instruction and put it here
              nextSong={() => setCurVideoId("")}
            />
            <div className="h-full p-2 overflow-hidden">
              <div className="font-bold text-primary">
                BÀI KẾ TIẾP ({playlist.length})
              </div>
              <div
                className={`flex flex-col gap-2 py-2 h-full overflow-y-auto ${scrollbarCls}`}
              >
                <div className="flex flex-col flex-1 gap-2">
                  {playlist.map((videoId) => (
                    <VideoHorizontalCard
                      key={videoId}
                      id={videoId}
                      onSelect={() => priorityVideo(videoId)}
                      onDelete={() =>
                        setPlaylist((curPlaylist) =>
                          curPlaylist.filter((id) => id !== videoId)
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface VideoHorizontalCardProps {
  id: string;
  onSelect?: (videoId: string) => void;
  onDelete?: (videoId: string) => void;
}

function VideoHorizontalCard({
  id: videoId,
  onSelect = () => {},
  onDelete = () => {},
}: VideoHorizontalCardProps) {
  const { data, isLoading } = useQuery(
    ["videoInfo", videoId],
    () => getVideoInfo(videoId),
    {
      enabled: !!videoId,
      staleTime: Infinity,
    }
  );

  return (
    <div
      tabIndex={0}
      className="collapse bg-white shadow hover:shadow-md rounded cursor-pointer"
    >
      <div className="collapse-title p-0 flex flex-row flex-1 overflow-hidden">
        <figure className="flex-shrink-0 relative w-36 aspect-video">
          {!isLoading ? (
            <Image
              unoptimized
              src={`https://yt.funami.tech/vi/${data?.videoId}/mqdefault.jpg`}
              priority
              alt={data?.title}
              layout="fill"
              className="bg-gray-400"
            />
          ) : (
            <div className="bg-gray-300 animate-pulse h-full w-full" />
          )}
        </figure>
        <div className="flex flex-col p-2 overflow-hidden gap-2 flex-1">
          {!isLoading ? (
            <h2 className="font-semibold text-sm line-clamp-2">
              {data?.title}
            </h2>
          ) : (
            <>
              <div className="bg-gray-300 animate-pulse h-3 w-full" />
              <div className="bg-gray-300 animate-pulse h-3 w-3/4" />
            </>
          )}
          {!isLoading ? (
            <p className="text-xs truncate">{data?.author}</p>
          ) : (
            <div className="bg-gray-300 animate-pulse h-2 w-1/2" />
          )}
        </div>
      </div>

      <div className="collapse-content p-0">
        <div className="flex flex-row gap-1 px-2 pt-4 pb-0 border-t">
          <div
            className="btn btn-sm btn-primary flex-1"
            onClick={() => onSelect(videoId)}
          >
            Ưu tiên
          </div>
          <div
            className="btn btn-sm btn-ghost text-error flex-1"
            onClick={() => onDelete(videoId)}
          >
            Xóa khỏi danh sách
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
