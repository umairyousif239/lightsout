import placeholders from "../data/placeholder";

export default function Art({ piece }) {
    if (piece.src) {
        return <img src={piece.src} alt={`${piece.title} by ${piece.artist}`} />
    }

    return (
        <div
            className="svg"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: placeholders[piece.id] }}
        />
    )
}