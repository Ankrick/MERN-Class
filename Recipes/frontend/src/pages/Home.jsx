import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Pagination from '../components/Pagination';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function Home(){

    let[recipes, setRecipes] = useState([]);
    let[links, setLinks] = useState(null);

    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search)
    let page = searchQuery.get('page');
    page = parseInt(page) ? parseInt(page) : 1
    let navigate = useNavigate();


    useEffect(() => {

        let fetchRecipes = async () => {
            let response = await axios('/api/recipes?page='+page)
            console.log(response);
            if (response.status == 200){
                let data = response.data;
                setRecipes(data.data);
                setLinks(data.links);

                window.scroll({ top: 0, left: 0, behavior: "smooth"})
            }
        }

        fetchRecipes();
    }, [page])


    let onDeleted = (_id) => {
        if(recipes.length == 1 && page > 1){
            navigate('/?page' + (page - 1))
        }else{
            setRecipes(prev => prev.filter(r => r._id !== _id))
        }    
    }

    return (
        <>
            <div className="grid grid-cols-3 space-x-2 space-y-3">
                {!!recipes.length && (recipes.map(recipe => (
                    <RecipeCard recipe={recipe} key={recipe._id} onDeleted={onDeleted}/>
                ))                        
                )}
            </div>
            {!!links && <Pagination links={links} page={page || 1}/>}
        </>
    )
}