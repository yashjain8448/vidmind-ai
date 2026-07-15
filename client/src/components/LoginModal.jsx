import { X, LockKeyhole } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function LoginModal({ isOpen, onClose, onGoogleLogin }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <LockKeyhole size={30} className="text-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Login Required</h2>

          <p className="mt-4 text-slate-600 leading-7">
            Sign in with Google to analyze YouTube videos, save your chat
            history, and access previous analyses.
          </p>
          <button
            onClick={onGoogleLogin}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
          <p className="mt-5 text-center text-sm text-slate-500">
            We only use your Google account for secure authentication. We never
            post or access your personal data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
