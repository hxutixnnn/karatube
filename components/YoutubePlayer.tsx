import {
  ArrowUturnLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useMemo, useRef, useState } from "react";
import YouTube from "react-youtube";
import PlayerStates from "youtube-player/dist/constants/PlayerStates";

export function YoutubePlayer({ videoId }) {
  const youtubePlayer = useRef<YouTube>();
  const [playerState, setPlayerState] = useState<PlayerStates>();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement);
    youtubePlayer.current
      ?.getInternalPlayer()
      .isMuted()
      .then(setIsMuted)
      .catch((err) => console.log("[isMuted]", err));
  }, []);

  const playPauseBtn = useMemo(
    () => [
      playerState === PlayerStates.PLAYING
        ? {
            icon: PauseIcon,
            label: "Dừng",
            onClick: async () => {
              try {
                const player = youtubePlayer.current?.getInternalPlayer();
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
                const player = youtubePlayer.current?.getInternalPlayer();
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
                const player = youtubePlayer.current?.getInternalPlayer();
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
                const player = youtubePlayer.current?.getInternalPlayer();
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
        icon: BackwardIcon,
        label: "Bài trước",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.previousVideo();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        icon: ForwardIcon,
        label: "Qua bài",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.nextVideo();
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        icon: ArrowUturnLeftIcon,
        label: "Hát lại",
        onClick: async () => {
          try {
            const player = youtubePlayer.current?.getInternalPlayer();
            await player.seekTo(0, true);
          } catch (error) {
            console.log(error);
          }
        },
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-1 min-w-[400px]">
      <div id="youtubePlayer" className="flex flex-col bg-white">
        <div
          className="flex flex-row items-center justify-center flex-1 bg-black"
          onClick={async () => {
            if (!document.fullscreenElement) {
              const playerElement = document.getElementById("youtubePlayer");
              const requestFullScreen = playerElement.requestFullscreen;
              // || playerElement.mozRequestFullscreen
              // || playerElement.webkitRequestFullscreen;
              if (requestFullScreen) {
                await requestFullScreen.bind(playerElement)();
              }
            } else {
              await document.exitFullscreen();
            }
          }}
        >
          <YouTube
            ref={youtubePlayer}
            videoId={videoId}
            //id="youtubePlayer"
            className={`bg-base-300 w-full aspect-video ${
              !isFullscreen ? "cursor-zoom-in" : "cursor-zoom-out"
            }`}
            iframeClassName="w-full h-full pointer-events-none"
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
          />
        </div>
        <div className="flex flex-row justify-evenly w-full p-1 items-center">
          {playPauseBtn.concat(playerBtns, muteBtn).map((btn) => (
            <button
              key={btn.label}
              className={`btn btn-ghost text-primary flex h-16 w-16 overflow-hidden text-[10px] p-0 hover:bg-base-200`}
              onClick={btn.onClick}
            >
              <btn.icon className="w-10 h-10" />
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="font-bold text-primary">BÀI KẾ TIẾP (0)</div>
      </div>
    </div>
  );
}
