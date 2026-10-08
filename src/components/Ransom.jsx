// Persona 5-style "ransom note" lettering: each letter gets its own tile, font and tilt.
const tiles = ['w', 'b', 'r', 'w', 'k', 'b', 'w', 'r']
const fonts = ['a', 'a', 's', 'a', 'a', 's', 'a', 'a']
const tilts = [-4, 3, -2, 5, -3, 2, -5, 4]

export default function Ransom({ text }) {
  return (
    <span className="ransom" aria-label={text}>
      {[...text].map((ch, i) =>
        ch === ' ' ? (
          <span key={i} className="ransom__space" aria-hidden="true" />
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className={`ransom__l ransom__l--${tiles[i % tiles.length]} ransom__l--${fonts[i % fonts.length]}`}
            style={{ '--tilt': `${tilts[(i * 3) % tilts.length]}deg` }}
          >
            {ch}
          </span>
        )
      )}
    </span>
  )
}
