import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    askPiloAssistant,
    type AssistantAction,
    type AssistantMessage,
} from "../lib/assistant.service";

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

function createId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export default function AssistantScreen() {
  const [messages, setMessages] =
    useState<ChatMessage[]>(
      initialMessages
    );

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const scrollRef =
    useRef<ScrollView | null>(null);

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
      id: createId(),
      role: "user",
      content: cleanQuestion,
    };

    const previousConversation =
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const answer =
        await askPiloAssistant({
          question: cleanQuestion,
          conversation:
            previousConversation,
        });

      const assistantMessage: ChatMessage =
        {
          id: createId(),
          role: "assistant",
          content: answer.content,
          actions: answer.actions,
        };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Pilo ne peut pas répondre pour le moment.";

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        scrollRef.current?.scrollToEnd({
          animated: true,
        });
      }, 150);
    }
  }

  async function openAction(
    action: AssistantAction
  ) {
    const href =
      action.href || "/analyse";

    if (
      href === "/monitoring" ||
      href === "/pilolife" ||
      href === "/analyse" ||
      href === "/missions"
    ) {
      router.push(href as never);
      return;
    }

    const url =
      `https://piloeco.com${href}`;

    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
      return;
    }

    router.push("/missions" as never);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            ← Retour
          </Text>
        </TouchableOpacity>

        <Text style={styles.kicker}>
          PILOECO
        </Text>

        <View style={styles.headerRow}>
          <View style={styles.botIcon}>
            <Text style={styles.botEmoji}>
              🐦
            </Text>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Parler à Pilo
            </Text>

            <Text style={styles.subtitle}>
              Pose tes questions sur tes économies,
              tes missions, ton Monitoring et
              tes projets PiloLife.
            </Text>
          </View>
        </View>

        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />

          <Text style={styles.onlineText}>
            Analyse de ton espace PiloEco activée
          </Text>
        </View>
      </View>

      <View style={styles.suggestions}>
        <Text style={styles.suggestionsTitle}>
          Suggestions rapides
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.suggestionsRow
          }
        >
          {quickSuggestions.map(
            (suggestion) => (
              <TouchableOpacity
                key={suggestion}
                style={
                  styles.suggestionButton
                }
                disabled={loading}
                onPress={() =>
                  void sendMessage(
                    suggestion
                  )
                }
              >
                <Text
                  style={
                    styles.suggestionText
                  }
                >
                  {suggestion}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={
          styles.chatContent
        }
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => {
          scrollRef.current?.scrollToEnd({
            animated: true,
          });
        }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onActionPress={openAction}
          />
        ))}

        {loading && (
          <View style={styles.botRow}>
            <View
              style={
                styles.loadingBubble
              }
            >
              <Text style={styles.loadingTitle}>
                🐦 Pilo réfléchit
              </Text>

              <ActivityIndicator
                color="#22c55e"
                style={styles.loader}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Pose une question à Pilo..."
          placeholderTextColor="#64748b"
          multiline
          editable={!loading}
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!question.trim() ||
              loading) &&
              styles.sendButtonDisabled,
          ]}
          disabled={
            !question.trim() ||
            loading
          }
          onPress={() =>
            void sendMessage(question)
          }
        >
          <Text style={styles.sendText}>
            {loading
              ? "..."
              : "Envoyer"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({
  message,
  onActionPress,
}: {
  message: ChatMessage;
  onActionPress: (
    action: AssistantAction
  ) => Promise<void>;
}) {
  const isUser =
    message.role === "user";

  return (
    <View
      style={
        isUser
          ? styles.userRow
          : styles.botRow
      }
    >
      <View
        style={[
          styles.bubble,
          isUser
            ? styles.userBubble
            : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.author,
            isUser
              ? styles.userAuthor
              : styles.botAuthor,
          ]}
        >
          {isUser ? "👤 TOI" : "🐦 PILO"}
        </Text>

        <Text
          style={[
            styles.messageText,
            isUser &&
              styles.userMessageText,
          ]}
        >
          {message.content}
        </Text>

        {!isUser &&
          message.actions &&
          message.actions.length > 0 && (
            <View
              style={styles.actionsWrap}
            >
              {message.actions.map(
                (action, index) => (
                  <AssistantActionCard
                    key={`${action.type}-${action.href}-${index}`}
                    action={action}
                    onPress={() =>
                      void onActionPress(
                        action
                      )
                    }
                  />
                )
              )}
            </View>
          )}
      </View>
    </View>
  );
}

function AssistantActionCard({
  action,
  onPress,
}: {
  action: AssistantAction;
  onPress: () => void;
}) {
  const icon =
    action.type === "mission"
      ? "🎯"
      : action.type ===
          "monitoring"
        ? "📊"
        : action.type ===
            "pilolife"
          ? "🌿"
          : "🔎";

  const buttonLabel =
    action.type === "mission"
      ? "Ouvrir la mission"
      : action.type ===
          "monitoring"
        ? "Voir le Monitoring"
        : action.type ===
            "pilolife"
          ? "Ouvrir PiloLife"
          : "Faire une analyse";

  return (
    <View style={styles.actionCard}>
      <View style={styles.actionTop}>
        <Text style={styles.actionIcon}>
          {icon}
        </Text>

        <View style={styles.actionContent}>
          {action.badge ? (
            <Text
              style={styles.actionBadge}
            >
              {action.badge}
            </Text>
          ) : null}

          <Text
            style={styles.actionTitle}
          >
            {action.title}
          </Text>

          <Text
            style={
              styles.actionDescription
            }
          >
            {action.description}
          </Text>

          {typeof action.yearlySaving ===
            "number" &&
            action.yearlySaving > 0 && (
              <Text
                style={
                  styles.savingText
                }
              >
                {Math.round(
                  action.yearlySaving
                ).toLocaleString(
                  "fr-FR"
                )}{" "}
                € / an
              </Text>
            )}

          {typeof action.progress ===
            "number" && (
            <View style={styles.progressWrap}>
              <View
                style={styles.progressHeader}
              >
                <Text
                  style={styles.progressLabel}
                >
                  Progression
                </Text>

                <Text
                  style={styles.progressValue}
                >
                  {Math.round(
                    action.progress
                  )}{" "}
                  %
                </Text>
              </View>

              <View
                style={styles.progressTrack}
              >
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          action.progress
                        )
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onPress}
      >
        <Text
          style={styles.actionButtonText}
        >
          {buttonLabel} →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    backgroundColor: "#07111f",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
  },

  backText: {
    color: "#22c55e",
    fontSize: 12,
    fontWeight: "900",
  },

  kicker: {
    marginTop: 10,
    color: "#22c55e",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
  },

  headerRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  botIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  botEmoji: {
    fontSize: 32,
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 5,
    color: "#94a3b8",
    fontSize: 10,
    lineHeight: 15,
  },

  onlineBadge: {
    marginTop: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
    backgroundColor: "#22c55e",
  },

  onlineText: {
    color: "#86efac",
    fontSize: 9,
    fontWeight: "900",
  },

  suggestions: {
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  suggestionsTitle: {
    paddingHorizontal: 18,
    color: "#cbd5e1",
    fontSize: 10,
    fontWeight: "900",
  },

  suggestionsRow: {
    paddingHorizontal: 18,
    paddingTop: 9,
    paddingRight: 28,
  },

  suggestionButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#020617",
  },

  suggestionText: {
    maxWidth: 190,
    color: "#cbd5e1",
    fontSize: 9,
    fontWeight: "800",
  },

  chat: {
    flex: 1,
  },

  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },

  userRow: {
    marginBottom: 13,
    alignItems: "flex-end",
  },

  botRow: {
    marginBottom: 13,
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "88%",
    padding: 14,
    borderRadius: 19,
  },

  userBubble: {
    borderTopRightRadius: 5,
    backgroundColor: "#22c55e",
  },

  botBubble: {
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#1e293b",
  },

  author: {
    marginBottom: 6,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  userAuthor: {
    color: "#14532d",
  },

  botAuthor: {
    color: "#4ade80",
  },

  messageText: {
    color: "#e2e8f0",
    fontSize: 12,
    lineHeight: 19,
  },

  userMessageText: {
    color: "#020617",
    fontWeight: "700",
  },

  loadingBubble: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 18,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  loadingTitle: {
    color: "#86efac",
    fontSize: 11,
    fontWeight: "900",
  },

  loader: {
    marginTop: 8,
    alignSelf: "flex-start",
  },

  actionsWrap: {
    marginTop: 12,
  },

  actionCard: {
    marginTop: 9,
    overflow: "hidden",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#475569",
    backgroundColor: "#020617",
  },

  actionTop: {
    padding: 12,
    flexDirection: "row",
  },

  actionIcon: {
    fontSize: 22,
  },

  actionContent: {
    flex: 1,
    marginLeft: 9,
  },

  actionBadge: {
    color: "#4ade80",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
  },

  actionTitle: {
    marginTop: 3,
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  actionDescription: {
    marginTop: 5,
    color: "#94a3b8",
    fontSize: 9,
    lineHeight: 14,
  },

  savingText: {
    marginTop: 6,
    color: "#22c55e",
    fontSize: 11,
    fontWeight: "900",
  },

  progressWrap: {
    marginTop: 8,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "800",
  },

  progressValue: {
    color: "#22c55e",
    fontSize: 8,
    fontWeight: "900",
  },

  progressTrack: {
    marginTop: 5,
    height: 6,
    overflow: "hidden",
    borderRadius: 50,
    backgroundColor: "#1e293b",
  },

  progressBar: {
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#22c55e",
  },

  actionButton: {
    minHeight: 39,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  actionButtonText: {
    color: "#4ade80",
    fontSize: 9,
    fontWeight: "900",
  },

  composer: {
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    backgroundColor: "#020617",
  },

  input: {
    flex: 1,
    maxHeight: 110,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: 12,
  },

  sendButton: {
    minWidth: 74,
    minHeight: 48,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22c55e",
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  sendText: {
    color: "#020617",
    fontSize: 10,
    fontWeight: "900",
  },
});