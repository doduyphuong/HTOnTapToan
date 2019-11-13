var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var listDeThi = require('./db/listDeThi');
var PORT = 6969;

var app = express();

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

app.set('layout', 'layouts/layout');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/themDeThi', function(req, res) {
    res.render('createDeThi');
});

app.post('/themDeThi', function(req, res) {
    var {objDeThi} = req.body;
    var result = {};
    for(var i = 0; i < listDeThi.length; i++) {
        if(listDeThi[i].maDe == objDeThi.maDe) {
            result = {status: -999, message: "Mã đề đã tồn tại."};
            break;
        }
    }

    if(result.status == -999) {
        res.send(result);
    }

    listDeThi.push(JSON.parse(objDeThi));
    res.send({status: 200, message: "Add success"});
});

app.get('/xemDeThi', function(req, res) {
    var data = {};
    if(listDeThi.length > 0) {
        data.listDeThi = listDeThi;
    } else {
        data.listDeThi = [];
    }
    
    res.render('viewDeThi', data);
});

app.post('/xemDeThi', function(req, res) {
    var {maDe} = req.body;
    var arrQuestion = [];
    if(maDe != undefined || maDe != '') {
        arrQuestion = listDeThi.filter((el) => {
            if(el.maDe == maDe)
                return true;
            return false;
        })
    }

    res.send(arrQuestion);
});

app.listen(PORT, function() {
    console.log('App listen on ' + PORT);
})