import { useEffect } from "react";

export default function usePointerLight(containerRef) {
    useEffect(() => {
        const root = document.documentElement
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const touch = window.matchMedia('(hover: none)').matches

        let tx = window.innerWidth / 2
        let ty = window.innerHeight / 2
        let cx = tx
        let cy = ty
        let last = performance.now()
        let raf

        const move = (e) => {
            tx = e.clientX
            ty = e.clientY
            last = performance.now()
        }

        const frame = (t) => {
            if (touch && !reduce && t - last > 2500) {
                tx = window.innerWidth * (0.5 + 0.35 * Math.sin(t / 2300))
                ty = window.innerHeight * (0.5 + 0.3 * Math.sin(t / 1700 + 1))
            }

            cx += (tx - cx) * 0.14
            cy += (ty - cy) * 0.14
            root.style.setProperty('--x', `${cx}px`)
            root.style.setProperty('--y', `${cy}px`)

            const cards = containerRef.current?.querySelectorAll('.card')
            cards?.forEach((el) => {
                const r = el.getBoundingClientRect()
                el.style.setProperty('--mx', `${cx - r.left}px`)
                el.style.setProperty('--my', `${cy - r.top}px`)
            })

            raf = requestAnimationFrame(frame)
        }

        window.addEventListener('pointermove', move)
        raf = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('pointermove', move)
        }
    }, [containerRef])
}