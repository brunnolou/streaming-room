# Streaming room in Node.js, rtmp, hsl, html5
Fully operational server and client for streaming and playing.

## Features
**Server:**
- Has a **rtmp server** to receive streaming (e.g. from OBS studio)
- Converts **rtmp** ro **hsl** when a **rtmp** is published
- WebSocket server for counting participants
- Simple room authentication

**Client:**
- HTML5 videojs player (supports Chrome, Firefox, iOS, Android)
- Chat room with usernames
- Password protected

# How it works
Example:

**[ OBS ]** ––rtmp://localhost/live/live––> **[ RTMP Server ]** ––hsl––> **[ HTTP server ]** ––.m3u8––> **[ Videojs HTML5 player ]**

# How to use it
Clone this repository or download the folder.

Open the project folder in terminal and run:

```sh
npm install
```

```sh
npm start
```

Open you browser in `localhost:3000`

- **Username:** [Anything]
- **Password:** room1

You can update the default password in `passwords.json`

### Development
```sh
npm run dev
```
