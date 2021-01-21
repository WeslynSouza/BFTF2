import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import ImagemTime from './imagemTime';
import Partida from './partida';
import Usuario from './usuario';

@Entity()
export default class Time {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Usuario)
    @JoinTable()
    lider: Usuario;

    @Column()
    nome: string;

    @OneToOne(() => ImagemTime)
    @JoinTable()
    logo: ImagemTime;

    @ManyToOne(() => Divisao, divisao => divisao.times)
    divisao: Divisao;

    @ManyToMany(() => Partida, partida => partida.times)
    partidas: Partida[];
}