const fetch = require("node-fetch");

async function getData(req, res){
    let dataCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/streemdata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
        );
    let data = await dataCall.json();
    console.log(data);
    res.render('mapBox.ejs',{
        title: "Mapping around",
        data: data
    })
    return data;  
    
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