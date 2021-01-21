import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class ImagemTime {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;
}