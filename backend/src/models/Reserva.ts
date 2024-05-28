import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm"

@Entity()
export class Reserva {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nomeDaSala: String

    @Column()
    foto: String

    @Column()
    local: String

    @Column()
    dataDeUso: Date

    @Column({type: 'time'})
    horaInicio: String

    @Column({type: 'time'})
    horaFinal: String

    @Column()
    responsavel: String

    @Column()
    motivo: String

    @Column()
    informacoesGeral: String

    @Column()
    convidados: String
}