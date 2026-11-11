import { useCallback, useState } from "react"
import Splash from './components/Splash'
import LandingPage from "./components/LandingPage"
import './App.css'

export default function App() {
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  const reveal = useCallback(() => setReady(true), [])
  const finish = useCallback(() => setDone(true), [])

  return (
    <>
      <LandingPage ready={ready} />
      {!done && <Splash onReveal={reveal} onDone={finish} />}
    </>
  )
}