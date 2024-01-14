"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import Component from "video.js/dist/types/component";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const initialOptions = {
  autoplay: true,
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

export function KtVideoPlayer({ videoId }: { videoId: string }) {
  const videoNode = useRef(null);
  const player = useRef<Component | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (videoNode.current && !initialized.current) {
      initialized.current = true; //prevent duplicate initialization

      player.current = videojs(videoNode.current, {
        ...initialOptions,
        sources: [
          {
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${videoId}`,
          },
        ],
      }).ready(function () {
        console.log("Player Ready");
      });
    }
    //clear up player on dismount
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [videoId]);

  return (
    <div className="App">
      <video ref={videoNode} className="video-js" />
    </div>
  );
}
