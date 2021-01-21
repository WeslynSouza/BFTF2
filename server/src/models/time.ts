import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToOne(() => Logo, {
        cascade: ['update', 'remove']
    })
    @JoinColumn()
    logo: Logo;

    @ManyToOne(() => Divisao, divisao => divisao.times)
    divisao: Divisao;

    @ManyToMany(() => Partida, partida => partida.times)
    partidas: Partida[];
}