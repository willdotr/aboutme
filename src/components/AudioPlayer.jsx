import { useEffect, useRef, useState } from 'react'

const SRC = `${import.meta.env.BASE_URL}audio/theme.mp3`

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)
const PLAY = 'M8 5v14l11-7z'
const PAUSE = 'M6 5h4v14H6zM14 5h4v14h-4z'
const SPEAKER = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z'
const MUTED = 'M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.4)

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  // Browsers block sound until the visitor interacts, so try to autoplay and,
  // if that is refused, start on the first click/tap/keypress anywhere else.
  useEffect(() => {
    const audio = audioRef.current
    let cancelled = false
    const events = ['pointerdown', 'keydown', 'touchend']
    const start = (e) => {
      if (e.target.closest?.('.audio')) return // the player's own controls decide
      audio.play().catch(() => {})
      stop()
    }
    const stop = () => events.forEach((ev) => window.removeEventListener(ev, start))

    const onEnter = () => audio.play().catch(() => {})
    window.addEventListener('site-enter', onEnter)

    audio.play().catch(() => {
      if (!cancelled) events.forEach((ev) => window.addEventListener(ev, start))
    })
    return () => {
      cancelled = true
      stop()
      window.removeEventListener('site-enter', onEnter)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <div className="audio" role="group" aria-label="Background music">
      <audio
        ref={audioRef}
        src={SRC}
        loop
        preload="auto"
        onPlay={() => {
          setPlaying(true)
          window.dispatchEvent(new Event('site-audio-playing'))
        }}
        onPause={() => setPlaying(false)}
      />
      <button type="button" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'} className="audio__btn audio__btn--main">
        <Icon d={playing ? PAUSE : PLAY} />
      </button>
      <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} className="audio__btn">
        <Icon d={muted || volume === 0 ? MUTED : SPEAKER} />
      </button>
      <input
        className="audio__slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        onChange={(e) => {
          const v = Number(e.target.value)
          setVolume(v)
          setMuted(v === 0)
        }}
        aria-label="Volume"
      />
    </div>
  )
}
