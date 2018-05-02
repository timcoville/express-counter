var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
    secret: 'counterapp',
    resave: false,
    saveUninitialized: true,

}));

app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    if (isNaN(req.session.count)){
        req.session.count = 0;
    };
    req.session.count += 1
    console.log(req.session.count);
    var context = { count: req.session.count }
    res.render('index', {context: context});
});

app.get('/ninja', function(req, res){
    req.session.count += 1
    res.redirect('/')
})

app.get('/reset', function(req, res){
    req.session.count = 0
    res.redirect('/')
})

app.listen(8000, function(){
    console.log("I'm alive on port 8000");

});