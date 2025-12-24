const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ytdown } = require("./lib/download/youtube");
const { tiktokdl } = require("./lib/download/tiktok");
const { wallpaper } = require("./lib/download/wallpaper");

const CREATOR = "UDMODZ";
const err_mg = "Something went wrong";

// Optional visitor counter
async function count() {
  try {
    await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya");
  } catch {}
}

// ------------------- TikTok Download -------------------
router.get("/download/tiktokdl", async (req, res) => {
  const url = req.query.url || req.query.link;
  if (!url) return res.send({ status: false, owner: CREATOR, err: "Please give me TikTok URL!" });

  try {
    const result = await tiktokdl(url);
    res.send({ status: true, creator: CREATOR, result });
    count();
  } catch (err) {
    console.error(err);
    res.send({ status: false, creator: CREATOR, error: "TikTok URL failed" });
  }
});

// ------------------- YouTube Download -------------------
router.get("/download/yt", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send({ status: false, error: "Please provide YouTube URL" });

  try {
    const result = await ytdown(url);
    if (result.error) return res.send({ status: false, creator: CREATOR, error: result.error });

    res.send({ status: true, creator: CREATOR, result });
    count();
  } catch (err) {
    console.error(err);
    res.send({ status: false, creator: CREATOR, error: "Failed to fetch YouTube video" });
  }
});

// ------------------- Wallpaper Search -------------------
router.get("/download/wallpaper", async (req, res) => {
  const q = req.query.text || req.query.q;
  const page = req.query.page;

  if (!q) return res.send({ status: false, owner: CREATOR, err: "Please give me query!" });
  if (!page) return res.send({ status: false, owner: CREATOR, err: "Please give me a page!" });

  try {
    const data = await wallpaper(q, page);
    res.send({ status: true, creator: CREATOR, result: data });
    count();
  } catch (err) {
    console.error(err);
    res.send({ status: false, creator: CREATOR, error: err_mg });
  }
});

module.exports = router;
