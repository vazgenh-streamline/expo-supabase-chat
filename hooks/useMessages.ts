import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [conversationId]);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("id", { ascending: true });

    setMessages(data || []);
  }

  return messages;
}

export async function sendMessage({ conversationId, senderId, text, photo }) {
  return await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: senderId,
    message_type: "text",
    content: { text, photo },
  });
}
