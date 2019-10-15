const fetch = require("node-fetch");

async function getData(req, res) {
    let dataCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/streemdata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
    );
    let lonCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/londata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
    );
    let latCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/latdata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
    );
    let valueData = await dataCall.json();
    let lonData = await lonCall.json();
    let latData = await latCall.json();
    console.log(lonData);
    console.log(latData);
    res.render('mapBox.ejs', {
        title: "Mapping around",
        valueData: valueData.value,
        lonData: lonData.value,
        latData: latData.value

    })
    return valueData;

}

function routes() {

    const exRoutes = require('express').Router();
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: true });

    require('dotenv').config();



    exRoutes.get(`/`, getData);

    return exRoutes;
}
exports.routes = routes();