import Image from "next/image";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { getSkeletonItems, getArtists } from "../utils/api";
import { useKaraokeState } from "../hooks/karaoke";

export default function ListSingerGrid() {
  const [gender, setGender] = useState(1);
  const { data: topartists, isLoading } = useQuery(["getArtists", gender], () =>
    getArtists(gender)
  );
  const { setSearchTerm } = useKaraokeState();
  const { artist } = topartists || {};

  return (
    <>
      <div className="tabs tabs-boxed col-span-full justify-center bg-transparent">
        <div
          className={`tab ${gender === 1 ? "tab-active" : ""}`}
          onClick={() => setGender(1)}
        >
          Nam
        </div>
        <div
          className={`tab ${gender === 2 ? "tab-active" : ""}`}
          onClick={() => setGender(2)}
        >
          Nữ
        </div>
        <div
          className={`tab ${gender === 3 ? "tab-active" : ""}`}
          onClick={() => setGender(3)}
        >
          Nhóm nhạc
        </div>
      </div>
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
      {artist?.map((artist) => {
        return (
          <Fragment key={artist.name}>
            <div
              className="card overflow-hidden bg-white shadow hover:shadow-md cursor-pointer flex-auto"
              onClick={() => {
                setSearchTerm(artist.name);
              }}
            >
              <figure className="relative w-full aspect-square">
                <Image
                  unoptimized
                  src={artist.imageUrl}
                  priority
                  alt={artist.name}
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
                  {artist.name}
                </h2>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
