import Image from "next/image";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { RecommendedVideo, SearchResult } from "../types/invidious";
import { getSearchResult, getSkeletonItems, getVideoInfo } from "../utils/api";
import { useKaraokeState } from "../hooks/karaoke";

export default function SearchResultGrid({
  onClick = () => {},
}: {
  onClick?: (video: SearchResult | RecommendedVideo) => void;
}) {
  const { searchTerm, curVideoId, isKaraoke } = useKaraokeState();
  const prefix = isKaraoke ? '"karaoke" ' : "";

  const titleIncludesKaraoke = ({ title }) => {
    const lcTitle = title.toLowerCase();
    return lcTitle.includes("karaoke") || lcTitle.includes("beat");
  };

  const { data: recommendedVideos, isLoading: infoLoading } = useQuery(
    ["videoInfo", curVideoId],
    () => getVideoInfo(curVideoId),
    {
      enabled: !!curVideoId,
      select: ({ recommendedVideos }) => {
        if (isKaraoke) {
          return recommendedVideos.filter(titleIncludesKaraoke);
        }

        return recommendedVideos;
      },
    }
  );

  const { data: searchResults, isFetching: searchLoading } = useQuery(
    ["searchResult", prefix + searchTerm],
    () => getSearchResult({ q: prefix + searchTerm }),
    {
      select: (results) => {
        if (isKaraoke) {
          return results.filter(titleIncludesKaraoke);
        }

        return results;
      },
    }
  );
  const isLoading = searchLoading || infoLoading;
  const renderList =
    searchTerm || !recommendedVideos?.length
      ? searchResults
      : recommendedVideos;

  return (
    <>
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
      {renderList?.map((rcm) => {
        return !rcm ? null : (
          <Fragment key={rcm.videoId}>
            {/* The button to open modal */}
            <label htmlFor="modal-video" onClick={() => onClick(rcm)}>
              <div className="card overflow-hidden bg-white shadow hover:shadow-md cursor-pointer flex-auto">
                <figure className="relative w-full aspect-video">
                  <Image
                    unoptimized
                    src={`https://invidious.io.lol/vi/${rcm.videoId}/mqdefault.jpg`}
                    priority
                    alt={rcm.title}
                    layout="fill"
                    className="bg-gray-400"
                  />
                </figure>
                <div className="card-body p-2">
                  <h2 className="font-semibold text-sm 2xl:text-2xl line-clamp-2 h-[2.7em]">
                    {rcm.title}
                  </h2>
                  <p className="text-xs 2xl:text-xl truncate">{rcm.author}</p>
                </div>
              </div>
            </label>
          </Fragment>
        );
      })}
    </>
  );
}
