import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import Classe from './classe';
import ImagemUser from './imagemUser';
import Post from './post';

@Entity()
export default class User {

    @PrimaryColumn()
    steamID: string;
     
    @Column()
    nick: string;

    @Column()
    senha: string;

    @ManyToMany(() => Classe)
    @JoinTable()
    classes: Classe[];

    @OneToOne(() => ImagemUser)
    @JoinTable()
    avatar: ImagemUser;

    @Column()
    time: string;

    @Column()
    acesso: string;

    @OneToMany(() => Post, post => post.autor)
    posts: Post[];
}