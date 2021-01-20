import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ImagemTime {

    @PrimaryGeneratedColumn('increment')
    imagemID: number;

    @Column()
    path: string;
}