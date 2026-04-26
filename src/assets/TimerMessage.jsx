import { useState } from 'react'

export default function TimerMessage() {
  const [show, setShow] = useState(false)
  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(true)
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 3000)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '32px' }}>
      <button onClick={handleClick}>
        {clicked ? 'Gözlə...' : 'Click me'}
      </button>

      {show && (
        <p style={{ marginTop: '16px', fontSize: '1.2rem' }}>
          3 saniyə keçdi! ⏰
        </p>
      )}
    </div>
  )
}