import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getVideo } from "../services/videoService";
import InfoCard from "../components/InfoCard";
import {
  FileText,
  CheckCircle2,
  KeyRound,
  CircleHelp,
  ArrowUp,
} from "lucide-react";
import ChatContainer from "../components/Chat/ChatContainer";
import ChatInput from "../components/Chat/ChatInput";
import { chatWithVideo, getMessages } from "../services/videoService";
import toast from "react-hot-toast";

function Chat() {
  const { id } = useParams();
  const summaryRef = useRef(null);
  const [chat, setChat] = useState(null);

  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([]);

  const [question, setQuestion] = useState("");

  const [sending, setSending] = useState(false);

  const fetchVideo = async () => {
    try {
      const data = await getVideo(id);
      setChat(data.chat);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await getMessages(id);
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");

    setSending(true);

    try {
      const data = await chatWithVideo(id, userMessage.content);

      const assistantMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchMessages();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading video...</h2>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2>Video not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-10 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {chat.title}
          </h1>

          <p className="mt-2 text-slate-500">
            AI-generated insights from your video
          </p>
        </div>

        <div ref={summaryRef}>
          <InfoCard
            title="Summary"
            icon={FileText}
            items={chat.summary}
            emptyMessage="Summary unavailable."
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Action Items"
            icon={CheckCircle2}
            items={chat.actionItems}
            emptyMessage="No action items identified."
          />

          <InfoCard
            title="Key Decisions"
            icon={KeyRound}
            items={chat.keyDecisions}
            emptyMessage="No key decisions identified."
          />
        </div>

        <div className="mt-6">
          <InfoCard
            title="Open Questions"
            icon={CircleHelp}
            items={chat.openQuestions}
            emptyMessage="No open questions identified."
          />
        </div>

        <div className="my-10 border-t border-slate-200" />

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Chat with this Video
          </h2>

          <button
            onClick={scrollToSummary}
            className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowUp size={14} />
            View Summary
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ChatContainer messages={messages} />

          <ChatInput
            question={question}
            setQuestion={setQuestion}
            sending={sending}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
