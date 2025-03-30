const Recipes = require("../models/Recipes");
const mongoose = require('mongoose')
const removeFile = require('../helpers/removeFile');
const Users = require("../models/Users");
const emailQueue = require("../queues/emailQueue");


const RecipeController = {
    index : async (req, res) => {
        let limit = 3;
        let page = req.query.page || 1;
        let recipes = await Recipes
        .find()
        .skip((page -1) * limit)
        .limit(limit)
        .sort({createdAt : -1});

        let totalRecipeCount = await Recipes.countDocuments()
        let totalPagesCount = Math.ceil(totalRecipeCount/limit)

        let links = {
            nextPage : totalPagesCount == page? false : true,
            previousPage : page == 1 ? false : true,
            currentPage: page,
            loopableLinks: []
        };

        //generate loopableLinks array
        for (let index = 0; index < totalPagesCount; index++){
            let number = index + 1
            links.loopableLinks.push({number})
        }

        let response = {
            links,
            data : recipes
        }
        return res.json(response);
    },
    store : async (req, res) => {
        try {
            
                const {title, description, ingredients} = req.body;
    
                const recipe = await Recipes.create({
                title,
                description,
                ingredients
            });

            let allUsers = await Users.find(null, ['email']);
            let emails = allUsers.map(user => user.email)
            emails = emails.filter(emails => emails !== req.user.email)

            //email queue
            emailQueue.add({
                viewFileName : 'email',
                data : {
                        name : req.user.name,
                        recipe
                    },
                from : req.user.email,
                to : emails,
                subject : "New Recipe is created by someone."
                });


            return res.json(recipe);

        }catch(e){
            return res.status(500).json({ msg : e.message})
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
    destory : async(req, res) => {
        try{
            let id  = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: 'bad request'})
            }
            let recipe = await Recipes.findByIdAndDelete(id);
            await removeFile(__dirname+"/../public"+recipe.photo);

            if(!recipe) {
                return res.status(404).json({msg: 'recipe not found'})
            }
            return res.json({recipe});
        }catch(e){
            return res.status(500).json({msg: 'server error'})
        }
    },
    destoryAll : async(req, res) => {
        try{
            let recipe = await Recipes.deleteMany({});
            if(!recipe) {
                return res.status(404).json({msg: 'recipe not found'})
            }
            return res.json({recipe});
        }catch(e){
            return res.status(500).json({msg: 'server error'})
        }
    },
    update : async(req, res) => {
        try{
            let id  = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: 'bad request'})
            }
            let recipe = await Recipes.findByIdAndUpdate(id, {
                ...req.body // title : "updated title value"
            });


            await removeFile(__dirname+"/../public"+recipe.photo);


            if(!recipe) {
                return res.status(404).json({msg: 'recipe not found'})
            }
            return res.json(recipe);
        }catch(e){
            return res.status(500).json({msg: 'server error'});
        }
    },
    upload : async (req, res) => {
        try{
            let id  = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: 'not a valid id'})
            }
            let recipe = await Recipes.findByIdAndUpdate(id, {
                photo : '/' + req.file.filename
            });
            if(!recipe) {
                return res.status(404).json({msg: 'recipe not found'})
            }
            return res.json(recipe);

        }catch(e){
            console.log(e);
            return res.status(500).json({ msg : 'internet server error' })
        }
    }
};

module.exports = RecipeController