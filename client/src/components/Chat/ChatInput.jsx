function ChatInput({ question, setQuestion, sending, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !sending) {
      onSend();
    }
  };

  return (
    <div className="border-t border-slate-200 p-4">
      <div className="flex gap-3">
        <input
          disabled={sending}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about this video..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
        />

        <button
          onClick={onSend}
          disabled={sending}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
