// Consolidated step-by-step instructions — R1: everything needed to finish
// the task without leaving the page.
export default function TaskSteps({ steps }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ubc-blue text-[11px] font-bold text-white"
          >
            {i + 1}
          </span>
          <div className="text-sm">
            <p className="text-gray-800">{step.text}</p>
            {step.detail && <p className="mt-0.5 text-gray-500">{step.detail}</p>}
            {step.link && (
              <a
                href={step.link.url}
                target="_blank"
                rel="noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 font-medium text-ubc-link hover:underline"
              >
                {step.link.label}
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
