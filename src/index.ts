import ReactNativeExoPlayerModule from "./ReactNativeExoPlayerModule";

import { EventEmitter, Subscription } from "expo-modules-core";

interface Person {
  name: string;
}

export function printArrayOfRecords(array: Person[]): void {
  return ReactNativeExoPlayerModule.printArrayOfRecords(array);
}

const emitter = new EventEmitter(ReactNativeExoPlayerModule);

export type Theme = "light" | "dark" | "system";

export type StateChangeEvent = {
  state: State;
};

export enum State {
  STATE_IDLE = 1,
  STATE_BUFFERING = 2,
  STATE_READY = 3,
  STATE_ENDED = 4,
}

export type TrackChangeEvent = {
  track: TrackMetaData;
  reason: number;
};

export type QueueChangeEvent = {
  queue: TrackMetaData[];
};

export type PlayingChangeEvent = {
  isPlaying: boolean;
};

export type Track = {
  uri: string;
  title: string;
  artist: string;
  artwork?: string;
  duration?: number;
};

export type TrackMetaData = {
  title: string;
  artist: string;
  artwork?: string;
  duration?: number;
};

export function addStateListener(
  listener: (event: StateChangeEvent) => void
): Subscription {
  return emitter.addListener<StateChangeEvent>("onStateChange", listener);
}

export function addTrackListener(
  listener: (event: TrackChangeEvent) => void
): Subscription {
  return emitter.addListener<TrackChangeEvent>("onTrackChange", listener);
}

export function addQueueListener(
  listener: (event: TrackChangeEvent) => void
): Subscription {
  return emitter.addListener<TrackChangeEvent>("onQueueChange", listener);
}

export function addPlayingListener(
  listener: (event: PlayingChangeEvent) => void
): Subscription {
  return emitter.addListener<PlayingChangeEvent>("onPlayingChange", listener);
}

export function initializePlayer(): void {
  return ReactNativeExoPlayerModule.initializePlayer();
}

export function load(uri: string): void {
  return ReactNativeExoPlayerModule.load(uri);
}

export function loadMultiple(tracks: Track[]): void {
  return ReactNativeExoPlayerModule.loadMultiple(tracks);
}

export function play(): void {
  return ReactNativeExoPlayerModule.play();
}

export function pause(): void {
  return ReactNativeExoPlayerModule.pause();
}

export function stop(): void {
  return ReactNativeExoPlayerModule.stop();
}

export function skipToNext(): void {
  return ReactNativeExoPlayerModule.skipToNext();
}

export function skipToPrevious(): void {
  return ReactNativeExoPlayerModule.skipToPrevious();
}

export function reset(): void {
  return ReactNativeExoPlayerModule.reset();
}

export function seekTo(time: number): void {
  return ReactNativeExoPlayerModule.seekTo(time);
}

export function getDuration(): number {
  return ReactNativeExoPlayerModule.getDuration();
}

export function getPosition(): number {
  return ReactNativeExoPlayerModule.getPosition();
}

export function getIsPlaying(): boolean {
  return ReactNativeExoPlayerModule.getIsPlaying();
}

export function getQueue(): TrackMetaData[] {
  return ReactNativeExoPlayerModule.getQueue();
}

export function getState(): State {
  return ReactNativeExoPlayerModule.getState();
}

export function getCurrentTrack(): TrackMetaData {
  return ReactNativeExoPlayerModule.getCurrentTrack();
}
