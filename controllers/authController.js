const validator = require('validator')
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router()


  authController.get('/register', (req, res) => {
    // TODO replace with actual view by assigment
    res.render('register', {
        title: 'Register Page'
    });
  });

  authController.post('/register', async (req, res) => {
    try {
      if (validator.isEmail(req.body.email) == false){
        throw new Error('Invalid email')
      }
      if (req.body.username == '' || req.body.password == ''){
        throw new Error('All fields are required');

      }
      if (req.body.password.length < 5 ){
        throw new Error('Password must be at least 5 charecters long');
      }
      if (req.body.password != req.body.repass){
        throw new Error('Passwords don\'t match')
      }
    
     const token = await register(req.body.email, req.body.username, req.body.password);

     // TODO check assigment to see if register creat session
     res.cookie('token', token);
    res.redirect('/') //TODO replace with redirect by assigment
    } catch(error){
       const errors = parseError(error)
      // TODO add error display to actaul template from assigment
      res.render('register', {
        title: 'Register Page',
        errors,
        body: {
            email: req.body.email,
            username: req.body.username
        }
      });
    }
  });

  authController.get('/login', (req, res) =>{
    res.render('login', {
      title: 'Login Page'
    });

  })

  authController.post('/login', async (req,res) => {
    try{
    const token = await login(req.body.email, req.body.password);

    res.cookie('token', token);
    res.redirect('/'); //TODO replace with redirect by assigment

    }catch(error){
      const errors = parseError(error)
      res.render('login', {
        title: 'Login Page',
        errors,
        body: {
          email: req.body.email
        }
      });
    }
  });

  authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
  });

  module.exports = authController;