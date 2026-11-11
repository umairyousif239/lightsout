import { useCallback, useEffect, useRef, useState } from "react"
import Wordmark from "./Wordmark"
import './Splash.css'

export default function Splash({ onReveal, onDone}) {
    const [lit, setLit] = useState(true)
    const [glow, setGlow] = useState(false)
    const [out, setOut] = useState(false)
    const timers = useRef([])
    const finished = useRef(false)

    const finish = useCallback(() => {
        if (finished.current) return
        finished.current = true
        timers.current.forEach(clearTimeout)
        setLit(false)
        setGlow(true)
        setOut(true)
        onReveal()
        timers.current = [setTimeout(onDone, 1100)]
    }, [onReveal, onDone])

    useEffect(() => {
        const reduce = window.matchMedia('(preface-reduced-motion: reduce)').matches

        const steps = reduce
        ? [
            [300, () => setLit(false)],
            [900, () => setGlow(true)],
            [2200, finish],
        ]
        : [
            [900, () => setLit(false)],
            [900, () => setLit(true)],
            [1120, () => setLit(false)],
            [1200, () => setLit(true)],
            [1300, () => setLit(false)],
            [1350, () => setLit(false)],
            [1450, () => setLit(true)],
            [2000, () => setLit(false)],
            [2700, () => setGlow(true)],
            [4300, finish],
        ]

        timers.current = steps.map(([ms, fn]) => setTimeout(fn, ms))

        const onKey = (e) => {
            if (['Enter', ' ', ' Escape'].includes(e.key)) finish()
        }
        window.addEventListener('keydown', onKey)

        return () => {
            timers.current.forEach(clearTimeout)
            window.removeEventListener('keydown', onKey)
        }
    }, [finish])

    return (
        <div className={`splash ${lit ? 'lit' : ''} ${out ? 'out' : ''}`} onClick={finish}>
            <Wordmark glow={glow} />
        </div>
    )












}