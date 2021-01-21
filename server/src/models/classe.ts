import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export default class Classe {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;
}