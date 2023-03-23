import { useEffect, useState } from "react";
import {
  addTrackListener,
  getCurrentTrack,
  TrackMetaData,
} from "react-native-exo-player";

const useActiveTrack = () => {
  const [activeTrack, setActiveTrack] = useState<TrackMetaData | null>(
    getCurrentTrack()
  );

  useEffect(() => {
    addTrackListener(({ track }) => {
      setActiveTrack(track);
    });
  }, []);

  return activeTrack;
};

export default useActiveTrack;
