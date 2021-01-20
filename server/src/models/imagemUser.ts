import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ImagemUser {

    @PrimaryGeneratedColumn('increment')
    imagemID: number;

    @Column()
    path: string;
}