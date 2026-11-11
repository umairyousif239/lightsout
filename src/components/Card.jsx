import Art from "./Art";

export default function Card ({ piece, index, hidden, onOpen }) {
    return (
        <button
            type="button"
            className={`card c${index + 1}`}
            data-id={piece.id}
            style={hidden ? { visibility: 'hidden' } : undefined}
            aria-label={`${piece.title}, ${piece.artist}`}
            onClick={(e) => onOpen(piece, e.currentTarget.getBoundingClientRect())}
        >
            <div className="in">
                <div className="pic">
                    <Art piece={piece} />
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