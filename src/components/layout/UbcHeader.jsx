import { NavLink } from 'react-router-dom'

// The one deliberately POLISHED element (trust cue / R3).
// Self-made text wordmark — official UBC crest/logo is trademarked.
export default function UbcHeader() {
  const navClass = ({ isActive }) =>
    `rounded px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-ubc-pale hover:bg-white/10 hover:text-white'
    }`

  return (
    <header>
      <div className="bg-ubc-blue text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <NavLink to="/tracker" className="flex items-baseline gap-2.5">
            <span className="text-xl font-extrabold tracking-widest">UBC</span>
            <span aria-hidden="true" className="h-5 w-px translate-y-0.5 self-center bg-ubc-sky" />
            <span className="text-lg font-medium tracking-wide">Arrival Guide</span>
          </NavLink>
          <nav className="flex items-center gap-1" aria-label="Main">
            <NavLink to="/tracker" className={navClass}>
              My Tracker
            </NavLink>
            <NavLink to="/ask" className={navClass}>
              Ask Anonymously
            </NavLink>
          </nav>
        </div>
      </div>
      {/* UBC-style thin accent line */}
      <div className="h-1 bg-ubc-sky" />
    </header>
  )
}
