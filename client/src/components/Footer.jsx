import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white">🧠 VidMind</h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Transform YouTube videos into an interactive knowledge base powered
            by AI.
          </p>

          <div className="mt-8 flex gap-6">
            <a href="#" className="transition hover:text-white">
              <FaGithub size={24} />
            </a>

            <a href="#" className="transition hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 VidMind. Built with React, Express, FastAPI & LangChain.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
