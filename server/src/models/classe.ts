import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export default class Classe {

    @PrimaryGeneratedColumn('increment')
    classeID: number;

    @Column()
    nome: string;
}