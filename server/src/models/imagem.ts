import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post';

@Entity()
export default class Imagem {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    path!: string;

    @ManyToOne(() => Post, post => post.imagens)
    @JoinColumn({name: 'postId'})
    post!: Post;
}