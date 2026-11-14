export default function Art({ piece, onRatio }) {
    return (
        <img
            src={piece.src}
            alt={`${piece.title} by ${piece.artist}`}
            onLoad={(e) => onRatio?.(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
        />
    )
}