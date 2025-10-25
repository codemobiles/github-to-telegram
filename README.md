# Telegram Notify Service

A lightweight Docker autoheal notification service that sends alerts to Telegram when containers are restarted.

## Features

- Receives autoheal webhook notifications
- Sends formatted messages to Telegram chat/channel
- Support for Telegram topics/threads
- Docker Compose ready
- Lightweight Node.js application

## Prerequisites

- Docker and Docker Compose
- A Telegram bot token from [@BotFather](https://t.me/botfather)
- Telegram chat/channel ID

## Setup

### 1. Create Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Use `/newbot` command to create a new bot
3. Save the bot token provided

### 2. Get Chat/Channel ID

1. Add [@MissRose_Bot](https://t.me/MissRose_Bot) to your channel/group
2. Make it admin
3. Run `/id` command to get the chat ID

### 3. Get Thread ID (Optional)

For groups with topics/forums enabled:
1. Forward a message from the desired topic to [@MissRose_Bot](https://t.me/MissRose_Bot)
2. Run `/id` command
3. Look for the `message_thread_id` value

### 4. Configure Environment

Create a `.env` file based on [`.env.sample`](.env.sample):

```bash
BOT_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
THREAD_ID=your_thread_id_here  # Optional: for topics/forums
PORT=8080                       # Optional: default is 8080
```

## Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start the service
docker compose up -d

# View logs
docker compose logs -f cm-notify

# Stop the service
docker compose down
```

### Using Node.js Directly

```bash
# Install dependencies
npm install

# Start the service
node index.js
```

The service will start on port `8080`.

## Usage

### Autoheal Integration

Send POST requests to `/autoheal` endpoint using either method:

**Method 1: JSON Body (Recommended)**
```bash
curl -X POST http://localhost:8080/autoheal \
  -H "Content-Type: application/json" \
  -d '{"content":"Container nginx restarted successfully"}'
```

**Method 2: Query String**
```bash
curl -X POST "http://localhost:8080/autoheal?content=Container%20nginx%20restarted%20successfully"
```

### Response

Success response:
```json
{"ok": true}
```

Error response:
```json
{"ok": false, "error": "error message"}
```

## Docker Compose Configuration

The service is configured with:
- Auto-restart policy: `unless-stopped`
- Port mapping: `8080:8080`
- Bridge network for isolation
- Environment variables from `.env` file

## API Endpoint

**POST** `/autoheal`

**Request Options:**

Option 1 - JSON Body:
```json
{
  "content": "Your notification message"
}
```
Headers: `Content-Type: application/json`

Option 2 - Query String:
```
?content=Your%20notification%20message
```
No special headers required

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `BOT_TOKEN` | Yes | Telegram bot token from BotFather | - |
| `CHAT_ID` | Yes | Telegram chat/channel ID | - |
| `THREAD_ID` | No | Telegram topic/thread ID for forums | - |
| `PORT` | No | Port for the service to listen on | 8080 |

## License

GNU General Public License v3.0