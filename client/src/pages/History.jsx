import { useEffect, useState } from "react";
import { getHistory, deleteVideo } from "../services/videoService";
import HistoryCard from "../components/History/HistoryCard";
import { Link } from "react-router-dom";
import { Video } from "lucide-react";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data.chats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this chat?");
    if (!confirmed) return;

    try {
      await deleteVideo(id);

      setHistory((prev) => prev.filter((chat) => chat._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading history...</h2>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <Video size={56} className="text-indigo-500" />

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          No videos analyzed yet
        </h1>

        <p className="mt-3 max-w-md text-slate-500">
          Analyze your first YouTube video to generate summaries and chat with
          AI.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Analyze Your First Video
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">History</h1>

        <p className="mt-2 text-slate-500">
          Browse your previously analyzed videos.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {history.map((chat) => (
          <HistoryCard key={chat._id} chat={chat} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default History;
