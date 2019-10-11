const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const path = require('path');

require('dotenv').config();

const port = process.env.PORT;
const app = express();

const { routes } = require('./routes/routes');

app
    .use(urlencodedParser)
    .use(express.json())
    .use(express.static(path.join(__dirname, 'client')))
    .use(cors())
    .use('/', routes)
    
    .set('view engine', 'ejs')
;

app.listen(port, () => console.log(`server is gestart op port ${port}`));