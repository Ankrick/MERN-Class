const Recipes = require("../models/Recipes");

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
            let recipe = await Recipes.findById(id);
            return res.json({recipe});
        }catch(e){
            return res.status(404).json({msg: 'response not found'})
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