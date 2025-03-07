const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const app = express();
const cors = require('cors');

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
const userRoutes = require('./routes/users')

app.use(cors()); //security WARNING
app.use(express.json());
app.use(morgan('dev'))

app.get('/', (req,res) => {
    return res.json({hello : 'world'});
});

app.use('/api/recipes', recipesRoutes);
app.use('/api/users', userRoutes);

