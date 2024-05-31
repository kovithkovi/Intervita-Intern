import QRcode from 'qrcode'
import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [qrcode, setQrcode] = useState('')

  const GenerateQr = () => {
    QRcode.toDataURL(url, (err, url) => {
      if (err) return console.log(err)
      console.log(url)
      setQrcode(url)
    })
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <input type="text"  placeholder="e.g. hello or https://www.google.com" value={url} onChange={(ev) => {
        setUrl(ev.target.value)
      }}/>
      <button onClick={GenerateQr}>Generate</button>
      <img src={qrcode} alt="" />
    </div>
  )
}

export default App
