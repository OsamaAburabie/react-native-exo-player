import * as React from 'react';

import { ReactNativeExoPlayerViewProps } from './ReactNativeExoPlayer.types';

export default function ReactNativeExoPlayerView(props: ReactNativeExoPlayerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
