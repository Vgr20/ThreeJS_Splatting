import React, { useEffect, useRef } from "react";

/**
 * AutoPlayVideo Component
 *
 * This component renders a full-width video that automatically plays when mounted.
 * It sits below the navbar and spans the entire width of the screen.
 *
 * Props:
 * - videoSrc: String (required) - URL to the video file
 * - posterSrc: String (optional) - URL to the poster/thumbnail image
 * - height: String (optional) - CSS height value (default: 'auto')
 * - objectFit: String (optional) - CSS object-fit property (default: 'cover')
 * - muted: Boolean (optional) - Whether video should be muted (default: true)
 * - loop: Boolean (optional) - Whether video should loop (default: true)
 * - controls: Boolean (optional) - Whether to show video controls (default: false)
 */
interface VideoPlayerProps {
  videoSrc: string;
  posterSrc: string;
  height: string;
  objectFit: "fill" | "contain" | "cover" | "none" | "scale-down";
  muted: boolean;
  loop: boolean;
  controls: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  posterSrc = "",
  height = "auto",
  objectFit = "cover",
  muted = true,
  loop = true,
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to play the video once the component mounts
  useEffect(() => {
    // Make sure video exists
    if (videoRef.current) {
      // Using play().catch to handle autoplay restrictions in modern browsers
      // Modern browsers often require user interaction before allowing autoplay with sound
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error: unknown) => {
          console.log("Auto-play was prevented:", error);
          // We could implement a play button here if needed
        });
      }
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <video
        ref={videoRef}
        className="w-full"
        style={{
          height: height,
          objectFit: objectFit,
        }}
        autoPlay
        playsInline
        muted={muted}
        loop={loop}
        controls={controls}
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
