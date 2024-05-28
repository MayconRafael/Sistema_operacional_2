
const express = require('express')
const session = require('express-session')
const app = express();
const port = 3000;
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: '*/*' }));

const axios = require('axios');

const modelo = require('./models/modelos');
const modelo2 = require('./models/reservas')
var Projeto = modelo.Projeto;
var Reserva = modelo2.Reserva;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.get('/login', addLoginForm);

function addLoginForm(req,res){
    res.render('login/login.ejs'); 
}

app.get('/cadastrousuario', addCadastroUsuarioForm);

function addCadastroUsuarioForm(req,res){
    res.render('login/cadastroUsuario.ejs'); 
}

app.get('/home', home);

function home(req, resp){
    let reservas = [];
    request('http://localhost:5000/listReservas', 
            { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {                    
                    res.body.forEach((item)=>{
                        let reserva = new Reserva(item.nomeDaSala, item.foto, item.local, item.dataDeUso, item.horaInicio, item.horaFinal, item.responsavel);
                        reservas.push(reserva);
                    }); 
                    resp.render('user/home.ejs',{lista_reservas: reservas});                    
                }               
    });    
}

app.get('/cadastroreserva', addCadastroReserva);

function addCadastroReserva(req,res){
    res.render('user/cadastroReserva.ejs'); 
}

app.post('/busca', busca);

function busca(req, resp){
    var res_data_i = {
        "nomeDaSala": req.body.nomeDaSala  
    }   

    let reservas = [];
            
    axios.post('http://localhost:5000/nomeReserva', res_data_i)
    .then(function (response) {   
        if(response.data.nomeDaSala){
            let reserva = new Reserva(response.data.nomeDaSala, response.data.foto, response.data.local, response.data.dataDeUso, response.data.horaInicio, response.data.horaFinal, response.data.responsavel);
            reservas.push(reserva);        
            resp.render('user/busca.ejs',{lista_reservas: reservas});   
        } else{ 
            resp.render('user/home.ejs',{lista_reservas: []});
        }          
    })
    .catch(function (error) {
        console.log(error); 
    });
}

app.use((req, res, next) => {
    if (req.hostname === 'localhost') {
        res.redirect('/login');
    } else {
        next();
    }
});

app.listen(port, listenHandler);

function listenHandler(){
    console.log(`Executando na porta ${port}!`);
}