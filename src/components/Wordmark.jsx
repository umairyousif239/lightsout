export default function Wordmark({ glow = false, className = '' }) {
    return (
        <span className={`wm ${glow ? 'on' : ''} ${className}`} role="img" aria-label="lightsout">
            l<span className="i">ı<b></b></span>ghtsout
        </span>
    )
}