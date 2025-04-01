import React from 'react';
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

export default function Contact() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='w-2/3 bg-white p-8 rounded-md shadow-md'>
                <h1 className='text-2xl font-bold text-center mb-5'>Contact Us</h1>
                <p className='text-gray-700 text-center mb-5'>Have questions or feedback? Feel free to reach out to us!</p>
                
                <div className='space-y-5'>
                    <div className='flex items-center space-x-3'>
                        <p className='text-2xl text-blue-600'><AiOutlineMail /></p>
                        <p className='text-gray-700'>Email: support@earthquakealert.com</p>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <p className='text-2xl text-blue-600'><AiOutlinePhone /></p>
                        <p className='text-gray-700'>Phone: +123 456 7890</p>
                    </div>
                </div>
            </div>
        </div>
    );
}