import { useCallback, useEffect, useRef, useState } from "react"
import Art from "./Art"

const DURATION = 600

const toBox = (r) => ({ left: r.left, top: r.top, width: r.width, height: r.height })

const targetBox = () => {
    const w = Math.min(window.innerWidth * 0.94, 1040)
    const mobile = window.innerWidth < 760
    const h = mobile
        ? Math.min(window.innerHeight * 0.9, 760)
        : Math.min(window.innerHeight * 0.8, 580)
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h }
}

export default function Viewer({ piece, rect, onClose }) {
    const [box, setBox] = useState(toBox(rect))
    const [shown, setShown] = useState(false)
    const closing = useRef(false)
    const timer = useRef(null)
    const closeButton = useRef(null)

    useEffect(() => {
        let inner
        const outer = requestAnimationFrame(() => {
            inner = requestAnimationFrame(() => {
                setBox(targetBox())
                setShown(true)
            })
        })
        closeButton.current?.focus()
        return () => {
            cancelAnimationFrame(outer)
            cancelAnimationFrame(inner)
        }
    }, [])

    const close = useCallback(() => {
        if (closing.current) return
        closing.current = true
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const card = document.querySelector(`[data-id="${piece.id}"]`)
        setShown(false)
        setBox(toBox(card ? card.getBoundingClientRect() : rect))
        timer.current = setTimeout(onClose, reduce ? 0 : DURATION)
    }, [piece.id, rect, onClose])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') close()
        }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    }, [close])

    useEffect(() => () => clearTimeout(timer.current), [])

    return (
        <>
        <div className={`back ${shown ? 'show' : ''}`} onClick={close} />
        <div className="card big" style={box} role="dialog" aria-modal="true" aria-label="{piece.title}">
            <div className="in">
                <div className="pic">
                    <Art piece={piece} />
                </div>
                <div className="tx">
                    <h2>{piece.title}</h2>
                    <p className="sub">
                        {piece.artist}, {piece.year}
                    </p>
                    <div className="more">
                        <dl>
                            <dt>Medium</dt>
                            <dd>{piece.medium}</dd>
                            <dt>Size</dt>
                            <dd>{piece.size}</dd>
                            <dt>Year</dt>
                            <dd>{piece.year}</dd>
                        </dl>
                        <p>{piece.statement}</p>
                    </div>
                </div>
            </div>
            <button
                ref={closeButton}
                type="button"
                className="x"
                aria-label="close"
                onClick={close}
            >
                ×
            </button>
        </div>
        </>
    )
}