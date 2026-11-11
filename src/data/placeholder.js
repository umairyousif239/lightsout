const svg = (body) =>
    `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${body}</svg>`

const glow = (id, x, y, r, c) =>
    `<radialGradient id="${id}" cx="${x}" cy="${y}" r="${r}"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`

const lamps = [[90, 190], [210, 170], [320, 205], [150, 240]]
    .map(
        ([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="5"/><circle cx="${x}" cy="${y}" r="38" fill="url(#d)" opacity=".5"/><rect x="${x - 1.5}" y="${y + 14}" width="3" height="${150 - (y - 170)}" opacity=".25"/>`
    )
    .join('')

const placeholders = {
    candle: svg(
        `<defs>${glow('a', 0.5, 0.6, 0.55, '#ff9f45')}</defs><rect width="400" height="500" fill="#0a0806"/><rect width="400" height="500" fill="url(#a)" opacity=".7"/><rect y="390" width="400" height="110" fill="#17100a"/><rect x="191" y="300" width="18" height="92" fill="#e8d7b0"/><ellipse cx="200" cy="288" rx="7" ry="14" fill="#ffe0a0"/><ellipse cx="305" cy="392" rx="38" ry="12" fill="#2a1b10"/>`
    ),
    moon: svg(
        `<defs>${glow('b', 0.72, 0.26, 0.3, '#cfdcf0')}<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04060b"/><stop offset="1" stop-color="#101a2c"/></linearGradient></defs><rect width="400" height="500" fill="url(#bg)"/><rect width="400" height="500" fill="url(#b)" opacity=".55"/><circle cx="290" cy="130" r="42" fill="#e3ebf6"/><path d="M0 380Q110 300 230 360T400 335V500H0Z" fill="#0a111d"/><path d="M0 430Q140 380 280 430T400 410V500H0Z" fill="#03050a"/>`
    ),
    window: svg(
        `<defs><linearGradient id="c" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#f5e6c4" stop-opacity=".6"/><stop offset="1" stop-color="#f5e6c4" stop-opacity="0"/></linearGradient></defs><rect width="400" height="500" fill="#070707"/><polygon points="70,230 180,230 380,500 -60,500" fill="url(#c)"/><rect x="70" y="80" width="110" height="150" fill="#f3e4c2"/><path d="M60 80h130M125 80v150M70 155h110" stroke="#070707" stroke-width="5"/><circle cx="262" cy="340" r="22" fill="#030303"/><path d="M232 480q4-110 30-120t30 120z" fill="#030303"/>`
    ),
    harbour: svg(
        `<defs>${glow('d', 0.5, 0.5, 0.5, '#ffcf80')}</defs><rect width="400" height="500" fill="#080a12"/><g fill="#ffd590">${lamps}</g><rect y="340" width="400" height="160" fill="#04050a" opacity=".6"/>`
    ),
    fold: svg(
        `<defs>${glow('e', 0.35, 0.35, 0.5, '#c0392b')}</defs><rect width="400" height="500" fill="#0b0405"/><rect width="400" height="500" fill="url(#e)" opacity=".5"/><path d="M-20 520C60 300 120 200 240 150S420 260 420 520z" fill="#2a0b0d"/><path d="M90 520C140 360 190 280 290 240S400 330 400 520z" fill="#16060a"/><path d="M120 300c40-60 90-100 150-110" stroke="#ff8c6b" stroke-width="3" fill="none" opacity=".8"/>`
    ),
    rim: svg(
        `<defs>${glow('f', 0.3, 0.45, 0.45, '#ffb870')}</defs><rect width="400" height="500" fill="#060606"/><rect width="400" height="500" fill="url(#f)" opacity=".35"/><ellipse cx="205" cy="235" rx="92" ry="122" fill="#0f0b09"/><path d="M122 205Q112 300 172 350" stroke="#ffb870" stroke-width="3" fill="none"/><path d="M60 520Q80 400 205 380T350 520z" fill="#0b0807"/>`
    ),
}

export default placeholders