const Recipes = require("../models/Recipes");
const mongoose = require('mongoose')

const RecipeController = {
    index : async (req, res) => {
        let recipes = await Recipes.find().sort({createdAt : -1});
        return res.json({recipes})
    },
    store : async (req, res) => {
        {
            const {title, description, ingredients} = req.body;

            const recipe = await Recipes.create({
            title: title,
            description: description,
            ingredients : ingredients
        });
        return res.json(recipe);
        }
    },
    show : async (req, res) => {
        try{
            let id  = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: 'bad request'})
            }
            let recipe = await Recipes.findById(id);
            if(!recipe) {
                return res.status(404).json({msg: 'recipe not found'})
            }
            return res.json({recipe});
        }catch(e){
            return res.status(500).json({msg: 'server error'})
        }
    },
    destory : (req, res) => {
        return res.json({msg : 'delete recipe'})
    },
    update : (req, res) => {
        return res.json({msg : 'updated recipe'})
    },
};

module.exports = RecipeController