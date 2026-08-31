import Checkbox from './Checkbox'
import { stepKey } from '../../hooks/useStepProgress'

// Consolidated step-by-step instructions — R1: everything needed to finish
// the task without leaving the page. Each step can be checked off on its own:
// the numbered badge doubles as the checkbox (number → checkmark).
export default function TaskSteps({ steps, taskId, stepMap, onToggleStep }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const key = stepKey(taskId, i)
        const checked = Boolean(stepMap[key])
        return (
          <li key={i} className="flex gap-3">
            <Checkbox
              size="step"
              checked={checked}
              animating={checked}
              label={`Step ${i + 1}: ${step.text}`}
              onToggle={() => onToggleStep(key)}
            >
              {i + 1}
            </Checkbox>
            <div className="text-sm">
              <p className={checked ? 'text-gray-400 line-through' : 'text-gray-800'}>
                {step.text}
              </p>
              {step.detail && (
                <p className={`mt-0.5 ${checked ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.detail}
                </p>
              )}
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
        )
      })}
    </ol>
  )
}
