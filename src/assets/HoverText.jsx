import { useState } from 'react'

export default function HoverText() {
  const [show, setShow] = useState(false)

  return (
    <div style={{ textAlign: 'center', marginTop: '32px' }}>
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        Hover over me
      </button>

      {show && (
        <p style={{ marginTop: '16px', fontSize: '1.2rem' }}>
          You found me! 🎉
        </p>
      )}
    </div>
  )
}