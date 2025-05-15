// // // const express = require('express');
// // // const cors = require('cors');
// // // const { exec } = require('child_process');
// // // const path = require('path');
// // // const fs = require('fs');

// // // const app = express();
// // // const port = 5000;

// // // const YT_DLP_PATH = 'C:\\Tools\\yt-dlp\\yt-dlp.exe'; // Replace if needed
// // // const DOWNLOAD_DIR = path.join(__dirname, 'videos');

// // // app.use(cors());
// // // app.use(express.json());

// // // // Serve static video files
// // // app.use('/videos', express.static(DOWNLOAD_DIR));

// // // // Create download folder if not exists
// // // if (!fs.existsSync(DOWNLOAD_DIR)) {
// // //   fs.mkdirSync(DOWNLOAD_DIR);
// // // }

// // // // Route to download a video from YouTube
// // // app.post('/api/download', async (req, res) => {
// // //   const { url } = req.body;
// // //   if (!url) return res.status(400).json({ error: 'URL is required' });

// // //   const filename = `video_${Date.now()}.mp4`;
// // //   const outputPath = path.join(DOWNLOAD_DIR, filename);
// // //   const command = `"${YT_DLP_PATH}" -f best -o "${outputPath}" "${url}"`;

// // //   exec(command, (error, stdout, stderr) => {
// // //     if (error) {
// // //       console.error('Download error:', error);
// // //       return res.status(500).json({ error: 'Download failed' });
// // //     }
// // //     return res.json({ filename });
// // //   });
// // // });

// // // // Route to get the latest downloaded video
// // // app.get('/api/latest', (req, res) => {
// // //   fs.readdir(DOWNLOAD_DIR, (err, files) => {
// // //     if (err) return res.status(500).json({ error: 'Failed to read video directory' });

// // //     const mp4Files = files
// // //       .filter(file => file.endsWith('.mp4'))
// // //       .map(file => ({
// // //         name: file,
// // //         time: fs.statSync(path.join(DOWNLOAD_DIR, file)).ctime.getTime()
// // //       }))
// // //       .sort((a, b) => b.time - a.time);

// // //     if (mp4Files.length === 0) {
// // //       return res.status(404).json({ error: 'No videos found' });
// // //     }

// // //     return res.json({ filename: mp4Files[0].name });
// // //   });
// // // });

// // // app.listen(port, () => {
// // //   console.log(`✅ Server running on http://localhost:${port}`);
// // // });

// // const express = require('express');
// // const cors = require('cors');
// // const { exec } = require('child_process');
// // const path = require('path');
// // const fs = require('fs');

// // const app = express();
// // const port = 5000;

// // const YT_DLP_PATH = 'C:\\Tools\\yt-dlp\\yt-dlp.exe'; // Update path as needed
// // const DOWNLOAD_DIR = path.join(__dirname, 'videos');
// // const FRONTEND_DIR = path.join(__dirname,  'frontend');

// // app.use(cors());
// // app.use(express.json());

// // // Serve static frontend files
// // app.use(express.static(FRONTEND_DIR));

// // // Serve static video files
// // app.use('/videos', express.static(DOWNLOAD_DIR));

// // // Create download folder if not exists
// // if (!fs.existsSync(DOWNLOAD_DIR)) {
// //   fs.mkdirSync(DOWNLOAD_DIR);
// // }

// // // Route to download a video from YouTube
// // app.post('/api/download', async (req, res) => {
// //   const { url } = req.body;
// //   if (!url) return res.status(400).json({ error: 'URL is required' });

// //   const filename = `video_${Date.now()}.mp4`;
// //   const outputPath = path.join(DOWNLOAD_DIR, filename);
// //   const command = `"${YT_DLP_PATH}" -f best -o "${outputPath}" "${url}"`;

// //   exec(command, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error('Download error:', error);
// //       return res.status(500).json({ error: 'Download failed' });
// //     }
// //     return res.json({ filename });
// //   });
// // });

// // // Route to get the latest downloaded video
// // app.get('/api/latest', (req, res) => {
// //   fs.readdir(DOWNLOAD_DIR, (err, files) => {
// //     if (err) return res.status(500).json({ error: 'Failed to read video directory' });

// //     const mp4Files = files
// //       .filter(file => file.endsWith('.mp4'))
// //       .map(file => ({
// //         name: file,
// //         time: fs.statSync(path.join(DOWNLOAD_DIR, file)).ctime.getTime()
// //       }))
// //       .sort((a, b) => b.time - a.time);

// //     if (mp4Files.length === 0) {
// //       return res.status(404).json({ error: 'No videos found' });
// //     }

// //     return res.json({ filename: mp4Files[0].name });
// //   });
// // });

// // // Fallback to frontend/index.html for all other routes
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
// // });

// // app.listen(port, () => {
// //   console.log(`✅ Server running on http://localhost:${port}`);
// // });


// const express = require('express');
// const cors = require('cors');
// const { exec } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = process.env.PORT || 5000;

// const YT_DLP_PATH = path.join(__dirname, 'tools', 'yt-dlp.exe'); // Update to where yt-dlp.exe is
// const DOWNLOAD_DIR = path.join(__dirname, 'videos');
// const FRONTEND_DIR = path.join(__dirname, 'frontend');

// app.use(cors());
// app.use(express.json());

// // Serve static frontend files
// app.use(express.static(FRONTEND_DIR));

// // Serve static video files
// app.use('/videos', express.static(DOWNLOAD_DIR));

// // Create download folder if it doesn't exist
// if (!fs.existsSync(DOWNLOAD_DIR)) {
//   fs.mkdirSync(DOWNLOAD_DIR);
// }

// // Download video route
// app.post('/api/download', (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: 'URL is required' });

//   const filename = `video_${Date.now()}.mp4`;
//   const outputPath = path.join(DOWNLOAD_DIR, filename);

//   // Build command
//   const command = `"${YT_DLP_PATH}" -f best -o "${outputPath}" "${url}"`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error('Download error:', error);
//       console.error('yt-dlp stderr:', stderr);
//       return res.status(500).json({ error: 'Download failed', details: stderr });
//     }
//     return res.json({ filename });
//   });
// });

// // Get latest video route
// app.get('/api/latest', (req, res) => {
//   fs.readdir(DOWNLOAD_DIR, (err, files) => {
//     if (err) return res.status(500).json({ error: 'Failed to read video directory' });

//     const mp4Files = files
//       .filter(f => f.endsWith('.mp4'))
//       .map(f => ({
//         name: f,
//         time: fs.statSync(path.join(DOWNLOAD_DIR, f)).ctime.getTime()
//       }))
//       .sort((a, b) => b.time - a.time);

//     if (mp4Files.length === 0) {
//       return res.status(404).json({ error: 'No videos found' });
//     }

//     res.json({ filename: mp4Files[0].name });
//   });
// });

// // Fallback to frontend index.html for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`✅ Server running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');

const execPromise = util.promisify(exec);

const app = express();
const port = process.env.PORT || 5000;

const YT_DLP_PATH = path.join(__dirname, 'tools', 'yt-dlp.exe'); // Update to your yt-dlp.exe path
const DOWNLOAD_DIR = path.join(__dirname, 'videos');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(FRONTEND_DIR));

// Serve static video files
app.use('/videos', express.static(DOWNLOAD_DIR));

// Create download folder if it doesn't exist
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

/* --- Callback style route --- */
// app.post('/api/download', (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: 'URL is required' });

//   const filename = `video_${Date.now()}.mp4`;
//   const outputPath = path.join(DOWNLOAD_DIR, filename);

//   const command = `"${YT_DLP_PATH}" -f best -o "${outputPath}" "${url}"`;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error('Download error:', error);
//       console.error('yt-dlp stderr:', stderr);
//       return res.status(500).json({ error: 'Download failed', details: stderr });
//     }
//     return res.json({ filename });
//   });
// });

/* --- Async/await style route using util.promisify(exec) --- */
app.post('/api/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const filename = `video_${Date.now()}.mp4`;
  const outputPath = path.join(DOWNLOAD_DIR, filename);
  const command = `"${YT_DLP_PATH}" -f best -o "${outputPath}" "${url}"`;

  try {
    const { stdout, stderr } = await execPromise(command);
    // Optional: console.log(stdout, stderr);
    res.json({ filename });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed', details: error.message });
  }
});

// Get latest video route
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

// Fallback to frontend index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
