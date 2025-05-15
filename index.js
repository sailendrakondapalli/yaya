const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');

const execPromise = util.promisify(exec);

const app = express();
const port = process.env.PORT || 5000;

const YT_DLP_PATH = 'C:\\Tools\\yt-dlp\\yt-dlp.exe'; // Make sure this path is correct
const FFMPEG_PATH = path.join(__dirname, 'tools', 'ffmpeg.exe');
const DOWNLOAD_DIR = path.join(__dirname, 'videos');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

app.use(cors());
app.use(express.json());

app.use(express.static(FRONTEND_DIR));
app.use('/videos', express.static(DOWNLOAD_DIR));

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const filename = `video_${Date.now()}.mp4`;
  const outputPath = path.join(DOWNLOAD_DIR, filename);
  const command = `"${YT_DLP_PATH}" -f best --ffmpeg-location "${FFMPEG_PATH}" -o "${outputPath}" "${url}"`;

  try {
    await execPromise(command);
    res.json({ filename });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed', details: error.message });
  }
});

app.get('/api/latest', (req, res) => {
  fs.readdir(DOWNLOAD_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read video directory' });

    const mp4Files = files
      .filter(f => f.endsWith('.mp4'))
      .map(f => ({
        name: f,
        time: fs.statSync(path.join(DOWNLOAD_DIR, f)).ctime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (mp4Files.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    res.json({ filename: mp4Files[0].name });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
