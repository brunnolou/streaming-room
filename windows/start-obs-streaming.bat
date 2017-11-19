@echo off
title Start Open OBS Streaming
Mozilla FirefoxC:\Program Files (x86)\obs-studio\bin\64bit

:: Sleep for 5 seconds to wait server to start.
ping 127.0.0.1 -n 5 > nul

start "OBS straming" obs64.exe --startstreaming

&& exit
