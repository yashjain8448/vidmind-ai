import {
  FileText,
  MessageCircle,
  CheckSquare,
  BrainCircuit,
  CircleHelp,
  Search,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Summary",
    description:
      "Generate concise summaries from lengthy YouTube videos within seconds.",
  },
  {
    icon: MessageCircle,
    title: "Chat with Videos",
    description:
      "Ask questions and receive contextual answers grounded in the transcript.",
  },
  {
    icon: CheckSquare,
    title: "Action Items",
    description:
      "Automatically extract tasks and follow-ups discussed in the video.",
  },
  {
    icon: BrainCircuit,
    title: "Key Decisions",
    description:
      "Identify important decisions and conclusions made during discussions.",
  },
  {
    icon: CircleHelp,
    title: "Open Questions",
    description:
      "Highlight unanswered questions and topics requiring further discussion.",
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description:
      "Find precise answers from the transcript instead of generic AI responses.",
  },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose VidMind?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Everything you need to understand long YouTube videos faster using
            AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 inline-flex rounded-xl bg-indigo-100 p-3">
                  <Icon className="text-indigo-600" size={28} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
