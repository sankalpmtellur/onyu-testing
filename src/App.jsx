import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [down, setDown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const handleMove = (event) => {
      setPos({ x: event.clientX, y: event.clientY })
    }
    const handleDown = () => setDown(true)
    const handleUp = () => setDown(false)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [])

  return (
    <main className="center">
      <h1>ONYU</h1>
      <button className="cta" onClick={() => setShowMessage(true)}>
        Try the button
      </button>
      {showMessage && (
        <div className="overlay" role="status" aria-live="polite">
          <div className="overlay-card">
            <p>YAY! You clicked a button.</p>
            <button className="cta cta--ghost" onClick={() => setShowMessage(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <div
        className={`cursor ${down ? 'cursor--down' : ''}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className={`cursor-ring ${down ? 'cursor-ring--down' : ''}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        aria-hidden="true"
      />
    </main>
  )
}
