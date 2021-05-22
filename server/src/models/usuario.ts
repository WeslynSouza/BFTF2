import { Column, Entity, ManyToMany, JoinTable, OneToMany, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Classe from './classe';
import Post from './post';
import Time from './time';
import User_atividade from './user_atividade';

@Entity()
export default class Usuario {

    @PrimaryGeneratedColumn('increment')
    id!: number;
    
    @Column()
    nick!: string;
    
    @Column()
    senha!: string;

    @Column()
    steamId?: string;
    
    @ManyToMany(() => Classe)
    @JoinTable()
    classes!: Classe[];

    @Column()
    avatar!: string;

    @Column()
    acesso!: number;

    @Column()
    elegivel!: number;

    @ManyToOne(() => Time, time => time.jogadores)
    time!: Time;

    @OneToMany(() => Post, post => post.autor, {
        cascade: ['update', 'remove']
    })
    posts?: Post[];

    @OneToMany(() => User_atividade, atividade => atividade.usuario, {
        cascade: ['insert' ,'update', 'remove']
    })
    atividades!: User_atividade[];
}