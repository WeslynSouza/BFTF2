import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import Logo from './logo';
import Partida from './partida';
import Usuario from './usuario';

@Entity()
export default class Time {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Usuario, {
        cascade: ['update', 'remove']
    })
    @JoinColumn()
    lider: Usuario;

    @Column()
    nome: string;

    @OneToOne(() => Logo, logo => logo.time, {
        cascade: ['insert', 'update', 'remove']
    })
    logo: Logo;

    @ManyToOne(() => Divisao, divisao => divisao.times)
    divisao: Divisao;

    @OneToMany(() => Usuario, usuario => usuario.time, {
        cascade: ['insert', 'update']
    })
    jogadores: Usuario[];

    @OneToMany(() => Partida, partida => partida.time1)
    partidas1: Partida[];

    @OneToMany(() => Partida, partida => partida.time2)
    partidas2: Partida[];
}