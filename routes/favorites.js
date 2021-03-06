var express = require('express');
var router = express.Router();

//GET favorites page
router.get('/', function (req, res, next) {
    res.render('favorites', {favorites: req.session.favorites});
});

//POST to add a new favorite to users favorites

router.post('/add', function(req, res, next){

    //Create a favorites array if it doesn't exist
    if(!req.session.favorites){
        req.session.favorites = [];
    }

    //Check if image already on favorites list

    var favorite_on_date = req.session.favorites.filter(function(fav){
        return fav.date === req.body.date
    });

    //If date isn't in favorites array, add to array
    if(favorite_on_date.length === 0 ){
        req.session.favorites.push(req.body);
    }

    res.redirect('/favorites')
});

router.post('/delete', function( req, res, next){
    for(var i = 0 ; i < req.session.favorites.length - 1 ; i++){
        if(req.session.favorites[i].date === req.body.date){
            req.session.favorites.splice(i, 1);
        }
    }
    res.redirect('/favorites');
});

router.post('/deleteAll', function(req, res, next){
    var length = req.session.favorites.length;

    req.session.favorites.splice(0, length);
    res.redirect('/favorites')
});

module.exports = router;