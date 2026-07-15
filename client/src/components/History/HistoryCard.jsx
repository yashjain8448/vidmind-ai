import { Link } from "react-router-dom";
import { CalendarDays, FileText, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function HistoryCard({ chat, onDelete }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <button
        onClick={() => onDelete(chat._id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow-md transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>

      {/* Thumbnail */}

      <img
        src={chat.thumbnail || "https://placehold.co/600x340?text=VidMind"}
        onError={(e) => {
          e.target.src = "https://placehold.co/600x340?text=VidMind";
        }}
        alt={chat.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}

      <div className="p-5">
        <h2 className="line-clamp-2 text-xl font-semibold text-slate-900">
          {chat.title}
        </h2>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          {formatDistanceToNow(new Date(chat.createdAt), {
            addSuffix: true,
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <FileText size={16} />
          {chat.summary.length} Summary Points
        </div>

        <Link
          to={`/chat/${chat._id}`}
          className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          Continue Chat
        </Link>
      </div>
    </div>
  );
}

export default HistoryCard;
