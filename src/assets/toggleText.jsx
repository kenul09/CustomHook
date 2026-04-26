import { useState } from 'react'

export default function ToggleText() {
  const [goster, setGoster] = useState(true)

  return (
  <div style={{ marginTop: '20px', fontSize: '24px', textAlign: 'center' }}>
    {goster ? <p>Salam! 👋</p> : <p>Necəsən? 😊</p>}
    <button 
      onClick={() => setGoster(prev => !prev)}
      style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
    >
      Dəyiş
    </button>
  </div>
)
}