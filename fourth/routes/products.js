const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/User');

// @route  GET api/products
// @desc   Get all products
// @access Private 
router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id }).sort({ date: -1 });
        res.json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

// @route  POST api/contacts
// @desc   Add new contact
// @access Private 
router.post('/', [auth, [
    check('name', 'Name is required')
        .not()
        .isEmpty()
]],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name , descriptionEn ,  descriptionMk , descriptionMeta ,  category , subCategory , type } = req.body;

        try {    
			 
            const newProduct = new Contact({
                name, 
				type,
				descriptionEn , 
				descriptionMk  ,
				descriptionMeta ,   
				category  ,
				subCategory,
                user:req.user.id
            });

            const product = await newProduct.save();
            res.json(product);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    });

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Private 
router.put('/:id', auth, async (req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { name , descriptionEn ,  descriptionMk , descriptionMeta ,  category , subCategory , type } = req.body;

	// Build contact object
	const productFields = {};
	if (name) productFields.name = name;
	if (descriptionEn) productFields.descriptionEn = descriptionEn;
	if (descriptionMk) productFields.descriptionMk = descriptionMk;
	if (descriptionMeta) productFields.descriptionMeta = descriptionMeta;
	if (category) productFields.category = category;
	if (subCategory) productFields.subCategory = subCategory;
	if (type) productFields.type = type;

	try {
		let product = await Product.findById(req.params.id);

		if (!product) return res.status(404).json({ msg: 'Product not found' });

		// Make sure user owns contact
		if (product.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

			product = await Product.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(product);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route  DELETE api/contacts/:id
// @desc   Delete contact
// @access Private 
router.delete('/:id', auth, async (req, res) => {
    try {
		const product = await Product.findById(req.params.id);

		if (!product) return res.status(404).json({ msg: 'Product not found' });

		// Make sure user owns contact
		if (product.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

		await Product.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Product removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
