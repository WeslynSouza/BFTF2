import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Divisao from './divisao';
import ImagemTime from './imagemTime';
import Usuario from './usuario';

@Entity()
export default class Time {

    @PrimaryGeneratedColumn('increment')
    timeID: number;

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
}