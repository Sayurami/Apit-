//=================npm======================
const express = require("express");
const router = express.Router();
const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const cheerio = require("cheerio");
const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");











const { tiktokdl } = require("./lib/download/tiktok");



//========================lib============================
const err_mg = 'Server is busy now. Try again later. Please report to the help center !!'
const notwork = 'This url type not working on this site !!'
const l = console.log
const CREATOR = "UDMODZ"
const err_mg2 = "Internal Server Error. "

//====================================functions===========================

async function count(){
    return await axios.get("https://visitor.api.akuari.my.id/umum/view/tambah?id=darkyasiya")
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const runtime = (seconds) => {
	seconds = Number(seconds)
	var d = Math.floor(seconds / (3600 * 24))
	var h = Math.floor(seconds % (3600 * 24) / 3600)
	var m = Math.floor(seconds % 3600 / 60)
	var s = Math.floor(seconds % 60)
	var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
	var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
	return dDisplay + hDisplay + mDisplay + sDisplay;
}


                    
	
router.get("/download/tiktokdl", (req, res) => {
	
    const url = req.query.url || req.query.link

    if(!url) return res.send({status: false, owner: '@UDMODZ', err: 'Please give me tiktok url !'});
     tiktokdl(url)
        .then((dadsta) => {
            res.send({status: true, creator: CREATOR, result: dadsta || {} });
            count()
        })
        .catch((err) => {
            res.send({status: false, creator: CREATOR, error: notwork });
            l(err)
        });
});


module.exports = router;
