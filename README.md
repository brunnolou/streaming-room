# Streaming room in Node.js, RTMP, HSL, html5
Fully operational server and client for streaming and playing.

## Features
**Server:**
- Has a **RTMP server** to receive streaming (e.g. from OBS studio)
- Converts **RTMP** to **HSL** when a **RTMP** is published
- WebSocket server for counting participants
- Simple room authentication

**Client:**
- HTML5 VideoJS player (supports Chrome, Firefox, iOS, Android)
- Chat room with usernames
- Password protected

# How it works
Example:

**[ OBS ]** ––rtmp://localhost/live/live––> **[ RTMP Server ]** ––hsl––> **[ HTTP server ]** ––.m3u8––> **[ Videojs HTML5 player ]**

# Requirements
1. ## Nodejs
    *For web and RTMP server*

    Download here: https://nodejs.org/en/download/

2. ## FFmpeg
    *For converting video and audio to HLS (HTML5)*

    Download here: http://ffmpeg.zeranoe.com/builds/

# How to use it
Clone this repository or [download](https://github.com/brunnolou/streaming-room/archive/master.zip) the code.

Open the project folder in **terminal** and run:

```sh
npm install
```

```sh
npm start
```

Open your browser in `localhost:3000`

- **Username:** [Anything]
- **Password:** room1

You might update the default login passwords and stream key in the file: `config.json`

## Windows installation
Check the [windows installation guide here](https://github.com/brunnolou/streaming-room/blob/master/windows/README.md)

### Development
```sh
npm run dev
```
