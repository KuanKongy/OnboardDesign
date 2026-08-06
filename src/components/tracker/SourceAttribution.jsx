// Who wrote this and when — the R3 trust cue, rendered the same way
// wherever task content appears.
export default function SourceAttribution({ source }) {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
      <span>Source:</span>
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-ubc-link hover:underline"
      >
        {source.name}
      </a>
      <span aria-hidden="true">·</span>
      <span>Last updated {source.lastUpdated}</span>
    </p>
  )
}
