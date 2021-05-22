import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Imagem from './imagem';
import Usuario from './usuario';

@Entity()
export default class Post {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => Usuario, usuario => usuario.posts)
    autor!: Usuario;

    @Column()
    titulo!: string;

    @Column()
    conteudo!: string;

    @OneToMany(() => Imagem, imagem => imagem.post, {
        cascade: ['insert', 'update', 'remove']
    })
    imagens!: Imagem[];
}