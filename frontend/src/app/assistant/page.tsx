"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  askPiloAssistant,
  type AssistantAction,
  type AssistantMessage,
} from "./services/assistant.service";
import Link from "next/link";

type ChatMessage =
  AssistantMessage & {
    id: string;
    actions?: AssistantAction[];
  };

const quickSuggestions = [
  "Comment puis-je économiser davantage ?",
  "Quelle mission dois-je faire en premier ?",
  "Où en est mon projet PiloLife ?",
  "Pourquoi une alerte Monitoring est rouge ?",
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Bonjour 👋 Je suis Pilo, ton copilote d’économies. Je peux t’aider à comprendre tes dépenses, choisir tes priorités et faire avancer tes projets.",
  },
];

export default function Page() {
  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages);

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  
async function sendMessage(
  content: string
) {
  const cleanQuestion =
    content.trim();

  if (
    !cleanQuestion ||
    loading
  ) {
    return;
  }

  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: cleanQuestion,
  };

  const previousConversation =
    messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

  setMessages(
    (currentMessages) => [
      ...currentMessages,
      userMessage,
    ]
  );

  setQuestion("");
  setLoading(true);

  try {
    const answer =
      await askPiloAssistant({
        question: cleanQuestion,
        conversation:
          previousConversation,
      });

    const assistantMessage: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  content: answer.content,
  actions: answer.actions,
};

    setMessages(
      (currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]
    );
  } catch (error) {
    console.error(
      "Erreur Assistant Pilo :",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Pilo ne peut pas répondre pour le moment.";

    setMessages(
      (currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            `⚠️ ${errorMessage}`,
        },
      ]
    );
  } finally {
    setLoading(false);
  }
}
  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    sendMessage(question);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white lg:ml-64">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
        <Link
  href="/dashboard"
  className="mb-6 inline-flex items-center gap-2 text-green-400 transition hover:text-green-300"
>
  ← Retour au dashboard
</Link>
        <header className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-green-950/30 p-6 shadow-[0_0_70px_rgba(34,197,94,0.07)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
            PiloEco
          </p>

          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10 text-4xl">
              🤖
            </div>

            <div>
              <h1 className="text-3xl font-black sm:text-4xl">
                Assistant Pilo
              </h1>

              <p className="mt-3 max-w-3xl text-slate-300">
                Pose tes questions à Pilo pour
                mieux comprendre tes économies,
                tes missions, ton Monitoring et
                tes projets PiloLife.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

  <span className="text-sm font-bold text-green-300">
    Analyse de ton espace PiloEco activée
  </span>
</div>
            </div>
          </div>
        </header>

        <section className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 p-5">
            <p className="text-sm font-bold text-slate-300">
              Suggestions rapides
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {quickSuggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      sendMessage(suggestion)
                    }
                    disabled={loading}
                    className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-left text-sm font-semibold text-slate-300 transition hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="min-h-[420px] flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-3xl rounded-tl-md border border-green-500/20 bg-green-500/10 px-5 py-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-green-300">
                    <span>🤖</span>
                    Pilo réfléchit
                  </div>

                  <div className="mt-3 flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-green-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-green-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-800 bg-slate-950/70 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <textarea
                value={question}
                onChange={(event) =>
                  setQuestion(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    sendMessage(question);
                  }
                }}
                placeholder="Pose une question à Pilo..."
                rows={2}
                className="min-h-[58px] flex-1 resize-none rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-green-500"
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !question.trim()
                }
                className="rounded-2xl bg-green-500 px-7 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Pilo réfléchit..."
                  : "Envoyer"}
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Entrée pour envoyer ·
              Maj + Entrée pour revenir à
              la ligne
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

function MessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <article
        className={`max-w-[88%] rounded-3xl px-5 py-4 sm:max-w-[75%] ${
          isUser
            ? "rounded-tr-md bg-green-500 text-slate-950"
            : "rounded-tl-md border border-slate-700 bg-slate-800 text-slate-200"
        }`}
      >
        <div
          className={`mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] ${
            isUser
              ? "text-slate-800"
              : "text-green-400"
          }`}
        >
          <span>
            {isUser ? "👤" : "🤖"}
          </span>

          {isUser ? "Toi" : "Pilo"}
        </div>

        <div>
  <p className="whitespace-pre-line leading-7">
    {message.content}
  </p>

  {!isUser &&
    message.actions &&
    message.actions.length > 0 && (
      <div className="mt-5 space-y-3">
        {message.actions.map(
          (action, index) => (
            <AssistantActionCard
              key={`${action.type}-${action.href}-${index}`}
              action={action}
            />
          )
        )}
      </div>
    )}
</div>

      </article>
    </div>
  );
}
function AssistantActionCard({
  action,
}: {
  action: AssistantAction;
}) {
  const icon =
    action.type === "mission"
      ? "🎯"
      : action.type === "monitoring"
        ? "📈"
        : action.type === "pilolife"
          ? "🌿"
          : "🔎";

  const buttonLabel =
    action.type === "mission"
      ? "Ouvrir la mission"
      : action.type === "monitoring"
        ? "Voir le Monitoring"
        : action.type === "pilolife"
          ? "Ouvrir PiloLife"
          : "Faire une analyse";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-600 bg-slate-950/70">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-xl">
              {icon}
            </div>

            <div className="min-w-0">
              {action.badge && (
                <p className="text-xs font-black uppercase tracking-[0.15em] text-green-400">
                  {action.badge}
                </p>
              )}

              <h3 className="mt-1 font-black text-white">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {action.description}
              </p>
            </div>
          </div>

          {typeof action.yearlySaving === "number" &&
            action.yearlySaving > 0 && (
              <div className="shrink-0 text-right">
                <p className="text-lg font-black text-green-400">
                  {Math.round(
                    action.yearlySaving
                  ).toLocaleString("fr-FR")}{" "}
                  €
                </p>

                <p className="text-xs text-slate-500">
                  par an
                </p>
              </div>
            )}
        </div>

        {typeof action.progress === "number" && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">
                Progression
              </span>

              <span className="text-green-400">
                {Math.round(action.progress)} %
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, action.progress)
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <Link
        href={action.href}
        className="flex items-center justify-center border-t border-slate-700 bg-slate-900 px-4 py-3 text-sm font-black text-green-400 transition hover:bg-green-500/10 hover:text-green-300"
      >
        {buttonLabel} →
      </Link>
    </article>
  );
}