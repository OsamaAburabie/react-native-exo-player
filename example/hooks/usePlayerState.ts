import { useEffect, useState } from "react";
import { addStateListener, getState, State } from "react-native-exo-player";

const usePlayerState = () => {
  const [state, setState] = useState(getState() || State.STATE_IDLE);
  useEffect(() => {
    addStateListener((state) => {
      setState(state.state);
    });
  }, []);

  return state;
};

export default usePlayerState;
