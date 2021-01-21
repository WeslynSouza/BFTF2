import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPartida1611164398111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'partida',
            columns: [
                {
                    name: 'imagemID',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'divisao',
                    type: 'integer'
                },
                {
                    name: 'dataHora',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'idDivisao',
                    columnNames: ['divisao'],
                    referencedTableName: 'divisao',
                    referencedColumnNames: ['divisaoID'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('partida')
    }

}
