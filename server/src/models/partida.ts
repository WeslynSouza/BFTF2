import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import Time from './time';

@Entity()
export default class Partida {

    @PrimaryGeneratedColumn('increment')
    partidaID: number;

    @ManyToMany(() => Time)
    @JoinTable()
    times: Time[];

    @ManyToOne(() => Divisao, divisao => divisao.partidas)
    divisao: Divisao;

    @Column()
    dataHora: string;
}