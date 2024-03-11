const express = require('express');
const { body } = require('express-validator');
const RecipeController = require('../controllers/RecipeController');
const handleErrorMessages = require('../middlewares/handleErrorMessages');

const router = express.Router();

router.get('', RecipeController.index);
router.post('', [
    body('title').notEmpty(), 
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({min : 3})
], handleErrorMessages, RecipeController.store);
router.get('/:id', RecipeController.show);
router.delete('/:id', RecipeController.destory);
router.delete('/', RecipeController.destoryAll);
router.patch('/:id', RecipeController.update);

module.exports = router;