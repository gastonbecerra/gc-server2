require('dotenv').config()
var express = require('express');
var app = express();
var router = express.Router();

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cookie-parser')());
const corsOpts = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
app.use(cookieParser('shhh'))

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL, 
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(()=> console.log('CONECTED TO MONGO ATLAS'))
    .catch(err => console.log(err, 'ERROR'))

const testRoutes = require('./routes/test')
const sheetRouter = require('./routes/sheetsRoutes')
const varsRouter = require('./routes/varsRoutes')
const contextsRouter = require('./routes/contextsRoutes')
app.use('/test', testRoutes);
app.use('/sheets', sheetRouter);
app.use('/vars', varsRouter);
app.use('/contexts', contextsRouter);

app.use(express.urlencoded({extended: true}))

app.listen(8080)