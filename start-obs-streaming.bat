@echo off
title Start OBS Streaming
cd C:\Program Files (x86)\obs-studio\bin\64bit

:: Sleep for 5 seconds
ping 127.0.0.1 -n 5 > nul

start "OBS straming" obs64.exe --startstreaming

&& exit