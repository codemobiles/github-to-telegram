import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const THREAD_ID = process.env.THREAD_ID;
const PORT = process.env.PORT || 8080;

app.post("/autoheal", async (req, res) => {
  // autoheal posts { "text": "Container ... restarted ..." }
  const text = req.body?.text || "Autoheal event (no text)";
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = { chat_id: CHAT_ID, text };

    // Add thread_id if configured (for topics/forums)
    if (THREAD_ID) {
      payload.message_thread_id = parseInt(THREAD_ID);
    }

    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (!j.ok) throw new Error(JSON.stringify(j));
    res.json({ ok: true });
  } catch (e) {
    console.error("TG send failed:", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => console.log(`cm-notify listening on :${PORT}`));
