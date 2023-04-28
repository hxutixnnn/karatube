import {
  ArrowUturnLeftIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFullscreen, usePromise, useToggle } from "react-use";
import YouTube, { YouTubePlayer } from "react-youtube";

function YoutubePlayer({ videoId, nextSong, className = "", extra = null }) {
  const playerRef = useRef<YouTube>();
  const fullscreenRef = useRef<HTMLDivElement>();
  const [show, toggleFullscreen] = useToggle(false);
  const isFullscreen = useFullscreen(fullscreenRef, show, {
    onClose: () => toggleFullscreen(false),
  });
  const [playerState, setPlayerState] = useState<number>();

  const [isMuted, setIsMuted] = useState(false);
  const mounted = usePromise();

  async function updatePlayerState(player: YouTubePlayer) {
    if (!player) return;
    const [muteState, playerState] = await mounted(
      Promise.allSettled([player.isMuted(), player.getPlayerState()])
    );
    // These lines will not execute if this component gets unmounted.
    if (muteState.status === "fulfilled") setIsMuted(muteState.value);
    if (playerState.status === "fulfilled") setPlayerState(playerState.value);
  }

  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (player) updatePlayerState(player);
  }, [videoId]);

  const playPauseBtn = useMemo(
    () => [
      playerState === YouTube.PlayerState.PLAYING
        ? {
            icon: PauseIcon,
            label: "Dừng",
            onClick: async () => {
              try {
                const player = playerRef.current?.getInternalPlayer();
                if (!player) return;
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
                if (!player) return;
                setPlayerState(await player?.getPlayerState());
                await player?.playVideo();
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
                if (!player) return;
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
                if (!player) return;
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
            if (!player) return;
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
      className={`${isFullscreen ? "bg-black" : "bg-white"} ${className}`}
    >
      <div
        className="w-full aspect-video relative flex-1 md:flex-grow-1"
        onClick={toggleFullscreen}
      >
        {!videoId ? (
          <div className="h-full w-full flex items-center justify-center bg-black">
            <Image
              src="/assets/icons/icon.svg"
              width={48}
              height={48}
              className=""
              alt="KaraTube's Logo"
            />
          </div>
        ) : (
          <YouTube
            ref={playerRef}
            videoId={videoId}
            className={`w-full bg-black ${
              !isFullscreen
                ? "aspect-video cursor-zoom-in"
                : "h-full cursor-zoom-out"
            }`}
            iframeClassName={`w-full h-full pointer-events-none`}
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
            onStateChange={(ev) => updatePlayerState(ev.target)}
            onEnd={nextSong}
          />
        )}
      </div>
      <div className="flex-shrink-0 flex flex-row md:w-full p-1 items-center">
        {playPauseBtn.concat(playerBtns, muteBtn).map((btn) => (
          <button
            key={btn.label}
            className="btn btn-ghost text-primary flex h-auto flex-col flex-1 overflow-hidden text-[10px] 2xl:text-lg p-0 hover:bg-base-200"
            onClick={btn.onClick}
          >
            <btn.icon className="w-10 h-10" />
            {btn.label}
          </button>
        ))}
        {extra}
      </div>
    </div>
  );
}

export default YoutubePlayer;
