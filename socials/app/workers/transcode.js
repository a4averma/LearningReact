/*  TO-DOS
  Check mime type
  Process Videos in background
  return the processed video
*/

function resizeVideo(video, quality) {
    const p = new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', ['-i', `${parent}/${video}.mp4`, '-codec:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-b:v', '400k', '-maxrate', '400k', '-bufsize', '800k', '-vf', `scale=-2:${quality}`, '-threads', '0', '-b:a', '128k', `${parent}/transcoded/${video}_${quality}.mp4`]);
        ffmpeg.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
        ffmpeg.on('close', (code) => {
            resolve();
        });
    });
    return p;
}

function processVideos(file) {
    let video = file;
    if (video) {
        resizeVideo(video, 720).then(() => {
            // 720p video all done
            resizeVideo(video, 480).then(() => {
                // 480p video all done
                resizeVideo(video, 360).then(() => {
                    // 360p video all done
                    console.log(`Completed Video Number - ${video}`);
                    processVideos();
                });
            });
        });
    }
}