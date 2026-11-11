import Wordmark from './Wordmark'

export default function LandingPage({ ready }) {
    return (
        <header
            style={{
                padding: '1.6rem',
                fontSize: '1.7rem',
                opacity: ready ? 1 : 0,
                transition: 'opacity 1.2s ease',
            }}
        >
            <Wordmark glow={ready} />
        </header>
    )
}