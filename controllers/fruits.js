const express = require('express');
const router = express.Router();
const Fruit = require('../models/fruits.js');

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.get('/seed', (req, res) => {
    Fruit.create([
        {
            name: 'grapefruit',
            color: 'pink',
            readyToEat: true
        },
        {
            name: 'grape',
            color: 'purple',
            readyToEat: false
        },
        {
            name: 'avocado',
            color: 'green',
            readyToEat: true
        }
    ], (err, data) => {
        res.redirect('/fruits');
    })
});

router.post('/', (req, res) => {
    if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
});

router.get('/', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('index.ejs', {
            fruits: allFruits
        });
    });
});

router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('show.ejs', {
            fruit: foundFruit
        });
    });
});

router.delete('/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/fruits');
    })
});

router.get('/:id/edit', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
        res.render(
    		'edit.ejs',
    		{
    			fruit: foundFruit //pass in found fruit
    		}
    	);
    });
});

router.put('/:id', (req, res)=>{
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/fruits');
    });
});

module.exports = router;
