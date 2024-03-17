"use client";


// export function KtVideoPlayer({ videoId }: { videoId?: string }) {
//   const [data, setData] = useState<VideoInfo>();
//   useEffect(() => {
//     // @ts-expect-error
//     if (videoId) getVideoInfo(videoId).then(setData).catch(console.log);
//   }, [videoId]);

//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }

// export function KtVideoPlayer({ videoId }: { videoId: string }) {
//   // const videoElement = useRef<ElementRef<"video">>(null);
//   const [videoSrc, setSrc] = useState("");

//   useEffect(() => {
//     async function initPlayer() {
//       // Get the video info
//       const videoInfo = await getVideoInfo(videoId);
//       if (videoInfo.data) setSrc(videoInfo.data);
//       //     const player = dashjs.MediaPlayer().create();
//       //     if (videoElement.current && videoInfo.data)
//       //       player.initialize(videoElement.current, videoInfo.data, true);
//     }

//     initPlayer();
//   }, [videoId]);

//   return (
//     <video width="750" height="500" controls>
//       <source src={videoSrc} type="video/mp4" />
//     </video>
//   );
// }

export function KtVideoPlayer({ videoId }: { videoId: string }) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ border: 0 }}
    />
  );
}
