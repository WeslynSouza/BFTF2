import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ImagemPost from './imagemPost';
import Usuario from './usuario';

@Entity()
export default class Post {

    @PrimaryGeneratedColumn('increment')
    postID: number;

    @ManyToOne(() => Usuario, usuario => usuario.posts)
    autor: string;

    @Column()
    titulo: string;

    @Column()
    conteudo: string;

    @OneToMany(() => ImagemPost, imagemPost => imagemPost.post)
    imagens: ImagemPost[];
}