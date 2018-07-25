const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');



app.use((req , res , next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log (log);
    fs.appendFile('server.log',log + '\n' , (err)=>{
        console.log(Error);
    });
    next();
});
//update the view with update ciew
/* app.use((req , res , next) =>{
    res.render('main.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.get('/',(req , res)=>{
    //res.send("<h1>Hello Express!</h1>")
    res.render('index.hbs',{
        
        name : 'Yossi Tohar',
        welcomeMessage :`welcome to your new home`,
        pageTitle : 'Home page',
        
        
        
    });
});
app.get('/about',(req , res )=>{
    res.render('about.hbs',{
        pageTitle : 'About page',
        
        data : 'GOOD TO HEAR!'
    });
});

app.get('/bad' , (req , res) =>{
    res.send({
        errorMessage :"Unable to handle request"
    });
});
app.listen(3000,()=>{
    console.log("Server is up on port 3000");
});