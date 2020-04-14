const express = require('express');
const bodyParser = require('body-parser');
const Users = require('./models/users');
const Reports = require('./models/reports');
const Tokens = require('./models/tokens');

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require("./reports-271019-firebase-adminsdk-xlw2d-c97822b54e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reports-271019.firebaseio.com"
});
// -----

const app = express();

app.use(bodyParser.json());


//------------------------------------------------------------------------------
// ------------ USERS ----------------------------------------------------------
// -----------------------------------------------------------------------------
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
    let data = {id:request.body.id};

    Users.findByPk(data.id).then((users) =>{
        if(users){
            response.json(users);
        }else{
            response.status(404).send();
        }
    });

});

// --------------------------------------------------------------------------------
// Check user
app.get('/api/checkUser', function(request,response){
    let data = {
        email:request.body.email,
        password:request.body.password
    };

    console.log("Email: " + data.email);
    console.log("Password:"  + data.password);

    Users.findOne({
        where:{
            email: data.email,
            password: data.password
        }
    }).then((users) =>{
        if(users !== null){
            response.json(users);
        }else{
            response.status(401).send();
        }
    });
});


// --------------------------------------------------------------------------------
// Check user
app.get('/api/checkUser2/:email/:password', function(request,response){
    let data = {
        email:request.params.email,
        password:request.params.password
    };

    console.log("Email: " + data.email);
    console.log("Password:"  + data.password);

    Users.findOne({
        where:{
            email: data.email,
            password: data.password
        }
    }).then((users) =>{
        if(users !== null){
            console.log("Check user sucesso");
            response.status(200).json(users);
        }else{
            response.status(401).send();
            console.log("Check user erro");
        }
    });
});


// ------------------------------------------------------------------------------------
// Register user 
app.post('/api/registerUser', function(request,response){
    let data = {
        email:request.body.email,
        password:request.body.password,
        name:request.body.name
    };

    console.log("Email: " + data.email);
    console.log("Password:"  + data.password);
    console.log("Name:"  + data.name);

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
    }).catch(error => {
        console.log(error, request.body.email)
    })

});


// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
//--------- REPORTS ------------------------------------------
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
});

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
});

// ---------------------------------------------------------------------------------------------------------------------------
// Get report by ID , with data passed on the body
app.get('/api/getReportByIDBody', function(request,response){
  let data = {id:request.body.id};

    Reports.findByPk(data.id).then((reports) =>{
        if(reports){
            response.json(reports);
        }else{
            response.status(404).send();
        }
    })
});

// ---------------------------------------------------------------------------------------------------------------------------
// Get description from report
app.get('/api/getDescription', function(request,response){
    let data = {
        img:request.body.img
    };

    Reports.findAll({
        where:{
            img: data.img
        }
    }).then((reports) =>{
            if(reports){
                response.json(reports);
            }else{
                response.status(404).send();
            }
    })
});


// -------------------------------------------------------------------------------------------------------
// Add new report
app.post('/api/newReport', function(request,response){
    let data = {
        description:request.body.description,
        longitude:request.body.longitude,
        latitude:request.body.latitude,
        img:request.body.img,
        morada:request.body.morada,
        userID:request.body.userID
    };

    Reports.create({
        description:data.description,
        longitude:data.longitude,
        latitude:data.latitude,
        userID: data.userID,
        morada: data.morada,                         
        img:data.img,
    }).then(newreport =>{
        if(newreport){
            response.status(201).json(newreport);
            //notification(data.description,data.morada);
            notification2(data.description,data.morada);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })
});

// -------------------------------------------------------------------------------------------------------
// Delete Report
app.post('/api/deleteReport', function(request,response){
    let data = {
        img: request.body.img
    };


    Reports.destroy({
        where: {
            img : data.img,
        }
    }).then(newreport =>{
        if(newreport){
            response.status(200).json(data);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })

});

// -------------------------------------------------------------------------------------------------------
// Delete Report
app.post('/api/deleteReport2/:img', function(request,response){
    let data = {
        img: request.params.img
    };


    Reports.destroy({
        where: {
            img : data.img,
        }
    }).then(newreport =>{
        if(newreport){
            response.status(200).json(data);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })

});


// -------------------------------------------------------------------------------------------------------
// Update Report
app.put('/api/editReport', function(request,response){
    let data = {
        description: request.body.description,
        img: request.body.img
    };


    Reports.update({ description: data.description }, {
        where: {
            img : data.img,
        }
    }).then(newreport =>{
        if(newreport){
            response.status(200).json(data);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })

});


// -------------------------------------------------------------------------------------------------------
// Update Report 2
app.put('/api/editReport2/:img/:description', function(request,response){
    let data = {
        description: request.params.description,
        img: request.params.img
    };


    Reports.update({ description: data.description }, {
        where: {
            img : data.img,
        }
    }).then(newreport =>{
        if(newreport){
            response.status(200).json(data);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })

});


//------------------------------------------------------------------------------------------------------
//------------------------------------------TOKEN-------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// Add Token
app.post('/api/newToken', function(request,response){
    let data = {
        token:request.body.token,
    };

    Tokens.create({
        token:data.token
    }).then(newToken =>{
        if(newToken){
            response.status(201).json(data);
        }else{
            response.status(404).send();
        }
    }).catch(error => {
        console.log(error)
    })
});


// Send Notifications
app.get('/api/notification', function(request,response){
    // buscar os tokens todos e adicionar para: registrationTokens
    // Buscar o ultimo report adicionado , retornar descrição e morada , adicionar para: data

    Tokens.findAll().then((tokens) => {
        if(tokens){
            var finalArray = tokens.map(function (obj) {
                return obj.token;
            });
            response.status(200).send(finalArray);
            pushNotification(finalArray,"Title text","Body Text");
        }else{
            console.log("Erro: " + error);
        }
    });


});


function notification(title,body) {
    Tokens.findAll().then((tokens) => {
        if(tokens){
            var finalArray = tokens.map(function (obj) {
                return obj.token;
            });
            //pushNotification(finalArray,"Novo relato: " + title,body);
            pushNotification2("Novo relato: " + title,body);
        }else{
            console.log("Erro: " + error);
        }
    });
}

// Send notifcation with tokens
function pushNotification(registrationTokens,title,body) {
    
    const message =  {
        notification: {
            title: title,
            body: body,
        },
        tokens:registrationTokens
    };
    //Firebase
    admin.messaging().sendMulticast(message)
        .then((response) => {
            console.log(response.successCount + ' messages were sent successfully');
        })
        .catch((error) => {
            console.log(error);
        });
}


//#########################################################
// ------------- Update Topic -----------------------------
//########################################################



function notification2(title,body) {
    pushNotification2("Novo relato: " + title,body);
}

// Notification about topic
function pushNotification2(title,body) {
    var topic = "notification"
    
    const message =  {
        notification: {
            title: title,
            body: body,
        },
        topic: topic
    };

    //Firebase
    admin.messaging().send(message)
        .then((response) => {
            console.log(response + ' messages were sent successfully');
        })
        .catch((error) => {
            console.log(error);
        });
}




// -------------------------------------------------------------------------------------------------
//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000');
});