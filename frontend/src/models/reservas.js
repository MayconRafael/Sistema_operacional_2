class Reserva{
    constructor(nomeDaSala, foto, local, dataDeUso, horaInicio, horaFinal, responsavel){
        this.nomeDaSala = nomeDaSala;
        this.foto = foto,
        this.local = local;
        this.dataDeUso = dataDeUso;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.responsavel = responsavel;
    }
}

module.exports = {
    Reserva: Reserva
}  