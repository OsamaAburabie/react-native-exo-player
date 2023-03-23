import { useEffect, useState } from "react";
import { addPlayingListener, getIsPlaying } from "react-native-exo-player";

const useIsPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(getIsPlaying() || false);

  useEffect(() => {
    addPlayingListener(({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });
  }, []);
  return isPlaying;
};

export default useIsPlaying;
