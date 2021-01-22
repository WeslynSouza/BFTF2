import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Imagens from './imagens';
import Usuario from './usuario';

@Entity()
export default class Post {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.posts)
    autor: Usuario;

    @Column()
    titulo: string;

    @Column()
    conteudo: string;

    @OneToMany(() => Imagens, imagens => imagens.post)
    imagens: Imagens[];
}