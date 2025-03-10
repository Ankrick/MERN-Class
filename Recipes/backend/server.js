const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

//mongodb 
const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://tn8070250:tn8070250@recipescluster.jmj5dlz.mongodb.net/?retryWrites=true&w=majority&appName=RecipesCluster"
mongoose.connect(mongoURL).then(() => {
    console.log('connected')
    app.listen(process.env.PORT,() => {
        console.log('app is running on localhost:'+process.env.PORT);
    })
}).catch((error) => {console.log(error)});

const recipesRoutes = require('./routes/recipes')
const userRoutes = require('./routes/users');
const AuthMiddleware = require('./middlewares/AuthMiddleware');

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
)); //security WARNING
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req,res) => {
    return res.json({hello : 'world'});
});


app.use('/api/recipes', AuthMiddleware, recipesRoutes);
app.use('/api/users', userRoutes);

app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'thutanyan')
    res.send('cookie already sent')
});

app.get('/get-cookie', (req, res) => {
    let cookies = req.cookies;
    return res.json(cookies);
});

