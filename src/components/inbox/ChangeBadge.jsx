const STYLES = {
  new: 'bg-green-100 text-green-800',
  updated: 'bg-amber-100 text-amber-800',
  dropped: 'bg-gray-200 text-gray-600',
}

const LABELS = { new: 'New', updated: 'Updated', dropped: 'Done with this' }

export default function ChangeBadge({ type }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide whitespace-nowrap uppercase ${STYLES[type]}`}
    >
      {LABELS[type]}
    </span>
  )
}
