import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import Classe from './classe';
import ImagemUser from './imagemUser';
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
    acesso: number;

    @OneToMany(() => Post, post => post.autor, {
        cascade: ['update', 'remove']
    })
    posts: Post[];
}