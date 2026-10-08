import { useEffect, useRef, useState } from 'react'
import Ransom from './Ransom.jsx'

// Browsers only allow sound after a user gesture, so this splash screen collects
// that gesture and the music starts the instant the visitor enters.
export default function EnterScreen({ name }) {
  const [state, setState] = useState('shown') // shown -> leaving -> gone
  const buttonRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = state === 'gone' ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [state])

  useEffect(() => {
    if (state !== 'leaving') return
    const t = setTimeout(() => setState('gone'), 600)
    return () => clearTimeout(t)
  }, [state])

  useEffect(() => {
    buttonRef.current?.focus()
    const enter = () => {
      // Dispatched synchronously inside the gesture so audio.play() is allowed.
      window.dispatchEvent(new Event('site-enter'))
      setState((s) => (s === 'shown' ? 'leaving' : s))
    }
    // If the browser already let the music autoplay, skip the gate.
    const skip = () => setState((s) => (s === 'shown' ? 'leaving' : s))
    window.addEventListener('keydown', enter)
    window.addEventListener('pointerdown', enter)
    window.addEventListener('site-audio-playing', skip)
    return () => {
      window.removeEventListener('keydown', enter)
      window.removeEventListener('pointerdown', enter)
      window.removeEventListener('site-audio-playing', skip)
    }
  }, [])

  if (state === 'gone') return null

  return (
    <div className={`enter ${state === 'leaving' ? 'enter--leaving' : ''}`}>
      <div className="enter__inner">
        <p className="eyebrow">Welcome to the site of</p>
        <h1 className="enter__name"><Ransom text={name.toUpperCase()} /></h1>
        <button ref={buttonRef} type="button" className="btn btn--primary enter__btn">
          Click to enter
        </button>
        <p className="enter__hint">Sound on 🔊</p>
      </div>
    </div>
  )
}
