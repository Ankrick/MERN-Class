import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineExclamationCircle } from "react-icons/ai";


export default function Home(){

    const [alert, setAlert] = useState(null);
    const [eq, setEq] = useState(null);

    useEffect(() => {
        const fetchEarthquakes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/earthquakes');
                const sortedEq = res.data;
                setAlert(sortedEq[0])
                setEq(res.data)
            }catch(e){
                res.status(500).json({msg : e.message});
            }
        };

        fetchEarthquakes();
    }, [])


    if (!alert) {
        return <div className='text-center'>Loading...</div>;
    }

    console.log(eq)
    
    return (
            <div>
                <div className='bg-red-600 px-8 py-4 w-2/3 rounded-md mx-auto'>
                    <div className="flex justify space-x-3">
                        <p className='text-3xl text-white mt-0.5'><AiOutlineExclamationCircle /></p>
                        <h1 className='text-2xl text-white font-bold'>{alert.properties.mag} Magnitude Earthquake Alert</h1>
                    </div>
                    <div className="mt-5">
                        <ul>
                            <p className='text-white font-semibold text-sm ml-10'>Magnitude {alert.properties.mag} earthquake is detected in {alert.properties.place} at time {new Date(alert.properties.time).toLocaleString()}</p>
                        </ul>
                    </div>
                </div>
                <div>
                    {eq.map((earthquake, index) => (
                        <div key={index} className="mt-4 bg-gray-400">
                            <ul>
                                <li>{earthquake.properties.title}</li>
                                <li>{earthquake.properties.mag}</li>
                                <li>{earthquake.properties.place}</li>
                                <li>{new Date(alert.properties.time).toLocaleString()}</li>
                            </ul>
                        </div>
                    ))}
                </div> 
            </div>
      );
}
 