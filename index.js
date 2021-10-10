const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const j = require('./user.json');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
//app.use(express.static("public"));
router.get('/home', (req,res) => {
  res.sendFile(path.join(__dirname,"home.html"));
});



/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res,next) => {
res.json(j)
});
/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:userName/:password', (req,res) => {
    
      let user=req.params.userName;
      let pass=req.params.password;
      if(user === j.username && pass===j.password){
      var response ={
        status: true,
        message: "User Is valid"
      }
    }else{
       response ={
        status: false,
        message: "User Is invalid"
    }
  }   
  res.send(response);

});
//for pracrice
// router.param("userId", (req, res, next, id) => { 
//   console.log("This function will be called first"); 
//   next(); 
// }); 

// router.get("/user/:userId", (req, res) => { 
//   console.log("Then this function will be called"); 
//   res.end(); 
// }); 

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:name', (req,res) => {
  let userN=req.params.name;
  res.send(`<h1> ${userN}  successfully logout</h1>`);
});

app.use('/', router);

app.listen(process.env.port || 8089);

console.log('Web Server is listening at port '+ (process.env.port || 8089));