import { Circle } from "lucide-react";

function InfoCard({ title, icon: Icon, items, emptyMessage }) {
  const hasItems = items && items.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-5 flex items-center gap-2">
        <Icon className="text-indigo-600" size={22} />
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>

      {hasItems ? (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <Circle
                size={8}
                fill="currentColor"
                className="mt-2 text-indigo-600"
              />

              <span className="leading-7 text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-slate-500">{emptyMessage}</p>
      )}
    </div>
  );
}

export default InfoCard;
