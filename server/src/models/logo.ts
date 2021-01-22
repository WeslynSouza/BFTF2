import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Time from './time';

@Entity()
export default class Logo {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(() => Time, time => time.logo)
    @JoinColumn({ name: 'timeId'})
    time: Time;
}