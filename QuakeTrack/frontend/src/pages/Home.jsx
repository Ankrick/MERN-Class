import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsEnvelopeExclamation } from "react-icons/bs";
import { MdHistoryToggleOff } from "react-icons/md";




export default function Home(){

    //mm data
    const [alertmm, setAlertmm] = useState(null);
    const [eqmm, setEqmm] = useState(null);

    //thailand data
    const [alertth, setAlertth] = useState(null);
    const [eqth, setEqth] = useState(null);

    useEffect(() => {
        const fetchEarthquakes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/earthquakes');
                const myanmarEq = res.data.myanmarEarthquakes;
                setAlertmm(myanmarEq[0])
                setEqmm(myanmarEq)

                const thailandEq = res.data.thailandEarthquakes;
                setAlertth(thailandEq[0])
                setEqth(thailandEq)

            }catch(e){
                res.status(500).json({msg : e.message});
            }
        };

        fetchEarthquakes();
    }, [])


    if (!alertmm || !alertth) {
        return <div className='text-center'>Loading...</div>;
    }


    console.log(eqth);

    
    return (
            <div className='min-h-screen'>
                <div className='bg-red-600 px-8 py-4 w-2/3 rounded-md mx-auto shadow-md'>
                    <div className="flex justify space-x-3">
                        <p className='text-3xl text-white mt-0.5'><AiOutlineExclamationCircle /></p>
                        <h1 className='text-2xl text-white font-bold'>Earthquake Alert</h1>
                    </div>
                    <div className="mt-5">
                        <ul>
                            <p className='text-white font-semibold text-sm ml-10'>Magnitude {alertmm.properties.mag} earthquake is detected in {alertmm.properties.place} at time {new Date(alertmm.properties.time).toLocaleString()}</p>
                        </ul>
                    </div>
                </div>
                <div>
                <div className='px-8 py-4 w-2/3 rounded-md border border-blue-200 shadow-sm mx-auto mt-4'>
                    <div className="flex justify space-x-3">
                        <p className='text-3xl mt-0.5'><BsEnvelopeExclamation /></p>
                        <h1 className='text-2xl font-bold'>{alertmm.properties.mag} Magnitude</h1>
                    </div>
                    <div className="mt-5">
                        <ul>
                            <li className='font-semibold text-sm ml-10'>Magnitude : {alertmm.properties.mag}</li>
                            <li className='font-semibold text-sm ml-10'>Location : {alertmm.properties.place} </li>
                            <li className='font-semibold text-sm ml-10'>Time : {new Date(alertmm.properties.time).toLocaleString()}</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className='w-2/3 mx-auto'>
                    <div className="flex justify space-x-3 mt-4 py-2">
                            <p className='text-2xl mt-0.5'><MdHistoryToggleOff/></p>
                            <h1 className='text-lg font-bold'>Earthquake history</h1>
                    </div>
                </div>
                <div className='w-2/3 mx-auto grid grid-cols-2 gap-4'>
                    <div className='border rounded-md mt-4 shadow-sm'>
                        <ol type='1'>
                            <div className='p-4 mt-4 font-semibold text-md'>Myanmar</div>
                            {eqmm.map((earthquake, index) => (
                                <li key={index} className="mt-4 p-4 rounded-md">
                                    <div className='text-sm'>
                                        <p>Magnitude : {earthquake.properties.mag}</p>
                                        <p>Location : {earthquake.properties.place}</p>
                                        <p>Time : {new Date(earthquake.properties.time).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className='border rounded-md mt-4 shadow-sm'>
                        <div className='p-4 mt-4 font-semibold text-md'>Thailand</div>
                        <ul>
                            {eqth.map((earthquake, index) => (
                                <li key={index} className="mt-4 p-4 rounded-md">
                                    <div className='text-sm'>
                                        <p>Magnitude : {earthquake.properties.mag}</p>
                                        <p>Location : {earthquake.properties.place}</p>
                                        <p>Time : {new Date(earthquake.properties.time).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            </div>
      );
}
 