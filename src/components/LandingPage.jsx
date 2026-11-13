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

    const close = useCallback(() => {
        const id = active?.piece.id
        setActive(null)
        requestAnimationFrame(() => {
            document.querySelector(`[data-id="${id}"]`)?.focus()
        })
    }, [active])

    return (
        <div className={`landing ${ready ? 'ready' : ''}`}>
            <div className="glow" />
            <header className="top">
                <Wordmark glow={ready} />
                <p>Hover over the column with the mouse to see the preview. <br /> Click a piece to see it properly.</p>
            </header>
            <main className="grid" ref={gridRef}>
                {pieces.map((piece, i) => (
                    <Card
                        key={piece.id}
                        piece={piece}
                        index={i}
                        hidden={active?.piece.id === piece.id}
                        onOpen={open}
                    />
                ))}
            </main>
            {active && <Viewer piece={active.piece} rect={active.rect} onClose={close} />}
        </div>
    )
}