const express = require('express');
const { body } = require('express-validator');
const RecipeController = require('../controllers/RecipeController');
const handleErrorMessages = require('../middlewares/handleErrorMessages');
const upload = require('../helpers/upload');
const router = express.Router();

router.get('', RecipeController.index);
router.post('', [
    body('title').notEmpty(), 
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({min : 3})
], handleErrorMessages, RecipeController.store);
router.get('/:id',  RecipeController.show);
router.post('/:id/upload', [
    upload.single('photo'),
    body('photo').custom((value, {req}) => {
        if(!req.file){
            throw new Error("Photo is required")
        }
        if(!req.file.mimetype.startsWith('image')){
            throw new Error("Photo must be image")
        }
        return true;
    })
], handleErrorMessages,  RecipeController.upload);
router.delete('/:id', RecipeController.destory);
router.delete('/', RecipeController.destoryAll);
router.patch('/:id', RecipeController.update);

module.exports = router;