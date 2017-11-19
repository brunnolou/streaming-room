ffmpeg -v verbose -i rtmp:localhost/live/live -c:v libx264 -c:a aac -ac 1 -strict -2 -crf 18 -profile:v baseline -maxrate 400k -bufsize 1835k -pix_fmt yuv420p -flags -global_header -hls_time 10 -hls_list_size 6 -hls_wrap 10 -start_number 1 public/videos/output.m3u8

ffmpeg 
-v verbose 
-i rtmp:localhost/live/live 
-c:v libx264 
-c:a aac 
-ac 1 
-strict 
-2 
-crf 18 
-profile:v baseline 
-maxrate 400k 
-bufsize 1835k 
-pix_fmt yuv420p 
-flags 
-global_header 
-hls_time 10 
-hls_list_size 6 
-hls_wrap 10 
-start_number 1 public/videos/output.m3u8