#!/usr/bin/env bash

# This script runs FFmpeg with different combinations of output options
# (resolution and compression factor) to transcode different variants of the
# input video.

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 FILE"
    exit 1
fi  

for res in 1080 720 480; do
    for crf in 23 34; do
        out=${1%.*}-$res-$crf.mp4
        ffmpeg -i $1 -vf scale=-1:$res -crf $crf $out
    done
done
