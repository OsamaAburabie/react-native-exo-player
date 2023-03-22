import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativeExoPlayer.web.ts
// and on native platforms to ReactNativeExoPlayer.ts
import ReactNativeExoPlayerModule from './ReactNativeExoPlayerModule';
import ReactNativeExoPlayerView from './ReactNativeExoPlayerView';
import { ChangeEventPayload, ReactNativeExoPlayerViewProps } from './ReactNativeExoPlayer.types';

// Get the native constant value.
export const PI = ReactNativeExoPlayerModule.PI;

export function hello(): string {
  return ReactNativeExoPlayerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeExoPlayerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativeExoPlayerModule ?? NativeModulesProxy.ReactNativeExoPlayer);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativeExoPlayerView, ReactNativeExoPlayerViewProps, ChangeEventPayload };
