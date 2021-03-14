import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Partida from './partida';
import Time from './time';

@Entity()
export default class Divisao {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    nome!: string;

    @OneToMany(() => Time, time => time.divisao)
    times!: Time[];

    @OneToMany(() => Partida, partida => partida.divisao)
    partidas!: Partida[];
}