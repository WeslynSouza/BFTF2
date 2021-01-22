import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Usuario from './usuario';

@Entity()
export default class ImagemUser {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Usuario, {
        cascade: ['update', 'remove']
    })
    usuario: Usuario;
}