const express = require('express'); //backend framework
const path = require('path'); //obtener rutas en todos SO
const morgan = require('morgan'); //consola en dev
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//conect to db
mongoose.connect('mongodb://francisco:123456@192.168.0.103/crud-mongo', {useNewUrlParser: true})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');

// if(proccess.env.NODE_ENV === 'production'){
//
// }

app.use(express.static(__dirname + '../../public/'));

app.use(cors());

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join('__dirname', 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));//obtener datos en consola JSON
app.use(express.json());

//routes
app.use('/api', indexRoutes);

//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
