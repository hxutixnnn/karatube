import Image from "next/image";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { getSkeletonItems, getTopics } from "../utils/api";
import { useKaraokeState } from "../hooks/karaoke";

export default function ListTopicsGrid() {
  const { data, isLoading } = useQuery(["getTopics"], getTopics);
  const { setActiveIndex, setSearchTerm } = useKaraokeState();
  const { topic: topics } = data || {};

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
      {topics?.map((topic) => {
        return (
          <Fragment key={topic.key}>
            <div
              className="card overflow-hidden bg-white shadow hover:shadow-md cursor-pointer flex-auto"
              onClick={() => {
                setSearchTerm(topic.title);
                setActiveIndex(0);
              }}
            >
              <figure className="relative w-full aspect-w-16 aspect-h-5">
                <Image
                  unoptimized
                  src={topic.coverImageURL}
                  priority
                  alt={topic.title}
                  layout="fill"
                  className="animate-pulse bg-gray-400"
                  onLoad={(ev) =>
                    ev.currentTarget.classList.remove("animate-pulse")
                  }
                  onErrorCapture={(ev) => {
                    ev.currentTarget.src = "/assets/avatar.jpeg";
                  }}
                />
              </figure>
              <div className="card-body p-2">
                <h2 className="font-semibold text-sm 2xl:text-2xl line-clamp-2 h-[2.7em]">
                  {topic.title}
                </h2>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
