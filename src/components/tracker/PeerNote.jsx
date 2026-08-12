// Verified peer note — lived experience clearly distinguished from
// institutional guidance (CT2), with a verification cue (R3).
export default function PeerNote({ note }) {
  return (
    <div className="rounded-lg border border-ubc-pale bg-ubc-mist px-4 py-3">
      <p className="text-sm text-gray-800 italic">“{note.quote}”</p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
        <svg className="h-3.5 w-3.5 text-ubc-link" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold text-ubc-blue">Peer tip</span>
        <span aria-hidden="true">·</span>
        <span>
          {note.author}, {note.program}
        </span>
        <span aria-hidden="true">·</span>
        <span>checked by UBC peer mentors, {note.verifiedDate}</span>
      </p>
    </div>
  )
}
