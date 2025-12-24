const express = require("express");
const router = express.Router();
const axios = require("axios");
const ytdl = require("ytdl-core");

const { tiktokdl } = require("./lib/download/tiktok"); // Existing TikTok logic

const CREATOR = "UDMODZ";
const notwork = "This URL type not working on this site !!";

// Optional visitor counter
async function count() {
  return await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya");
}

// ------------------- TikTok Download -------------------
router.get("/download/tiktokdl", (req, res) => {
  const url = req.query.url || req.query.link;

  if (!url) return res.send({ status: false, owner: '@UDMODZ', err: 'Please give me TikTok URL !' });

  tiktokdl(url)
    .then((result) => {
      res.send({ status: true, creator: CREATOR, result: result || {} });
      count(); // optional
    })
    .catch((err) => {
      res.send({ status: false, creator: CREATOR, error: notwork });
      console.error(err);
    });
});

// ------------------- YouTube Download -------------------
router.get("/download/yt", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send({ status: false, error: "Please provide YouTube URL" });

  try {
    if (!ytdl.validateURL(url)) {
      return res.send({ status: false, error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const author = info.videoDetails.author.name;
    const thumbnail = info.videoDetails.thumbnails.pop().url;
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");
    const videoUrl = formats[0].url; // highest quality available

    res.send({
      status: true,
      creator: CREATOR,
      result: {
        title,
        author,
        thumbnail,
        videoUrl
      }
    });

    count(); // optional visitor counter
  } catch (err) {
    console.error(err);
    res.send({ status: false, creator: CREATOR, error: "Failed to fetch YouTube video" });
  }
});

module.exports = router;
