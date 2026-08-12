import { NavLink } from 'react-router-dom'
import AskIcon from './AskIcon'

// The one deliberately POLISHED element (trust cue / R3).
// Self-made text wordmark — official UBC crest/logo is trademarked.
export default function UbcHeader() {
  const navClass = ({ isActive }) =>
    `rounded px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-ubc-pale hover:bg-white/10 hover:text-white'
    }`

  // The ask entry reads as an ACTION (button + padlock), not a page name
  const askClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
      isActive
        ? 'border-white bg-white text-ubc-blue'
        : 'border-ubc-sky/70 bg-white/10 text-white hover:bg-white/20'
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
          <nav className="flex items-center gap-1.5" aria-label="Main">
            <NavLink to="/tracker" className={navClass}>
              My Tracker
            </NavLink>
            <NavLink to="/inbox" className={navClass}>
              Newsletter
            </NavLink>
            <NavLink to="/ask" className={askClass}>
              <AskIcon className="h-3.5 w-3.5" />
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
