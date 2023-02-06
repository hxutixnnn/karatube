import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import DebouncedInput from "../components/DebouncedInput";
import { YoutubePlayer } from "../components/YoutubePlayer";
import { RecommendedVideo, SearchResult } from "../types/invidious";
import { getSearchResult, getSkeletonItems, getVideoInfo } from "../utils/api";

function WatchPage() {
  // const [videoId, setVideoId] = useState("gkkw1oXSV4M"); // 4lNAEnqZ7XA
  const router = useRouter();
  let { v: videoId = "gkkw1oXSV4M" } = router.query as {
    [key: string]: string;
  }; // temp fix

  function goToVideo(videoId: string) {
    return router.push({
      pathname: router.pathname,
      query: { ...router.query, v: videoId },
    });
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
    // return router.push({
    //   pathname: router.pathname,
    //   query: { ...router.query, q },
    // });
  }
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
                        <div className="card bg-white shadow hover:shadow-md cursor-pointer flex-auto">
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

export default WatchPage;
