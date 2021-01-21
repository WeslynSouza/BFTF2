import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import Classe from './classe';
import ImagemUser from './imagemUser';
import Post from './post';
import Time from './time';

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

    @ManyToOne(() => Time, time => time.usuarios)
    @JoinTable()
    time: Time;

    @Column()
    acesso: string;

    @OneToMany(() => Post, post => post.autor, {
        cascade: ['update', 'remove']
    })
    posts: Post[];
}