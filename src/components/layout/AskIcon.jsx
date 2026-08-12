// Shared chat-bubble glyph — the visual signature of the anonymous Q&A entry
// points, so every "ask" affordance reads as the same feature.
export default function AskIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 2C5.58 2 2 4.91 2 8.5c0 2.03 1.15 3.84 2.96 5.03-.08.84-.42 1.77-1.06 2.55a.5.5 0 00.42.82c1.68-.07 3.05-.75 4-1.46.54.1 1.1.16 1.68.16 4.42 0 8-2.91 8-6.5S14.42 2 10 2zM5.75 9.5a1 1 0 110-2 1 1 0 010 2zm4.25 0a1 1 0 110-2 1 1 0 010 2zm4.25 0a1 1 0 110-2 1 1 0 010 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}
