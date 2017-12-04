# Windows installation

1. ## Install Nodejs

   Download here: https://nodejs.org/en/download/

2. ## Install FFmpeg

   Download here: http://ffmpeg.zeranoe.com/builds/

   One important step is to define the `path` **environment variable**. I
   recommend watching this or another video to know how to install:
   https://www.youtube.com/watch?v=xcdTIDHm4KM

3. ## Download Streaming Room

   Clone this repository or
   [download](https://github.com/brunnolou/streaming-room/archive/master.zip)
   the code.

   You can check all
   [releases here](https://github.com/brunnolou/streaming-room/releases/latest).

   Unzip and put the code in the final destination.

4. ## Install Streaming Room

   Open the project folder in **terminal** and run:

   ```sh
   npm install
   ```

   After the npm installation run the following to start the server:

   ```sh
   npm start
   ```

5. ## Open the web browser

   http://localhost:3000

   Login as administrator:

   ```
   Name: Admin
   Password: root
   ```

   Open a different browser or an incognito window and log in as:

   ```
   Name: [Anything]
   Password: room1
   ```

6. ## Start the stream

   Using the software of your choice, stream the `RTMP` video to the Streaming
   Room with the following settings:

   ```
   URL: rtmp://localhost/live
   KEY: live
   ```

   Depending on the computer you may need to wait ~1min until the client windows
   automatically start the video.

   > Recommended: **[OBS](https://obsproject.com/)**
   >
   > Multi platform, Free and open source software for video recording and live
   > streaming.

## Passwords

After testing with the default settings you might update the default login
passwords and stream key in the file: `config.json`. For security reasons, you
must update the streaming KEY and keep it private.

## Run at Startup

* Press `Windows Key` + `R` then type `shell:common startup`

* Into the **Run dialog**, and press `Enter`.

* The **Startup** folder will open. Create **shortcuts** from each `*.bat` files
  inside this folder.

  > **_Warning:_** Don't move or copy this files!

  To create **shortcuts** `Right-click` on each `*.bat` file and select `Create
  Shortcut`.

  Then move the shortcut, not the file.
