import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './usuario';

@Entity()
export default class Avatar {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Usuario, usuario => usuario.avatar)
    @JoinColumn({ name: 'usuarioSteamId'})
    usuario: Usuario;
}