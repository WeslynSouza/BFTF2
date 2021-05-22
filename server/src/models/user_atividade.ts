import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './usuario';

@Entity()
export default class User_atividade {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => Usuario, usuario => usuario.atividades)
    usuario!: Usuario;

    @Column()
    tipo!: number;

    @Column()
    data!: string;

    @Column()
    nomeTime?: string;
}