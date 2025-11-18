import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useMessages, sendMessage } from "../hooks/useMessages";

const conversationId = "972f10d9-0b65-41fc-9e83-0c9091261bf0";
const senderId = "6696ccc5-8445-410e-8bab-5a431abb893f";

export default function ChatScreen() {
  const messages = useMessages(conversationId);
  const [text, setText] = useState("");

  async function onSend() {
    if (!text.trim()) return;

    await sendMessage({
      conversationId,
      senderId,
      text,
      photo: null,
    });

    setText("");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const content = item.content || {};
          return (
            <View style={styles.message}>
              <Text style={styles.sender}>{item.sender_id}</Text>

              {content.text ? <Text style={styles.text}>{content.text}</Text> : null}

              {content.photo ? (
                <Image
                  source={{ uri: content.photo }}
                  style={styles.photo}
                />
              ) : null}
            </View>
          );
        }}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          style={styles.input}
        />
        <Button title="Send" onPress={onSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  message: { marginBottom: 12 },
  sender: { fontWeight: "bold" },
  text: { fontSize: 16 },
  photo: { width: 200, height: 200, borderRadius: 10, marginTop: 5 },
  inputRow: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
});
