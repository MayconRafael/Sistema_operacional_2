import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario} from "./Usuario"
import { Reserva} from "./Reserva"

export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "persistence",
    synchronize: true,
    logging: false,
    entities: [Usuario, Reserva],
    migrations: [],
    subscribers: [],
})