import { MariaDBDataSource } from "./data_source";
import {Usuario} from "./Usuario";
import {Reserva} from "./Reserva";
import { Equal } from "typeorm";

const usuarioRepository = MariaDBDataSource.getRepository(Usuario);
const reservaRepository = MariaDBDataSource.getRepository(Reserva);


export class Service{    
    start(){       
            MariaDBDataSource.initialize().then( ()=>{
                console.log("Inicializada a fonte de dados...");
            }).catch((err)=>{
                console.error("Erro de inicialização da fonte de dados!!");
            }) 
    }

    async AddUsuario(novo_usuario){
        await usuarioRepository.save(novo_usuario);          
    }

    async ListUsuarios(){
        let list = await usuarioRepository.find();
        return list;
    }


    async Login(nome, senha){
        let list = await usuarioRepository.findOneBy({
            usuario: Equal(nome),
            senha: Equal(senha)
        })
        return list;
    } 

    async AddReserva(nova_reserva){
        await reservaRepository.save(nova_reserva);
    }

    async ListReservas(){
        let list = await reservaRepository.find();
        return list;
    }

    async NomeReserva(nome){
        let list = await reservaRepository.findOneBy({
            nomeDaSala: Equal(nome)
        })
        return list;
    }
}

