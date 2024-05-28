/*
Exemplo simples de um serviço web para inserção e listagem de dados em um
SGBD relacional, utilizando typeORM.
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

/* Em uma mesma máquina, aplicações web diferentes devem ser executadas
em portas diferentes.*/
const port = 5000;

/* importando o modelo */
import { Usuario } from "./models/Usuario"
import { Reserva } from "./models/Reserva"
/* importanto o data source inicializado */
import { Service} from "./models/services"



/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: '*/*' }));
/* Habilitação de requisições partindo de outras aplicações */
app.use(cors({
    oringin: '*',
    credentials: true
})); 

/* Inicializando a fonte de dados via serviço: */
var service = new Service();
service.start();

/* Criação das rotas para o serviço. */
app.get('/listUsuarios', listUsuarios);
app.post('/addUsuario', addUsuario);
app.post('/login', login)
app.get('/listReservas', listReservas);
app.post('/addReserva', addReserva);
app.post('/nomeReserva', nomeReserva);

/* Execução do servidor */

/* Tratadores de requisição */

/* Tratador de listagem */
async function listUsuarios(req, res){ 
    console.log("Requisição de listagem recebida."); //Para debug somente.
    let usuario = await service.ListUsuarios();  
    let usr_list = JSON.stringify(usuario);
    res.setHeader('Content-Type', 'application/json');
    res.end(usr_list);     
}

/* Tratador de adição */
async function addUsuario(req,res){
    try{
        console.log("Requisição de inserção recebida.."); // Para debug somente.
        let novo_usuario= new Usuario();  
        for(let key in req.body){
            novo_usuario[key] = req.body[key];
        } 
        await service.AddUsuario(novo_usuario);
        let novo_usuario_i = JSON.stringify(novo_usuario);
        res.setHeader('Content-Type', 'application/json');
        res.end(novo_usuario_i);   
    } catch{
        res.end("Não foi possivel realizar o cadastro")
    }
      
}

async function login(req, res){    
    try{    
        let nome = req.body.usuario;
        let senha = req.body.senha
        let usuario = await service.Login(nome, senha);  
        let usr_list = JSON.stringify(usuario);
        res.setHeader('Content-Type', 'application/json');  
        if(usuario == null){
            console.log("Usuário não existe");
            res.send("Usuário não existe"); 
        } else{
            console.log("Listagem concluida."); 
            res.end(usr_list);   
        } 
    } catch{
        res.end("Não foi possivel realizar o login")
    }
}

async function listReservas(req, res){ 
    console.log("Requisição de listagem recebida.");
    let reserva = await service.ListReservas();  
    let res_list = JSON.stringify(reserva);
    res.setHeader('Content-Type', 'application/json');
    res.end(res_list);     
}

async function addReserva(req,res){     
    try{
        console.log("Requisição de inserção recebida..");
        let nova_reserva = new Reserva();  
        for(let key in req.body){
            nova_reserva[key] = req.body[key];
        } 
        await service.AddReserva(nova_reserva);
        let nova_reserva_i = JSON.stringify(nova_reserva);
        res.setHeader('Content-Type', 'application/json');
        res.end(nova_reserva_i);   
    } catch{
        res.end("Não foi possivel realizar o cadastro")
    }
}

async function nomeReserva(req, res){ 
    let nome = req.body.nomeDaSala;    
    let reserva = await service.NomeReserva(nome);  
    let res_list = JSON.stringify(reserva);
    res.setHeader('Content-Type', 'application/json');  
    if(reserva == null){
        console.log("Reserva não existe");
        res.send("Reserva não existe"); 
    } else{
        console.log("Listagem concluida."); 
        res.end(res_list);   
    }    
}

app.listen(port, listenHandler);

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}