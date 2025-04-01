const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')


dotenv.config();

const app = express();



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected')
    app.listen(process.env.PORT,() => {
        console.log('app is running on localhost:'+process.env.PORT);
        })
}).catch((error) => {console.log(error)});

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true
    }
));
app.use(morgan('dev'));

app.get('/api/earthquakes', async (req, res) => {
    try {
        const myanmarCoordinates = { lat: 21.0, lon: 95.0, radius: 5.0 };
        const myanmarApiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${myanmarCoordinates.lat}&longitude=${myanmarCoordinates.lon}&maxradius=${myanmarCoordinates.radius}&limit=100&orderby=time`;

        const thailandApiUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2025-04-01&minlatitude=5.5&maxlatitude=20.5&minlongitude=97.5&maxlongitude=106.5&minmagnitude=4`;
  
        const [myanmarResponse, thailandResponse] = await Promise.all([
            axios.get(myanmarApiUrl),
            axios.get(thailandApiUrl)
        ]);

        console.log('USGS Myanmar Response:', myanmarResponse.data);
        console.log('USGS Thailand Response:', thailandResponse.data);

        // Check if the responses contain valid 'features' arrays
        const myanmarEarthquakes = myanmarResponse.data && Array.isArray(myanmarResponse.data.features) ? myanmarResponse.data.features : [];
        const thailandEarthquakes = thailandResponse.data && Array.isArray(thailandResponse.data.features) ? thailandResponse.data.features : [];

        // Merge both arrays
        const combinedEarthquakes = [...myanmarEarthquakes, ...thailandEarthquakes];

        if (combinedEarthquakes.length > 0) {
            res.json(combinedEarthquakes);
        } else {
            console.log('Error: No valid earthquake data found.');
            res.status(500).json({ msg: 'No earthquake data found' });
        }

    }catch(error) {
        res.status(500).json({msg : error.message})
    }
})