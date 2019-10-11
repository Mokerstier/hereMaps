function routes(){
    const hereCore = require(`here-js-api/scripts/mapsjs-core`);
    const hereService = require(`here-js-api/scripts/mapsjs-service`);
    const exRoutes = require('express').Router();
    const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: true });
    

    exRoutes.get(`/`, hereCore, hereService, (req, res) => {
        res.render('Test.ejs');
    });
    

    return exRoutes;
}
exports.routes = routes();