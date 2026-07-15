import { useRef, useEffect } from "react";

function ChatContainer({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-[500px] overflow-y-auto p-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              Start a conversation
            </h3>

            <p className="mt-2 text-slate-500">
              Ask anything about this video.
            </p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] lg:max-w-[65%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))
      )}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatContainer;
