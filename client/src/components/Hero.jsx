import { useState } from "react";
import {
  Link2,
  BrainCircuit,
  MessageCircle,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeYoutube } from "../services/videoService";
import useAuth from "../hooks/useAuth";
import useLoginModal from "../hooks/useLoginModal";
import toast from "react-hot-toast";

function Hero() {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();
  const { openLoginModal } = useLoginModal();

  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!user) {
      openLoginModal();
      return;
    }

    if (!videoUrl.trim()) {
      toast.error("Please enter a YouTube URL.");
      return;
    }

    try {
      setLoading(true);

      const data = await analyzeYoutube(videoUrl);

      navigate(`/chat/${data.chat._id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
      {/* Badge */}
      <div className="mb-6 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
        🚀 AI-Powered Video Intelligence
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
        Understand.
        <span className="text-indigo-600">Summarize.</span>
        Chat.
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        Paste any YouTube URL and let VidMind transform hours of content into
        concise summaries, action items, key decisions, open questions, and an
        AI assistant you can chat with.
      </p>

      {!loading ? (
        <>
          <div className="mt-12 flex w-full max-w-4xl flex-col gap-4 md:flex-row">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 rounded-xl border border-slate-300 px-5 py-4 text-lg outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              onClick={handleAnalyze}
              className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
            >
              Analyze Video
            </button>
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            Best experience with YouTube videos up to{" "}
            <span className="font-medium text-slate-700">~1 hour</span>.
          </p>
        </>
      ) : (
        <div className="mt-12 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <LoaderCircle className="mx-auto h-14 w-14 animate-spin text-indigo-600" />

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Analyzing your video...
          </h2>

          <p className="mt-3 text-slate-500">
            Processing time depends on the video length.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left">
            <div className="space-y-4 text-slate-700">
              <div className="flex items-center gap-3">
                <span className="text-lg">📥</span>
                <span>Downloading video</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">🎙️</span>
                <span>Transcribing audio</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">🧠</span>
                <span>Generating AI insights</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">💬</span>
                <span>Preparing chat</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Please keep this tab open while we process your video.
          </p>
        </div>
      )}

      {/* Workflow */}
      {!loading && (
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-slate-700">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Link2 className="text-indigo-600" size={20} />
            <span className="font-medium">Paste URL</span>
          </div>

          <ArrowRight className="hidden text-slate-400 md:block" size={20} />

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <BrainCircuit className="text-indigo-600" size={20} />
            <span className="font-medium">AI Analysis</span>
          </div>

          <ArrowRight className="hidden text-slate-400 md:block" size={20} />

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <MessageCircle className="text-indigo-600" size={20} />
            <span className="font-medium">Chat with Video</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
