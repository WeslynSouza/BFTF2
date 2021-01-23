import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import Time from './time';

@Entity()
export default class Partida {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Time, time => time.partidas1)
    time1: Time;

    @ManyToOne(() => Time, time => time.partidas2)
    @JoinColumn()
    time2: Time;

    @ManyToOne(() => Divisao, divisao => divisao.partidas)
    @JoinColumn()
    divisao: Divisao;

    @Column()
    dataHora: string;
}