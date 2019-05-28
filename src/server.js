const express = require('express'); //backend framework
const path = require('path'); //obtener rutas en todos SO
const morgan = require('morgan'); //consola en dev
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//conect to db
const db = require('./config/database.config');
db.connect

//Constants
const port = process.env.PORT || 3000

//init server config
app.use(express.static(__dirname + '../../public/'));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));//obtener datos en consola JSON

//importing routes
const router = require('./routes');
const jwt = require('./config/jwt.config');
app.use('/api', jwt.validateUser, router.taskRoute);
app.use('/users', router.userRoute);

//middlewares
const middleware = require('./middlewares');
app.use(middleware.notFoundError);
app.use(middleware.handleErrors);

//starting server
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
