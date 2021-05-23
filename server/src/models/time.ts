import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import Partida from './partida';
import Usuario from './usuario';

@Entity()
export default class Time {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @OneToOne(() => Usuario, {
        cascade: ['update']
    })
    @JoinColumn()
    lider!: Usuario;

    @OneToOne(() => Usuario, {
        cascade: ['update']
    })
    @JoinColumn()
    viceLider?: Usuario;

    @Column()
    nome!: string;

    @Column()
    logo?: string;

    @Column()
    ativo!: boolean;

    @ManyToOne(() => Divisao, divisao => divisao.times)
    divisao!: Divisao;

    @OneToMany(() => Usuario, usuario => usuario.time)
    jogadores!: Usuario[];

    @OneToMany(() => Partida, partida => partida.time1)
    partidas1?: Partida[];

    @OneToMany(() => Partida, partida => partida.time2)
    partidas2?: Partida[];
}