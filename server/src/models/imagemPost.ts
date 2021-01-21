import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';

@Entity()
export default class ImagemPost {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Post, post => post.imagens)
    post: Post;
}