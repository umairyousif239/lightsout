import { useCallback, useRef, useState } from "react";
import Wordmark from './Wordmark'
import Card from "./Card";
import Viewer from "./Viewer";
import pieces from '../data/pieces'
import usePointerLight from "../hooks/usePointerLight";
import './LandingPage.css'

export default function LandingPage({ ready }) {
    const gridRef = useRef(null)
    const [active, setActive] = useState(null)

    usePointerLight(gridRef)

    const open = useCallback((piece, rect) => setActive({ piece, rect }), [])

    const navigate = useCallback((dir) => {
        setActive((current) => {
            if (!current) return current
            const i = pieces.findIndex((p) => p.id === current.piece.id)
            const next = pieces[(i + dir + pieces.length) % pieces.length]
            return { ...current, piece: next }
        })
    }, [])

    const close = useCallback(() => {
        const id = active?.piece.id
        setActive(null)
        requestAnimationFrame(() => {
            document.querySelector(`[data-id="${id}"]`)?.focus()
        })
    }, [active])

    const index = active ? pieces.findIndex((p) => p.id === active.piece.id) : 0

    return (
        <div className={`landing ${ready ? 'ready' : ''}`}>
            <div className="glow" />
            <header className="top">
                <Wordmark glow={ready} />
                <p>Everything here is dark until you light it. Click a piece to see it properly.</p>
            </header>
            <main className="grid" ref={gridRef}>
                {pieces.map((piece) => (
                    <Card
                        key={piece.id}
                        piece={piece}
                        hidden={active?.piece.id === piece.id}
                        onOpen={open}
                    />
                ))}
            </main>
            {active && (
                <Viewer
                    piece={active.piece}
                    rect={active.rect}
                    index={index}
                    total={pieces.length}
                    onNavigate={navigate}
                    onClose={close}
                />
            )}
        </div>
    )
}