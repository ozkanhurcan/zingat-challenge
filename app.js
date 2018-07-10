const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require('body-parser');
const Request = require("request");
const _ = require("lodash");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
const user ={
    mail : "ozkan@zingat.com",
    pass : "12345",
    loggedIn : ""
};
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static('assets'));

app.get('/', function(req, res) {
    res.render('login.html');
});

app.post('/',function (req, res) {
    if(req.body.mail != user.mail || req.body.pass != user.pass){
        res.render('login.html', {title: 'Wrong e-mail or password'});
        user.loggedIn=false;
    }
    else{
        user.loggedIn=true;
        return res.redirect('Myalbums');
    }
});
app.get('/Myalbums', function (req,res) {

    Request.get("https://jsonplaceholder.typicode.com/albums/1/photos",(error,response,body) => {
        if(error){
            return console.dir(error);
        }
        const user1 = JSON.parse(body);
        if(user.loggedIn==true)
        res.render('albums.html',{user1});
        else
            res.redirect('/');

    });
});

app.listen(8081);