import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';

@Entity()
export default class ImagemPost {

    @PrimaryGeneratedColumn('increment')
    imagemID: number;

    @Column()
    path: string;

    @ManyToOne(() => Post, post => post.imagens)
    post: Post;
}