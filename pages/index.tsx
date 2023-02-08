import { MagnifyingGlassIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import DebouncedInput from "../components/DebouncedInput";
import YoutubePlayer from "../components/YoutubePlayer";
import { RecommendedVideo, SearchResult } from "../types/invidious";
import { getSearchResult, getSkeletonItems, getVideoInfo } from "../utils/api";

function HomePage() {
  const [playlist, setPlaylist] = useState<(SearchResult | RecommendedVideo)[]>(
    []
  );
  const [curVideoId, setCurVideoId] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<
    SearchResult | RecommendedVideo
  >();

  useEffect(() => {
    if (playlist.length && !curVideoId) {
      // playing first video from playlist
      const [video, ...newPlaylist] = playlist;
      setCurVideoId(video.videoId);
      setPlaylist(newPlaylist);
    }
  }, [playlist, curVideoId]);

  function addVideoToPlaylist(video: SearchResult | RecommendedVideo) {
    setPlaylist((playlist) => playlist.concat(video));
  }

  function priorityVideo(video: SearchResult | RecommendedVideo) {
    if (!curVideoId) setCurVideoId(video.videoId);
    // move `videoId` to the top of the playlist
    const newPlaylist = playlist.filter((v) => v.videoId !== video.videoId);
    setPlaylist([video, ...newPlaylist]);
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

  const PlaylistScreen = (
    <>
      <div className="font-bold text-primary">
        BÀI KẾ TIẾP ({playlist.length})
      </div>
      <div
        className={`grid grid-flow-row auto-rows-max gap-2 py-2 h-full overflow-y-auto ${scrollbarCls}`}
      >
        {playlist.map((video) => (
          <VideoHorizontalCard
            key={video.videoId}
            video={video}
            onSelect={priorityVideo}
            onDelete={(video) =>
              setPlaylist((curPlaylist) =>
                curPlaylist.filter((v) => v.videoId !== video.videoId)
              )
            }
          />
        ))}
      </div>
    </>
  );
  const SearchScreen = (
    <>
      {/* START Search Bar */}
      <div className="drawer-content flex flex-col h-full overflow-hidden">
        <div className="flex flex-row gap-2 p-1 justify-between items-center bg-primary">
          <div className="form-control flex-1">
            <div className="input-group">
              <span>
                <MagnifyingGlassIcon className="w-6 h-6" />
              </span>
              <DebouncedInput
                type="search"
                placeholder="TÌM BÀI HÁT YOUTUBE"
                className="input w-full appearance-none rounded-l"
                value={searchTerm}
                debounceTime={1000}
                onDebouncedChange={handleSearch}
                inputMode="search"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label flex-col">
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
          <label
            htmlFor="modal-playlist"
            className="btn btn-ghost text-primary-content flex-col gap-1 w-20 p-0"
          >
            <div className="relative">
              <ListBulletIcon className="h-6 w-6" />
              <span className="badge absolute -top-2 -right-2 text-xs p-1">
                {playlist.length}
              </span>
            </div>
            <span className="text-[10px] leading-none">Đã chọn</span>
          </label>
        </div>
        {/* END Search Bar */}
        {/* Recommend Videos List */}
        {(isEmptySearch || isEmptyRecommend) && (
          <div className="text-secondary text-center w-full py-2">
            {isEmptySearch && "Không có kết quả cho từ khóa này."}
            {isEmptyRecommend && "Không có video liên quan nào."}
          </div>
        )}
        <div
          className={`relative grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full overflow-y-auto h-full p-2 ${scrollbarCls}`}
        >
          {/* Video Row Item */}
          {isLoading && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-base-300 z-50" />
              {getSkeletonItems(16).map((s) => (
                <div
                  key={s}
                  className="card bg-gray-300 animate-pulse w-full aspect-w-4 aspect-h-3"
                />
              ))}
            </>
          )}
          {(searchTerm ? searchResults : recommendedVideos)?.map(
            (rcm: SearchResult | RecommendedVideo) => {
              return (
                <Fragment key={rcm?.videoId}>
                  {/* The button to open modal */}
                  <label
                    htmlFor="modal-video"
                    onClick={() => setSelectedVideo(rcm)}
                  >
                    <div className="card overflow-hidden bg-white shadow hover:shadow-md cursor-pointer flex-auto">
                      <figure className="relative w-full aspect-video">
                        <Image
                          unoptimized
                          src={`https://yt.funami.tech/vi/${rcm?.videoId}/mqdefault.jpg`}
                          priority
                          alt={rcm?.title}
                          layout="fill"
                          className="bg-gray-400"
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
                </Fragment>
              );
            }
          )}

          {/* END Video Row Item */}
        </div>
      </div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="modal-playlist" className="modal-toggle" />
      <label
        htmlFor="modal-playlist"
        className="modal modal-bottom cursor-pointer"
      >
        <label
          className="flex flex-col modal-box max-h-[50%] overflow-hidden bg-base-300 p-2"
          htmlFor=""
        >
          <div className="relative h-full overflow-y-auto flex flex-col">
            {PlaylistScreen}
          </div>
        </label>
      </label>
      <input type="checkbox" id="modal-video" className="modal-toggle" />
      <label
        htmlFor="modal-video"
        className="modal modal-bottom md:modal-middle cursor-pointer"
      >
        <label className="modal-box relative p-2" htmlFor="">
          <div className="card gap-2">
            <h2 className="card-title text-sm">{selectedVideo?.title}</h2>
            <figure className="relative w-full aspect-video">
              <Image
                unoptimized
                src={`https://yt.funami.tech/vi/${selectedVideo?.videoId}/mqdefault.jpg`}
                priority
                alt={selectedVideo?.title}
                layout="fill"
                className="bg-gray-400"
              />
            </figure>
            <div className="card-body p-0">
              <div className="card-actions">
                <label
                  htmlFor="modal-video"
                  className="btn btn-primary flex-1"
                  onClick={() => addVideoToPlaylist(selectedVideo)}
                >
                  Chọn
                </label>
                <label
                  htmlFor="modal-video"
                  className="btn btn-primary flex-1"
                  onClick={() => priorityVideo(selectedVideo)}
                >
                  Ưu tiên
                </label>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );

  return (
    <div className="text-sm w-full max-h-screen overflow-hidden">
      <main className="bg-base-300 h-full">
        <div className="relative flex flex-col md:flex-row h-screen overflow-hidden">
          {/* START Recommend Videos List */}
          <div className="order-2 md:order-1 flex flex-col h-full w-full overflow-hidden">
            {SearchScreen}
          </div>
          {/* END Recommend Videos List */}
          {/* Video Player */}
          <div className="relative order-1 md:order-2 w-full flex flex-row md:flex-col flex-grow flex-shrink-0 md:max-w-[400px] md:h-screen overflow-hidden">
            <YoutubePlayer
              videoId={curVideoId} // TODO: make a video instruction and put it here
              nextSong={() => setCurVideoId("")}
              className="flex flex-col h-full flex-1"
            />
            <div className="h-full w-full p-2 overflow-hidden hidden md:flex flex-col">
              {PlaylistScreen}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface VideoHorizontalCardProps {
  video: SearchResult | RecommendedVideo;
  onSelect?: (video: SearchResult | RecommendedVideo) => void;
  onDelete?: (video: SearchResult | RecommendedVideo) => void;
}

function VideoHorizontalCard({
  video,
  onSelect = () => {},
  onDelete = () => {},
}: VideoHorizontalCardProps) {
  return (
    <div
      tabIndex={0}
      className="collapse bg-white shadow hover:shadow-md rounded cursor-pointer"
    >
      <div className="collapse-title p-0 flex flex-row flex-1 overflow-hidden">
        <figure className="relative flex-shrink-0 w-32">
          <Image
            unoptimized
            src={`https://yt.funami.tech/vi/${video?.videoId}/mqdefault.jpg`}
            priority
            alt={video?.title}
            layout="fill"
            className="bg-gray-400"
          />
        </figure>

        <div className="flex flex-col p-2 overflow-hidden gap-2 flex-1">
          <h2 className="font-semibold text-sm line-clamp-2">{video?.title}</h2>
          <p className="text-xs truncate">{video?.author}</p>
        </div>
      </div>

      <div className="collapse-content p-0">
        <div className="flex flex-row gap-1 px-2 pt-4 pb-0 border-t">
          <div
            className="btn btn-sm btn-primary flex-1"
            onClick={() => onSelect(video)}
          >
            Ưu tiên
          </div>
          <div
            className="btn btn-sm btn-ghost text-error flex-1"
            onClick={() => onDelete(video)}
          >
            Xóa khỏi danh sách
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
