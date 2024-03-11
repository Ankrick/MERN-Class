const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const app = express();
const cors = require('cors');

//mongodb
const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://Tristan:tristan@mern-cluster.rxfy8oz.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster"
mongoose.connect(mongoURL).then(() => {
    console.log('connected')
    app.listen(process.env.PORT,() => {
        console.log('app is running on localhost:'+process.env.PORT);
    })
}).catch((error) => {console.log(error)});

const recipesRoutes = require('./routes/recipes')

app.use(cors()); //security WARNING
app.use(express.json());
app.use(morgan('dev'))

app.get('/', (req,res) => {
    return res.json({hello : 'world'});
});

app.use('/api/recipes', recipesRoutes);

