import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

type Props = {
  animationData: unknown;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  renderer?: "svg" | "canvas" | "html";
  speed?: number;
  /** Changing this value forces re-render of the lottie instance */
  renderKey?: string | number;
};

export default function LottieLoop({
  animationData,
  className,
  style,
  loop = true,
  autoplay = true,
  renderer = "svg",
  speed = 1,
  renderKey,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up old instance (if any)
    animRef.current?.destroy();
    animRef.current = null;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer,
      loop,
      autoplay,
      animationData: animationData as object,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    if (animRef.current) {
      animRef.current.setSpeed(speed);
    }

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderKey, animationData, loop, autoplay, renderer, speed]);

  return <div ref={containerRef} className={className} style={style} />;
}
