export default function TaskGroup({ title, count, children, emptyMessage }) {
  return (
    <section className="mt-6 first:mt-0">
      <h2 className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
        {title}
        <span className="rounded-full bg-gray-200 px-1.5 py-0.5 text-[11px] font-semibold text-gray-600">
          {count}
        </span>
      </h2>
      {count === 0 && emptyMessage ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-5 text-center text-sm text-gray-500">
          {emptyMessage}
        </p>
      ) : (
        <ul className="space-y-2.5">{children}</ul>
      )}
    </section>
  )
}
