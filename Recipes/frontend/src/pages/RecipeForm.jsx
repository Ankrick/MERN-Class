import React, { useEffect, useState } from 'react'
import add from '../assets/add.svg'
import Ingredients from '../components/Ingredients'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function RecipeForm() {

  let { id } = useParams();
  let navigate = useNavigate();
  let [ingredients, setIngredients] = useState([]);
  let [newIngredients, setNewIngredients] = useState('');

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [errors, setErrors] =useState([]);

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get('http://localhost:3000/api/recipes/'+ id);
        if(res.status === 200){
          setTitle(res.data.recipe.title)
          setDescription(res.data.recipe.description)
          setIngredients(res.data.recipe.ingredients)
        }
      }
    }
    fetchRecipe();
  }, [id])

  let addIngredients = () => {
    setIngredients(prev => [newIngredients, ...prev])
    setNewIngredients('')
  }

  let submit = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients
      };
      let res;
      if(id) {
        res = await axios.patch('http://localhost:3000/api/recipes/' + id, recipe);
      }else{
        res = await axios.post('http://localhost:3000/api/recipes', recipe);
      }
      if(res.status == 200){
        navigate('/')
      }
      console.log(res);
    }catch(e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  }

  return (
    <div className='mb-6 mx-auto max-w-md border-2 border-white p-4'>
        <h1 className='text-2xl mb-5 font-bold text-orange-400 text-center'>Recipe {id? 'Edit': 'Create'} Form</h1>
        <form action="" className='space-y-5' onSubmit={submit}>
            <ul className='list-disc pl-3'>
              {!!errors.length && errors.map((error, i) => (
                  <li key={i} className='text-red-500 text-sm'>{error} is invalid</li>
              ))} 
            </ul>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Recipe Title' className='w-full p-1'/>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Recipe Description' rows="5" className="w-full p-1"/>
            <div className='flex space-x-2 items-center'>
              <input value={newIngredients} onChange={e => setNewIngredients(e.target.value)} type="text" placeholder='Recipe Ingredients' className='w-full p-1'/>
              <img src={add} alt="" className='cursor-pointer' onClick={addIngredients}/>
            </div>
            <div>
              <Ingredients ingredients={ingredients}/>
            </div>
            <button type='submit' className='w-full px-3 py-1 rounded-full bg-orange-400 text-white'>{id? 'Update' : 'Create'}Recipe</button>
        </form>
    </div>
  )
}
