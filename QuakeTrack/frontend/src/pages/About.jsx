import React from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function About() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-2/3 bg-white p-8 rounded-md shadow-md'>
                <div className="flex items-center space-x-3">
                    <p className='text-3xl text-blue-600'><AiOutlineInfoCircle /></p>
                    <h1 className='text-2xl font-bold'>About Earthquake Alert</h1>
                </div>
                <div className='mt-5 text-gray-700'>
                    <p>
                        Earthquake Alert is a real-time monitoring system that provides the latest updates on seismic activity
                        in Myanmar and Thailand. My goal is to keep communities informed about earthquake events, helping
                        them stay aware and prepared for potential hazards.
                    </p>
                    <p className='mt-3'>
                        The system gathers data from trusted sources and presents it in a user-friendly interface. It displays
                        the most recent earthquakes detected in the region, along with historical earthquake data for reference.
                    </p>
                    <p className='mt-3'>
                        Features of Earthquake Alert:
                    </p>
                    <ul className='list-disc ml-6 mt-2'>
                        <li>Real-time earthquake alerts for Myanmar and Thailand.</li>
                        <li>Detailed earthquake history with magnitude, location, and time.</li>
                        <li>User-friendly interface with easy-to-read alerts.</li>
                    </ul>
                    <p className='mt-3'>
                        Stay informed and stay safe. If you have any questions or feedback, feel free to contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}
