# 📱 Expo + Supabase Realtime Chat

A simple realtime chat built with:

- Expo (React Native)
- Supabase JS
- Realtime subscriptions
- `messages` table with JSON content field

## 🚀 Getting Started

```
npm install
npm start
```

Edit your Supabase credentials in:

```
lib/supabase.ts
```

## 📱 Realtime

The chat uses:

```
supabase.channel()
```

to stream new messages.

## 💄 Supabase Schema

messages table:

- id (uuid)
- conversation_id (uuid)
- sender_id (uuid)
- message_type (text)
- content (jsonb)
