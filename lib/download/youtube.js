const ytdl = require("ytdl-core");

async function ytdown(link) {
  try {
    if (!ytdl.validateURL(link)) {
      throw new Error("Invalid YouTube URL");
    }

    const info = await ytdl.getInfo(link);
    const title = info.videoDetails.title;
    const author = info.videoDetails.author.name;
    const thumbnail = info.videoDetails.thumbnails.pop().url;
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");
    const videoUrl = formats[0].url; // highest quality available

    return {
      title,
      author,
      thumbnail,
      videoUrl
    };
  } catch (err) {
    console.log(err);
    return { error: "Failed to fetch video" };
  }
}

module.exports = { ytdown };
