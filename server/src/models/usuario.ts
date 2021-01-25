import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import Classe from './classe';
import Post from './post';
import Time from './time';

@Entity()
export default class Usuario {

    @PrimaryColumn()
    steamId: string;
     
    @Column()
    nick: string;

    @Column()
    senha: string;

    @ManyToMany(() => Classe)
    @JoinTable()
    classes: Classe[];

    @Column()
    avatar: string;

    @Column()
    acesso: number;

    @ManyToOne(() => Time, time => time.jogadores)
    @JoinColumn()
    time: Time;

    @OneToMany(() => Post, post => post.autor, {
        cascade: ['update', 'remove']
    })
    posts: Post[];
}