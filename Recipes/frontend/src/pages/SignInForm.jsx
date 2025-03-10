import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../helpers/axios';
import { AuthContext } from "../contexts/AuthContext";


export default function SignInForm() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);
    let { dispatch } = useContext(AuthContext);
    let navigate = useNavigate();
    
    let Login = async (e) => {
        try{
          e.preventDefault();
          setError(null);
          let data = {
            email,
            password
          }
          let res = await axios.post('/api/users/login', data, {
            withCredentials : true
          })
          if (res.status == 200){
            navigate('/');
            dispatch({ type : 'LOGIN', payload : res.data.user })
          }
          console.log(res)
        }catch(e){
          setError(e.response.data.msg)
        }
    }

  return (
    <div class="w-full max-w-lg mx-auto">
      <form onSubmit={Login} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-center">Login Form</h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          {error && error == "user does not exists" && <input
          value = {email} onChange={e => {setEmail(e.target.value)}}
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
          /> || <input
          value = {email} onChange={e => {setEmail(e.target.value)}}
            class="shadow appearance-non rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
          />}
          {error && error == "user does not exists" && <p class="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          {error && error == "password incorrect" && <input
            value = {password} onChange={e => {setPassword(e.target.value)}}
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          /> || <input
          value = {password} onChange={e => {setPassword(e.target.value)}}
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />}
          {error && error == "password incorrect" && <p class="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <Link to="/sign-up"
            class="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-700"
            href="#"
          >
            Register here
          </Link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
