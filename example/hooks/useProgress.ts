import { useEffect, useState } from "react";
import { getPosition, getDuration, State } from "react-native-exo-player";

import usePlayerState from "./usePlayerState";
import useIsPlaying from "./usePlaying";

const useProgress = () => {
  const isPlaying = useIsPlaying();
  const state = usePlayerState();
  const [progress, setProgress] = useState({
    position: 0,
    duration: 0,
  });

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress({
          position: getPosition(),
          duration: getDuration(),
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (state === State.STATE_IDLE) {
      setProgress({
        position: 0,
        duration: 0,
      });
    }

    if (state === State.STATE_READY) {
      setProgress({
        position: getPosition(),
        duration: getDuration(),
      });
    }
  }, [state]);

  return { progress };
};

export default useProgress;
