import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativeExoPlayerViewProps } from './ReactNativeExoPlayer.types';

const NativeView: React.ComponentType<ReactNativeExoPlayerViewProps> =
  requireNativeViewManager('ReactNativeExoPlayer');

export default function ReactNativeExoPlayerView(props: ReactNativeExoPlayerViewProps) {
  return <NativeView {...props} />;
}
