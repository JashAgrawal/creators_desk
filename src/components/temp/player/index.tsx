import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import vd from "../../../assets/sample.mp4";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImLoop } from "react-icons/im";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { MdFullscreen } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn, secondsToTime } from "@/lib/utils";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentsBar from "./t";
// import { FaPause } from "react-icons/fa6";
const CustomVideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speakerHovering, setSpeakerHovering] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullDuration, setFullDuration] = useState(0);
  const [currentComment, setCurrentComment] = useState("");
  const [comments, setComments] = useState([
    {
      timestamp: 12,
      text: "This shot goes on a bit long, ar putting titles here?",
    },
    {
      timestamp: 8,
      text: "This shot goes on a bit short",
    },
  ]);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (progress: any) => {
    setCurrentTime(progress.playedSeconds);
  };
  const toggleFullScreen = () => {
    if (isFullScreen) {
      screenfull.exit();
    } else {
      // findDOMNode(playerRef.current?.props.wrapper)?.requestFullscreen();
      screenfull.request(findDOMNode(playerRef.current) as Element);
    }
    setIsFullScreen(!isFullScreen);
  };
  //add code to detect exit of fullscreen
  useEffect(() => {
    const onChange = () => setIsFullScreen(screenfull.isFullscreen);
    screenfull.on("change", onChange);
    return () => screenfull.off("change", onChange);
  }, []);
  return (
    <div className="realtive rounded-md overflow-hidden w-[93%]">
      <div onClick={() => setPlaying(!playing)}>
        <ReactPlayer
          ref={playerRef}
          url={vd}
          playing={playing}
          controls={isFullScreen}
          muted={muted}
          volume={volume / 100}
          loop={loop}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onReady={() => {
            setFullDuration(Math.floor(playerRef.current?.getDuration() || 0));
          }}
          width="100%"
          height="auto"
        />
      </div>
      {/* Add a video control bar code here  */}
      <div className="w-full">
        <Slider
          max={playerRef.current?.getDuration() || 0}
          min={0}
          step={1}
          className="w-full h-full"
          value={[currentTime]}
          onValueChange={(value) => {
            playerRef.current?.seekTo(value[0]);
          }}
        />
      </div>
      <CommentsBar fullDuration={fullDuration} />
      {/* <div className="w-full bg-gray-400 px-3 flex justify-between items-center">
        <p className="text-sm">{secondsToTime(currentTime || 0)}</p>
        <p className="text-sm">
          {secondsToTime(playerRef.current?.getDuration() || 0)}
        </p>
      </div> */}

      <div className="w-full bg-gray-400 px-3 py-2 flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div onClick={() => setPlaying(!playing)}>
            {!playing ? <FaPlay size={14} /> : <FaPause size={14} />}
          </div>
          <div onClick={() => setLoop(!loop)}>
            <ImLoop color={loop ? "red" : "white"} size={14} />
          </div>
          <div>
            <Popover>
              <PopoverTrigger>
                <p className="text-sm">{playbackRate}</p>
              </PopoverTrigger>
              <PopoverContent className="w-[25rem]" side="right">
                <div className="bg-white rounded-md flex flex-col relative">
                  <Slider
                    value={[playbackRate]}
                    onValueChange={(value) => setPlaybackRate(value[0])}
                    defaultValue={[playbackRate]}
                    max={1.75}
                    step={0.25}
                    min={0.25}
                  />
                  <div className="flex w-full justify-between">
                    {[0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75].map((rate) => (
                      <div
                        className={cn(
                          "w-[14.28%] text-center text-sm",
                          playbackRate === rate ? "text-black" : "text-gray-400"
                        )}
                        onClick={() => setPlaybackRate(rate)}
                      >
                        {rate}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div
            onMouseEnter={() => setSpeakerHovering(true)}
            onMouseLeave={() => setSpeakerHovering(false)}
            className="flex items-center space-x-2 w-full"
          >
            <div onClick={() => setMuted(!muted)}>
              {muted ? <GiSpeakerOff size={20} /> : <GiSpeaker size={20} />}
            </div>
            <div className={cn(speakerHovering ? "w-[3rem]" : "hidden ")}>
              <Slider
                value={[muted ? 0 : volume]}
                onValueChange={(value) => {
                  if (muted && value[0] > 0) {
                    setMuted(false);
                  }
                  if (value[0] === 0) {
                    setMuted(true);
                  }
                  setVolume(value[0]);
                }}
                max={100}
                step={1}
                min={0}
              />
            </div>
          </div>
        </div>
        <div>
          <p>
            {secondsToTime(currentTime || 0)} /{" "}
            {secondsToTime(playerRef.current?.getDuration() || 0)}
          </p>
        </div>
        <div>
          <MdFullscreen size={20} onClick={() => toggleFullScreen()} />
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
