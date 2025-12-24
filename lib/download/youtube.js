const ytdl = require("ytdl-core");

async function ytdown(link) {
  try {
    // Check if the URL is valid
    if (!ytdl.validateURL(link)) {
      return { error: "Invalid YouTube URL" };
    }

    // Fetch video info
    const info = await ytdl.getInfo(link);

    // Extract details
    const title = info.videoDetails.title;
    const author = info.videoDetails.author.name;
    const thumbnail = info.videoDetails.thumbnails.slice(-1)[0].url; // highest resolution
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");

    if (!formats.length) {
      return { error: "No downloadable video format found" };
    }

    // Pick the highest quality available
    const videoUrl = formats[0].url;

    return {
      title,
      author,
      thumbnail,
      videoUrl
    };
  } catch (err) {
    console.error("YT Download Error:", err.message);
    return { error: "Failed to fetch video info" };
  }
}

module.exports = { ytdown };
