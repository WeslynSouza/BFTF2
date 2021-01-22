import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Time from './time';

@Entity()
export default class ImagemTime {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Time, time => time.logo, {
        cascade: ['update', 'remove']
    })
    time: Time;
}