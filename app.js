const express = require('express');
const bodyParser = require('body-parser');
const Users = require('./models/users');
const Reports = require('./models/reports');

const app = express();

app.use(bodyParser.json());



// Get All users
app.get('/api/getAllUsers', function (request, response) {
    Users.findAll().then((users) =>{
        if(users){
            response.json(users);
        }else{
            response.status(404).send();
        }
    });
});

// ---------------------------------------------------------------------------------------------------------------------------
// Get user by ID
app.get('/api/getUserByID/:id', function (request, response) {
    let { id }= request.params;

    Users.findByPk(id).then((users) =>{
        if(users){
            response.json(users);
        }else{
            response.status(404).send();
        }
    });

});

// ---------------------------------------------------------------------------------------------------------------------------
// Get user by ID
app.get('/api/getUserByIDBody', function (request, response) {
    let data = {id:request.body.id}

    Users.findByPk(data.id).then((users) =>{
        if(users){
            response.json(users);
        }else{
            response.status(404).send();
        }
    });

});


// ---------------------------------------------------------------------------------------------------------------------------
// Get all reports 
app.get('/api/getAllReports', function(request,response){
    Reports.findAll().then((reports) =>{
        if(reports){
            response.json(reports);
        }else{
            response.status(404).send();
        }
    })
})

// ---------------------------------------------------------------------------------------------------------------------------
// Get report by ID 
app.get('/api/getReportByID/:id', function(request,response){
    let { id }= request.params;

    Reports.findByPk(id).then((reports) =>{
        if(reports){
            response.json(reports);
        }else{
            response.status(404).send();
        }
    })
})

// ---------------------------------------------------------------------------------------------------------------------------
// Get report by ID , with data passed on the body
app.get('/api/getReportByIDBody', function(request,response){
  let data = {id:request.body.id}

    Reports.findByPk(data.id).then((reports) =>{
        if(reports){
            response.json(reports);
        }else{
            response.status(404).send();
        }
    })
})

// --------------------------------------------------------------------------------
// Check user 
app.get('/api/checkUser', function(request,response){
    let data = {
        email:request.body.email,
        password:request.body.password
    }


    Users.findAll({
        where:{
            email: data.email,
            password: data.password
        }
    }).then((users) =>{
        if(users){
            response.status(200).json(users);
        }else{
            response.status(404).send();
        }
    });
  
      
  })

// ------------------------------------------------------------------------------------
// Register user 
app.post('/api/registerUser', function(request,response){
    let data = {
        email:request.body.email,
        password:request.body.password,
        name:request.body.name
    }

    Users.create({
        email:data.email,
        password:data.password,
        name:data.name
    }).then(newuser =>{
        if(newuser){
            response.status(201).json(newuser);
        }else{
            response.status(404).send();
        }
    })  
      
})



//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});