function routes(){

    const exRoutes = require('express').Router();
    const bodyParser = require('body-parser');
	const urlencodedParser = bodyParser.urlencoded({ extended: true });
    

    exRoutes.get(`/`, (req, res) => {
        res.render('mapBox.ejs');
    });
    

    return exRoutes;
}
exports.routes = routes();