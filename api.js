const express = require("express");
const router = express.Router();
const axios = require("axios");

const { tiktokdl } = require("./lib/download/tiktok"); // Your existing TikTok logic

const CREATOR = "UDMODZ";
const notwork = "This URL type not working on this site !!";

// Optional visitor counter
async function count() {
  return await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya");
}

// TikTok download API
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

module.exports = router;
