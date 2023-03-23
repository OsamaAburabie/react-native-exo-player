package expo.modules.exoplayer

import android.os.Bundle
import com.google.android.exoplayer2.*
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

const val ON_STATE_CHANGE = "onStateChange"
const val ON_TRACK_CHANGE = "onTrackChange"
const val ON_QUEUE_CHANGE = "onQueueChange"
const val ON_PLAYING_CHANGE = "onPlayingChange"

internal class Track : Record {
  @Field
  var title: String? = null

  @Field
  var artist: String? = null

  @Field
  var uri: String? = null

  @Field
  var artwork: String? = null

  @Field
  var duration: String? = null
}

class ReactNativeExoPlayerModule : Module() {
  private var mPlayer: ExoPlayer? = null

  override fun definition() = ModuleDefinition {
    Name("ReactNativeExoPlayer")

    Events(ON_STATE_CHANGE, ON_TRACK_CHANGE, ON_QUEUE_CHANGE, ON_PLAYING_CHANGE)

    OnStartObserving {
      addIsPlayingListener()
      addStateListener()
      addTrackChangeListener()
    }

    Function("initializePlayer") {
      initializePlayer()
    }

    Function("load") { uri: String ->
      load(uri)
    }

    Function("loadMultiple") { tracks: List<Track> ->
      loadMultiple(tracks)
    }

    Function("pause") {
      pause()
    }

    Function("play") {
      play()
    }

    Function("stop") {
      stop()
    }

    Function("skipToNext") {
      skipToNext()
    }

    Function("skipToPrevious") {
      skipToPrevious()
    }

    Function("reset") {
      reset()
    }

    Function("getPosition") {
      return@Function mPlayer?.currentPosition ?: 0
    }

    Function("getDuration") {
      return@Function mPlayer?.duration ?: 0
    }

    Function("getQueue") {
      return@Function getQueue()
    }

    Function("getIsPlaying") {
      return@Function mPlayer?.isPlaying
    }

    Function("getState") {
      return@Function getState()
    }

    Function("getCurrentTrack") {
      return@Function getCurrentTrack()
    }
  }
  private val context
    get() = requireNotNull(appContext.reactContext)

  private fun initializePlayer() {
    if (mPlayer == null) {
      mPlayer = ExoPlayer.Builder(context).build()
    }
  }

  private fun load(uri: String) {
    val mediaItem = MediaItem.Builder()
      .setUri(uri)
      .build()
    mPlayer?.setMediaItem(mediaItem)

    mPlayer?.prepare()
  }

  private fun loadMultiple(tracks: List<Track>) {
    val mediaItems = tracks.map {
      val extras = Bundle()
      extras.putString("artwork", it.artwork)
      extras.putString("duration", it.duration)

      val metadata: MediaMetadata = MediaMetadata.Builder()
        .setTitle(it.title)
        .setArtist(it.artist).setExtras(extras)
        .build()

      MediaItem.Builder()
        .setUri(it.uri)
        .setMediaMetadata(metadata)
        .build()
    }

    mPlayer?.setMediaItems(mediaItems)
    mPlayer?.prepare()
  }

  private fun pause() {
    if (mPlayer?.isPlaying == true) {
      mPlayer?.pause()
    }
  }

  private fun play() {
    if (mPlayer?.isPlaying == false) {
      mPlayer?.play()
    }
  }

  private fun stop() {
    mPlayer?.stop()
  }

  private fun skipToNext() {
    mPlayer?.seekToNextMediaItem()
  }

  private fun skipToPrevious() {
    mPlayer?.seekToPreviousMediaItem()
  }

  private fun getState(): Int {
    return mPlayer?.playbackState ?: Player.STATE_IDLE
  }

  private fun getCurrentTrack(): Map<String, CharSequence?>? {
    val mediaItem = mPlayer?.currentMediaItem
    val trackMap = if (mediaItem?.mediaMetadata?.title != null) {
      mapOf(
        "title" to mediaItem.mediaMetadata.title,
        "artist" to mediaItem.mediaMetadata.artist,
        "artwork" to mediaItem.mediaMetadata.extras?.getString("artwork"),
        "duration" to mediaItem.mediaMetadata.extras?.getString("duration")
      )
    } else {
      null
    }

    return trackMap
  }

  private fun reset() {
    mPlayer?.stop()
    mPlayer?.clearMediaItems()
  }


  private fun addIsPlayingListener() {
    mPlayer?.addListener(object : Player.Listener {
      override fun onIsPlayingChanged(isPlaying: Boolean) {
        sendEvent(ON_PLAYING_CHANGE, mapOf("isPlaying" to isPlaying))
      }
    })
  }

  private fun addStateListener() {
    mPlayer?.addListener(object : Player.Listener {
      override fun onPlaybackStateChanged(playbackState: Int) {
        sendEvent(ON_STATE_CHANGE, mapOf("state" to playbackState))
      }
    })
  }

  private fun addTrackChangeListener() {
    mPlayer?.addListener(object : Player.Listener {
      override fun onMediaItemTransition(mediaItem: MediaItem?, reason: Int) {
        val trackMap = if (mediaItem?.mediaMetadata?.title != null) {
          mapOf(
            "title" to mediaItem.mediaMetadata.title,
            "artist" to mediaItem.mediaMetadata.artist,
            "artwork" to mediaItem.mediaMetadata.extras?.getString("artwork"),
            "duration" to mediaItem.mediaMetadata.extras?.getString("duration")
          )
        } else {
          null
        }
        sendEvent(
          ON_TRACK_CHANGE,
          mapOf(
            "track" to trackMap,
            "reason" to reason
          )
        )

        getQueue()
      }
    })
  }


  private fun getQueue(): MutableList<Map<String, CharSequence?>> {
    val mediaMetadataArray = mutableListOf<Map<String, CharSequence?>>()

    mPlayer?.mediaItemCount?.let { count ->
      for (i in 0 until count) {
        val mItem = mPlayer?.getMediaItemAt(i)
        val mediaMetadata = mItem?.mediaMetadata
        if (mediaMetadata != null) {
          val title = mediaMetadata.title
          val artist = mediaMetadata.artist
          val artwork = mediaMetadata.extras?.getString("artwork")
          val duration = mediaMetadata.extras?.getString("duration")

          val mapOf = mapOf(
            "title" to title,
            "artist" to artist,
            "artwork" to artwork,
            "duration" to duration
          )

          mediaMetadataArray.add(mapOf)
        }
      }
    }

    sendEvent(ON_QUEUE_CHANGE, mapOf("queue" to mediaMetadataArray))

    return mediaMetadataArray
  }




}


