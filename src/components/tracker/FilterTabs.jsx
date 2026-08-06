const TABS = [
  { key: 'all', label: 'All' },
  { key: 'urgent', label: 'Urgent' },
  { key: 'done', label: 'Done' },
]

export default function FilterTabs({ active, counts, onChange }) {
  return (
    <div role="tablist" aria-label="Filter tasks" className="flex gap-1.5">
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'border-ubc-blue bg-ubc-blue text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-ubc-link hover:text-ubc-link'
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${
                isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
