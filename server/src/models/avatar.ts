import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ImagemUser {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;
}