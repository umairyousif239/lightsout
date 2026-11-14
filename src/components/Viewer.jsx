import { useCallback, useEffect, useRef, useState } from "react"
import Art from "./Art"

const DURATION = 600
const DEFAULT_CREDIT = 'The Metropolitan Museum of Art, Open Access'

const toBox = (r) => ({ left: r.left, top: r.top, width: r.width, height: r.height })

const targetBox = () => {
    const w = Math.min(window.innerWidth * 0.94, 1040)
    const mobile = window.innerWidth < 760
    const h = mobile
        ? Math.min(window.innerHeight * 0.9, 760)
        : Math.min(window.innerHeight * 0.8, 580)
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h }
}

const imageShare = (ratio = 1) => `${Math.round(Math.min(62, Math.max(38, 34 + ratio * 14)))}%`

export default function Viewer({ piece, rect, index, total, onNavigate, onClose }) {
    const [box, setBox] = useState(toBox(rect))
    const [shown, setShown] = useState(false)
    const [fade, setFade] = useState(false)
    const closing = useRef(false)
    const timer = useRef(null)
    const closeButton = useRef(null)
    const textRef = useRef(null)
    const lastId = useRef(piece.id)

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

    const go = useCallback((dir) => {
        if (!closing.current) onNavigate(dir)
    }, [onNavigate])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowRight') go(1)
            if (e.key === 'ArrowLeft') go(-1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [close, go])

    useEffect(() => () => clearTimeout(timer.current), [])

    useEffect(() => {
        if (lastId.current === piece.id) return
        lastId.current = piece.id
        document.querySelector(`[data-id="${piece.id}"]`)?.scrollIntoView({ block: 'center' })
    }, [piece.id])

    const measure = useCallback(() => {
        const el = textRef.current
        if (!el) return
        setFade(el.scrollHeight - el.scrollTop - el.clientHeight > 2)
    }, [])

    useEffect(() => {
        const el = textRef.current
        if (!el) return
        el.scrollTop = 0
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [piece.id, measure])

    return (
        <>
            <div className={`back ${shown ? 'show' : ''}`} onClick={close} />
            <div
                className="card big"
                style={{ ...box, '--img': imageShare(piece.ratio) }}
                role="dialog"
                aria-modal="true"
                aria-label={piece.title}
            >
                <div className="in" key={piece.id}>
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
                                {piece.origin && (
                                    <>
                                        <dt>Artist</dt>
                                        <dd>{piece.origin}</dd>
                                    </>
                                )}
                                <dt>Medium</dt>
                                <dd>{piece.medium}</dd>
                                <dt>Size</dt>
                                <dd>{piece.size}</dd>
                                <dt>Year</dt>
                                <dd>{piece.year}</dd>
                            </dl>
                            <p ref={textRef} className={fade ? 'fade' : ''} onScroll={measure}>
                                {piece.statement}
                            </p>
                            <div className="credit">Image: {piece.credit ?? DEFAULT_CREDIT}</div>
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <button type="button" aria-label="Previous piece" onClick={() => go(-1)}>‹</button>
                    <span>{index + 1} / {total}</span>
                    <button type="button" aria-label="Next piece" onClick={() => go(1)}>›</button>
                </div>
                <button
                    ref={closeButton}
                    type="button"
                    className="x"
                    aria-label="Close"
                    onClick={close}
                >
                    ×
                </button>
            </div>
        </>
    )
}