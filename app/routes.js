var User = require('./models/user');
var CsvFile= require('./models/csvfile');// for connecting to the csv files.
var History = require('./models/history');
// for csv file ---start point
var express = require('express');

var csv = require("fast-csv");

var router = express.Router();

var fs = require('fs');

var mongoose = require('mongoose');


var Request = require('request');
// end point.


module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/login', function(req, res){
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function(req, res){
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.ejs', { user: req.user });
    });

    app.get('/dashboard',isLoggedIn, function (req,res) {

        res.render('dashboard.ejs');
    } );

    app.get('/author/authors/:id',isLoggedIn,function (req,res) {

        res.render('author.ejs',{match:req.params.id});

    });
    app.get('/book/works/:id',isLoggedIn,function (req,res) {
        res.render('book.ejs',{match:req.params.id});
    })

   app.get('/history',(req,res)=>{

       History.find({})
           .populate('history')
           .then(hist=>{
               console.log(hist);
               res.render('history.ejs',{hist:hist});
           });

   });
app.post('/csv',(req,res)=>{


    //object.keys(req.body)
    //console.log(typeof req.body)
    //console.log(Object.keys(req.body))
       console.log("hello"+req.body);
    //console.log(req.body[0].author.title);
    //const CsvFile= new CsvFile({
      /*  book_name:req.body. ,
        author_name:,
        subject:
*/

    //});

})
    app.post('/history',(req,res)=>{

        console.log(req.body);
        //console.log(typeof req.body);
        res.sendStatus(201);
            const  newHistory = new History({

            searched: req.body
        });
                newHistory.save().then(savedPost=>{
        console.log("data saved");

         }).catch((error)=>{
             console.log(error);
                })
    });


    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}