import { GetStaticProps, InferGetStaticPropsType } from "next";
import { VideoResponse } from "../../types/invidious";
import { getTrendingVideos } from "../../utils/api";

const baseUrl = process.env.NEXT_PUBLIC_INVIDIOUS_URL ?? "";

export const getStaticProps: GetStaticProps<{
  videos: VideoResponse[];
}> = async () => {
  const videos = await getTrendingVideos();
  return { props: { videos } };
};

export default function Page({
  videos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Carousel.Wrapper>
        {videos.map((video) => (
          <Carousel.Item key={video.videoId} {...video} />
        ))}
      </Carousel.Wrapper>
    </div>
  );
}

const Carousel = {
  Wrapper: ({ children }) => (
    <div className="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral">
      {children}
    </div>
  ),
  Item: ({
    title,
    viewCount,
    videoThumbnails,
    lengthSeconds,
    publishedText,
  }: VideoResponse) => {
    const thumbnail = videoThumbnails.at(0);
    return (
      <div className="carousel-item">
        <div className="card w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={thumbnail.url} alt="Shoes" />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title ">{title}</h2>
            <div className="badge badge-secondary">
              {fancyTimeFormat(lengthSeconds)}
            </div>
            <p className="">
              {viewCount.toLocaleString()} views · {publishedText}
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Play Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}
