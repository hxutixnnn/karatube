import {
  ArrowUturnLeftIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFullscreen, usePromise, useToggle } from "react-use";
import YouTube from "react-youtube";

function YoutubePlayer({ videoId, nextSong }) {
  const playerRef = useRef<YouTube>();
  const fullscreenRef = useRef<HTMLDivElement>();
  const [show, toggleFullscreen] = useToggle(false);
  const isFullscreen = useFullscreen(fullscreenRef, show, {
    onClose: () => toggleFullscreen(false),
  });
  const [playerState, setPlayerState] = useState<number>();

  const [isMuted, setIsMuted] = useState(false);
  const mounted = usePromise();

  useEffect(() => {
    (async () => {
      const player = playerRef.current?.getInternalPlayer();
      const muteState = await mounted(player.isMuted());
      // This line will not execute if this component gets unmounted.
      setIsMuted(muteState);
    })();
  }, []);

  const playPauseBtn = useMemo(
    () => [
      playerState === YouTube.PlayerState.PLAYING
        ? {
            icon: PauseIcon,
            label: "Dừng",
            onClick: async () => {
              try {
                const player = playerRef.current?.getInternalPlayer();
                setPlayerState(await player.getPlayerState());
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
                const player = playerRef.current?.getInternalPlayer();
                setPlayerState(await player.getPlayerState());
                await player.playVideo();
              } catch (error) {
                console.log(error);
              }
            },
          },
    ],
    [playerState]
  );
  const muteBtn = useMemo(
    () => [
      !isMuted
        ? {
            icon: SpeakerWaveIcon,
            label: "Tắt tiếng",
            onClick: async () => {
              try {
                const player = playerRef.current?.getInternalPlayer();
                await player.mute();
                setIsMuted(true);
              } catch (error) {
                console.log(error);
              }
            },
          }
        : {
            icon: SpeakerXMarkIcon,
            label: "Mở tiếng",
            onClick: async () => {
              try {
                const player = playerRef.current?.getInternalPlayer();
                await player.unMute();
                setIsMuted(false);
              } catch (error) {
                console.log(error);
              }
            },
          },
    ],
    [isMuted]
  );

  const playerBtns = useMemo(
    () => [
      {
        icon: ForwardIcon,
        label: "Qua bài",
        onClick: nextSong,
      },
      {
        icon: ArrowUturnLeftIcon,
        label: "Hát lại",
        onClick: async () => {
          try {
            const player = playerRef.current?.getInternalPlayer();
            await player.seekTo(0, true);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ],
    [nextSong]
  );

  return (
    <div
      ref={fullscreenRef}
      id="youtubePlayer"
      className={`flex flex-col ${isFullscreen ? "bg-black" : "bg-white"}`}
    >
      <div
        className="relative flex flex-row items-center justify-center flex-1"
        onClick={toggleFullscreen}
      >
        <YouTube
          ref={playerRef}
          videoId={videoId}
          className={`w-full aspect-video min-h-[200px] ${
            !isFullscreen ? "cursor-zoom-in" : "cursor-zoom-out"
          }`}
          iframeClassName={`w-full h-full pointer-events-none ${
            !videoId ? "hidden" : ""
          }`}
          style={{ width: "100%", height: "100%" }}
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
          onEnd={nextSong}
        />
      </div>
      <div className="flex flex-row w-full p-1 items-center">
        {playPauseBtn.concat(playerBtns, muteBtn).map((btn) => (
          <button
            key={btn.label}
            className="btn btn-ghost text-primary flex h-16 flex-col flex-1 overflow-hidden text-[10px] p-0 hover:bg-base-200"
            onClick={btn.onClick}
          >
            <btn.icon className="w-10 h-10" />
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default YoutubePlayer;
