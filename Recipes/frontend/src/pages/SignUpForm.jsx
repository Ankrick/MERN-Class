import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../helpers/axios';
import { AuthContext } from "../contexts/AuthContext";


export default function SignUpForm() {

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errors, setErrors] = useState(null);
  let { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  let register = async (e) => {
    try {
      e.preventDefault();
      setErrors(null);
      let data = {
        name,
        email,
        password
      }
      let res = await axios.post('/api/users/register', data, {withCredentials: true});
      console.log(res)
      if (res.status == 200){
        navigate('/');
        dispatch({ type : 'LOGIN', payload : res.data.user })
      }
    } catch(e) {
      setErrors(e.response.data.errors);
    }
  }

  return (
    <div class="w-full max-w-lg mx-auto">
      <form onSubmit={register} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-center">Register Form</h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            value = {name} onChange={e => setName(e.target.value)}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
          />
          {errors && errors.name && <p class="text-red-500 text-xs italic">{errors.name.msg}</p>}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            value = {email} onChange={e => setEmail(e.target.value)}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
          />
          {errors && errors.email && <p class="text-red-500 text-xs italic">{errors.email.msg}</p>}
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          
          {errors && errors.password && <input
            value = {password} onChange={e => setPassword(e.target.value)}
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          /> || <input
          value = {password} onChange={e => setPassword(e.target.value)}
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />}
          {errors && errors.password && <p class="text-red-500 text-xs italic">{errors.password.msg}</p>}
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link to="/sign-in"
            class="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-700"
            href="#"
          >
            Login here
          </Link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
