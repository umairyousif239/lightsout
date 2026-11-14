import { useState } from 'react'
import Art from './Art'

export default function Card({ piece, hidden, onOpen }) {
    const [ratio, setRatio] = useState(piece.ratio || 0.8)

    return (
        <button
            type="button"
            className="card"
            data-id={piece.id}
            style={{ '--r': ratio, ...(hidden ? { visibility: 'hidden' } : {}) }}
            aria-label={`${piece.title}, ${piece.artist}`}
            onClick={(e) => onOpen(piece, e.currentTarget.getBoundingClientRect())}
        >
        <i className="spacer" />
        <div className="in">
            <div className="pic">
                <Art piece={piece} onRatio={setRatio} />
            </div>
            <div className="tx">
                <h2>{piece.title}</h2>
                <p className="sub">
                    {piece.artist}, {piece.year}
                </p>
            </div>
        </div>
        </button>
    )
}